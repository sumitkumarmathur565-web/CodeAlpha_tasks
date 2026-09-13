const User = require('../model/user.model')
const Post = require('../model/post.model')
async function createPost(req ,res) {
    const fetch = req.user;
    const {content} = req.body;

    if(!content){
        return res.status(400).json({
            message : "Add content"
        })
    }


   try {
    

    const user = await User.findOne({email: fetch.email})

    if(!user){
        return res.status(400).json({
            message: "user not found"
        })
    }


    const post = await Post.create({
        content: content,
        user: user
    })


    return res.status(200).json({
        message: "Post created",
        post,
        user:{
            username : user.username
        }
    })

   } catch (error) {
      return res.status(500).json({
        message: "Post creation failed"
      })

      console.log(error)
   }
    
}

async function getPost(req, res) {

    try {
        const posts = await Post.find().populate('user' , 'username');

        if(!posts){
            return res.status(400).json({
                message : "No post available" 
            })
        }

        return res.status(201).json({
            message: "Post fetched",
            posts
        })
    } catch (error) {
        return res.status(500).json({
            message:"Post fetch failed"

        })
    }
    
}

async function deletePost(req, res){
    const postId = req.params.id;
    const currentUser = await User.findOne({email : req.user.email});

    try {
        const post = await Post.findById(postId);


        

    if(post.user.toString() !== currentUser._id.toString()){
        return res.status(400).json({
            message : "You can't delete somelse post"
        })
    }

    await post.deleteOne();

    return res.status(201).json({
        message :"Post deleted"
    })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Deleteion failed"
        })
    }
}


async function likePost(req, res){
    const postId = req.params.id;
    const currentUser = await User.findOne({email : req.user.email});

    try {
        const post = await Post.findById(postId);

    if( post.likes.includes(currentUser._id)){
        post.likes = post.likes.filter(
            uid => uid.toString() !== currentUser._id.toString()
        )

        await post.save()
        return res.status(200).json({
            message : " Post disliked "
        })
    }


    post.likes.push(currentUser._id);
    
    await  post.save();
    


    return res.status(200).json({
        message : "Post liked"
    })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message :"Like failed"
        })
    }

}


module.exports = {createPost , getPost ,deletePost , likePost}