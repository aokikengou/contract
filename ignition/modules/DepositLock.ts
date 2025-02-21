import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env.local' });

const DepositLockModule = buildModule("DepositLockModule", (m) => {
  const DepositLock = m.contract("DepositLock",
    [process.env.WALLET_ADDRESS as string] // Testnet用
    // ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'] // ローカルネット用
  );

  return { DepositLock };
});

export default DepositLockModule;
