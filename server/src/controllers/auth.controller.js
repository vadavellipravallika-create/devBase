import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert user
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([
        { 
          name, 
          email, 
          password_hash, 
          role: role || 'student'
        }
      ])
      .select('id, name, email, role, created_at')
      .single();

    if (error) throw error;

    // Create JWT
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET || 'devbase_super_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: newUser
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Get user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'devbase_super_secret',
      { expiresIn: '7d' }
    );

    // Don't send password hash back
    delete user.password_hash;

    res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    next(error);
  }
};
