import { Schema, model } from 'mongoose';

const plantSchema = new Schema({
    id: String,
    ml: Number,
    waterPercentage: Number,
    lastWatered: Date,
    name: String,
    image: String,
});

export const plantModel = model('plantModel', plantSchema);