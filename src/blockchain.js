const Block = require("./block");

module.exports = class Blockchain {
    constructor(){
        this.chain = [new Block()];
        this.nextIndex = 1;
    }

    getLastHash(){
        return this.chain[this.chain.length - 1].hash;
    }

    addBlock(data){
        const hash = this.getLastHash();
        const block = new Block(this.nextIndex++, hash, data);
        this.chain.push(block);
    }

    isValid(){
        for(let i = this.chain.length -1; i>0; i--){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.generateHash()){
                return false;
            }
            if(currentBlock.index === previousBlock.nextIndex){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
            if(!hash.startWith("0") && !previousHash.startWith("0") && hash.length !== previousHash.length){
                return false;
            }
        }
        return true;
    }
}