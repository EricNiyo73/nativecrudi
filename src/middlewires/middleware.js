// import jwt from 'jsonwebtoken';
// import  User from "../models/User.js";
// import Post from "../models/Post.js"; 
//   export default  async function  Authorization(req, res, next) {
//     try{
//     const blog = req.blog;
//     const post =await Post.findOne({username});
//     const token = req.headers.authorization;
//       if(token){
//      var decodedToken = jwt.verify(token, process.env.JWT_SECRET);;
//       const  user  =  await User.findById(decodedToken._id);
//       const post =await Post.findOne({username});
      
//     if (post.username !== user.username) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }else{
//         next();
//     }
//     }
// else{
//     return res.status(403).json({ message: 'you are not authorised' });
// }}
//     catch(error) {
//        return  res.status(401).json({ error: new Error('Invalid request!') });
//         }};
    