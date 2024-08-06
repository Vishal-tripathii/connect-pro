import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { User } from './models/userRegister.model';
import { dbConnect } from './configs/database.config';
import { Feed } from './models/feed.model';
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

app.post('/api/pro/register', async (req, resp) => {
    try {
        const newUser = req.body;
        const checkExistingUsers = await User.findOne({ email: newUser.email });
        if (checkExistingUsers) {
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

app.post('/api/pro/login', async (req, resp) => {
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

app.get('/api/pro/getPosts', async (req, resp) => {
    try {
        const { userId } = req.query;
        const user = await User.findById(userId).populate('following')
        const followingUserIds = user?.following.map((item) => item._id) || []; // might be empty so we need to define in advance
        const all_ids = [userId, ...followingUserIds]
        const post = await Feed.find({ id: { $in: all_ids } }) // We use the $in operator to fetch data from the Feed table for all these IDs.
        resp.json(post);
    } catch (error) {
        resp.status(500).send(error)
    }
})

app.post('/api/pro/post', async (req, resp) => {
    try {
        const newPost = req.body;
        const post = new Feed(newPost);
        await post.save()
        resp.status(200).json(newPost);
    } catch (error) {
        resp.status(500).json({ message: 'An error occurred while creating the post.' });
    }
});

app.get('/api/pro/getExistingUsers', async (req, resp) => {
    try {
        const allUsers = await User.find();
        resp.json(allUsers);
    } catch (error) {
        resp.status(500).send("Error fetching allUsers")
    }
});

app.post('/api/pro/follow', async (req, resp) => {
    try {
        const { followId, userId } = req.body;
        const currentUser = await User.findById(userId); // find the currentUser
        const userToFollow = await User.findById(followId); // find the user to follow

        if (!currentUser || !userToFollow) {
            resp.status(404).json({ error: "User not found" });
        } else if (currentUser.following.includes(followId)) {
            resp.status(400).json({ error: "User is already in your following list" });
        } else {
            currentUser.following.push(followId)
            await currentUser.save();
            resp.status(200).json({ message: 'User followed successfully' });
        }
    } catch (error) {
        resp.status(500).json({ error: error });
    }
});

app.post('/api/pro/unfollow', async (req, res) => {
    try {
        const { followId, userId } = req.body;
        const currentUser = await User.findById(userId);
        const userToUnfollow = await User.findById(followId);

        if (!currentUser || !userToUnfollow) {
            res.status(404).json({ error: "User not found" });
        } else if (currentUser.following.includes(followId)) {
            const index = currentUser.following.findIndex((item: any) => item._id.equals(followId));
            if (index !== -1) {
                currentUser.following.splice(index, 1);
                await currentUser.save();
                res.status(200).json({ message: 'User Unfollowed successfully' });
            }
        } else {
            res.status(400).json({ error: "You are not following this user" });
        }
    } catch (error) {
        res.status(500).send({ error: "Some error occurred" });
    }
});

app.listen(PORT, () => {
    console.log("website is running on http://localhost:", PORT);

})
