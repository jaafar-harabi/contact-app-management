const express = require('express')
const router = express.Router()
const cors = require('cors')
const {add,del,getById,update}=require('../controllers/contact')
const {sign} = require('../middleware/auth')

router.post('/',add)
router.get('/:id',sign,getById)
router.delete('/:id',del)
router.put('/:id',update)
module.exports=router