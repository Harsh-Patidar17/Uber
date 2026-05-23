import { userAuth } from "../middlware/auth.middleware.js";
import { rideModel } from "../model/ride.model.js";
import { publishToQueue } from "../service/rabbit.js";

export const createRide = async (req, res) => {
    try {
        console.log(req.user);
        console.log(req.user._id);
        const { pickup, destination } = req.body;

        const newRide = new rideModel({
            user: req.user._id,
            pickup,
            destination     
        })
        await newRide.save();
        publishToQueue("new-ride", JSON.stringify(newRide))
        res.send(newRide); 

    } catch(error) {

    console.error(
        'Create Ride Error:',
        error
    );

    res.status(500).json({
        success: false,
        message: error.message
    });
}
};