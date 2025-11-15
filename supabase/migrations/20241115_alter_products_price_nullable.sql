-- Make price column optional for catalog-only products
ALTER TABLE products ALTER COLUMN price DROP NOT NULL;