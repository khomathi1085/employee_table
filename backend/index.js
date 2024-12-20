import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const corsOptions = {
    origin: "https://employee-table-task.netlify.app/", // Replace with your frontend's URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  };
  
app.use(cors(corsOptions));  
app.use(bodyParser.json());

// Ensure there are no spaces after the variable names
const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

