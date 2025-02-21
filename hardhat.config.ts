import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    holesky: {
      url: process.env.NEXT_PUBLIC_RPC_holesky_URL,
      accounts: [ process.env.PRIVATE_KEY as string ]
    },
    opsepolia: {
      url: process.env.NEXT_PUBLIC_RPC_opsepolia_URL,
      accounts: [ process.env.PRIVATE_KEY as string ]
    },
  }
};

export default config;
