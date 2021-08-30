import mongoose from 'mongoose';
import validator from 'validator';


const {Schema, model} = mongoose
const { isEmail } = validator 

const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            validate: [isEmail, 'Enter a valid email']
        },
        password: {
            type: String,
            required: true
        },
        createdAt: { 
            type: Date, 
            default: Date.now
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
    
)

export const User = model('user', userSchema);