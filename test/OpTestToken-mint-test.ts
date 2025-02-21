import Web3 from "web3";
import dotenv from 'dotenv';
import OpTestToken_ABI from "../artifacts/contracts/OpTestToken.sol/OPTestToken.json";
dotenv.config({ path: '../.env.local' });

// Op Sepoliaのコントラクトアドレス
const OpTestTokenContract = "0x863AEf4f67735ea7DAe7b75D250A7254D1158EE1"

async function Mint(amount: string) {
    const tst_amount = Web3.utils.toWei(amount, 'ether');
    // RPCのエンドポイントを設定
    const web3 = new Web3(process.env.NEXT_PUBLIC_RPC_opsepolia_URL as string);

    // アカウントをプライベートキーから作成
    const formattedPrivateKey = `0x${process.env.PRIVATE_KEY as string}`;

    const account = web3.eth.accounts.privateKeyToAccount(formattedPrivateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    // コントラクトのインスタンスを作成
    const testContract = new web3.eth.Contract(OpTestToken_ABI.abi, OpTestTokenContract);

    try {
        // トランザクションの送信
        const tx = await testContract.methods.mint(account.address, tst_amount).send({
            from: account.address,
            // value: amount,
            gas: '200000' // ガスリミットは適宜調整
        });

        // console.log(balance + 'ETH')
        console.log(tx)
    } catch (error) {
        console.error('Error:', error);
    }
}

// スクリプトを実行
Mint('1.11');
