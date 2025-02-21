import { ethers } from "hardhat";

async function main() {
    const [...accounts] = await ethers.getSigners();

    let i = 0;
    for (const account of accounts) {
        const balance = await ethers.provider.getBalance(account.address);
        console.log(`Address #${i}: ${account.address}`);
        console.log(`Balance #${i}: ${ethers.formatEther(balance)} ETH`);
        i++;
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });