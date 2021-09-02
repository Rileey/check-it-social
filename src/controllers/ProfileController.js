import {Profile} from '../models/ProfileModel.js';

const ProfileController = {

    createProfile: (req, res) => {
        const { 
            name, 
            profilePicture, 
            coverPicture, 
            description, 
            city,
            relationship,
            userId,
        } = req.body;

        const profile = new Profile({
            name,
            profilePicture,
            coverPicture,
            description,
            city,
            relationship,
            _user: userId,
        });

        const newProfile = profile.save()

        newProfile.then((np) => {
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


    updateProfile: async (req, res) => {
        
        try {
            const { profileId } = req.params
            const profilebody = req.body

            await Profile.findOneAndUpdate({ _id: profileId}, 
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
        try {
            const { profileId } = req.params;
            const getOneUser =  await Profile.findById({ _id: profileId})
            .populate({
                path: "_user",
                select: "username createdAt _id"
            })

            if (getOneUser !== null) {
                res.status(200).json({getOneUser}).status("success")
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


    getAll: (req, res) => {
        Profile.find({})
        .populate({
            path: "_user",
            select: "username createdAt _id"
        })
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
            const deleteProfile = Profile.find({ _id: profileId})
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
                const user = await Profile.findById(profileId)
                const currentUser = await Profile.findById(id)
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
                const user = await Profile.findById(profileId)
                const currentUser = await Profile.findById(id)
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