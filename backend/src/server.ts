import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { User } from './models/userRegister.model';
import { dbConnect } from './configs/database.config';

dbConnect();


dotenv.config();
const PORT = 5000;
const app = express();

app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:4200']
    })
);

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

app.post('/api/pro/register', async(req, resp) => {
    try {
        const newUser = req.body;
        const checkExistingUsers = await User.findOne({email: newUser.email});
        if(checkExistingUsers) {
            return resp.status(500).send("user already exists")
        }
        const user = new User(newUser);
        await user.save(); // need to save as well
        resp.status(200).json(user);

    } catch (error) {
        console.error("Error during user registration:", error);
        resp.status(500).send('Server error');
    }
});

app.post('/api/pro/login', async(req, resp) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return resp.status(400).send('User not found');
        }
        if (password !== user.password) {
            return resp.status(400).send('Invalid credentials');
        }
        resp.status(200).send(user);
    } catch (err) {
        console.error("Error during login:", err);
        resp.status(500).send('Server error');
    }
});

app.listen(PORT, () => {
    console.log("website is running on http://localhost:", PORT);
    
})
