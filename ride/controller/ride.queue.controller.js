import { subscribeToQueue } from "../service/rabbit.js";
import { rideModel } from "../model/ride.model.js";

export const initRideQueue = () => {

    subscribeToQueue(
        "captain-assigned",
        async (data) => {
            const assignmentData = JSON.parse(data);

            console.log(
                "[Ride Service] Received captain assignment:",
                assignmentData
            );

            const updatedRide = await rideModel.findByIdAndUpdate(
                assignmentData.rideId,
                {
                    captain: assignmentData.captainId,
                    status: "accepted"
                },
                { new: true }
            );

            console.log(
                "Updated Ride:",
                updatedRide
            );
        }
    );

};