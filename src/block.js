const sha256 =require("crypto-js/sha256");
const { v4: uuidv4 } = require('uuid');

module.exports = class Block {
    constructor(index=0, previousHash = null, data = "Genesis Block", difficulty = 4) {
        this.index = index;
        this.transactionId = uuidv4();
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = new Date();
        this.nonce = 0;
 
        const prefix = new Array(difficulty + 1).join("0");
        this.mine(prefix);
    }

    mine(prefix) {
        do {
            this.nonce++;
            this.hash = this.generateHash();
        }
        while (!this.hash.startsWith(prefix));
    }

    generateHash() {
        return sha256(this.index + this.previousHash + JSON.stringify(this.data) + this.timestamp + this.nonce + this.transactionId).toString();
    }
}