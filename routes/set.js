const express = require('express');
const router = express.Router();
const ethers = require('ethers');
const { abi, address } = require('../smartContractInfo');

const URL = 'HTTP://127.0.0.1:7545';
const customHttpProvider = new ethers.providers.JsonRpcProvider(URL);
let Contract = new ethers.Contract(address, abi, customHttpProvider.getSigner(0));

router.post('/', async function (req, res, next) {
    result = await Contract.set(req.body.hash);
    res.send(result);
})

module.exports = router;