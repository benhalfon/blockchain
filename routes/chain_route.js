const express = require('express')
const router = express.Router()
const Block = require('../models/block')
const { BlockCore, BlockchainCore } = require('../entity/block_core')

router.post('/', async(req, res) => {
    const blocks = []
    const currentChain = new BlockchainCore();
    req.body.data.forEach(element => {
        let core = new BlockCore(
            element.index,
            element.nonce == undefined ? 1 : element.nonce,
            element.data,
            element.previousHash
        );
        
        if (req.body.mine == true) {
            core.mine();
        }
        
        currentChain.addBlock(core,true);
        if (req.body.peers == undefined) {
            blocks.push(new Block({
                num: element.index,
                nonce: core.nonce,
                data: element.data,
                hash: core.hash,
                prev: core.previousHash,
                type_code: element.type_code
            }));
        } else {
            req.body.peers.forEach(peerItem => {
                blocks.push(new Block({
                    num: element.index,
                    nonce: core.nonce,
                    data: element.data,
                    hash: String(core.hash),
                    prev: String(core.previousHash),
                    type_code: element.type_code,
                    peer: peerItem
                }));
            });
        }
    });
    console.log(blocks);
    Block.insertMany(blocks).then((docs) => {
        res.status(201).json(docs);
    }).catch((err) => {
        res.status(400).json({ message: err.message });
    });
})


module.exports = router