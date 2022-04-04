const { validate } = require('uuid')
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

    findMaxMinAndAvgNonce(){
        let maxNonce = 0;
        let minNonce = 0;
        let averageNonce = 0;
        for(let i = this.chain.length -1; i>0; i--){
            const currentBlock = this.chain[i];
            if(currentBlock.nonce > maxNonce){
                maxNonce = currentBlock.nonce;
            }
            if(currentBlock.nonce < minNonce || minNonce === 0){
                minNonce = currentBlock.nonce;
            }
        }
        averageNonce = (maxNonce + minNonce)/2;
        return {maxNonce, minNonce, averageNonce};
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
            if(!validate(currentBlock.transactionId) && !validate(previousBlock.transactionId)){
                return false;
            }
        }
        return true;
    }
}