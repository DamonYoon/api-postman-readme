import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const rpcUrl = "https://ethereum-mainnet.nodit.io/2vuwVWC9mbbLvjz62todRS08YUDzHzf_";
const provider = new ethers.JsonRpcProvider(rpcUrl);
const privateKey = process.env.PRIVATE_KEY || "";

const wallet = new ethers.Wallet(privateKey, provider);

const tx = {
	to: "0x3F39cfbAFf46cB736A603269d14a7e9AdF5158B4",
	value: ethers.parseEther("0.1"), // 0.1 ETH
};

(async () => {
	const signedTx = await wallet.signTransaction(tx);
	console.log(wallet.address);
	console.log(signedTx);
})();
