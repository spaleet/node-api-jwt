import mongoose from "mongoose";

async function connect() {
    const connectionString = process.env.MONGO_URL!;

    try {
        await mongoose.connect(connectionString);
        console.log("Db Connected !");

    } catch (error) {
        console.log("ERROR : Db Connection Failed!", error);

        process.exit(1);
    }
}

export default connect;