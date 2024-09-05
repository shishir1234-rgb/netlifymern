const express = require("express");
const publicRouter = new express.Router();
const privateRouter = new express.Router();
const companyRoutes = require('./companyRoute');
const adminRoutes = require('./adminRoute');
// const {authenticateJWT} =require('../services/jwtAuthenticate')

// Public routes
<<<<<<< HEAD
publicRouter.use('/company', companyRoutes); // Use companyRoutes directly for public routes
=======
publicRouter.use('/company', companyRoutes); 
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
publicRouter.use('/admin',adminRoutes);

// Private routes (require authentication)
privateRouter.use('/admin', adminRoutes);
privateRouter.use('/company', companyRoutes);

module.exports = {
  publicRoutes: publicRouter,
  privateRoutes: privateRouter,
};
