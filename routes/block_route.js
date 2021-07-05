const express = require('express')
const router = express.Router()
const Block = require('../models/block')
const { BlockCore, BlockchainCore } = require('../entity/block_core')

//Getting by type
router.get('/', async(req, res) => {
    try {
        const blocks = await Block.find();
        res.json(blocks)
    } catch (err) { res.status(500).json({ message: err.message }) }
})



router.post('/', async(req, res) => {
    const core = new BlockCore(
        req.body.index,
        req.body.nonce,
        req.body.data,
        req.body.previousHash == undefined ? '' : req.body.previousHash
    )

    const block = new Block({
        num: core.index,
        nonce: core.nonce,
        data: core.data,
        hash: core.hash,
        peer: req.body.peer !== undefined ? null : req.body.previousHash,
        prev: req.body.prev !== undefined ? null : req.body.prev,
        type_code: req.body.type_code
    });
    try {
        const newBlock = await block.save();
        res.status(201).json(newBlock);
    } catch (err) { res.status(400).json({ message: err.message }); }
})




router.get('/:typeCode', getBlockByType, (req, res) => {
    res.send(res.blocks)
})

async function getBlockByType(req, res, next) {
    try {
        blocks = await Block.find({ type_code: req.params.typeCode })
        if (blocks == null) {
            return res.status(404).json({ message: 'Cannot find the type ' + req.body.type });
        }
    } catch (err) { return res.status(500).json({ message: err.message }) }
    res.blocks = blocks;
    next()
}

router.post('mine/:type_code', async(req, res) => {
    num = req.body.name
    nonce = req.body.nonce
    data = req.body.data
    type_code = req.body.type_code
    mine =
        res.send(req.params.type_code)
})

module.exports = router