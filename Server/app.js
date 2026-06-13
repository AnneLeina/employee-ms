const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

const leavesRoutes = require('./routes/leaves');
const employeeRoutes = require('./routes/employee');
const adminRoutes = require('./routes/admin');

app.use('/api/leaves', leavesRoutes);

app.use('/employee', employeeRoutes);
app.use('/auth', adminRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

