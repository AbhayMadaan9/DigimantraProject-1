const express = require('express')
const router = express.Router()
const contact = require('../controllers/contact')


router.post('/add', contact.add)
router.get('/list', contact.list)
router.get('/listDistricts', contact.listDistricts)
router.get('/listCourts', contact.listCourts)
router.put('/update', contact.update)
router.delete('/delete', contact.deletee) 
router.get('/references', contact.getreference) 
router.get('/listreferences', contact.listreferences) 
router.get('/refdetails', contact.getreferencebyname) 

module.exports = router