-- Check if exist DATABASE

DROP DATABASE IF EXISTS HOSPITAL;
CREATE DATABASE IF NOT EXISTS HOSPITAL;
USE HOSPITAL;

-- Create TABLE 
CREATE TABLE HOSPITAL.PATIENT 
(
    p_code VARCHAR(12) 				NOT NULL,
    p_first_name VARCHAR (15) 		NOT NULL,
    p_last_name VARCHAR (15) 		NOT NULL,
    p_address VARCHAR (30),
    p_gender CHAR(1),
    discharge_date DATE,
    p_phone_number VARCHAR (15),
    p_dob DATE,
    PRIMARY KEY (p_code)
);

CREATE TABLE HOSPITAL.EXAMINATION 
(
    examination_id VARCHAR(10) 		NOT NULL,
    diagnosis VARCHAR (50),
    current_ex_date DATE,
    next_ex_date DATE,
    fee DECIMAL(10,2),
    PRIMARY KEY (examination_id)
);

CREATE TABLE HOSPITAL.PROVIDER 
(
    pr_number VARCHAR (10) 			NOT NULL,
    pr_phone VARCHAR (15),
    pr_address VARCHAR (30),
    pr_name VARCHAR (30), --
    PRIMARY KEY (pr_number)
);

CREATE TABLE HOSPITAL.DOCTOR
(
    doctor_code VARCHAR (10) 		NOT NULL,
    p_code VARCHAR (12) 			NOT NULL,
    PRIMARY KEY (doctor_code)
    -- FOREIGN KEY (p_code) REFERENCES HOSPITAL.PATIENT (p_code)
);

CREATE TABLE HOSPITAL.DEAN
(
    dean_code VARCHAR (10) 			NOT NULL,
    PRIMARY KEY (dean_code)
    -- FOREIGN KEY (dean_code) REFERENCES HOSPITAL.DOCTOR (doctor_code),
    -- FOREIGN KEY (dept_code) REFERENCES HOSPITAL.DEPARTMENT (dept_code)
);

CREATE TABLE HOSPITAL.DEPARTMENT
(
    dept_code VARCHAR (10) 			NOT NULL,
    title VARCHAR (15),
    dean_code VARCHAR (10) 			NOT NULL,
    PRIMARY KEY (dept_code)
);

CREATE TABLE hospital.EMPLOYEE
(
    e_code VARCHAR (10) 			NOT NULL,
    e_first_name VARCHAR (15) 		NOT NULL,
    e_last_name VARCHAR (15) 		NOT NULL,
    e_dob DATE,
    e_address VARCHAR (30),
    name_specialty VARCHAR (15),
    degree_year INT,
    e_gender CHAR(1),
    start_date DATE,
    dept_code VARCHAR (10) 			NOT NULL,
    PRIMARY KEY (e_code)
    -- FOREIGN KEY (dept_code) REFERENCES HOSPITAL.DEPARTMENT (dept_code)
);

CREATE TABLE HOSPITAL.NURSE
(
    nurse_code VARCHAR (10) 		NOT NULL,
    PRIMARY KEY (nurse_code)
    -- FOREIGN KEY (nurse_code) REFERENCES HOSPITAL.EMPLOYEE (e_code)
);

CREATE TABLE HOSPITAL.PHONE_NUMBER
(
    phone_number VARCHAR (15) 		NOT NULL,
    e_code VARCHAR (10) 			NOT NULL,
    PRIMARY KEY (phone_number, e_code)
    -- FOREIGN KEY (e_code) REFERENCES HOSPITAL.EMPLOYEE (e_code)
);

CREATE TABLE HOSPITAL.IN_PATIENT
(
    ip_code VARCHAR (12) 			NOT NULL,
    fee DECIMAL (10,2),
    diagnosis VARCHAR (50),
    date_of_discharge DATE,
    sickroom INT,
    date_of_admission DATE,
    nurse_code VARCHAR (10) 		NOT NULL,
    PRIMARY KEY (ip_code),
    -- FOREIGN KEY (ip_code) REFERENCES HOSPITAL.PATIENT (p_code),
    -- FOREIGN KEY (nurse_code) REFERENCES HOSPITAL.NURSE (nurse_code),
    CHECK (ip_code LIKE 'IP%')
);

CREATE TABLE HOSPITAL.OUT_PATIENT 
(
    op_code VARCHAR (12) 			NOT NULL,
    PRIMARY KEY (op_code),
    -- FOREIGN KEY (op_code) REFERENCES HOSPITAL.PATIENT (p_code),
    CHECK (op_code LIKE 'OP%')
);

CREATE TABLE HOSPITAL.EXAMINES 
(
    examination_id VARCHAR (10) 	NOT NULL,
    op_code VARCHAR (12) 			NOT NULL,
    doctor_code VARCHAR (10) 		NOT NULL,
    PRIMARY KEY (examination_id, op_code, doctor_code)
    -- FOREIGN KEY (examination_id) REFERENCES HOSPITAL.EXAMINATION (examination_id),
    -- FOREIGN KEY (op_code) REFERENCES HOSPITAL.OUT_PATIENT (op_code),
    -- FOREIGN KEY (doctor_code) REFERENCES HOSPITAL.DOCTOR (doctor_code)
);

CREATE TABLE HOSPITAL.TREATMENT 
(
    treatment_id VARCHAR (10) 		NOT NULL,
    result VARCHAR (15),
    start_date DATE,
    end_date DATE,
    doctor_code VARCHAR (10) 		NOT NULL,
    PRIMARY KEY (treatment_id)
    -- FOREIGN KEY (doctor_code) REFERENCES HOSPITAL.DOCTOR (doctor_code)
);

CREATE TABLE HOSPITAL.TREATS 
(
    doctor_code VARCHAR (10) 		NOT NULL,
    p_code VARCHAR (12) 			NOT NULL,
    treatment_id VARCHAR (10) 		NOT NULL,
    PRIMARY KEY (doctor_code, p_code, treatment_id)
    -- FOREIGN KEY (doctor_code) REFERENCES HOSPITAL.DOCTOR (doctor_code),
    -- FOREIGN KEY (p_code) REFERENCES HOSPITAL.PATIENT (p_code),
    -- FOREIGN KEY (treatment_id) REFERENCES HOSPITAL.TREATMENT (treatment_id)
);

CREATE TABLE HOSPITAL.MEDICATION 
(
    m_code VARCHAR(10) 				NOT NULL,
    m_name VARCHAR(15) 				NOT NULL,
    expiration_date DATE			NOT NULL,
    price DECIMAL (10,2) 			NOT NULL,
    examination_id VARCHAR (10) 	NOT NULL,
    PRIMARY KEY (m_code) 
    -- FOREIGN KEY (examination_id) REFERENCES HOSPITAL.EXAMINATION (examination_id)
);

CREATE TABLE HOSPITAL.MED_EFFECT
(
    m_code VARCHAR (10) 			NOT NULL,
    effect VARCHAR (15),
    PRIMARY KEY (m_code, effect)
    -- FOREIGN KEY (m_code) REFERENCES HOSPITAL.MEDICATION (m_code)
);

CREATE TABLE HOSPITAL.EXPIRED_MEDICATION
(
    m_code VARCHAR (10) 			NOT NULL,
    expiration_date DATE			NOT NULL,
    curr_date DATE,
    PRIMARY KEY (m_code),
    -- FOREIGN KEY (m_code) REFERENCES HOSPITAL.MEDICATION (m_code),
    CHECK (m_code <= curr_date)
);

CREATE TABLE HOSPITAL.PROVIDES
(
    m_code VARCHAR (10) 			NOT NULL,
    pr_number VARCHAR (10) 			NOT NULL,
    imported_date DATE,
    quantity INT,
    PRIMARY KEY (pr_number, m_code)
    -- FOREIGN KEY (m_code) REFERENCES HOSPITAL.MEDICATION (m_code),
    -- FOREIGN KEY (pr_number) REFERENCES HOSPITAL.PROVIDER (pr_number)
);

CREATE TABLE HOSPITAL.TREATMENT_USES
(
    treatment_id VARCHAR (10) 		NOT NULL,
    m_code VARCHAR (10)				NOT NULL,
    PRIMARY KEY (m_code, treatment_id)
    -- FOREIGN KEY (m_code) REFERENCES HOSPITAL.MEDICATION (m_code),
    -- FOREIGN KEY (treatment_id) REFERENCES HOSPITAL.TREATMENT (treatment_id)
);



-- ############################################################################################################
-- Alter TABLE for adding foreign key
ALTER TABLE HOSPITAL.DEPARTMENT
ADD FOREIGN KEY (dean_code) REFERENCES HOSPITAL.DEAN (dean_code);

ALTER TABLE HOSPITAL.DOCTOR
ADD FOREIGN KEY (p_code) REFERENCES HOSPITAL.PATIENT (p_code);

ALTER TABLE HOSPITAL.DEAN
ADD FOREIGN KEY (dean_code) REFERENCES HOSPITAL.DOCTOR (doctor_code);

ALTER TABLE HOSPITAL.EMPLOYEE
ADD FOREIGN KEY (dept_code) REFERENCES HOSPITAL.DEPARTMENT (dept_code);

ALTER TABLE HOSPITAL.NURSE
ADD FOREIGN KEY (nurse_code) REFERENCES HOSPITAL.EMPLOYEE (e_code);

ALTER TABLE HOSPITAL.PHONE_NUMBER
ADD FOREIGN KEY (e_code) REFERENCES HOSPITAL.EMPLOYEE (e_code);

ALTER TABLE HOSPITAL.IN_PATIENT
ADD FOREIGN KEY (ip_code) REFERENCES HOSPITAL.PATIENT (p_code),
ADD FOREIGN KEY (nurse_code) REFERENCES HOSPITAL.NURSE (nurse_code);

ALTER TABLE HOSPITAL.OUT_PATIENT
ADD FOREIGN KEY (op_code) REFERENCES HOSPITAL.PATIENT (p_code);

ALTER TABLE HOSPITAL.EXAMINES
ADD FOREIGN KEY (examination_id) REFERENCES HOSPITAL.EXAMINATION (examination_id),
ADD FOREIGN KEY (op_code) REFERENCES HOSPITAL.OUT_PATIENT (op_code),
ADD FOREIGN KEY (doctor_code) REFERENCES HOSPITAL.DOCTOR (doctor_code);

ALTER TABLE HOSPITAL.TREATMENT
ADD FOREIGN KEY (doctor_code) REFERENCES HOSPITAL.DOCTOR (doctor_code);

ALTER TABLE HOSPITAL.TREATS
ADD FOREIGN KEY (doctor_code) REFERENCES HOSPITAL.DOCTOR (doctor_code),
ADD FOREIGN KEY (p_code) REFERENCES HOSPITAL.PATIENT (p_code),
ADD FOREIGN KEY (treatment_id) REFERENCES HOSPITAL.TREATMENT (treatment_id);

ALTER TABLE HOSPITAL.MEDICATION
ADD FOREIGN KEY (examination_id) REFERENCES HOSPITAL.EXAMINATION (examination_id);

ALTER TABLE HOSPITAL.MED_EFFECT
ADD FOREIGN KEY (m_code) REFERENCES HOSPITAL.MEDICATION (m_code);

ALTER TABLE HOSPITAL.EXPIRED_MEDICATION
ADD FOREIGN KEY (m_code) REFERENCES HOSPITAL.MEDICATION (m_code);

ALTER TABLE HOSPITAL.PROVIDES
ADD FOREIGN KEY (m_code) REFERENCES HOSPITAL.MEDICATION (m_code),
ADD FOREIGN KEY (pr_number) REFERENCES HOSPITAL.PROVIDER (pr_number);

ALTER TABLE TREATMENT_USES
ADD FOREIGN KEY (m_code) REFERENCES HOSPITAL.MEDICATION (m_code),
ADD FOREIGN KEY (treatment_id) REFERENCES HOSPITAL.TREATMENT (treatment_id);

-- ############################################################################################################



-- data
-- ############################################################################################################

-- Insert sample data into HOSPITAL.PATIENT
INSERT INTO HOSPITAL.PATIENT (p_code, p_first_name, p_last_name, p_address, p_gender, discharge_date, p_phone_number, p_dob)
VALUES
('IP000000001', 'John', 'Doe', '123 Elm St', 'M', '2023-10-01', '555-1234', '1980-05-15'),
('IP000000002', 'Jane', 'Smith', '456 Oak St', 'F', '2023-08-15', '555-5678', '1990-07-25'),
('OP000000003', 'Alice', 'Johnson', '789 Pine St', 'F', NULL, '555-8765', '1975-11-05'),
('OP000000004', 'Bob', 'Brown', '101 Maple St', 'M', '2024-01-10', '555-4321', '1985-12-20'),
('OP000000005', 'Charlie', 'Davis', '202 Cedar St', 'M', NULL, '555-9876', '1992-04-10');

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
('555-5555', 'E005');

INSERT INTO HOSPITAL.EXAMINATION (examination_id, diagnosis, current_ex_date, next_ex_date, fee)
VALUES
('E001', 'Flu', '2023-09-01', '2024-09-01', 50.00),
('E002', 'Diabetes', '2023-05-15', '2023-11-15', 100.00),
('E003', 'Hypertension', '2023-07-10', '2024-01-10', 80.00),
('E004', 'Asthma', '2023-02-20', '2023-08-20', 70.00),
('E005', 'Migraine', '2023-03-01', '2024-03-01', 60.00);

INSERT INTO HOSPITAL.PROVIDER (pr_number, pr_phone, pr_address, pr_name)
VALUES
('PR001', '555-2222', '789 Provider St', 'PharmaCo'),
('PR002', '555-3333', '101 Supplier Rd', 'MedSupply'),
('PR003', '555-4444', '202 Distributor Ave', 'HealthDistributor'),
('PR004', '555-5555', '303 Pharmacy Blvd', 'QuickMed'),
('PR005', '555-6666', '404 Lab St', 'LabCorp');

INSERT INTO HOSPITAL.MEDICATION (m_code, m_name, expiration_date, price, examination_id)
VALUES
('M001', 'Aspirin', '2023-08-15', 10.00, 'E001'),
('M002', 'Metformin', '2024-01-01', 20.00, 'E002'),
('M003', 'Lisinopril', '2023-12-01', 30.00, 'E003'),
('M004', 'Salbutamol', '2023-09-10', 15.00, 'E004'),
('M005', 'Ibuprofen', '2022-11-30', 8.00, 'E005');

INSERT INTO HOSPITAL.NURSE (nurse_code)
VALUES
('N001'),
('N002');

INSERT INTO HOSPITAL.IN_PATIENT (ip_code, fee, diagnosis, date_of_discharge, sickroom, date_of_admission, nurse_code)
VALUES
('IP000000001', 200.00, 'Surgery', '2023-10-10', 101, '2023-09-15', 'N001'),
('IP000000002', 150.00, 'Infection', '2023-11-01', 102, '2023-10-10', 'N002');

INSERT INTO HOSPITAL.OUT_PATIENT (op_code)
VALUES
('OP000000003'),
('OP000000004');

INSERT INTO HOSPITAL.EXAMINES (examination_id, op_code, doctor_code)
VALUES
('E001', 'OP000000003', 'D001'),
('E002', 'OP000000004', 'D002');

INSERT INTO HOSPITAL.TREATMENT (treatment_id, result, start_date, end_date, doctor_code)
VALUES
('T001', 'Success', '2023-09-01', '2023-09-10', 'D001'),
('T002', 'Ongoing', '2023-08-15', NULL, 'D002');

INSERT INTO HOSPITAL.TREATS (doctor_code, p_code, treatment_id)
VALUES
('D001', 'IP000000001', 'T001'),
('D002', 'OP000000004', 'T002');



-- ############################################################################################################


-- Trigger
-- ############################################################################################################

-- Automatically Update Expired Medications
DELIMITER $$

CREATE TRIGGER AFTER_INSERT_MEDICATION
AFTER INSERT ON HOSPITAL.MEDICATION
FOR EACH ROW
BEGIN
    IF NEW.expiration_date < CURDATE() THEN
        INSERT INTO HOSPITAL.EXPIRED_MEDICATION (m_code, expiration_date, curr_date)
        VALUES (NEW.m_code, NEW.expiration_date, CURDATE());
    END IF;
END$$

DELIMITER ;


-- Prevent Scheduling Overlapping Appointments
DELIMITER $$

CREATE TRIGGER prevent_overlapping_appointments
BEFORE INSERT ON HOSPITAL.EXAMINES
FOR EACH ROW
BEGIN
    DECLARE conflict_count INT;

    SELECT COUNT(*) INTO conflict_count
    FROM HOSPITAL.EXAMINES E
    INNER JOIN HOSPITAL.EXAMINATION EX ON E.examination_id = EX.examination_id
    WHERE E.doctor_code = NEW.doctor_code
      AND EX.current_ex_date = (SELECT current_ex_date FROM HOSPITAL.EXAMINATION WHERE examination_id = NEW.examination_id);

    IF conflict_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Doctor is already scheduled for this time slot.';
    END IF;
END$$

DELIMITER ;


-- Automatically Assign Department Code for New Employees
DELIMITER $$

CREATE TRIGGER auto_assign_department
BEFORE INSERT ON HOSPITAL.EMPLOYEE
FOR EACH ROW
BEGIN
    SET NEW.dept_code = (
        SELECT dept_code
        FROM HOSPITAL.DEPARTMENT
        WHERE title = NEW.name_specialty
        LIMIT 1
    );
END$$

DELIMITER ;


-- Ensure Nurse and Doctor Codes Start Correctly
DELIMITER $$

CREATE TRIGGER validate_employee_code
BEFORE INSERT ON HOSPITAL.NURSE
FOR EACH ROW
BEGIN
    IF LEFT(NEW.nurse_code, 1) != 'N' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Nurse code must start with "N".';
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER validate_doctor_code
BEFORE INSERT ON HOSPITAL.DOCTOR
FOR EACH ROW
BEGIN
    IF LEFT(NEW.doctor_code, 1) != 'D' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Doctor code must start with "D".';
    END IF;
END$$

DELIMITER ;


-- Auto-Calculate Next Examination Date
DELIMITER $$

CREATE TRIGGER auto_set_next_exam_date
BEFORE INSERT ON HOSPITAL.EXAMINATION
FOR EACH ROW
BEGIN
    IF NEW.diagnosis = 'Flu' THEN
        SET NEW.next_ex_date = DATE_ADD(NEW.current_ex_date, INTERVAL 6 MONTH);
    ELSEIF NEW.diagnosis = 'Diabetes' THEN
        SET NEW.next_ex_date = DATE_ADD(NEW.current_ex_date, INTERVAL 3 MONTH);
    ELSE
        SET NEW.next_ex_date = DATE_ADD(NEW.current_ex_date, INTERVAL 1 YEAR);
    END IF;
END$$

DELIMITER ;


-- Calculate Total Treatment Cost
DELIMITER $$

CREATE TRIGGER update_treatment_cost
AFTER INSERT ON HOSPITAL.TREATMENT_USES
FOR EACH ROW
BEGIN
    DECLARE medication_price DECIMAL(10,2);

    SELECT price INTO medication_price
    FROM HOSPITAL.MEDICATION
    WHERE m_code = NEW.m_code;

    UPDATE HOSPITAL.TREATMENT
    SET fee = fee + medication_price
    WHERE treatment_id = NEW.treatment_id;
END$$

DELIMITER ;


-- ############################################################################################################



-- Functions
-- ############################################################################################################

-- Create User Groups (Roles)
CREATE ROLE 'admin';
CREATE ROLE 'doctor';
CREATE ROLE 'nurse';
CREATE ROLE 'receptionist';

-- Create Users and Assign to Groups
CREATE USER 'admin_user'@'localhost' IDENTIFIED BY 'admin_password';
CREATE USER 'doctor_user'@'localhost' IDENTIFIED BY 'doctor_password';
CREATE USER 'nurse_user'@'localhost' IDENTIFIED BY 'nurse_password';
CREATE USER 'receptionist_user'@'localhost' IDENTIFIED BY 'receptionist_password';

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






