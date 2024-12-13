-- Create User Groups (Roles)
-- Create Users and Assign to Groups
CREATE USER IF NOT EXISTS 'admin_user'@'localhost' IDENTIFIED BY 'admin_password';
CREATE USER IF NOT EXISTS 'doctor_user'@'localhost' IDENTIFIED BY 'doctor_password';
CREATE USER IF NOT EXISTS 'nurse_user'@'localhost' IDENTIFIED BY 'nurse_password';
CREATE USER IF NOT EXISTS 'receptionist_user'@'localhost' IDENTIFIED BY 'receptionist_password';

GRANT 'admin' TO 'admin_user'@'localhost';
GRANT 'doctor' TO 'doctor_user'@'localhost';
GRANT 'nurse' TO 'nurse_user'@'localhost';
GRANT 'receptionist' TO 'receptionist_user'@'localhost';

-- Grant Permissions to User Groups
-- Admin Permissions
GRANT ALL PRIVILEGES ON HOSPITAL.* TO 'admin';

-- Doctor Permissions
GRANT SELECT, INSERT, UPDATE ON HOSPITAL.PATIENT TO 'doctor';
GRANT SELECT, INSERT, UPDATE ON HOSPITAL.EXAMINATION TO 'doctor';
GRANT SELECT, INSERT, UPDATE ON HOSPITAL.TREATMENT TO 'doctor';
GRANT SELECT ON HOSPITAL.DEPARTMENT TO 'doctor';

-- Nurse Permissions
GRANT SELECT, INSERT, UPDATE ON HOSPITAL.PATIENT TO 'nurse';
GRANT SELECT, INSERT, UPDATE ON HOSPITAL.IN_PATIENT TO 'nurse';
GRANT SELECT ON HOSPITAL.DEPARTMENT TO 'nurse';

-- Receptionist Permissions
GRANT SELECT, INSERT ON HOSPITAL.PATIENT TO 'receptionist';
GRANT SELECT ON HOSPITAL.DEPARTMENT TO 'receptionist';

-- Apply Changes
FLUSH PRIVILEGES;