import mongoose from 'mongoose';
const {Schema, model} = mongoose

const postSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    link: String,
    text: String,
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
        ref: 'user',
    }, 
    _comments: [{
        type: Schema.ObjectId, 
        ref: "Comment"
    }],
},
{timestamps: true}
);


export const Post = model('Post', postSchema);