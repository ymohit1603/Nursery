import axios from "axios";
import express from "express";
const router = express.Router();

router.get('/', async (req,res) => {
    const city  = req.params;
    if (!city) {
        res.status(400).json({ error: "City name can't be empty" });
    }

    const apiKey = process.env.MAP_API_KEY;
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;
    try {
        
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;
        const geocodeResponse = await axios.get(geocodeUrl);

        if (geocodeResponse.data.status === 'OK') {
            const location = geocodeResponse.data.results[0].geometry.location;
            const { lat, lng } = location;

            const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=nursery&key=${apiKey}`;
            const placesResponse = await axios.get(placesUrl);

            if (placesResponse.data.status === 'OK') {
                res.json(placesResponse.data.results);
            } else {
                res.status(500).json({ error: 'Places request failed' });
            }
        } else {
            res.status(500).json({ error: 'Geocode request failed' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})

export default router;