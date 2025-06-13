# On-Chain NFT

This project implements a fully on-chain NFT (Non-Fungible Token) where both the metadata and artwork are stored directly on the Ethereum blockchain as SVG images encoded in Base64 format.

## Features

- Fully on-chain NFT implementation
- SVG-based artwork stored directly in smart contract
- Base64 encoding for image and metadata storage
- Owner-only minting capability
- ERC721 compliant

## Prerequisites

- Node.js (v20+ recommended)
- npm or yarn
- Hardhat
- MetaMask wallet

## Setup

1. Clone the repository:
    ```shell
    git clone https://github.com/michojekunle/nft-onchain/tree/rsk-onchain-nft.git
    ```
2. Install dependencies
    ```shell
    cd rsk-onchain-nft
    npm install
    ```
3. Add your environment variables
    create a new file `.env` and add the following 
    ```bash
    WALLET_KEY=your-private-key
    ROOTSTOCK_TESTNET_RPC_URL=your-alchemy-rpc-testnet-url
    ```
4. Compile and deploy contract
    ```shell
    npx hardhat compile
    npx hardhat run scripts/deploy.js --network rootstock
    ```