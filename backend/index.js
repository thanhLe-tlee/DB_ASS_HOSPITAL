import express from "express";
import mysql from "mysql2";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 100;
const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lemonTREE333",
  database: "HOSPITAL",
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use(
  cors({
    origin: "*", // Allow only frontend from localhost:5501
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

pool.connect(function (err) {
  if (err) console.log("Failed");
  else console.log("Successful");
});
app.get("/getCustomerList", async (req, res) => {
  try {
    const [result] = await pool.promise().query("SELECT * FROM Customer");

    // Log dữ liệu dưới dạng JSON
    //console.log("Customer list:", JSON.stringify(result, null, 2));
    console.log("DEBUG Backend");
    // Trả dữ liệu về client
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching customer list:", err.message);

    // Trả lỗi nếu có
    return res.status(500).send("Error fetching customer list");
  }
});

app.get("/getDoctorRow", async (req, res) => {
  try {
    const [result] = await pool.promise().query("select * from HOSPITAL.EMPLOYEE a JOIN HOSPITAL.PHONE_NUMBER b where a.e_code = b.e_code;");

    console.log("DEBUG Backend");
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching customer list:", err.message);

    return res.status(500).send("Error fetching customer list");
  }
});
app.get("/getPatientRow", async (req, res) => {
  try {
    const [result] = await pool.promise().query("select * from HOSPITAL.PATIENT p join HOSPITAL.DOCTOR d where p.p_code = d.p_code;");

    console.log("DEBUG Backend");
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching customer list:", err.message);

    return res.status(500).send("Error fetching customer list");
  }
});
app.get("/getTreatmentRow", async (req, res) => {
  try {
    const [result] = await pool.promise().query("select * from HOSPITAL.TREATMENT;");

    console.log("DEBUG Backend");
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching customer list:", err.message);

    return res.status(500).send("Error fetching customer list");
  }
});
app.get("/getmedication-rows", async (req, res) => {
  try {
    const [result] = await pool.promise().query("select * from HOSPITAL.MEDICATION;");

    console.log("DEBUG Backend");
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching customer list:", err.message);

    return res.status(500).send("Error fetching customer list");
  }
});
app.get("/getdepartment-rows", async (req, res) => {
  try {
    const [result] = await pool.promise().query("select * from HOSPITAL.DEPARTMENT;");

    console.log("DEBUG Backend");
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching customer list:", err.message);

    return res.status(500).send("Error fetching customer list");
  }
});
//////////////////////////////////////////////////////////////
app.post("/AddNewPatient", async (req, res) => {
  try {
    const { 
      pCode,
      pFirstName,
      pLastName,
      pAddress,
      pGender,
      dischargeDate,
      pPhoneNumber,
      pDob,
      doctor_code} = req.body;
    const [result] = await pool
      .promise()
      .query("CALL AddNewPatient(?,?,?,?,?,?,?,?,?)", [
        pCode,
        pFirstName,
        pLastName,
        pAddress,
        pGender,
        dischargeDate,
        pPhoneNumber,
        pDob,
        doctor_code]);
    return res.send("Updating successfully");
  } catch (err) {
    return res.send("Server cannot send response");
  }
});
app.post("/DeletePatient", async (req, res) => {
  try {
    const {pCode} = req.body;
    const [result] = await pool
      .promise()
      .query("CALL DeletePatient(?)", [pCode]);
    return res.send("Updating successfully");
  } catch (err) {
    return res.send("Server cannot send response");
  }
});



///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////






app.get('/test-db', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT 1 + 1 AS solution');
    res.json({ solution: rows[0].solution });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection failed');
  }
});

// API endpoint to fetch patients
app.get('/api/patients', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM HOSPITAL.PATIENT');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch patients');
  }
});

// API endpoint to update patient information
app.put('/api/patients/:p_code', async (req, res) => {
  const { p_code } = req.params;
  const { p_first_name, p_last_name, p_address, p_gender, discharge_date, p_phone_number, p_dob } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE HOSPITAL.PATIENT SET p_first_name = ?, p_last_name = ?, p_address = ?, p_gender = ?, discharge_date = ?, p_phone_number = ?, p_dob = ? WHERE p_code = ?',
      [p_first_name, p_last_name, p_address, p_gender, discharge_date, p_phone_number, p_dob, p_code]
    );
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update patient');
  }
});

// API endpoint to delete patient information
app.delete('/api/patients/:p_code', async (req, res) => {
  const { p_code } = req.params;
  try {
    const [result] = await db.query('DELETE FROM HOSPITAL.PATIENT WHERE p_code = ?', [p_code]);
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete patient');
  }
});

// API endpoint to add new patient information
app.post('/api/patients', async (req, res) => {
  const { p_first_name, p_last_name, p_address, p_gender, discharge_date, p_phone_number, p_dob } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO HOSPITAL.PATIENT (p_first_name, p_last_name, p_address, p_gender, discharge_date, p_phone_number, p_dob) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [p_first_name, p_last_name, p_address, p_gender, discharge_date, p_phone_number, p_dob]
    );
    res.json({ success: true, patient: { p_code: result.insertId, ...req.body } });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add patient');
  }
});

// API endpoint to update doctor information
app.put('/api/doctors/:doctor_code', async (req, res) => {
  const { doctor_code } = req.params;
  const { p_code } = req.body;
  try {
    const [result] = await db.query('UPDATE HOSPITAL.DOCTOR SET p_code = ? WHERE doctor_code = ?', [p_code, doctor_code]);
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update doctor');
  }
});

// API endpoint to delete doctor information
app.delete('/api/doctors/:doctor_code', async (req, res) => {
  const { doctor_code } = req.params;
  try {
    const [result] = await db.query('DELETE FROM HOSPITAL.DOCTOR WHERE doctor_code = ?', [doctor_code]);
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete doctor');
  }
});

// API endpoint to add new doctor information
app.post('/api/doctors', async (req, res) => {
  const { p_code } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO HOSPITAL.DOCTOR (p_code) VALUES (?)',
      [p_code]
    );
    res.json({ success: true, doctor: { doctor_code: result.insertId, ...req.body } });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add doctor');
  }
});

// API endpoint to update nurse information
app.put('/api/nurses/:nurse_code', async (req, res) => {
  const { nurse_code } = req.params;
  const { e_code } = req.body;
  try {
    const [result] = await db.query('UPDATE HOSPITAL.NURSE SET e_code = ? WHERE nurse_code = ?', [e_code, nurse_code]);
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update nurse');
  }
});

// API endpoint to delete nurse information
app.delete('/api/nurses/:nurse_code', async (req, res) => {
  const { nurse_code } = req.params;
  try {
    const [result] = await db.query('DELETE FROM HOSPITAL.NURSE WHERE nurse_code = ?', [nurse_code]);
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete nurse');
  }
});

// API endpoint to add new nurse information
app.post('/api/nurses', async (req, res) => {
  const { e_code } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO HOSPITAL.NURSE (e_code) VALUES (?)',
      [e_code]
    );
    res.json({ success: true, nurse: { nurse_code: result.insertId, ...req.body } });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add nurse');
  }
});

// API endpoint to update treatment information
app.put('/api/treatments/:treatment_id', async (req, res) => {
  const { treatment_id } = req.params;
  const { result, start_date, end_date, doctor_code } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE HOSPITAL.TREATMENT SET result = ?, start_date = ?, end_date = ?, doctor_code = ? WHERE treatment_id = ?',
      [result, start_date, end_date, doctor_code, treatment_id]
    );
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update treatment');
  }
});

// API endpoint to delete treatment information
app.delete('/api/treatments/:treatment_id', async (req, res) => {
  const { treatment_id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM HOSPITAL.TREATMENT WHERE treatment_id = ?', [treatment_id]);
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete treatment');
  }
});

// API endpoint to add new treatment information
app.post('/api/treatments', async (req, res) => {
  const { result, start_date, end_date, doctor_code } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO HOSPITAL.TREATMENT (result, start_date, end_date, doctor_code) VALUES (?, ?, ?, ?)',
      [result, start_date, end_date, doctor_code]
    );
    res.json({ success: true, treatment: { treatment_id: result.insertId, ...req.body } });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add treatment');
  }
});

// API endpoint to update medication information
app.put('/api/medications/:m_code', async (req, res) => {
  const { m_code } = req.params;
  const { m_name, expiration_date, price, examination_id } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE HOSPITAL.MEDICATION SET m_name = ?, expiration_date = ?, price = ?, examination_id = ? WHERE m_code = ?',
      [m_name, expiration_date, price, examination_id, m_code]
    );
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update medication');
  }
});

// API endpoint to delete medication information
app.delete('/api/medications/:m_code', async (req, res) => {
  const { m_code } = req.params;
  try {
    const [result] = await db.query('DELETE FROM HOSPITAL.MEDICATION WHERE m_code = ?', [m_code]);
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete medication');
  }
});

// API endpoint to add new medication information
app.post('/api/medications', async (req, res) => {
  const { name, type, manufacturer, expiryDate } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO HOSPITAL.MEDICATION (name, type, manufacturer, expiryDate) VALUES (?, ?, ?, ?)',
      [name, type, manufacturer, expiryDate]
    );
    res.json({ success: true, medication: { m_code: result.insertId, ...req.body } });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add medication');
  }
});

// API endpoint to update department information
app.put('/api/departments/:dept_code', async (req, res) => {
  const { dept_code } = req.params;
  const { title, dean_code } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE HOSPITAL.DEPARTMENT SET title = ?, dean_code = ? WHERE dept_code = ?',
      [title, dean_code, dept_code]
    );
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update department');
  }
});

// API endpoint to delete department information
app.delete('/api/departments/:dept_code', async (req, res) => {
  const { dept_code } = req.params;
  try {
    const [result] = await db.query('DELETE FROM HOSPITAL.DEPARTMENT WHERE dept_code = ?', [dept_code]);
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete department');
  }
});

// API endpoint to add new department information
app.post('/api/departments', async (req, res) => {
  const { title, dean } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO HOSPITAL.DEPARTMENT (title, dean) VALUES (?, ?)',
      [title, dean]
    );
    res.json({ success: true, department: { dept_code: result.insertId, ...req.body } });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add department');
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/components')));

// Handle login request
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Replace this with your actual authentication logic
  if (username === 'admin' && password === 'password') {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/components/login/login.html'));
});

