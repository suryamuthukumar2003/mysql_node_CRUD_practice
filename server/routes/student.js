const router=require('express').Router();
const studentController=require('../controller/studentController');

router.get("/",studentController.view);
router.get("/adduser",studentController.adduser);
router.post("/adduser",studentController.save);
router.get('/edituser/:id',studentController.edituser);
router.post('/edituser/:id',studentController.edit);

router.get('/deleteuser/:id',studentController.deleteuser);
module.exports=router;