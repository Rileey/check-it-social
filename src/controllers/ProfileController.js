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
}

export default ProfileController;