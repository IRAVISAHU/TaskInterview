const mongoose = require('mongoose');
const express = require('express');
const cors =require('cors')
const app = express();
app.use(express.json());
app.use(cors())
const dbURL = "mongodb+srv://r8936033768:kUYN6HaQmVpgZifJ@cluster0.y5q2n.mongodb.net/users";
const port = 8000;
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});
const Model = mongoose.model('UserModel', UserSchema, 'user');
mongoose.connect(dbURL)
    .then(() => {
        console.log("MongoDB database Connected...");
    })
    .catch((err) => {
        console.log(err);
    });

app.get('/api', async (req, res) => {
    try {
        const data = await Model.find({});
        res.send(data);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/user/:email', async (req, res) => {
    const { email } = req.params;
    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  });
  

app.post('/api/user', async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const newUser = new Model({ name, email, age });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).send('Error saving user');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
