import Joi from 'joi';
import { Types } from 'mongoose';

const customId = (value, helper) => {
    return Types.ObjectId.isValid(value) ? value : helper.message("Invalid Object ID");
};

const preferencesList = ['Media and Marketing', 'IT', 'PR', 'Logistics', 'HR', 'FR'];
const levelsList = ['Freshmen', 'Sophomore', 'Junior 1 or 2', 'Senior'];
const hoursList = ['Less than 4', '4-6', '6-10', 'More than 10'];

const fileValidationSchema = Joi.object({
    size: Joi.number().positive().required(),
    mimetype: Joi.string().required(),
    encoding: Joi.string().required(),
    originalname: Joi.string().required(),
    fieldname: Joi.string().required(),
    path: Joi.string().required(),      
    filename: Joi.string().required()  
});

export const registerSchema = {
    body: Joi.object({
        name: Joi.string().min(3).max(50).required(),
        whatsappNumber: Joi.string().max(16).required(),
        email: Joi.string().email().required(),
        university: Joi.string().min(3).max(50).required(),
        faculty: Joi.string().min(3).max(50).required(),
        department: Joi.string().min(2).max(50).required(),
        level: Joi.string().valid(...levelsList).required(),
        facultyId: Joi.string().required(),
        nationalId: Joi.string().length(14).required(),
        linkedInUrl: Joi.string().uri().required(),
        firstPreference: Joi.string().valid(...preferencesList).required(),
        secondPreference: Joi.string().valid(...preferencesList).required(),
        interestReason: Joi.string().max(500).required(),
        hoursPerWeek: Joi.string().valid(...hoursList).required(),
        willingToPayMembership: Joi.string().valid('Yes', 'No', 'Maybe').required()
    }).required(),
    
    file: fileValidationSchema.required().messages({
        "any.required": "CV file is required"
    })
};

export const updateRegistrationSchema = {
    body: Joi.object({
        name: Joi.string().min(3).max(50),
        whatsappNumber: Joi.string().max(16),
        email: Joi.string().email(),
        university: Joi.string().min(3).max(50),
        faculty: Joi.string().min(3).max(50),
        department: Joi.string().min(2).max(50),
        level: Joi.string().valid(...levelsList),
        facultyId: Joi.string(),
        nationalId: Joi.string().length(14),
        linkedInUrl: Joi.string().uri(),
        firstPreference: Joi.string().valid(...preferencesList),
        secondPreference: Joi.string().valid(...preferencesList),
        interestReason: Joi.string().max(500),
        hoursPerWeek: Joi.string().valid(...hoursList),
        willingToPayMembership: Joi.string().valid('Yes', 'No', 'Maybe')
    }), 

    params: Joi.object({
        id: Joi.string().custom(customId).required()
    }).required(),
    
    file: Joi.object({
        size: Joi.number().positive(),
        mimetype: Joi.string(),
        encoding: Joi.string(),
        originalname: Joi.string(),
        fieldname: Joi.string(),
        path: Joi.string(),
        filename: Joi.string()
    })
};

export const getRegistrationSchema = {
    params: Joi.object({
        id: Joi.string().custom(customId).required()
    }).required()
};