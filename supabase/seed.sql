-- Clear existing data
truncate table vehicles cascade;

-- Seed BIDDING vehicles
insert into vehicles (
  status, year, make, model, trim, vin, mileage, title_status, damage_type, 
  engine, transmission, drivetrain, fuel_type, auction_house, lot_number, 
  location, current_bid, buy_now_price, est_repair_cost, est_market_value, 
  shipping_estimate, images
) values 
('BIDDING', 2023, 'Porsche', '911 Carrera', '4S', 'WP0AA2A9XPS21****', 4500, 'CLEAN', 'MINOR DENT', '3.0L H6', 'PDK', 'AWD', 'GAS', 'Copart', 'LOT-911001', 'Miami, FL', 115000.00, 145000.00, 2500.00, 165000.00, 1200.00, ARRAY['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800']),
('BIDDING', 2022, 'Tesla', 'Model S', 'Plaid', '5YJSA1E4XNF23****', 12000, 'CLEAN', 'NONE', 'ELECTRIC', 'AUTO', 'AWD', 'ELECTRIC', 'IAAI', 'LOT-TSL002', 'Los Angeles, CA', 78000.00, 89000.00, 0.00, 95000.00, 1800.00, ARRAY['https://images.unsplash.com/photo-1617788138017-80ad42243c5d?auto=format&fit=crop&q=80&w=800']),
('BIDDING', 2024, 'Land Rover', 'Defender', '110 SE', 'SADJB2D2XRE34****', 500, 'CLEAN', 'NONE', '3.0L I6', 'AUTO', '4WD', 'GAS', 'Copart', 'LOT-DEF003', 'Jacksonville, FL', 62500.00, 75000.00, 0.00, 82000.00, 1100.00, ARRAY['https://images.unsplash.com/photo-1623992294117-6887538a4d7d?auto=format&fit=crop&q=80&w=800']),
('BIDDING', 2021, 'Ford', 'Bronco', 'Badlands', '1FMEE5DP0MLA0****', 28000, 'SALVAGE', 'FRONT END', '2.7L V6', 'AUTO', '4WD', 'GAS', 'Copart', 'LOT-FBR004', 'Houston, TX', 24800.00, 32000.00, 8500.00, 48000.00, 1500.00, ARRAY['https://images.unsplash.com/photo-1621932953912-0b6dc30d5565?auto=format&fit=crop&q=80&w=800']),
('BIDDING', 2022, 'Mercedes-Benz', 'G-Class', 'G 63 AMG', 'W1NAG7HB8NR12****', 15000, 'CLEAN', 'MINOR SCRATCH', '4.0L V8', 'AUTO', 'AWD', 'GAS', 'IAAI', 'LOT-MBG005', 'Savannah, GA', 165500.00, 195000.00, 1500.00, 210000.00, 1300.00, ARRAY['https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800']),
('BIDDING', 2023, 'Corvette', 'Z06', '3LZ', '1G1YF2D44P510****', 1200, 'CLEAN', 'NONE', '5.5L V8', 'AUTO', 'RWD', 'GAS', 'Copart', 'LOT-CZR006', 'New York, NY', 142000.00, 165000.00, 0.00, 175000.00, 1400.00, ARRAY['https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=800']);

-- Seed BUYED vehicles
insert into vehicles (
  status, year, make, model, trim, vin, mileage, title_status, damage_type, 
  engine, transmission, drivetrain, fuel_type, auction_house, lot_number, 
  location, final_price, est_repair_cost, est_market_value, 
  shipping_estimate, images
) values 
('BUYED', 2021, 'Audi', 'RS6 Avant', 'Performance', 'WA1VBBFY5M211****', 32000, 'CLEAN', 'REAR DENT', '4.0L V8', 'AUTO', 'AWD', 'GAS', 'Copart', 'LOT-ARS007', 'Norfolk, VA', 92400.00, 3500.00, 115000.00, 1250.00, ARRAY['https://images.unsplash.com/photo-1606152424161-001041935832?auto=format&fit=crop&q=80&w=800']),
('BUYED', 2020, 'Toyota', 'Supra', '3.0 Premium', 'JTMDB1D27L002****', 45000, 'SALVAGE', 'SIDE DAMAGE', '3.0L I6', 'AUTO', 'RWD', 'GAS', 'Copart', 'LOT-TSU008', 'Baltimore, MD', 28500.00, 12000.00, 52000.00, 1300.00, ARRAY['https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&q=80&w=800']),
('BUYED', 2022, 'Ram', '1500 TRX', 'Base', '1C6SRFJT0NN12****', 18000, 'CLEAN', 'NONE', '6.2L V8', 'AUTO', '4WD', 'GAS', 'IAAI', 'LOT-RTX009', 'Jacksonville, FL', 84000.00, 0.00, 98000.00, 1150.00, ARRAY['https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800']),
('BUYED', 2019, 'Jeep', 'Wrangler', 'Rubicon', '1C4HJXEGXKW56****', 55000, 'CLEAN', 'REAR BUMPER', '3.6L V6', 'AUTO', '4WD', 'GAS', 'Copart', 'LOT-JWR010', 'Miami, FL', 34500.00, 1200.00, 45000.00, 1200.00, ARRAY['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800']),
('BUYED', 2023, 'Lexus', 'LX 600', 'Luxury', 'JTJAY7BX0P400****', 8000, 'CLEAN', 'NONE', '3.5L V6', 'AUTO', 'AWD', 'GAS', 'IAAI', 'LOT-LLX011', 'Houston, TX', 108000.00, 0.00, 125000.00, 1550.00, ARRAY['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800']),
('BUYED', 2022, 'Nissan', 'GT-R', 'Premium', 'JN1AR1EF2NW20****', 11000, 'CLEAN', 'MINOR SCRATCH', '3.8L V6', 'AUTO', 'AWD', 'GAS', 'Copart', 'LOT-NGT012', 'Savannah, GA', 112000.00, 1800.00, 135000.00, 1300.00, ARRAY['https://images.unsplash.com/photo-1594976721976-50bc931349f8?auto=format&fit=crop&q=80&w=800']);
