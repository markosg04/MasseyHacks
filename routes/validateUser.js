// car, seats, lat, long, city, state, country, fullname, status: active, not active

const express = require('express');
const IPFS = require('ipfs-api');
const axios = require('axios');

const ipfs = new IPFS ({
    hostt: 'ipfs.infura.io',
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

const validateUser = async (address, hash) => {
    const MDB = await get(hash);
    // const MDB = JSON.parse(MDBString);
    if (MDB[address] === undefined) {
        return 'Passenger';
    } else {
        if (MDB[address].status === 'Active') {
            return 'Driver';
        } else if (MDB[address].status === 'Not Active') {
            return 'Passenger';
        }
    }
}

router.post('/', async function (req, res, next) {
    const ADDRESS = req.body.address;
    const HASH = req.body.hash;
    // console.log(validateUser(ADDRESS, HASH));
    validateUser(ADDRESS, HASH).then(result => {
        res.send(result);
    })
    // res.send(validateUser(ADDRESS, HASH));

})

module.exports = router;