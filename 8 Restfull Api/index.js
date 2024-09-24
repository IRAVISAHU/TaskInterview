const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

const dbURL = "mongodb+srv://r8936033768:kUYN6HaQmVpgZifJ@cluster0.y5q2n.mongodb.net/blog";
const port = 8000;
const BlogSchema = new mongoose.Schema({
    id: Number,
    title: String,   
    content: String,
});
const BlogModel = mongoose.model('BlogModel', BlogSchema, 'blog');

mongoose.connect(dbURL)
    .then(() => {
        console.log("MongoDB database Connected...");
    })
    .catch((err) => {
        console.log(err);
    });

app.get('/blogget', async (req, res) => {
    try {
        const blogs = await BlogModel.find({});
        res.json(blogs);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});
app.post('/blogpost', async (req, res) => {
    const { id, title, content } = req.body;
    
    try {
        const newBlog = new BlogModel({ id, title, content });
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (err) {
        res.status(500).send('Error saving blog');
    }
});
app.patch('/blogpatch/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body; 

    try {
        const updatedBlog = await BlogModel.findOneAndUpdate({ id }, updates, { new: true });
        if (!updatedBlog) return res.status(404).send('Blog not found');
        res.json(updatedBlog);
    } catch (err) {
        res.status(500).send('Error updating blog');
    }
});
app.delete('/blogdelete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBlog = await BlogModel.findOneAndDelete({ id });
        if (!deletedBlog) return res.status(404).send('Blog not found');
        res.send("Blog deleted");  
    } catch (err) {
        res.status(500).send('Error deleting blog');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
