import mongoose from 'mongoose';
export const dbConnection = async () => {
    try {
        console.log(process.env.MONGOURI);
        await mongoose.connect(process.env.MONGOURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });
        console.log('Connected');
    } catch (e) {
        console.log(`Err ${e}`);
    }
};
