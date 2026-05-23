import {captainModel} from '../models/captain.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { blacklistTokenModel } from '../models/blacklisttoken.model.js';
import { subscribeToQueue } from '../service/rabbit.js';

export const registercaptain = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const captain = await captainModel.findOne({ email });

        if (captain) {
            return res.status(400).json({ message: 'captain already exists' });
        }

        const hash = await bcrypt.hash(password, 10);
        const newcaptain = new captainModel({ name, email, password: hash });

        await newcaptain.save();

        const token = jwt.sign({ id: newcaptain._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token);

        delete newcaptain._doc.password;

        res.send({ token, newcaptain });
    } catch (error) { 
        res.status(500).json({ message: error.message });
    }
}

export const logincaptain = async (req, res) => {
    try {
        const { email, password } = req.body;
        const captain = await captainModel
            .findOne({ email })
            .select('+password');

        if (!captain) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, captain.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        delete captain._doc.password;

        res.cookie('token', token);

        res.send({ token, captain });

    } catch (error) {

        res.status(500).json({ message: error.message });
    }

}

export const logoutcaptain = async (req, res) => {
     try {
        const token = req.cookies.token;
        await blacklistTokenModel.create({ token });
        res.clearCookie('token');
        res.send({ message: 'captain logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getProfile = async (req, res) => {
    try {
        res.send(req.captain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const toggleAvailability = async (req, res) => {
    try {
        const captain = await captainModel.findById(req.user._id);
            
        if (!captain) {
            return res.status(404).json({ message: 'captain not found' });
        }       
        captain.isAvailable = !captain.isAvailable;
        await captain.save();
        res.send(captain);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const initCaptainQueue = () => {
    subscribeToQueue("new-ride", (data) => {
        const rideData = JSON.parse(data);
        console.log(" [Captain Service] Received new ride event from RabbitMQ:", rideData);
    });
}