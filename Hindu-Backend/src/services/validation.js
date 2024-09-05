// const { body, validationResult } = require('express-validator');

// const validateSignUp = async (req, res, next) => {
//     await body('firstName').isString().notEmpty().withMessage('First name is required').run(req);
//     await body('lastName').isString().notEmpty().withMessage('Last name is required').run(req);
//     await body('email').isEmail().withMessage('Invalid email').run(req);
//     await body('compPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req);

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     next();
// };

// const validateCompListing = async (req, res, next) => {
//     await body('firstName').isString().notEmpty().withMessage('First name is required').run(req);
//     await body('lastName').isString().notEmpty().withMessage('Last name is required').run(req);
//     await body('email').isEmail().withMessage('Invalid email').run(req);
//     await body('compPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req);
//     await body('compName').isString().notEmpty().withMessage('Company name is required').run(req);
//     await body('contactNo').isNumeric().withMessage('Contact number must be numeric').run(req);
//     await body('category').isString().notEmpty().withMessage('Category is required').run(req);
//     await body('address').isString().notEmpty().withMessage('Address is required').run(req);
//     await body('state').isString().notEmpty().withMessage('State is required').run(req);
//     await body('pincode').isString().notEmpty().withMessage('Pincode is required').run(req);
//     await body('country').isString().notEmpty().withMessage('Country is required').run(req);

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     next();
// };

const validateSignUp = (req, res, next) => {
    const { firstName, lastName, email, compPassword } = req.body;
    const errors = [];

    if (!firstName || typeof firstName !== 'string') {
        errors.push({ msg: 'First name is required', path: 'firstName' });
    }
    if (!lastName || typeof lastName !== 'string') {
        errors.push({ msg: 'Last name is required', path: 'lastName' });
    }
    if (!email || !/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        errors.push({ msg: 'Invalid email', path: 'email' });
    }
    if (!compPassword || compPassword.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters', path: 'compPassword' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

const validateCompListing = (req, res, next) => {
    const {
        firstName, lastName, email, compPassword, compName, contactNo,
        category, address, state, pincode, country
    } = req.body;
    const errors = [];

    // Add validation for all fields here
    if (!firstName || typeof firstName !== 'string') {
        errors.push({ msg: 'First name is required', path: 'firstName' });
    }
    // Add more checks for the other fields...

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};


module.exports = { validateCompListing, validateSignUp };
