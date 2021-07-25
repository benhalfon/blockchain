const express = require('express')
const router = express.Router()
const KeyModel = require('../models/keyModel')
let crypto = require('crypto');
const { generateKeyPair } = require('crypto');


router.post('/', async(req, res) => {
    const keyModel = new KeyModel({
        privateKey: req.body.privateKey,
        publicKey: req.body.publicKey
    });

    try {
        const newKey = await keyModel.save();
        res.status(201).json(newKey);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

router.get('/', async(req, res) => {
    try {
        const blocks = await KeyModel.find();
        res.json(blocks)
    } catch (err) { res.status(500).json({ message: err.message }) }
})

router.get('/generate', async(req, res) => {
    try{
        generateKeyPair('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        }
        }, (err, puKey, prKey) => {
            const keyModel = new KeyModel({
                privateKey: prKey,
                publicKey: puKey
            })
            KeyModel.deleteMany().then( async ()=>{
                const newKey = await keyModel.save();
                res.json(newKey);
            })
        });
    } catch (err){ res.status(500).json({ message: err.message }) }
})

module.exports = router