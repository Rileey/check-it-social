import { Comment } from "../models/CommentModel.js";
import { Post } from "../models/PostModel.js";

const CommentController = {
    post: (req, res) => {
        const { 
            text, 
            userId, 
            postId 
        } = req.body;


        const comment = new Comment({
            text,
            _creator: userId,
            _post: postId,
        });

        const newComment = comment.save();
        newComment.then((nc) => {
            Post.findByIdAndUpdate(
                postId,
                { $push: {"_comments": nc._id} }
                ).then((existingPost) => {
                    res.status(200).json({
                        success: true,
                        data: nc,
                        existingPost,
                    });
                }).catch((err) => {
                    res.status(500).json({
                        message: err.toSring(),
                    });
                });
            res.status(200).json({
                success: true,
                data: savedUser,
            });
        }).catch((err) => {
            res.status(500).json({
                message: err.toSring(),
            });
        });
    }

    
}

export default CommentController;