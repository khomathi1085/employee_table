import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const urlDB = `mysql://${process.env.MYSQLUSER }:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`
const db = mysql.createConnection(urlDB);

db.connect((err) => {
  if (err) {
      console.error("Database connection failed:", err);
      process.exit(1);
  }
  console.log("Connected to database");
});
app.post("/add-employee", (req, res) => {
  const { name, employeeId, email, phone, department, dateOfJoining, role } = req.body;

  const checkQuery = "SELECT * FROM employees WHERE employeeId = ? OR email = ?";
  db.query(checkQuery, [employeeId, email], (err, result) => {
      if (err) {
          console.error("Error during query execution:", err);
          return res.status(500).send("Database error");
      }
      if (result.length > 0) {
          return res.status(400).send("Employee ID or Email already exists");
      }

      const insertQuery = "INSERT INTO employees SET ?";
      const values = { name, employeeId, email, phone, department, dateOfJoining, role };
      db.query(insertQuery, values, (err) => {
          if (err) {
              console.error("Error during insertion:", err);
              return res.status(500).send("Database error");
          }
          res.status(201).send("Employee added successfully");
      });
  });
});
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
