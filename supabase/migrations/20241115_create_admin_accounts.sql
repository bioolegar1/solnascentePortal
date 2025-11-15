-- Admin accounts table for custom authentication
CREATE TABLE admin_accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admin_accounts ENABLE ROW LEVEL SECURITY;

-- No public policies (route uses service role). Add minimal read for authenticated if needed.
-- Keep table restricted: only service role or specific server-side contexts should access.

-- Grants (optional; service role bypasses RLS)
GRANT SELECT, INSERT, UPDATE, DELETE ON admin_accounts TO authenticated;