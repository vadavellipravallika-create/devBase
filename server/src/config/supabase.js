import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Use standard .env resolution (from server root or project root)
dotenv.config();
// Fallback if running from a different directory
dotenv.config({ path: '../.env' }); 

const supabaseUrl = process.env.SUPABASE_URL;
// We use the Service Role Key here because we are bypassing RLS for custom auth.
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or Service Role Key in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
