// car, seats, lat, long, city, state, country, fullname, status: active, not active

const express = require('express');
const IPFS = require('ipfs-api');
const axios = require('axios');

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

const getDriverData = async (address, hash) => {
    const MDB = await get(hash);
    return MDB[address];
}

router.post('/', async function (req, res, next) {
    const ADDRESS = req.body.address;
    const HASH = req.body.hash;
    
    await getDriverData(ADDRESS, HASH).then(result => {
        console.log(result);
        // const JSONOBject = JSON.stringify(result);
        res.send(result);
    })

})

module.exports = router;