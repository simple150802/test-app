const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.json());

// Cấu hình kết nối MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Kết nối với database
db.connect((err) => {
  if (err) {
    console.error('Không thể kết nối đến database:', err);
    return;
  }
  console.log('Đã kết nối đến database.');
});

// Endpoint để thêm dữ liệu vào database
app.post('/add', (req, res) => {
  const { name, age } = req.body;
  const query = 'INSERT INTO users (name, age) VALUES (?, ?)';
  
  db.query(query, [name, age], (err, result) => {
    if (err) {
      res.status(500).send('Lỗi khi thêm dữ liệu vào database.');
    } else {
      res.status(200).send('Dữ liệu đã được thêm vào.');
    }
  });
});

app.listen(port, () => {
  console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
});
