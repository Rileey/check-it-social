import mongoose from 'mongoose';
const {Schema, model} = mongoose

const postSchema = new Schema ({
    text:{
        type: String,
        max: 150
    },
    link: String,
    image: String,
    isDeleted: {
        type: Boolean, 
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    _creator: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
    },
    _comments: [{
        type: Schema.Types.ObjectId, 
        ref: "Comment"
    }],
    likes: []
},
{timestamps: true}
);


export const Post = model('Post', postSchema);