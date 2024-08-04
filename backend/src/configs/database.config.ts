import {connect, ConnectOptions} from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

export const dbConnect = () => {
    const URI = process.env.MONGO_URI;
    connect(URI!)
    .then(  
        () => console.log("!!!Connected Sucessfully!!!"),
        (error) => console.log(error, "An Error has occured!!")
    )
}