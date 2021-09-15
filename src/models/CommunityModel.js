import mongoose from 'mongoose';


const {Schema, model} = mongoose

const communitySchema = new Schema (
    {
        _creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        name: {
            type: String
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
        createdAt: {
            type: Date,
            default: Date.now
        },
        likes: [],
        _post: {
            type: Schema.Types.ObjectId, 
            ref: 'Post',
        },  
        followers: Array,
    },
    {timestamps: true}
)

export const Community = model('Community', communitySchema);