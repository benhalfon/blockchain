const express = require('express')
const router = express.Router()
const Block = require('../models/block')
const { BlockCore, BlockchainCore } = require('../entity/block_core')


router.post('/', async(req, res) => {
    const currentChain = new BlockchainCore();
    req.body.data.forEach(element => {
        currentChain.addBlock(new BlockCore(
            element.index,
            element.nonce,
            element.data,
            element.previousHash == undefined ? '' : element.previousHash
        ));
    });


})


module.exports = router