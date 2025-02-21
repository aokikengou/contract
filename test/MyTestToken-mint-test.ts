import Web3 from "web3";
import dotenv from 'dotenv';
import MyTestToken_ABI from "../artifacts/contracts/MyTestToken.sol/MyTestToken.json";
dotenv.config({ path: '../.env.local' });

// holeskyのコントラクトアドレス
const MyTestTokenContract = "0x8BBf02326BD5630c9E6Ec89C305ED2A8Ca0ba133"

async function getContractBalance(amount: string) {
    const tst_amount = Web3.utils.toWei(amount, 'ether');
    // Infuraのエンドポイントを設定
    const web3 = new Web3(process.env.NEXT_PUBLIC_RPC_holesky_URL as string);

    // アカウントをプライベートキーから作成
    const formattedPrivateKey = `0x${process.env.PRIVATE_KEY as string}`;

    const account = web3.eth.accounts.privateKeyToAccount(formattedPrivateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    // コントラクトのインスタンスを作成
    const testContract = new web3.eth.Contract(MyTestToken_ABI.abi, MyTestTokenContract);

    try {

        // トランザクションの送信
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
getContractBalance('0.01');
