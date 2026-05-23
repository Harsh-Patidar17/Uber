import { Schema, model } from 'mongoose';


const rideSchema = new Schema({
    captain: {
        type: Schema.Types.ObjectId,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [ 'requested', 'accepted', 'started', 'completed' ],
        default: 'requested'
    },
}, {
    timestamps: true
})


export const rideModel = model('rideModel', rideSchema);

