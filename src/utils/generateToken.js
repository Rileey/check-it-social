import jwt from 'jsonwebtoken';


export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
    },
    process.env.SECRET,
    {
        expiresIn: 3600
    }
    )
}

