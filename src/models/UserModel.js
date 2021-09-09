import mongoose from 'mongoose';
import validator from 'validator';


const {Schema, model} = mongoose
const { isEmail } = validator 

const userSchema = new Schema (
    {
        name: {
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
        profilePicture: {       
            type: String,
        },
        coverPicture: {     
            type: String,
            default: ""
        },
        description: {
            type: String,
            max: 50
        },
        followers: Array,
        following: Array,
        isAdmin: {
            type: Boolean,
            default: false
        },
        city: {
            type: String
        },
        relationship: {
            type: Number,
            enum: [1, 2, 3],
        }
    },
    {timestamps: true}
    
)

export const User = model('User', userSchema);