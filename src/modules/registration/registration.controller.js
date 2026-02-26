const { Router } = require("express");
const RS = require("./registration.service");
const RV = require("./registration.validation");
const validation = require("../../middleware/validation");
const { fileValidation, multerCloud } = require("../../middleware/multer");

const registrationRouter = Router();

// POST: Register new applicant
registrationRouter.post(
    "/register",
    multerCloud({ fileTypes: fileValidation.file }).single("cv"),
    validation(RV.registerSchema),
    RS.register
);

// GET: Fetch one applicant by ID
registrationRouter.get(
    "/:id",
    validation(RV.getRegistrationSchema),
    RS.getRegistration
);

// PATCH: Update an applicant by ID
registrationRouter.patch(
    "/:id",
    multerCloud({ fileTypes: fileValidation.file }).single("cv"),
    validation(RV.updateRegistrationSchema),
    RS.updateRegistration
);

module.exports = registrationRouter;