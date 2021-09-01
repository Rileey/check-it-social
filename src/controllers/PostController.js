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
            select: "username createdAt _id"
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
    },


    getPost: async (req, res) => {
        try{
        const { postId } = req.params;
        const getOnePost = await Post.findById({ _id: postId})
        .populate({
            path: "_creator",
            select: "username createdAt _id"
        })

        if (getOnePost !== null) {
            res.status(200).json({getOnePost }).status('success');
          } else {
             res
               .status(404)
               .send({ message: `there are no posts with this id` })
               .end();
        }
        } catch (err) {
          console.log(err)
          res.status(400).send({ message: `Invalid post id` });
        }

    },


    updatePostText: async(req, res) => {

        try {
            
        const { postId } = req.params
        const text =  req.body
        await Post.findOneAndUpdate({ _id: postId }, text, {new: true},
            (err, result) => {
                if (err){
                    res.status(404).send({
                        message: `there are no posts to update`
                    })
                    throw err;
                }
                res.status(200).send({
                    message: `post with id: ${postId} has been updated`,
                })
            })
        } catch (err) {
            res.status(400).send({
                message: `Invalid post  id`
            })
        }
    },


    updatePostLink: async(req, res) => {

        try {
            
        const { postId } = req.params
        const link =  req.body
        await Post.findOneAndUpdate({ _id: postId }, link, {new: true},
            (err, result) => {
                if (err){
                    res.status(404).send({
                        message: `there are no posts to update`
                    })
                    throw err;
                }
                res.status(200).send({
                    message: `post with id: ${postId} has been updated`,
                })
            })
        } catch (err) {
            res.status(400).send({
                message: `Invalid post  id`
            })
        }
    },

    deletePost: (req, res) => {
        try {

            const { postId } = req.params
            const deletePost = Post.find({ _id: postId})
            .deleteOne((err) => {
                if (err){
                    res.status(404).send({
                        message: `the post with this id doesn't exist`
                    })
                    throw err;
                } res.status(200).send({
                    message: `deleted post with the id: ${postId}`
                })
                
            })

        } catch (err) {
            res.status(400).send({
                message: `Invalid post  id`
            })
        }
    }

};

export default PostController