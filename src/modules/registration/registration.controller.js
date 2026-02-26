import { Router } from "express";
import * as RS from "./registration.service.js";
import * as RV from "./registration.validation.js";
import { validation } from "../../middleware/validation.js";
import { fileValidation, multerCloud } from "../../middleware/multer.js";

const registrationRouter = Router();

registrationRouter.post(
    "/register",
    multerCloud({ fileTypes: fileValidation.file }).single("cv"),
    validation(RV.registerSchema),
    RS.register
);

registrationRouter.get(
    "/:id",
    validation(RV.getRegistrationSchema),
    RS.getRegistration
);

registrationRouter.patch(
    "/:id",
    multerCloud({ fileTypes: fileValidation.file }).single("cv"),
    validation(RV.updateRegistrationSchema),
    RS.updateRegistration
);

export default registrationRouter;