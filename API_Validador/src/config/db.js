import mongoose from 'mongoose'
import * as dotenv from 'dotenv'


dotenv.config({ path: 'variables.env' })

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false
        });
        console.log("DB conectada");
    } catch (error) {
        console.log(error);
        process.exit(1); //detener la app
    }
}

export default conectarDB;