// scripts/deploy.js
const main = async () => {
  // Get 'OnChainNFT' contract
  const nftContractFactory = await hre.ethers.getContractFactory("OnChainNFT");

  // Deploy contract
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed;

  console.log("✅ Contract deployed to:", nftContract.target);

  // SVG image that you want to mint
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg version="1.1" viewBox="0 0 2048 1927" width="1280" height="1280" xmlns="http://www.w3.org/2000/svg">
<path transform="translate(0)" d="m0 0h2048v1927h-2048z" fill="#FEFEFE"/>
<path transform="translate(587,621)" d="m0 0 4 2 9 14 14 26 16 27 13 24 24 42 14 25 14 24 16 29 13 23 15 27 13 23 14 25 10 18 15 26 15 27 11 20 9 16 14 24 13 23 7 14 3 5v8l-9 10-8 10-11 12-7 9-24 28-9 11-12 13-9 11-9 10-9 11-12 14-9 11-10 11-9 11-7 8-5 1-101-2h-15l-9 2-3-2 7-9 8-8 8-10 9-11 12-14 9-11 10-11 9-11 10-11 8-10 11-13 12-13 11-12 8-10 9-11 11-13 6-8 5-6h2l-2-9-9-15-15-27-14-24-14-26-28-49-30-54-16-29-14-24-14-26-9-16-16-28-14-26-10-18-2-3 1-9 14-27 14-24 11-20 8-13z" fill="#1D1C1C"/>
<path transform="translate(1782,842)" d="m0 0 3 1-1 5-1 30v36l1 104 1 55 1 4 4-2 6-8 17-28 14-24 12-20 14-24 6-11 2-1h109l-3 9-10 14-11 18-10 15-14 22-11 17-12 18-11 17-8 12-5 6 1 6 7 12 11 16 16 24 19 28 15 22 24 36 5 9v2h-87l-18-1-5-5-12-20-32-50-12-19-8-12-10-13-5-3v41l-1 76 1 5-6 1h-43l-45-1v-279l1-34 7-10 13-14 9-11 14-15 9-11 12-14 9-10 9-11z" fill="#1D1C1C"/>
<path transform="translate(512,758)" d="m0 0 5 5 9 15 13 23 14 24 9 17 6 12 2 3-1 5-5 8-14 27-8 14-13 23-6 10-10 18-16 29-14 24-16 29-13 23-13 24-4 6 2 4 10 10 11 14 10 11 9 11 26 30 9 10 4 4 96 1 1 2-3 6-7 7-9 11-13 15-9 11-11 12-9 11-11 13-7 8-8 9-8 1-12-1h-15l-5-1-4-1 1 3-7-1-6-3-10-10-9-11-11-13-36-42-13-15-9-11-12-14-13-15-9-11-10-11-9-11-10-11-6-9 2-5 8-11 8-15 13-23 14-26 10-18 10-17 16-29 13-23 16-29 14-25 16-29 15-27 14-25 16-29 11-20z" fill="#1D1C1C"/>
<path transform="translate(1520,952)" d="m0 0h23l16 2 21 6 17 7 15 9 14 12 12 14 7 11 3 4v3l-17 8-19 10-33 15-8-1-5-5v-2l-4-2-12-7-14-4-9 1-8 3-7 8-2 3v5l5 5 8 5 17 6 21 5 21 6 16 6 17 8 12 9 7 6 9 13 6 13 3 12 2 26-1 17-4 16-5 12-9 13-11 11-14 9-12 6-19 7-18 4-21 2h-17l-21-2-25-5-16-6-15-8-13-10-12-12-9-13-5-9 1-5 8-6 14-6 17-10 30-15 8-1 5 6 5 8 10 8 8 5 7 2h15l11-2 10-6 5-7v-7l-6-7-14-7-33-10-20-5-16-6-14-8-11-8-10-9-10-14-5-12-4-20v-18l4-20 4-12 7-13 7-9 7-8 14-11 17-9 18-6 14-3z" fill="#1D1C1C"/>
<path transform="translate(1096,843)" d="m0 0h1l1 6v289l1 17 1 6h137l2 2v61l-1 37-2 1h-233l1-286 1-30 10-10 7-8 12-13 9-11 13-15 9-11 11-12 9-11 9-10z" fill="#1D1C1C"/>
<path transform="translate(1372,961)" d="m0 0h3l1 33v117l-1 150-2 1h-34l-62-1 1-189 6-8 9-10 9-11 10-11 9-11 12-13 11-13 13-17 7-8 5-7z" fill="#1D1C1C"/>
</svg>`;

  // Call the mint function from our contract
  const txn = await nftContract.mint(svg);
  const txnReceipt = await txn.wait();

  // Get the token id of the minted NFT (using our event)
  const event = await txnReceipt.events?.find((event) => event.event === "Minted");
  const tokenId = event?.args["tokenId"];

  console.log(
    "🎨 Your minted NFT:",
    `https://testnets.opensea.io/assets/${nftContract.target}/${tokenId}`
  );
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
