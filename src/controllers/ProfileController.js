import {User} from '../models/UserModel.js';

const ProfileController = {

//     createProfile: (req, res) => {
//         const { 
//             name, 
//             profilePicture, 
//             coverPicture, 
//             description, 
//             city,
//             relationship,
//             // userId,
//         } = req.body;

//         const profile = new User({
//             name,
//             profilePicture,
//             coverPicture,
//             description,
//             city,
//             relationship,
//             // _user: userId,
//         });

//         const newProfile = profile.save()

//         newProfile.then((np) => {
//             return res.status(200).json({
//                 message: "Success",
//                 data: np
//             });
//         }).catch((err) => {
//             return res.status(500).json({
//                 message: err
//             });
//         });
//     },


    updateProfile: async (req, res) => {
        const { profileId } = req.query;
        try {
            
            const profilebody = req.body

            await User.findOneAndUpdate({ _id: profileId}, 
                profilebody, {new: true},
                
                (err, result) => {
                    if (err){
                        res.status(404).send({
                            message: `there are no profiles to update`
                        })
                        throw err;
                    }
                    res.status(200).send({
                        message: `profile with id: ${profileId} has been updated`,
                    })
                })

        } catch (err) {
            res.status(400).send({
                message: `Invalid profile id`,
                msg: err.toString()
            })
        }
    },

    getProfile: async (req, res) => {
        const { profileId } = req.query;
        const { name } = req.query;
        try {
            // const { id } = req.params;
            const profile =  profileId 
            ? await User.findById(profileId)
            : await User.findOne({ name : name })
            .populate({
                path: "_user",
                select: "username createdAt _id"
            })

            if (profile !== null) {
                res.status(200).json({profile}).status("success")
            } else {
                res
               .status(404)
               .send({ message: `there are no profiles with this id` })
               .end();
            }
        } catch (err) {
          console.log(err)
          res.status(400).send({ message: `Invalid profile id` });
        }
    },

    getFriends : async (req, res) => {
        const { profileId } = req.params;
        try {
            const profile = await User.findById(profileId)
            const friends = await Promise.all(
                profile.following.map(followerId => {
                    return User.findById(followerId)
                })
            )
            let friendList = [];
            friends.map(friend => {
                const { _id, name, profilePicture } = friend
                friendList.push({ _id, name, profilePicture })
            })
            res.status(200).json(friendList)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getAll: (req, res) => {
        User.find({})
        // .populate({
        //     path: "_User",
        //     select: "username createdAt _id"
        // })
        .then((profiles) => {
            return res.status(200).json({
                Success: true,
                data: profiles
            }); 
        }).catch((err) => {
            return res.status(500).json({
                message: err.toString()
            });
        });
    },

    deleteProfile: (req, res) => {
        try {
            
            const { profileId } = req.params
            const deleteProfile = User.find({ _id: profileId})
            .deleteOne((err) => {
                if (err){
                    res.status(404).send({
                        message: `the profile with this id doesn't exist`
                    })
                    throw err;
                } res.status(200).send({
                    message: `deleted post with the id: ${profileId}`
                })

            })

        } catch (err) {
            res.status(400).send({
                message: `Invalid post id`
            })
        }
    },


    followProfile: async (req, res) => {
        const { id } = req.body;
        const { profileId } = req.params;
        if ( profileId !== id ){
            try {
                const user = await User.findById(profileId)
                const currentUser = await User.findById(id)
                if (!user.followers.includes(id)){
                    await user.updateOne({ $push: {followers: id}})
                    await currentUser.updateOne({ $push: {following: profileId}})
                    res.status(200).json(`user has been followed`);
                } else {
                    res.status(404).json(`you already follow this user`)
                }
            } catch (err) {
                res.status(500).json(err.toString())
            }
        } else {
            res.status(404).json(`you can't follow yourself`);
        }
    },


    unfollowProfile: async (req, res) => {
        const { id } = req.body;
        const { profileId } = req.params;
        if ( profileId !== id ){
            try {
                const user = await User.findById(profileId)
                const currentUser = await User.findById(id)
                if (user.followers.includes(id)){
                    await user.updateOne({ $pull: {followers: id}})
                    await currentUser.updateOne({ $pull: {following: profileId}})
                    res.status(200).json(`user has been unfollowed`);
                } else {
                    res.status(404).json(`you do not follow this user`)
                }
            } catch (err) {
                res.status(500).json(err.toString())
            }
        } else {
            res.status(404).json(`you can't unfollow yourself`);
        }
    }

}

export default ProfileController;