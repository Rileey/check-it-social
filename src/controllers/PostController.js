import { Post } from "../models/PostModel.js"
import { User } from "../models/UserModel.js";


const PostController = {
    makePost: async (req, res) => {
        const {
            text,
            link,
            image,
            profileId,
        } = req.body;

        const post = new Post({
            text,
            link,
            image,
            _creator: profileId,
        });

        try{
            const newPost = await post.save();
            res.status(200).json({
                message: "Success",
                data: newPost
            });
        } catch (err) {
            res.status(500).json(err.toString())
        }

    },


    getTimeline: async(req, res) => {
        const { profileId } = req.params;
        try {
            //get a user by Id
            const user = await User.findById(profileId);
            // Get posts by user
            const posts = await Post.find({ _creator: user._id });
            // Get posts by users you follow
            const communityPost = await Promise.all(
                user.following.map((communityId) => {
                    return Post.find({_creator: communityId});
                })
            );
            res.status(200).json(posts.concat(...communityPost))
        } catch (err) {
            res.status(500).json({
                message: err.toString
            })
        }

    },

    getAll: (req, res) => {
        Post.find({})
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


    getUsersPost: async (req, res) => {
        const { name } = req.params
        try{
            const profile = await User.findOne({name : name})
            const posts = await Post.find({ _creator: profile._id }) 
            res.status(200).json(posts)
        } catch (err) {
            res.status(500).json(err);
        }
    },


    getPost: async (req, res) => {
        try{
        const { postId } = req.params;
        const getOnePost = await Post.findById({ _id: postId})

        
        if (getOnePost !== null) {
            res.status(200).json({getOnePost }).status('success');
          } else {
             res
               .status(404)
               .send({ message: `there are no posts with this id` })
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

    likePost: async (req, res) => {
        const { postId } = req.params;
        const { profileId } = req.body;

        try {
            const post = await Post.findById(postId);
            if (!post.likes.includes(profileId)) {
                await post.updateOne({ $push: {likes: profileId}})
                res.status(200).json({
                    Message: `The post has been liked`,
                    data: post
                });
            } else {
                await post.updateOne({ $pull: {likes: profileId}})
                res.status(200).json(`The post has been disliked`);
            }
        } catch (err) {
            res.status(500).json(err)
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