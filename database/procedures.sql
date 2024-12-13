-- procedures
DELIMITER //

CREATE PROCEDURE AddNewPatient(
    IN pCode VARCHAR(12),
    IN pFirstName VARCHAR(15),
    IN pLastName VARCHAR(15),
    IN pAddress VARCHAR(30),
    IN pGender CHAR(1),
    IN dischargeDate DATE,
    IN pPhoneNumber VARCHAR(15),
    IN pDob DATE
)
BEGIN
    INSERT INTO HOSPITAL.PATIENT (p_code, p_first_name, p_last_name, p_address, p_gender, discharge_date, p_phone_number, p_dob)
    VALUES (pCode, pFirstName, pLastName, pAddress, pGender, dischargeDate, pPhoneNumber, pDob);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE UpdatePatient(
    IN pCode VARCHAR(12),
    IN pAddress VARCHAR(30),
    IN pPhoneNumber VARCHAR(15)
)
BEGIN
    UPDATE HOSPITAL.PATIENT
    SET p_address = pAddress, p_phone_number = pPhoneNumber
    WHERE p_code = pCode;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE GetDepartmentByDean(
    IN deanCode VARCHAR(10)
)
BEGIN
    SELECT dept_code, title
    FROM HOSPITAL.DEPARTMENT
    WHERE dean_code = deanCode;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE ListPatientsByGender(
    IN pGender CHAR(1)
)
BEGIN
    SELECT * 
    FROM HOSPITAL.PATIENT
    WHERE p_gender = pGender;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE DeletePatient(
    IN pCode VARCHAR(12)
)
BEGIN
    DELETE FROM HOSPITAL.PATIENT
    WHERE p_code = pCode;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE addNewDoctor(
    IN dCode VARCHAR(12),
    IN dFirstName VARCHAR(15),
    IN dLastName VARCHAR(15),
    IN dAddress VARCHAR(30),
    IN specialty VARCHAR(30),
    IN dGender CHAR(1),
    IN startDate DATE,
    IN dDob DATE,
    IN deptCode VARCHAR(10),
    IN deptTitle VARCHAR(30),
    IN deanCode VARCHAR(10),
    IN degreeYear DATE
)
BEGIN
    
    INSERT INTO HOSPITAL.EMPLOYEE (e_code, e_first_name, e_last_name, e_dob, e_address, name_specialty, degree_year, e_gender, start_date, dept_code)
    VALUES (dCode, dFirstName, dLastName,dDob, dAddress, specialty,degreeYear, dGender, startDate, deptCode);
    
    INSERT INTO HOSPITAL.DEPARTMENT(deptCode, title, deanCode)
    VALUES (deptCode, deptTitle, deanCode);
END //

DELIMITER ;
