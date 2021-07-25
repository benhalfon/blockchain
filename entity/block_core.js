const sha256 = require("sha256");
const MINE_PREFIX = "0000";

class BlockCore {

    constructor(index, nonce, data, previousHash = '') {
        this.index = index;
        this.nonce = nonce;
        this.data = JSON.stringify(data).toString();
        this.previousHash = previousHash;
        this.hash="";
        this.updateHash();
    }

    updateHash() {
        this.hash = sha256(Object.values(this).filter((a) => a != null).reduce((a, b) => a + '' + b, ''));
    }

    mine() {
        this.nonce = 1;
        while (!String(this.hash).startsWith(MINE_PREFIX)) {
            this.nonce++;
            this.updateHash();
        }
    }
}

class BlockchainCore {
    constructor() {
        this.chain = [];
    }
    addBlock(newBlock, mine = false) {
        if (this.chain.length == 0) {
            newBlock.previousHash = "000000000000000000000000000000000000000000000000000000000000000";
        } else {
            newBlock.previousHash = this.chain[this.chain.length - 1].hash;
        }
        if (mine)
            newBlock.mine();
        else {
            console.log("before update hash in addBlock "+newBlock.hash);
            newBlock.updateHash();
            console.log("after update hash in addBlock "+newBlock.hash);
        }
        this.chain.push(newBlock);
    }
}

module.exports.BlockCore = BlockCore;
module.exports.BlockchainCore = BlockchainCore;