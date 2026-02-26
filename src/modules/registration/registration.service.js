import RegistrationModel from '../../DB/models/registration.model.js';
import cloudinary from '../../utils/cloudinaryConfig.js';

export const register = async (req, res) => {
    try {
        const applicantData = req.body;

        const existingRegistration = await RegistrationModel.findOne({
            $or: [{ email: applicantData.email }, { nationalId: applicantData.nationalId }]
        });

        if (existingRegistration) {
            return res.status(409).json({ message: "Student with this Email or National ID already exists!" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "CV PDF file is required!" });
        }

        applicantData.cvLink = {
            secure_url: req.file.path,
            public_id: req.file.filename
        };

        const result = await RegistrationModel.create(applicantData);
        
        return res.status(201).json({ 
            message: "Registered successfully!", 
            data: result 
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const registration = await RegistrationModel.findById(id);
        
        if (!registration) return res.status(404).json({ message: "Registration not found" });

        return res.status(200).json({ message: "Success", data: registration });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        const existingRegistration = await RegistrationModel.findById(id);
        
        if (!existingRegistration) return res.status(404).json({ message: "Registration not found" });

        if (req.file) {
            if (existingRegistration.cvLink?.public_id) {
                await cloudinary.uploader.destroy(existingRegistration.cvLink.public_id);
            }
            updateData.cvLink = {
                secure_url: req.file.path,
                public_id: req.file.filename
            };
        }

        const updatedRegistration = await RegistrationModel.findByIdAndUpdate(id, updateData, { new: true });
        return res.status(200).json({ message: "Updated successfully", data: updatedRegistration });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};