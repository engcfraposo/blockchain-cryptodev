const sha256 =require("crypto-js/sha256");

module.exports = class Block {
    constructor(index=0, previousHash = null, data = "Genesis Block", difficulty = 1) {
        this.index = index;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = Date.now();
        this.nonce = 0;

        const prefix = new Array(difficulty + 1).join("0");
        console.log(prefix)
        this.mine(prefix);
    }

    mine(prefix) {
        do {
            this.nonce++;
            this.hash = this.generateHash();
        }
        while(!this.hash.startsWith(prefix));
    }

    generateHash() {
        return sha256(
            this.index + 
            this.previousHash + 
            this.timestamp + 
            JSON.stringify(this.data)
        ).toString();
    }
}