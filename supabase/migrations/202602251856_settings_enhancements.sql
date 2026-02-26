-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT DEFAULT 'BidAutoDirect',
    address TEXT DEFAULT '123 Auction Way, Miami, FL 33101',
    phone TEXT DEFAULT '+1 (305) 555-0123',
    email TEXT DEFAULT 'sales@bidautodirect.com',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert initial settings if they don't exist
INSERT INTO settings (company_name, address, phone, email)
SELECT 'BidAutoDirect', '123 Auction Way, Miami, FL 33101', '+1 (305) 555-0123', 'sales@bidautodirect.com'
WHERE NOT EXISTS (SELECT 1 FROM settings);

-- Enhance vehicles table
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS destination TEXT DEFAULT 'Santo Domingo, Dominican Republic';
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS purchase_date TIMESTAMP WITH TIME ZONE;
