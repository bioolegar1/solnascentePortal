-- Create products table
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    image TEXT,
    category TEXT,
    price DECIMAL(10,2) NOT NULL,
    available BOOLEAN DEFAULT true,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for products table
-- Allow public read access to active products
CREATE POLICY "Public can view active products" ON products
    FOR SELECT USING (active = true);

-- Allow authenticated users to read all products (including inactive)
CREATE POLICY "Authenticated users can view all products" ON products
    FOR SELECT TO authenticated USING (true);

-- Grant permissions
GRANT SELECT ON products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON products TO authenticated;