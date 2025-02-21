import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env.local' });

const OpTestTokenModule = buildModule("OpTestTokenModule", (m) => {
  const OpTestToken = m.contract("OPTestToken",
    [process.env.WALLET_ADDRESS as string]
  );

  return { OpTestToken };
});

export default OpTestTokenModule;
