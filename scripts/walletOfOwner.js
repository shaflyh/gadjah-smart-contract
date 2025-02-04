require("dotenv").config()
const { ethers } = require("hardhat");

const API_URL = process.env.ALCHEMY_API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network="mainnet", API_URL);

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const contract = require("../artifacts/contracts/GadjahSociety.sol/GadjahSociety.json")
const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS, signer)

async function walletOfOwner(walletAddress) {
    const tx = await nftContract.walletOfOwner(walletAddress);
    await tx.wait();
    console.log(tx);

    // const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
    //the transaction
    // const tx = {
    //     'from': PUBLIC_KEY,
    //     'to': CONTRACT_ADDRESS,
    //     'nonce': nonce,
    //     'gas': 50000,
    //     'data': nftContract.methods.walletOfOwner(walletAddress).encodeABI()
    // };

    // const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    // signPromise
    //     .then((signedTx) => {
    //         web3.eth.sendSignedTransaction(
    //             signedTx.rawTransaction,
    //             function (err, hash) {
    //                 if (!err) {
    //                     console.log(
    //                         "The hash of your transaction is: ",
    //                         hash,
    //                         "\nCheck Alchemy's Mempool to view the status of your transaction!"
    //                     )
    //                 } else {
    //                     console.log(
    //                         "Something went wrong when submitting your transaction:",
    //                         err
    //                     )
    //                 }
    //             }
    //         )
    //     })
    //     .catch((err) => {
    //         console.log(" Promise failed:", err)
    //     })
}

walletOfOwner("0xA9e0C87d1697F8ff2Ae805919167fA5F5066C2f8")