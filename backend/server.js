const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;
const USERS_FILE = './users.json';
app.use(cors());
app.use(bodyParser.json());
function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, '[]');
  return JSON.parse(fs.readFileSync(USERS_FILE));
}
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}
app.post('/signup', (req, res) => {
  const { username, password, email } = req.body;
  const users = loadUsers();

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  users.push({ username, password,email });
  saveUsers(users);
  res.status(200).json({ message: 'Signup successful' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  const user = users.find(u =>
    (u.username === username || u.email === username) &&
    u.password === password
  );

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  res.status(200).json({ message: `Welcome, ${user.username}` });
});
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
