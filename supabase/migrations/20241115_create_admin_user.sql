-- Create admin user (this would typically be done through Supabase Auth)
-- For testing purposes, we'll create a profile for an existing user
-- Note: In production, users should be created through the authentication flow

-- Insert admin profile (assuming a user with this ID exists or will be created)
INSERT INTO profiles (id, role, created_at, updated_at) VALUES 
('00000000-0000-0000-0000-000000000000', 'admin', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET role = 'admin', updated_at = NOW();