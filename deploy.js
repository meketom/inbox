require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const {interface, bytecode} = require('./compile')
const provider = new HDWalletProvider(process.env.MNEMONIC_PHRASE, process.env.INFURA_API)
const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log('Attempting to deploy from account: ', accounts[0])
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hi there']})
        .send({from: accounts[0], gas: '1000000'})

    console.log('Contract deployed to ', result.options.address)
    provider.engine.stop()
}
deploy()

// Contract deployed to: 0x0fe88Bc9150F6f2a20ffbcCA745bA6fBd79FFa77
