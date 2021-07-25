const express = require('express')
const router = express.Router()
const Block = require('../models/block')
const { BlockCore, BlockchainCore } = require('../entity/block_core')

//Getting all blocks
router.get('/', async(req, res) => {
    try {
        const blocks = await Block.find();
        res.json(blocks)
    } catch (err) { res.status(500).json({ message: err.message }) }
})

//Delete all blocks
router.delete('/', async(req, res) => {
    try {
        await Block.deleteMany(req.body);
    } catch (err) { res.status(500).json({ message: err.message }) }
})

//Post new block
router.post('/', async(req, res) => {
    let core = new BlockCore(
        req.body.index,
        req.body.nonce == undefined ? 1 : req.body.nonce,
        req.body.data,
        req.body.previousHash == undefined ? '' : req.body.previousHash
    )

    if (req.body.mine == true) {
        core.mine();
    }

    if (req.body.peers == undefined) {
        const block = new Block({
            num: req.body.index,
            nonce: core.nonce,
            data: req.body.data,
            hash: core.hash,
            prev: req.body.previousHash !== undefined ? null : req.body.previousHash,
            type_code: req.body.type_code
        });
        try {
            const newBlock = await block.save();
            res.status(201).json(newBlock);
        } catch (err) { res.status(400).json({ message: err.message }); }
    } else {
        const blocks = []
        req.body.peers.forEach(peerItem => {
            blocks.push(new Block({
                num: req.body.index,
                nonce: core.nonce,
                data: req.body.data,
                hash: core.hash,
                prev: core.previousHash,
                type_code: req.body.type_code,
                peer: peerItem
            }))
        });
        Block.insertMany(blocks).then((docs) => {
            res.status(201).json(docs);
        }).catch((err) => {
            res.status(400).json({ message: err.message });
        });

    }
})


//Getting blocks by type
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

module.exports = router