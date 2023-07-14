const express = require('express')
const router = express.Router()
const contact = require('../controllers/contact')


router.post('/add', contact.add)
router.get('/list', contact.list)
router.put('/update', contact.update)
router.delete('/delete', contact.deletee) 

module.exports = router