-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum for user roles
CREATE TYPE user_role AS ENUM ('student', 'admin');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ExamModules table (ExamScope)
CREATE TABLE exam_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    created_by UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ExamQuestions table (ExamScope)
CREATE TABLE exam_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES exam_modules(id) ON DELETE CASCADE NOT NULL,
    question_text TEXT NOT NULL,
    options JSONB, -- Storing options as JSON array if multiple choice
    correct_answer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- DebugSessions table (FixMyCode)
CREATE TABLE debug_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    original_code TEXT NOT NULL,
    language TEXT NOT NULL,
    gemini_analysis JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- UserResumes table (RoleReady)
CREATE TABLE user_resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    parsed_skills JSONB,
    resume_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- LearningRoadmaps table (RoleReady)
CREATE TABLE learning_roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    resume_id UUID REFERENCES user_resumes(id) ON DELETE CASCADE NOT NULL,
    roadmap_data JSONB NOT NULL, -- Storing 7-day micro-learning roadmap
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Performance Indexes
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_exam_modules_created_by ON exam_modules (created_by);
CREATE INDEX idx_exam_questions_module_id ON exam_questions (module_id);
CREATE INDEX idx_debug_sessions_user_id ON debug_sessions (user_id);
CREATE INDEX idx_user_resumes_user_id ON user_resumes (user_id);
CREATE INDEX idx_learning_roadmaps_user_id ON learning_roadmaps (user_id);
CREATE INDEX idx_learning_roadmaps_resume_id ON learning_roadmaps (resume_id);
