USE HOSPITAL;

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
