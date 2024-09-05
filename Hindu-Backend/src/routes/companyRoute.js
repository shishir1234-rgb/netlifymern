const express = require("express");
const router = new express.Router();
const companyController = require('../controller/companyContoller');
const reviewController = require('../controller/reviewController');
<<<<<<< HEAD
const { authenticateJWT } = require('../services/jwtAuthenticate');
const upload = require('../services/cloudinaryMiddleware');
const msgController = require('../controller/msgController');
const { validateCompListing, validateSignUp } = require('../services/validation')

// Company registration and listing routes
router.post('/compRegister', companyController.compRegister);          
router.post('/compListing',
    upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'images', maxCount: 3 }]),
    validateCompListing,
    authenticateJWT,
    companyController.compListing);


// Authentication routes
router.post('/Login', companyController.compLogin);
router.post('/forgotPass', companyController.compForgotPass);
router.post('/passChange', companyController.changePass);    

// Company details routes
// router.get('/details', companyController.getdetails);       // to be used in Admin portal    
router.post('/details', companyController.getdetails);
router.get('/getComp/details', companyController.getOneCompany);     // to get one comp details      
router.get('/active/compDetails', companyController.getActiveComp);    //to use in landing page 

// Review routes
router.post('/user/review', reviewController.userReview);
router.get('/getcomp/review/:companyId', authenticateJWT, reviewController.getCompanyReviews);
router.get('/top-rated-companies-reviews', authenticateJWT, companyController.getTopRatedCompaniesReviews);

// Media upload/update routes

// upload images
router.post('/uploadImage/:id', authenticateJWT, upload.array('images', 3), companyController.uploadCompImage);
// upload video url
router.post('/upload/videoURL/:id', companyController.uploadCompUrl);
// update comp images
router.put('/updateMedia/:id', authenticateJWT, upload.array('images', 3), companyController.updateCompMedia); // New route for updating media
// delete image of a comp
router.delete('/deleteImage/:id', authenticateJWT, companyController.deleteCompImage); // New route for deleting images


router.post('/send/msg', msgController.addMsg);    // send msg to comp by user 
router.get('/notifications/:companyId',authenticateJWT, msgController.notifications);  // check comp messages
=======
const {authenticateJWT} =require('../services/jwtAuthenticate');
const upload = require('../services/cloudinaryMiddleware');
const msgController = require('../controller/msgController');
const {validateCompListing,validateSignUp} = require('../services/validation')


router.post('/compRegister',  companyController.compRegister);
router.post('/compListing', validateCompListing, companyController.compListing);
router.post('/Login', companyController.compLogin);
router.post('/forgotPass', companyController.compForgotPass);
router.post('/passChange', companyController.changePass);
router.post('/details', companyController.getdetails);
router.get('/getComp/details',companyController.getOneCompany);
router.post('/active/compDetails',companyController.getActiveComp);

//fetch card data
router.get('/cardData',companyController.getAll);

router.post('/user/review',reviewController.userReview);
// router.post('/user/review',reviewController.userReview);

router.get('/getcomp/review/:companyId',authenticateJWT,reviewController.getCompanyReviews);
router.get('/top-rated-companies-reviews', authenticateJWT,companyController.getTopRatedCompaniesReviews);

router.post('/uploadImage/:id', authenticateJWT ,upload.array('images',3),companyController.uploadCompImage);
router.post('/upload/videoURL/:id',companyController.uploadCompUrl);
router.put('/updateMedia/:id', authenticateJWT, upload.array('images', 3), companyController.updateCompMedia); // New route for updating media
router.delete('/deleteImage/:id', authenticateJWT, companyController.deleteCompImage); // New route for deleting images


router.post('/send/msg',msgController.addMsg);    // send msg to comp by user 
router.get('/notifications/:companyId',msgController.notifications);
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
// Route to delete video URL
router.delete('/deleteVideoURL/:id', authenticateJWT, companyController.deleteCompVideoURL);
// Route to update both images and video URL for a company
router.put('/company/:id/updateMedia', authenticateJWT, upload.array('images', 3), companyController.updateCompMedia);

// Route to update the video URL for a company
router.put('/company/:id/updateVideoURL', authenticateJWT, companyController.updateCompVideoURL);
<<<<<<< HEAD
router.post('/upload-logo/:companyId',authenticateJWT, upload.single('logo'), companyController.updateLogo);

// Google auth routes
router.post('/googleRegister', companyController.googleCompRegister);
router.post('/googleLogin', companyController.googleCompLogin);
=======


router.post('/googleRegister',companyController.googleCompRegister);
router.post('/googleLogin',companyController.googleCompLogin);
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825


module.exports = router; // Export the router directly
