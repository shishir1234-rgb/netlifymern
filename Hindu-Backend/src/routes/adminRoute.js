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
<<<<<<< HEAD

router.delete('/delete/company/:companyId',authenticateJWT, adminController.deleteCompany);  // delete comp
router.put('/update/company/:companyId', authenticateJWT, adminController.updateCompany);    //update comp
router.get('/new-signups',authenticateJWT,adminController.showLatestComp);              // show new comp
router.get('/allComp',companyController.getAll);                                         // get all comp data
router.put('/changeStatus/:companyId',authenticateJWT,companyController.updateCompStatus);  // update status
router.get('/companies',authenticateJWT,companyController.getByStatus);   // get comp by status 
router.get('/top-rated-companies-reviews', authenticateJWT, companyController.getTopRatedCompaniesReviews);
=======
// router.get('/companiesData', authenticateJWT, adminController.adminSignup);
router.delete('/delete/company/:companyId', adminController.deleteCompany);
router.post('/update/company', 
    // authenticateJWT, 
    adminController.updateCompany);
router.get('/new-signups',adminController.showLatestComp);
router.get('/allComp',companyController.getAll);   // get all comp data
router.put('/changeStatus/:companyId',companyController.updateCompStatus);  // update status
router.get('/companies',companyController.getByStatus);   // get comp by status 
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825


//  upload csv file 
router.post('/upload', authenticateJWT, upload.single('file'), uploadComp.registerCompaniesFromCSV);

router.post('/submit-msg',adminController.adminMsg);

router.post('/sendMail',adminController.sendMailMsg);

<<<<<<< HEAD
// router.post('');

=======
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
module.exports = router;
