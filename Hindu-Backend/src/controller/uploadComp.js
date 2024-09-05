const fs = require('fs');
const csv = require('csv-parser');
const bcrypt = require('bcrypt');
<<<<<<< HEAD
const { sendNoticeEmail } = require('../services/sendMailNotification'); // Assume you have a configured transporter
const Company = require('../model/companyModel');
=======
const {sendNoticeEmail} = require('../services/sendMailNotification'); // Assume you have a configured transporter
const Company = require('../model/companyModel'); 
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825

exports.registerCompaniesFromCSV = async (req, res) => {
    const filePath = req.file.path; // Assuming file is uploaded using middleware like multer
    const companies = [];
<<<<<<< HEAD
    const failedEmails = []; // To track failed email sends

=======

    // Read CSV file and parse data
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', async (row) => {
            try {
<<<<<<< HEAD
                // Extract data with fallback to default values if fields are missing
                const {
                    firstName = "N/A", // Default value if firstName is missing
                    lastName = "N/A",
                    compName = "Unknown Company",
                    email,
                    contactNo = "",
                    category = "",
                    status = "Pending", // Default status if missing
                    address = "",
                    state = "",
                    pincode = "",
                    country = "Unknown",
                    websiteURl = "",
                    videoURL = ""
                } = row;

=======
                // Extract data from CSV columns
                const { firstName, lastName, compName, email, contactNo, category, status, address, state, pincode, country, websiteURl, videoURL } = row;

                console.log('req body',req.body);
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
                // Check if the company already exists
                const existingCompany = await Company.findOne({ email });
                if (existingCompany) {
                    console.log(`Company with email ${email} already exists.`);
                    return;
                }

<<<<<<< HEAD
                // Generate a password and hash it
=======
                // Generate a password
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
                const compPassword = Math.random().toString(36).slice(-8); // Generate a random 8-character password
                const hashedPassword = await bcrypt.hash(compPassword, 10);

                // Create the company in the database
                const newCompany = new Company({
                    firstName,
                    lastName,
                    compName,
                    email,
                    contactNo,
                    category,
                    status,
                    address,
                    state,
                    pincode,
                    country,
                    websiteURl,
                    videoURL,
                    compPassword: hashedPassword,
                    createdAt: new Date(),
                    modifyAt: new Date()
                });

                await newCompany.save();
                companies.push(newCompany);

                // Send registration email
                const emailTemplateData = {
                    subject: 'Registration Successful',
                    clientName: `${firstName} ${lastName}`,
                    clientEmail: email,
                    clientPassword: compPassword, // Send plain password in email
                };

                const templateFilePath = "../views/userInvitation.ejs"; // Assuming you have this EJS template
                const success = await sendNoticeEmail(email, emailTemplateData, templateFilePath);
                if (!success) {
<<<<<<< HEAD
                    failedEmails.push(email); // Track failed email attempts
                    console.error(`Failed to send email to ${email}`);
=======
                    throw new Error('Failed to send email');
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
                }
            } catch (err) {
                console.error(`Error processing company ${row.email}: `, err);
            }
        })
        .on('end', () => {
<<<<<<< HEAD
            res.status(200).json({
                message: 'CSV file processed successfully',
                companies,
                failedEmails // Include failed emails in the response
            });
=======
            res.status(200).json({ message: 'CSV file processed successfully', companies });
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
        })
        .on('error', (err) => {
            res.status(500).json({ message: 'Error reading CSV file', error: err });
        });
};
<<<<<<< HEAD
=======

>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
