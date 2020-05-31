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

const addDriverToMDB = async (address, longitude, latitude, hash, carName, seats, city, state, country, fullname) => {
    if (hash === "QmbJWAESqCsf4RFCqEY7jecCashj8usXiyDNfKtZCwwzGb") { // empty
        let obj = {};
        console.log('empty');

        obj[address] = {
            longitude,
            latitude,
            carName,
            seats,
            city,
            state,
            country,
            fullname,
            status: "Active"
        }

        let buffer = Buffer.from(JSON.stringify(obj));

        return new Promise((resolve, reject) => {
            ipfs.files.add(buffer, async (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    const hash = await res[0].hash;
                    resolve(hash);
                }
            })
        })

    } else {
        const MDB = await get(hash);

        MDB[address] = {
            longitude,
            latitude,
            carName,
            seats,
            city,
            state,
            country,
            fullname,
            status: "Active"
        }

        let buffer = Buffer.from(JSON.stringify(MDB));

        return new Promise((resolve, reject) => {
            ipfs.files.add(buffer, async (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    const hash = await res[0].hash;
                    resolve(hash);
                }
            })
        })

    }
}

router.post('/', async function (req, res, next) {
    const ADDRESS = req.body.address;
    const LONGITUDE = req.body.longitude;
    const LATITUDE = req.body.latitude;
    // const HASH = req.body.hash;
    const CAR_NAME = req.body.carName;
    const SEATS = req.body.seats;
    const CITY = req.body.city;
    const STATE = req.body.state;
    const COUNTRY = req.body.country;
    const FULL_NAME = req.body.fullname;
    const HASH = await Contract.get();

    addDriverToMDB(ADDRESS, LONGITUDE, LATITUDE, HASH, CAR_NAME, SEATS, CITY, STATE, COUNTRY, FULL_NAME).then(result => {
        Contract.set(result).then(() => {
            res.send('We chilling!');
        })
    })

})

module.exports = router;