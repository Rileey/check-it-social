import mongoose from 'mongoose';


const {Schema, model} = mongoose

const profileSchema = new Schema (
    {
        _user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        name: {
            type: String
        },
        profilePicture: {       
            type: String,
            default: ""
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

export const Profile = model('Profile', profileSchema);