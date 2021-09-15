import { Post } from '../models/PostModel.js';
import { User } from '../models/UserModel.js';
import { Community } from '../models/CommunityModel.js';

const CommunityController = {

    createCommunity: (req, res) => {
        const { 
            name, 
            profilePicture, 
            coverPicture, 
            description, 
            profileId,
        } = req.body;

        const community = new Community({
            name,
            profilePicture,
            coverPicture,
            description,
            _creator: profileId,
        });

        const newCommunity = community.save()

        newCommunity.then((nc) => {
            return res.status(200).json({
                message: "Success",
                data: nc
            });
        }).catch((err) => {
            return res.status(500).json({
                message: err
            });
        });
    },


    updateCommunity: async (req, res) => {
        const { communityId } = req.query;
        console.log(communityId)
        try {
            
            const communitybody = req.body
            console.log(communitybody)
            await Community.findOneAndUpdate({ _id: communityId}, 
                communitybody, {new: true},
                
                (err, result) => {
                    if (err){
                        res.status(404).send({
                            message: `there are no communities to update`
                        })
                        throw err;
                    }
                    res.status(200).send({
                        message: `community with id: ${communityId} has been updated`,
                    })
                })
                console.log(communityId)
                

        } catch (err) {
            res.status(400).send({
                message: `Invalid profile id`,
                msg: err.toString()
            })
        }
    },

    getCommunity: async (req, res) => {
        const { communityId } = req.query;
        const { name } = req.query;
        try {
            // const { id } = req.params;
            const community =  communityId 
            ? await Community.findById(communityId)
            : await Community.findOne({ name : name })
            .populate({
                path: "_creator",
                select: "username createdAt _id"
            })

            if (community !== null) {
                res.status(200).json({community}).status("success")
            } else {
                res
               .status(404)
               .send({ message: `there are no communities with this id` })
               .end();
            }
        } catch (err) {
          console.log(err)
          res.status(400).send({ message: `Invalid community id` });
        }
    },

    getCommunityTimeline: async(req, res) => {
        const { communityId } = req.params;
        try {
            //get a community by Id
            const user = await Community.findById(communityId);
            // Get posts by users that follow he community
            const communityPost = await Promise.all(
                user.followers.map((communityId) => {
                    return Post.find({_creator: communityId});
                })
            );
            res.status(200).json(communityPost)
        } catch (err) {
            res.status(500).json({
                message: err.toString
            })
        }

    },

    getFollowers : async (req, res) => {
        const { communityId } = req.params;
        try {
            const community = await Community.findById(communityId)
            const followers = await Promise.all(
                profile.followers.map(followerId => {
                    return User.findById(followerId)
                })
            )
            let followerList = [];
            followers.map(follower => {
                const { _id, name, profilePicture } = follower
                followerList.push({ _id, name, profilePicture })
            })
            res.status(200).json(followerList)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getAllCommunities: (req, res) => {
        Community.find({})
        // .populate({
        //     path: "_User",
        //     select: "username createdAt _id"
        // })
        .then((communities) => {
            return res.status(200).json({
                Success: true,
                data: communities
            }); 
        }).catch((err) => {
            return res.status(500).json({
                message: err.toString()
            });
        });
    },

    deleteCommunity: (req, res) => {
        try {
            
            const { communityId } = req.params
            const deleteCommunity = User.find({ _id: communityId})
            .deleteOne((err) => {
                if (err){
                    res.status(404).send({
                        message: `the community with this id doesn't exist`
                    })
                    throw err;
                } res.status(200).send({
                    message: `deleted community with the id: ${communityId}`
                })

            })

        } catch (err) {
            res.status(400).send({
                message: `Invalid community id`
            })
        }
    },


    followCommunity: async (req, res) => {
        const { id } = req.body;
        const { communityId } = req.params;
        if ( communityId !== id ){
            try {
                const user = await Community.findById(communityId)
                const currentUser = await User.findById(id)
                if (!user.followers.includes(id)){
                    await user.updateOne({ $push: {followers: id}})
                    await currentUser.updateOne({ $push: {following: communityId}})
                    res.status(200).json(`community has been followed`);
                } else {
                    res.status(404).json(`you already follow this community`)
                }
            } catch (err) {
                res.status(500).json(err.toString())
            }
        } else {
            res.status(404).json(`you can't follow yourself`);
        }
    },


    unfollowCommunity: async (req, res) => {
        const { id } = req.body;
        const { communityId } = req.params;
        if ( communityId !== id ){
            try {
                const user = await Community.findById(communityId)
                const currentUser = await User.findById(id)
                if (user.followers.includes(id)){
                    await user.updateOne({ $pull: {followers: id}})
                    await currentUser.updateOne({ $pull: {following: communityId}})
                    res.status(200).json(`community has been unfollowed`);
                } else {
                    res.status(404).json(`you do not follow this community`)
                }
            } catch (err) {
                res.status(500).json(err.toString())
            }
        } else {
            res.status(404).json(`you can't unfollow yourself`);
        }
    }

}

export default CommunityController;