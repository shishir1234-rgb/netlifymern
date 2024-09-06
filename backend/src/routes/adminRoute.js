const express = require("express");
const router = new express.Router();
const adminController = require('../controller/adminController');  // Ensure the path is correct
const companyController = require('../controller/companyContoller');
const { authenticateJWT } = require('../services/jwtAuthenticate');
const uploadComp = require('../controller/uploadComp');
const {upload} = require('../utility/helper');

router.post('/adminsignUp', adminController.adminSignup);
router.post('/adminLogin', adminController.adminLogin);
router.post('/adminForgot', adminController.adminForgotPass);
router.post('/adminChangePass', adminController.adminChangePass);

router.delete('/delete/company/:companyId',authenticateJWT, adminController.deleteCompany);  // delete comp
router.put('/update/company/:companyId', authenticateJWT, adminController.updateCompany);    //update comp
router.get('/new-signups',authenticateJWT,adminController.showLatestComp);              // show new comp
router.get('/allComp',companyController.getAll);                                         // get all comp data
router.put('/changeStatus/:companyId',authenticateJWT,companyController.updateCompStatus);  // update status
router.get('/companies',authenticateJWT,companyController.getByStatus);   // get comp by status 
router.get('/top-rated-companies-reviews', authenticateJWT, companyController.getTopRatedCompaniesReviews);


//  upload csv file 
router.post('/upload', authenticateJWT, upload.single('file'), uploadComp.registerCompaniesFromCSV);

router.post('/submit-msg',adminController.adminMsg);

router.post('/sendMail',adminController.sendMailMsg);

// router.post('');

module.exports = router;
