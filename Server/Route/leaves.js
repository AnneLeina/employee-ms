const express = require('express');
const router = express.Router();
const con = require('../utils/db'); 

router.post('/apply', (req, res) => {
  const { employee_id, leave_type, start_date, end_date, reason } = req.body;

  if (!employee_id || !leave_type || !start_date || !end_date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = `
    INSERT INTO leaves (employee_id, leave_type, start_date, end_date, reason, status)
    VALUES (?, ?, ?, ?, ?, 'pending')
  `;

  con.query(query, [employee_id, leave_type, start_date, end_date, reason], (err, result) => {
    if (err) {
      console.error('Error applying for leave:', err);
      return res.status(500).json({ message: 'Error applying for leave', error: err });
    }
    res.status(201).json({ message: 'Leave applied successfully', leaveId: result.insertId });
  });
});

router.get('/employee/:employee_id', (req, res) => {
  const { employee_id } = req.params;

  const query = `
    SELECT * FROM leaves
    WHERE employee_id = ?
    ORDER BY created_at DESC
  `;

  con.query(query, [employee_id], (err, results) => {
    if (err) {
      console.error('Error fetching leaves:', err);
      return res.status(500).json({ message: 'Error fetching leaves', error: err });
    }
    res.json(results);
  });
});

router.get('/pending', (req, res) => {
  const query = `
    SELECT 
      l.*,
      e.name as employee_name,
      e.email as employee_email,
      e.image as employee_image
    FROM leaves l
    JOIN employees e ON l.employee_id = e.id
    WHERE l.status = 'pending'
    ORDER BY l.created_at ASC
  `;

  con.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching pending leaves:', err);
      return res.status(500).json({ message: 'Error fetching pending leaves', error: err });
    }
    res.json(results);
  });
});

router.get('/all', (req, res) => {
  const query = `
    SELECT 
      l.*,
      e.name as employee_name,
      e.email as employee_email,
      e.image as employee_image
    FROM leaves l
    JOIN employees e ON l.employee_id = e.id
    ORDER BY l.created_at DESC
  `;

  con.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching all leaves:', err);
      return res.status(500).json({ message: 'Error fetching all leaves', error: err });
    }
    res.json(results);
  });
});

router.put('/approve/:leave_id', (req, res) => {
  const { leave_id } = req.params;
  const { admin_comment } = req.body;

  const query = `
    UPDATE leaves
    SET status = 'approved', admin_comment = ?, updated_at = NOW()
    WHERE id = ?
  `;

  con.query(query, [admin_comment || null, leave_id], (err, result) => {
    if (err) {
      console.error('Error approving leave:', err);
      return res.status(500).json({ message: 'Error approving leave', error: err });
    }
    res.json({ message: 'Leave approved successfully' });
  });
});

router.put('/reject/:leave_id', (req, res) => {
  const { leave_id } = req.params;
  const { admin_comment } = req.body;

  if (!admin_comment) {
    return res.status(400).json({ message: 'Rejection reason is required' });
  }

  const query = `
    UPDATE leaves
    SET status = 'rejected', admin_comment = ?, updated_at = NOW()
    WHERE id = ?
  `;

  con.query(query, [admin_comment, leave_id], (err, result) => {
    if (err) {
      console.error('Error rejecting leave:', err);
      return res.status(500).json({ message: 'Error rejecting leave', error: err });
    }
    res.json({ message: 'Leave rejected successfully' });
  });
});

router.get('/stats/summary', (req, res) => {
  const query = `
    SELECT
      COUNT(*) as total_requests,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
      SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
      SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
    FROM leaves
  `;

  con.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching leave stats:', err);
      return res.status(500).json({ message: 'Error fetching leave stats', error: err });
    }
    res.json(results[0]);
  });
});

module.exports = router;