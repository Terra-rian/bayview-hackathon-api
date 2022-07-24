import { Schema, model } from 'mongoose';

const plantSchema = new Schema({
    ml: Number,
    name: String,
    image: String,
});

export const plantModel = model('plantModel', plantSchema);