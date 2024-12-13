-- Functions

DELIMITER //

CREATE FUNCTION CountNurses()
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE nurse_count INT;
    SELECT COUNT(*) INTO nurse_count FROM HOSPITAL.NURSE;
    RETURN nurse_count;
END //

CREATE FUNCTION CountDoctors()
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE doctor_count INT;
    SELECT COUNT(*) INTO doctor_count FROM HOSPITAL.DOCTOR;
    RETURN doctor_count;
END //

CREATE FUNCTION CountPatients()
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE patient_count INT;
    SELECT COUNT(*) INTO patient_count FROM HOSPITAL.PATIENT;
    RETURN patient_count;
END //

CREATE FUNCTION CountDepartments()
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE department_count INT;
    SELECT COUNT(*) INTO department_count FROM HOSPITAL.DEPARTMENT;
    RETURN department_count;
END //

CREATE FUNCTION CountMedicines()
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE medicine_count INT;
    SELECT COUNT(*) INTO medicine_count FROM HOSPITAL.MEDICATION;
    RETURN medicine_count;
END //

DELIMITER ;