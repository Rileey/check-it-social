import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {User} from '../models/UserModel.js';
import validatePassword from '../utils/validatePassword.js';
import emailValidation from '../utils/validateEmail.js';
// import Checkout from "../models/checkoutModel.js"
// import Favorite from '../models/favoriteModel.js';
import {generateToken} from '../utils/generateToken.js';


dotenv.config()

const AuthController = {
    signup: async (req, res) => {
        const {name, email, password} = req.body 
        console.log(req.body)

        try {
            if(!name || !email || !password) {
                return res
                .status(400)
                .json({message: 'All fields must be provided'})
            }

            if(name.length < 5){
                return res.status(400).json({message: "Username must be 5 characters or more"})
            }    

            if(!emailValidation(email)) {
                return res.status(400).json({message: 'Enter a valid email address'})
            }

            if(password.length < 7) {
                return res.status(400).json({message: 'Password should not be less than 7 characters'})
            }

            const findUser = await User.findOne({email})

            if(findUser) {
                return res.status(400).json({message: 'User already exist. Please login'})
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt)

            if (hash) {
                const newUser = new User({ name, email, password: hash})
                const savedUser = await newUser.save();
                
                if (savedUser) {
                    
                    jwt.sign(
                        { id: savedUser._id },
                    `${process.env.SECRET}`, 
                    // remember the backticks
                        {expiresIn: 86000},
                        (err, token) => {
                            if (err) {
                                throw err
                            }
     
                            res.status(200).json(
                                { 
                                     status: 'success',
                                     data: {
                                         token: `Bearer ${token}`,
                                         id: savedUser._id,
                                         name: savedUser.name,
                                         email: savedUser.email,
                                         password: savedUser.password
                                     }, 
                                     message: 'Successful'
                                 })
                        }
                    )
                 
                }
            }



        } catch (err) {
            console.log(err)
            return res.status(500).json({message: 'server error'})
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body
        
        

        try {

            if(!email || !password) {
                return res
                .status(400)
                .json({message: 'All fields must be provided'})
            }
           
            const user = await User.findOne({ email })
          
            if(user) {
                if(bcrypt.compareSync(password, user.password)) {
                    return res.status(200).json(user)
                }
            }
           
            return res.status(401).json({message: 'Incorrect email or password'})
            
        } catch (err) {
            console.log(err.message)
            return res.status(500).json({message: 'server error'})
        }  
    },

    
   
}


export default AuthController