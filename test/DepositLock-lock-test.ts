import Web3 from "web3";
import dotenv from 'dotenv';
import DepositLock_ABI from "../artifacts/contracts/DepositLock.sol/DepositLock.json";
dotenv.config({ path: '../.env.local' });

// コントラクトアドレス
const DepositLockContract = "0xCe603AEea05fC36D55D0D90943e651e23e2EcD4F"

async function Lock() {
    // RPCのエンドポイントを設定
    const web3 = new Web3(process.env.NEXT_PUBLIC_RPC_opsepolia_URL as string);
    // const web3 = new Web3('http://127.0.0.1:8545/'); // RPCエンドポイント ローカルネット

    // アカウントをプライベートキーから作成
    const formattedPrivateKey = `0x${process.env.PRIVATE_KEY as string}`;
    // const formattedPrivateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80' // ローカルネット用 #0
    // const formattedPrivateKey = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d' // ローカルネット用 #1

    const account = web3.eth.accounts.privateKeyToAccount(formattedPrivateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    // コントラクトのインスタンスを作成
    const testContract = new web3.eth.Contract(DepositLock_ABI.abi, DepositLockContract);

    try {
        // トランザクションの送信
        const tx = await testContract.methods.lockAddress(account.address).send({
            from: account.address,
            // value: tst_amount,
            gas: '200000' // ガスリミットは適宜調整
        });

        // console.log(balance + 'ETH')
        console.log(tx)
    } catch (error) {
        console.error('Error:', error);
    }
}

// スクリプトを実行
Lock();
