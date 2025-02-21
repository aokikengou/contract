import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env.local' });

const MyTestTokenModule = buildModule("MyTestTokenModule", (m) => {
  const MyTestToken = m.contract("MyTestToken",
    [process.env.WALLET_ADDRESS as string]
  );

  return { MyTestToken };
});

export default MyTestTokenModule;
