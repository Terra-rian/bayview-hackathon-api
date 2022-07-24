import { Schema, model } from 'mongoose';

const plantSchema = new Schema({
    ml: Number,
    waterPercentage: Number,
    lastWatered: Date,
    name: String,
    image: String,
});

export const plantModel = model('plant', plantSchema);