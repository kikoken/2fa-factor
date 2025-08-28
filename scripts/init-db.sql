-- 2FA Factor Database Schema
-- Initialize DuckDB with required tables

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR UNIQUE NOT NULL,
    password_hash VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    email_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true
);

-- Two-factor authentication secrets
CREATE TABLE IF NOT EXISTS user_2fa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    secret VARCHAR NOT NULL,
    is_enabled BOOLEAN DEFAULT false,
    backup_codes JSON, -- Array of backup codes
    created_at TIMESTAMP DEFAULT now(),
    last_used_at TIMESTAMP,
    UNIQUE(user_id)
);

-- Authentication sessions
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    last_accessed_at TIMESTAMP DEFAULT now(),
    ip_address VARCHAR,
    user_agent VARCHAR
);

-- Login attempts tracking
CREATE TABLE IF NOT EXISTS login_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR,
    ip_address VARCHAR,
    success BOOLEAN DEFAULT false,
    attempted_at TIMESTAMP DEFAULT now(),
    failure_reason VARCHAR
);

-- 2FA verification attempts
CREATE TABLE IF NOT EXISTS verification_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR NOT NULL,
    success BOOLEAN DEFAULT false,
    attempted_at TIMESTAMP DEFAULT now(),
    ip_address VARCHAR
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_user_2fa_user_id ON user_2fa(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts(email);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip ON login_attempts(ip_address);
CREATE INDEX IF NOT EXISTS idx_verification_attempts_user_id ON verification_attempts(user_id);

-- Insert sample data for development
INSERT OR IGNORE INTO users (id, email, password_hash, email_verified) VALUES 
    ('550e8400-e29b-41d4-a716-446655440000', 'demo@2fa-factor.com', '$2b$10$example_hash_here', true);

-- Sample 2FA setup for demo user
INSERT OR IGNORE INTO user_2fa (user_id, secret, is_enabled, backup_codes) VALUES 
    ('550e8400-e29b-41d4-a716-446655440000', 'JBSWY3DPEHPK3PXP', false, '["backup001", "backup002", "backup003"]');

-- Log initialization
INSERT INTO login_attempts (email, ip_address, success, failure_reason) VALUES 
    ('system', '127.0.0.1', true, 'Database initialized');

SELECT 'Database initialized successfully' as status;