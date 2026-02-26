import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    whatsappNumber: { 
        type: String, 
        required: true,
        trim: true,
        maxLength: 16
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true 
    },
    university: { 
        type: String, 
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    faculty: { 
        type: String, 
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    department: { 
        type: String, 
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    level: { 
        type: String, 
        required: true,
        enum: ['Freshmen', 'Sophomore', 'Junior 1 or 2', 'Senior']
    },
    facultyId: { 
        type: String, 
        required: true,
        unique: true,
        trim: true 
    },
    nationalId: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        minLength: 14,
        maxLength: 14 
    },
    cvLink: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true }
    },
    linkedInUrl: { 
        type: String, 
        required: true,
        trim: true 
    },
    firstPreference: { 
        type: String, 
        required: true,
        enum: ['Media and Marketing', 'IT', 'PR', 'Logistics', 'HR', 'FR']
    },
    secondPreference: { 
        type: String, 
        required: true,
        enum: ['Media and Marketing', 'IT', 'PR', 'Logistics', 'HR', 'FR']
    },
    interestReason: { 
        type: String, 
        required: true,
        trim: true,
        maxLength: 500 
    },
    hoursPerWeek: { 
        type: String, 
        required: true,
        enum: ['Less than 4', '4-6', '6-10', 'More than 10']
    },
    willingToPayMembership: { 
        type: String, 
        enum: ['Yes', 'No', 'Maybe'],
        required: true
    }
}, { timestamps: true });

const RegistrationModel = mongoose.model('Registration', registrationSchema);
export default RegistrationModel;