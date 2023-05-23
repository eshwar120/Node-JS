const express = require('express');
const authMiddleWare = require('../middleware/auth');
const Post = require('../model/Post');
const refreshMiddleware = require('../middleware/refresh');
const postRoute = express.Router();

postRoute.get('', async (req, res) => {

    try {
        const response = await Post.find({});
        if (response) {
            return res.status(200).json({
                "status": "success",
                response
            })
        }
        res.status(200).json({
            "status": "success",
            "message": "no posts available at the moment"
        })
    }
    catch (err) {
    res.status(500).json({
        "status": "failed",
        "error": err
    })
}

});

postRoute.get('/:postId', async (req, res) => {

    const postId = req.params.postId;
    // console.log(postId)
    try {
            const response = await Post.findOne({ _id: postId });
            if (response) {
                return res.status(200).json({
                    response
                })
            }

            res.status(404).json({
                "status": "unable to find"
            });
    }
    catch (err) {
        res.status(500).json({
            "status": "failed",
            "error": err
        })
    }

})

postRoute.post('', authMiddleWare,refreshMiddleware, async (req, res) => {

    try {
        const postData = req.body;
        const newPost = new Post({
            title: postData.title,
            body: postData.body,
            image: postData.image,
            author: req.userId
        });

        const savedPost = await newPost.save();
        if (savedPost) {
            return res.status(201).json({
                "status": "Post created",
                "accessToken" : req.token,
                "data": savedPost,
                // authToken :
            })
        }
        res.status(500).json({
            "status": "failed",
            "accessToken" : req.token,
        })
    }
    catch (err) {
        res.status(500).json({
            "status": "failed",
            "accessToken" : req.token,
            "error": err
        })
    }
})

postRoute.put('/:postId', authMiddleWare,refreshMiddleware, async (req, res) => {

    const postId = req.params.postId;
    try {
        if (postId) {

            const newPostData = req.body;
            const updatedData = await Post.updateOne(
                {
                    _id: postId,
                    author: req.userId
                },
                newPostData
            );
            // console.log(updatedData)
            if (updatedData.matchedCount) {
                return res.status(200).json({
                    "status": "updated successfully"
                })
            }

            res.status(404).json({
                "status": "failed to update"
            });

        }
        else {
            res.status(404).json({
                "status": "failed to update"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            "status": "failed",
            "error": err
        })
    }
})

postRoute.delete('/:postId', authMiddleWare,refreshMiddleware, async (req, res) => {

    const postId = req.params.postId;
    try {
        if (postId) {

            const response = await Post.deleteOne(
                {
                    _id: postId,
                    author: req.userId
                }
            );
            if (response) {
                return res.status(200).json({
                    "status": "deleted successfully"
                })
            }

            res.status(404).json({
                "status": "failed to delete"
            });

        }
        else {
            res.status(404).json({
                "status": "failed to delete"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            "status": "failed",
            "error": err
        })
    }

})



module.exports = postRoute;