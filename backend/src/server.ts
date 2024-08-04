import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

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

app.listen(PORT, () => {
    console.log("website is running on http://localhost:", PORT);
    
})
