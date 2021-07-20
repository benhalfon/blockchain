const express = require('express')
const router = express.Router()
const Block = require('../models/block')
const { BlockCore } = require('../entity/block_core')



router.post('/', async(req, res) => {
    const core = new BlockCore(
        req.body.index,
        req.body.nonce == undefined ? 1 : req.body.nonce,
        req.body.data,
        req.body.previousHash == undefined ? '' : req.body.previousHash
    )

    core.mine();

    res.status(201).json({ "hash": core.hash.toString() });
});
module.exports = router