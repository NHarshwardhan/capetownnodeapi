const express = require('express');
const router = express.Router();
const db = require('../db');



// Get all requestor
// router.get('/requestor', async (req, res) => {
//   try {
//     const rows = await db.query('SELECT * FROM requestor');
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.get('/requestor', (req,res)=>{          
  db.query('SELECT * FROM requestor',(err,results)=>{
         
        if(err)  return res.status(500).send({error:'Internal Server Error'})
       
        res.status(200).send(results)
  })
})


// Get employee by ID
router.get('/requestor/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM requestor WHERE id = ?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new employee
router.post('/requestor', async (req, res) => {
  console.log(req.body)
  try {
    const { parentName, employeeStatus, salaryRange, pAddress, phone, childName, dob, socialStatus, clothSize, shoeSize } = req.body;
    const result = await db.query('INSERT INTO requestor (parentName, employeeStatus, salaryRange, pAddress, phone, childName, dob, socialStatus, clothSize, shoeSize) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [parentName, employeeStatus, salaryRange, pAddress, phone, childName, dob, socialStatus, clothSize, shoeSize]);
    return res.status(201).json({ id: result.insertId, parentName, employeeStatus, salaryRange, pAddress, phone, childName, dob, socialStatus, clothSize, shoeSize });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Update an employee
router.put('/requestor/:id', async (req, res) => {
  try {
    const { parentName, employeeStatus, salaryRange, pAddress, phone, childName, dob, socialStatus, clothSize, shoeSize } = req.body;
    const [result] = await db.query('UPDATE requestor SET parentName = ?, employeeStatus = ?, salaryRange = ?, pAddress = ?, phone = ?, childName = ?, dob = ?, socialStatus = ?, clothSize = ?, shoeSize = ? WHERE id = ?', [parentName, employeeStatus, salaryRange, pAddress, phone, childName, dob, socialStatus, clothSize, shoeSize, req.params.id]);
    if (result.affectedRows > 0) {
      res.json({ id: req.params.id, parentName, employeeStatus, salaryRange, pAddress, phone, childName, dob, socialStatus, clothSize, shoeSize });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an employee
router.delete('/requestor/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM requestor WHERE id = ?', [req.params.id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Employee deleted' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
