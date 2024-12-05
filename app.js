// app.js
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Cấu hình kết nối với database
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Địa chỉ IP của database server
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Không thể kết nối đến database:', err);
    return;
  }
  console.log('Đã kết nối đến database.');
});

app.get('/', (req, res) => {
  res.send('Ứng dụng đang chạy và kết nối với database!');
});

app.listen(port, () => {
  console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
});
