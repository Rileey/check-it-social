import mongoose from 'mongoose';
const {Schema, model} = mongoose

const commentSchema = new Schema ({
    link: String,
    text: {
        type: String,
        required: true
    },
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
        ref: "user"
    }, 
    _post: {
        type: Schema.ObjectId, ref: "Post"
    }
},
{timestamps: true}
);

const autoPopulateCreator = function(next){
    this.populate({
        path: "_creator",
        select: "username createdAt -_id"
    });
    next();
};

commentSchema.pre("find", autoPopulateCreator);

export const Comment = model('Comment', commentSchema);