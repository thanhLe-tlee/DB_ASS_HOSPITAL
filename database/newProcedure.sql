-- Insert sample data into HOSPITAL.PATIENT
INSERT INTO HOSPITAL.PATIENT (p_code, p_first_name, p_last_name, p_address, p_gender, discharge_date, p_phone_number, p_dob)
VALUES
('IP000000001', 'John', 'Doe', '123 Elm St', 'M', '2023-10-01', '555-1234', '1980-05-15'),
('IP000000002', 'Jane', 'Smith', '456 Oak St', 'F', '2023-08-15', '555-5678', '1990-07-25'),
('OP000000003', 'Alice', 'Johnson', '789 Pine St', 'F', NULL, '555-8765', '1975-11-05'),
('OP000000004', 'Bob', 'Brown', '101 Maple St', 'M', NULL, '555-4321', '1985-12-20'),
('OP000000005', 'Charlie', 'Davis', '202 Cedar St', 'M', NULL, '555-9876', '1992-04-10'),
('OP000000006', 'Eve', 'Wilson', '303 Birch St', 'F', NULL, '555-3456', '1988-09-30'),
('OP000000007', 'Frank', 'Evans', '404 Walnut St', 'M', NULL, '555-6543', '1970-02-15'),
('OP000000008', 'Grace', 'Martinez', '505 Spruce St', 'F', NULL, '555-7890', '1995-06-05'),
('OP000000009', 'Henry', 'Garcia', '606 Pine St', 'M', NULL, '555-2345', '1982-08-25'),
('OP000000010', 'Ivy', 'Lopez', '707 Elm St', 'F', NULL, '555-8901', '1998-03-20'),
('IP000000011', 'Jack', 'Hernandez', '808 Oak St', 'M', '2023-09-01', '555-4567', '1978-01-10'),
('IP000000012', 'Kelly', 'Young', '909 Maple St', 'F', '2023-07-15', '555-9012', '1987-10-30'),
('IP000000013', 'Larry', 'King', '101 Cedar St', 'M', '2023-06-01', '555-6789', '1973-04-05'),
('IP000000014', 'Molly', 'Scott', '202 Birch St', 'F', '2023-05-15', '555-1234', '1989-12-20'),
('IP000000015', 'Nancy', 'Adams', '303 Walnut St', 'F', '2023-04-10', '555-5678', '1984-08-15');

INSERT INTO HOSPITAL.DOCTOR (doctor_code, p_code)
VALUES
('D001', 'IP000000001'),
('D002', 'IP000000002'),
('D003', 'OP000000003'),
('D004', 'OP000000004'),
('D005', 'OP000000005');

INSERT INTO HOSPITAL.DEAN (dean_code)
VALUES
('D001'), -- Dean of Cardiology (Doctor D001)
('D002'), -- Dean of Neurology (Doctor D002)
('D003'), -- Dean of Oncology (Doctor D003)
('D004'), -- Dean of Pediatrics (Doctor D004)
('D005'); -- Dean of Orthopedics (Doctor D005)

INSERT INTO HOSPITAL.DEPARTMENT (dept_code, title, dean_code)
VALUES
('D001', 'Cardiology', 'D001'),
('D002', 'Neurology', 'D002'),
('D003', 'Oncology', 'D003'),
('D004', 'Pediatrics', 'D004'),
('D005', 'Orthopedics', 'D005');

INSERT INTO HOSPITAL.EMPLOYEE (e_code, e_first_name, e_last_name, e_dob, e_address, name_specialty, degree_year, e_gender, start_date, dept_code)
VALUES
('E001', 'Michael', 'Clark', '1985-03-10', '321 North St', 'Cardiology', 2010, 'M', '2012-07-15', 'D001'),
('E002', 'Sara', 'Taylor', '1990-06-20', '654 West St', 'Neurology', 2015, 'F', '2016-03-10', 'D002'),
('E003', 'David', 'Martin', '1978-02-28', '987 East St', 'Oncology', 2005, 'M', '2006-01-12', 'D003'),
('E004', 'Emily', 'Williams', '1983-09-12', '432 South St', 'Pediatrics', 2008, 'F', '2009-11-18', 'D004'),
('E005', 'James', 'Anderson', '1992-12-15', '123 Main St', 'Orthopedics', 2016, 'M', '2018-05-01', 'D005'),
('N001', 'Emile', 'Williams', '1983-09-12', '432 South St', 'Pediatrics', 2008, 'F', '2009-11-18', 'D001'),
('N002', 'Jane', 'Anderson', '1992-12-15', '123 Main St', 'Orthopedics', 2016, 'M', '2018-05-01', 'D002');



INSERT INTO HOSPITAL.PHONE_NUMBER (phone_number, e_code)
VALUES
('555-1111', 'E001'),
('555-2222', 'E002'),
('555-3333', 'E003'),
('555-4444', 'E004'),
('555-5555', 'E005'),
('555-6666', 'N001'),
('555-7777', 'N002');

INSERT INTO HOSPITAL.EXAMINATION (examination_id, diagnosis, current_ex_date, next_ex_date, fee)
VALUES
('E001', 'Flu', '2023-09-01', '2024-09-01', 50.00),
('E002', 'Diabetes', '2023-05-15', '2023-11-15', 100.00),
('E003', 'Hypertension', '2023-07-10', '2024-01-10', 80.00),
('E004', 'Asthma', '2023-02-20', '2023-08-20', 70.00),
('E005', 'Migraine', '2023-03-01', '2024-03-01', 60.00),
('E006', 'Arthritis', '2023-04-15', '2024-04-15', 90.00),
('E007', 'Bronchitis', '2023-06-10', '2024-06-10', 75.00),
('E008', 'Pneumonia', '2023-08-01', '2024-08-01', 85.00),
('E009', 'Cancer', '2023-10-15', '2024-10-15', 120.00),
('E010', 'Heart Disease', '2023-11-01', '2024-11-01', 110.00);

INSERT INTO HOSPITAL.PROVIDER (pr_number, pr_phone, pr_address, pr_name)
VALUES
('PR001', '555-2222', '789 Provider St', 'PharmaCo'),
('PR002', '555-3333', '101 Supplier Rd', 'MedSupply'),
('PR003', '555-4444', '202 Distributor Ave', 'HealthDistributor'),
('PR004', '555-5555', '303 Pharmacy Blvd', 'QuickMed'),
('PR005', '555-6666', '404 Lab St', 'LabCorp'),
('PR006', '555-7777', '505 Clinic Rd', 'CliniCare'),
('PR007', '555-8888', '606 Hospital Ave', 'MediCenter'),
('PR008', '555-9999', '707 Health St', 'HealthCare');

INSERT INTO HOSPITAL.MEDICATION (m_code, m_name, expiration_date, price, examination_id)
VALUES
('M001', 'Aspirin', '2025-08-15', 10.00, 'E001'),
('M002', 'Metformin', '2026-01-01', 20.00, 'E002'),
('M003', 'Lisinopril', '2025-12-01', 30.00, 'E003'),
('M004', 'Salbutamol', '2025-09-10', 15.00, 'E004'),
('M005', 'Ibuprofen', '2025-11-30', 8.00, 'E005'),
('M006', 'Celecoxib', '2025-10-15', 25.00, 'E006'),
('M007', 'Amoxicillin', '2025-07-20', 12.00, 'E007'),
('M008', 'Azithromycin', '2025-06-01', 18.00, 'E008'),
('M009', 'Atorvastatin', '2025-12-31', 40.00, 'E009');


INSERT INTO HOSPITAL.NURSE (nurse_code)
VALUES
('N001'),
('N002');

INSERT INTO HOSPITAL.IN_PATIENT (ip_code, fee, diagnosis, date_of_discharge, sickroom, date_of_admission, nurse_code)
VALUES
('IP000000001', 200.00, 'Surgery', '2023-10-10', 101, '2023-09-15', 'N001'),
('IP000000002', 150.00, 'Infection', '2023-11-01', 102, '2023-10-10', 'N002'),
('IP000000011', 250.00, 'Fracture', '2023-09-10', 103, '2023-08-15', 'N001'),
('IP000000012', 175.00, 'Pneumonia', '2023-08-30', 104, '2023-07-15', 'N002'),
('IP000000013', 225.00, 'Cancer', '2023-07-20', 105, '2023-06-01', 'N001'),
('IP000000014', 180.00, 'Diabetes', '2023-06-15', 106, '2023-05-15', 'N002');

INSERT INTO HOSPITAL.OUT_PATIENT (op_code)
VALUES
('OP000000003'),
('OP000000004'),
('OP000000005'),
('OP000000006'),
('OP000000007'),
('OP000000008'),
('OP000000009'),
('OP000000010');

INSERT INTO HOSPITAL.EXAMINES (examination_id, op_code, doctor_code)
VALUES
('E001', 'OP000000003', 'D001'),
('E002', 'OP000000004', 'D002'),
('E003', 'OP000000005', 'D003'),
('E004', 'OP000000006', 'D004'),
('E005', 'OP000000007', 'D005');
 

INSERT INTO HOSPITAL.TREATMENT (treatment_id, result, start_date, end_date, doctor_code)
VALUES
('T001', 'Success', '2023-09-01', '2023-09-10', 'D001'),
('T002', 'Ongoing', '2023-08-15', NULL, 'D002'),
('T003', 'Failure', '2023-07-10', '2023-07-20', 'D003'),
('T004', 'Success', '2023-06-01', '2023-06-15', 'D004'),
('T005', 'Ongoing', '2023-05-15', NULL, 'D005');

INSERT INTO HOSPITAL.TREATS (doctor_code, p_code, treatment_id)
VALUES
('D001', 'IP000000001', 'T001'),
('D002', 'OP000000004', 'T002'),
('D003', 'OP000000005', 'T003'),
('D004', 'OP000000006', 'T004'),
('D005', 'OP000000007', 'T005');

-- select * from HOSPITAL.EMPLOYEE a JOIN HOSPITAL.PHONE_NUMBER b where a.e_code = b.e_code;
-- select * from HOSPITAL.TREATMENT;
-- select * from HOSPITAL.PATIENT p join HOSPITAL.DOCTOR d where p.p_code = d.p_code;
-- select * from HOSPITAL.MEDICATION;
-- select * from HOSPITAL.DEPARTMENT;
-- drop procedure AddNewPatient;

DELIMITER //

CREATE PROCEDURE AddNewPatient(
    IN pCode VARCHAR(12),
    IN pFirstName VARCHAR(15),
    IN pLastName VARCHAR(15),
    IN pAddress VARCHAR(30),
    IN pGender CHAR(1),
    IN dischargeDate DATE,
    IN pPhoneNumber VARCHAR(15),
    IN pDob DATE,
    IN doctor_code VARCHAR(15)
)
BEGIN
	INSERT INTO HOSPITAL.PATIENT (p_code, p_first_name, p_last_name, p_address, p_gender, discharge_date, p_phone_number, p_dob)
    VALUES (pCode, pFirstName, pLastName, pAddress, pGender, dischargeDate, pPhoneNumber, pDob);
    Insert into HOSPITAL.DOCTOR (doctor_code,p_code) Values (doctor_code, pCode);
    
END //

DELIMITER ;

CALL AddNewPatient('BK082252720', 'Võ Trúc', 'Sơn', '268 Ly Thuong Kiet', 'M', '2023-08-10', '555-1234', '2004-08-15','D10');

-- 0	164	01:38:50	CALL AddNewPatient('BK072252720', 'Võ Trúc', 'Sơn', '268 Ly Thuong Kiet', 'M', '2023-08-10', '555-1234', '2004-08-15','D08')	Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`hospital`.`doctor`, CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`p_code`) REFERENCES `patient` (`p_code`))	0.000 sec
-- 0	77	01:21:23	CALL AddNewPatient('BK012252720', 'Võ Trúc', 'Sơn', '268 Ly Thuong Kiet', 'M', '2023-08-10', '555-1234', '2004-08-15','D06')	Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`hospital`.`doctor`, CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`p_code`) REFERENCES `patient` (`p_code`))	0.000 sec



DELIMITER //

CREATE PROCEDURE DeletePatient(
    IN pCode VARCHAR(12)
)
BEGIN
    DELETE FROM HOSPITAL.DOCTOR WHERE p_code = pCode;
    DELETE FROM HOSPITAL.PATIENT WHERE p_code = pCode;
END //

DELIMITER ;
select * from HOSPITAL.PATIENT p join HOSPITAL.DOCTOR d where p.p_code = d.p_code;
call DeletePatient('BK222252777');










