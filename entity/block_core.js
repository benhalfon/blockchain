const SHA256 = require("crypto-js/SHA256");

class BlockCore {

    constructor(index, nonce, data, previousHash = '') {
        this.index = index;
        this.nonce = nonce;
        this.data = JSON.stringify(data).toString();
        this.previousHash = previousHash;
        this.updateHash();
    }

    updateHash() {
        this.hash = null;
        this.hash = SHA256(Object.values(this).filter((a) => a != null).reduce((a, b) => a + '' + b, ''));
    }
}

class BlockchainCore {
    constructor() {
        this.chain = [];
    }
    addBlock(newBlock) {
        if (this.chain.length == 0) {
            newBlock.previousHash = ''
        } else {
            newBlock.previousHash = this.chain[this.chain.length - 1].hash;
        }
        newBlock.updateHash();
        this.chain.push(newBlock);
    }
}

module.exports.BlockCore = BlockCore;
module.exports.BlockchainCore = BlockchainCore;