import mongoose from 'mongoose';

export = async () => {
    const mongodb = await mongoose.connect('mongodb+srv://plant-user:plant-database@plant-database.u6dpp.mongodb.net/?retryWrites=true&w=majority', {
        keepAlive: true,
        connectTimeoutMS: 20000,
    });

    return mongodb;
};