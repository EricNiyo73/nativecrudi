// import router from "express".Router();
import  Router  from 'express';
const router = Router();
import bodyParser from 'body-parser';
import Post from "../models/Post.js";
import multer from "multer";
import path from "path";
import express from "express";
const app = express();
router.use("/images", express.static(path.join(process.cwd(), "/images")));
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());
//CREATE POST
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, "eric.jpg");
//   },
// });
// const upload = multer({ storage: storage });

// =============================
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name:"dmdogre0f",
  api_key:"295662518861996",
  api_secret:"H35LhOiKccJExJLZJIJoI_o-25E"
});
export var upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    try {
      let ext = path.extname(file.originalname);
      if (ext !== ".JPG" && ext !== ".JPEG" && ext !== ".PNG" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
        return cb(new Error("File type is not supported"), false);
      }
      cb(null, true);
    } catch (error) {
      return cb(error, false);
    }
  },
});

export const create = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    // console.log(req.body,req.file);
        const newPost = new Post({
            photo: result.secure_url,
            title: req.body.title,
            desc:req.body.desc
          })
  
          const savePost = await  newPost.save();
  
         return res.status(200).json({
            savePost,
          status: "your post was successfully uploaded"})   ;
  
      } catch (error) {
        return  res.status(500).json(error)
          
      }
  }

//UPDATE POST
export const updatep = async (req, res) => {
  try {
    const postId = req.params.id;
    const result = await cloudinary.uploader.upload(req.file.path);
    
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: postId },
      {
        photo: result.secure_url,
        title: req.body.title,
        desc:req.body.desc,
      },
      { new: true }
    );
  
    return res.status(200).json({
      updatedPost,
      status: "your post was successfully updated"
    });
  
  } catch (error) {
    return  res.status(500).json(error)
  }
  // try {
  //   const post = await Post.findById(req.params.id);
  //   // if (post.username === req.body.username) {
  //     try {
  //       const updatedPost = await Post.findByIdAndUpdate(
  //         req.params.id,
  //         {
  //           $set: req.body,
  //         },
  //         { new: true }
  //       );
  //    return res.status(200).json(updatedPost);
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   // } else {
  //   //   return res.status(401).json("You can update only your post!");
  //   // }
  // } catch (err) {
  //   return res.status(500).json(err);
  // }
};

//DELETE POST
export const deletep = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // if (post.username === req.body.username) {
      try {
        await post.delete();
        return res.status(200).json("Post has been deleted...");
      } catch (err) {
        return  res.status(500).json(err);
      }
    // } else {
    //   return res.status(401).json("You can delete only your post!");
    // }
  } catch (err) {
    return res.status(500).json(err);
  }
};

//GET POST
export const findOne = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//GET ALL POSTS
export const findAll = async (req, res) => {
  try {
    let posts;
      posts = await Post.find();
    
    return res.status(200).json({
      data: posts
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export default router;
