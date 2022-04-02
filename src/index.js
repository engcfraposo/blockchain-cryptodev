const Blockchain = require("./blockchain");

const blockchain = new Blockchain()
blockchain.addBlock({ to: "jose", from: "maria", value: 10 })
blockchain.addBlock({ to: "joão", from: "maria", value: 100 })
console.log(blockchain)
console.log(blockchain.isValid())

//blockchain.chain[1].data = { to: "jose", from: "maria", value: 100 }
//console.log(blockchain)
//console.log(blockchain.isValid())