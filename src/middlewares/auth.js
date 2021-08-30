import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  if (req) {
    const authorization = req.header('Authorization');
    if (!authorization) {
      return res
        .status(401)
        .json({ status: 'failed', msg: 'No authorization is set' })
        .end();
    }
    const token = authorization.replace('Bearer ', '');
    try {
        const data = jwt.verify(token, process.env.SECRET);
        
      if (data && data._id) {
        req.user = data;
        
        next();
      } else {
        return res
          .status(401)
          .json({ status: 'failed', msg: 'Token is incorrect' })
          .end();
      }
    } catch (e) {
        console.log(e.message, "find the token error")
      return res
        .status(401)
        .json({ status: 'failed', msg: 'Token has expired' })
        .end();
    }
  }
};

export default auth;
