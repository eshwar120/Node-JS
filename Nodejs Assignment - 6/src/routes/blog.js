const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here
router.post('/blog', (req, res) => {
    const blogData = req.body;
    console.log(blogData);
    const blog = new Blog({
        topic: blogData.topic,
        decription: blogData.decription,
        posted_at: blogData.posted_at,
        posted_by: blogData.posted_by
    });

    blog.save().then(data => {
        if (data) {
            return res.status(201).json({
                "status": "success",
                "result": {
                    "id": data._id,
                    "topic": data.topic,
                    "description": data.description,
                    "posted_at": data.posted_at,
                    "posted_by": data.posted_by
                }
            })
        }
        res.status(500).json({
            "status": "failed"
        })
    })
        .catch(err => {
            res.status(500).json({
                "status": "failed",
                "error": err
            })
        })
})

router.get('/blog', (req, res) => {
    const { page, search } = req.query;
    Blog.find({ topic: search })
    .skip(5*(page-1)).limit(5)
    .then(data => {
        console.log(data)
        if (data && data.length) {
            return res.status(200).json({
                "result" : data
            })
        }
        res.status(404).json({
            "status": "failed",
            "message": "unable to find"
        })
    })
        .catch(err => {
            res.status(500).json({
                "status": "failed",
                "error": err
            })
        })
});

router.put('/blog/:id', (req, res) => {
    const id = req.params.id;
    const newBlog = req.body;

    Blog.findOneAndUpdate({ _id: id }, newBlog)
        .then(data => {
            if (data) {
                return res.status(202).json({
                    "status": "success",
                    "result":
                    {
                        "id": data._id,
                        "topic": data.topic,
                        "description": data.decription,
                        "posted_at": data.posted_at,
                        "posted_by": data.posted_by
                    }
                })
            }
            res.status(404).json({
                "status": "failed",
                "message": "unable to update"
            })
        })
        .catch((err) => {
            res.status(500).json({
                "status": "failed",
                "error": err
            })
        })
});

router.delete('/blog/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id)
    Blog.deleteOne({ _id: id })
        .then((data) => {
            res.status(200).json({
                "status": "success",
                "result":
                {
                    "id": data._id,
                    "topic": data.topic,
                    "description": data.description,
                    "posted_at": data.posted_at,
                    "posted_by": data.posted_by
                }
            }
            );
        }).catch(err => {
            res.status(500).json({
                "status" : "failed",
                "error" : err
            });
        });
})


module.exports = router;