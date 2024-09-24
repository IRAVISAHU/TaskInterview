const mongoose = require('mongoose');
const readline = require('readline');
const Prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const schema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});
const User = mongoose.model('User', schema);
const userData = async (name, email, age) => {
    const newData = new User({
        name,
        email,
        age,
    });
    await newData.save();
    console.log("Data Inserted: ", newData);
};
const Questions = () => {
    Prompt.question('Enter name: ', (name) => {
        Prompt.question('Enter email: ', (email) => {
            Prompt.question('Enter age: ', (age) => {
                mongoose.connect('mongodb://localhost:27017/userdata').then(() => {
                    return userData(name, email, parseInt(age));
                }).then(() => {
                    console.log("Add another user? (yes/no)");
                    Prompt.question('> ', (answer) => {
                        if (answer.toLowerCase() === 'yes') {
                            Questions();
                        } else {
                            Prompt.close();
                            mongoose.connection.close();
                        }
                    });
                }).catch((err) => console.log(err));
            });
        });
    });
};
Questions();
