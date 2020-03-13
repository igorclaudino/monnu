import { Schema, model } from 'mongoose';

const AppSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        port: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)


export default model("App", AppSchema);