import mongoose from 'mongoose';
const {Schema, model} = mongoose

const commentSchema = new Schema ({
    text: {
        type: String,
        required: true
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
        ref: "Profile"
    }, 
    _post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }
},
{timestamps: true}
);


export const Comment = model('Comment', commentSchema);