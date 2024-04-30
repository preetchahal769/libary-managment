import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log(`mongoDB connected`);
        })

        connection.on('error', (error) => {
            console.log(`error while connecting to mongoDB . Please make sure that the mongoDB server is up and running : ${error}`);
            process.exit();
        })
    } catch (error) {
        console.log(`something went wrong while connecting to DB`);
        console.log(`${error}`);
        
    }
 }
