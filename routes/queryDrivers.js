// car, seats, lat, long, city, state, country, fullname, status: active, not active

const express = require('express');
const IPFS = require('ipfs-api');
const axios = require('axios');
const ethers = require('ethers');
const { abi, address } = require('../smartContractInfo');

const URL = 'HTTP://127.0.0.1:7545';
const customHttpProvider = new ethers.providers.JsonRpcProvider(URL);
let Contract = new ethers.Contract(address, abi, customHttpProvider.getSigner(0));

const ipfs = new IPFS ({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
})

const router = express.Router();

const get = async hash => {
    const URL = "https://gateway.ipfs.io/ipfs/" + hash;

    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

const SphericalLawOfCosines = (lat1, lon1, lat2, lon2) => {
    const φ1 = lat1 * Math.PI/180, φ2 = lat2 * Math.PI/180, Δλ = (lon2-lon1) * Math.PI/180, R = 6371e3;
    const d = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R;
    return d;
}

const queryDrivers = async (hash, latitude, longitude, seats) => {
    const MDB = await get(hash);
    const keys = Object.keys(MDB);
    const distances = [];
    // const seats = [];
    keys.forEach(key => {
        const driverProperties = MDB[key];

        const currentDistance = SphericalLawOfCosines(driverProperties.latitude, driverProperties.longitude, latitude, longitude);
        const finalStringDistance = String(currentDistance) + "|" + key;
        distances.push(finalStringDistance);
    })

    distances.sort();
    distances.forEach(string => {
        const userAddress = string.split("|")[1];
        const driverSeatAvailability = MDB[userAddress].seats - seats;
        if (driverSeatAvailability < 0) {
            const index = distances.indexOf(string);
            if (index !== -1) {
                distances.splice(index, 1);
            }
        }
    })

    for (let i = 0; i < distances.length; i++) {
        distances[i] = distances[i].split("|")[1];
    }

    return distances;
    
}

router.post('/', async function (req, res, next) {
    const HASH = req.body.hash;
    const LATITUDE = req.body.latitude;
    const LONGITUDE = req.body.longitude;
    const SEATS = req.body.seats;

    queryDrivers(HASH, LATITUDE, LONGITUDE, SEATS).then(result => {
        for (let i = 0; i < result.length; i++) {
            Contract.addEligibleDriver(req.body.address, result[i]);
            // ['asdasd ,jfkjdadkasjdas', adasjhdiasdhuiy8u329y34ew, ad8u4e92ydhadyads,d8uy298ydhda,2d8u2q8e9273974,273982739732237kdjaosi]
        }

        res.send("Success")
    })

})

module.exports = router;