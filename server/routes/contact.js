const express = require('express')
const router = express.Router()
const contact = require('../controllers/contact')


router.post('/add', contact.add)
router.get('/list', contact.list)
router.get('/listDistricts', contact.listDistricts)
router.get('/listCourts', contact.listCourts)
router.put('/update', contact.update)
router.delete('/delete', contact.deletee) 
router.post('/reference', contact.getreference) 

module.exports = router