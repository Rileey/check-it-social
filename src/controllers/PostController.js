import {Post} from "../models/PostModel.js"
import mongoose from "mongoose";


const PostController = {
    makePost: (req, res) => {
        const {
            title,
            text,
            link,
            userId,
        } = req.body;

        const post = new Post({
            title,
            text,
            link,
            _creator: userId,
        });

        const newPost = post.save();

        newPost.then((np) => {
            return res.status(200).json({
                message: "Success",
                data: np
            });
        }).catch((err) => {
            return res.status(500).json({
                message: err
            });
        });

    },


    getAll: (req, res) => {
        Post.find({})
        .populate({
            path: "_creator",
            select: "username createdAt -_id"
        })
        .populate({
            path: "_comments",
            select: "text createdAt _creator",
            match: { "isDeleted": false}
        })
        .then((posts) => {
            return res.status(200).json({
                Success: true,
                data: posts
            }); 
        }).catch((err) => {
            return res.status(500).json({
                message: err.toString()
            });
        });
    }
};

export default PostController