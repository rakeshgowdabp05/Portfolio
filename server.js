import express from "express";
import mysql from "mysql2";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rakesh@2005",
  database: "portfolio_db"
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("Database Connected");
});

// HOME ROUTE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "portfolio.html"));
});

// API ROUTE
app.get("/data", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) res.send(err);
    else res.json(result);
  });
});

app.use(express.static(__dirname)); // MOVED TO BOTTOM

// SERVER START
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
  console.log("🌐 http://localhost:3000/data");
});