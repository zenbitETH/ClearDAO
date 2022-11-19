import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import ethers from "ethers";
import abi from '../abi/abi.json'

async function vote (){
  const ethereum = (window as any).ethereum;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    const provider = new ethers.providers.Web3Provider(ethereum)
    const walletAddress = accounts[0]    // first account in MetaMask
    const signer = provider.getSigner(walletAddress)
    const GovernorAlpha = new ethers.Contract("0xdAC17F958D2ee523a2206206994597C13D831ec7", abi, signer) 
    const vote = await GovernorAlpha.castVote(1,true)
}


const Home: NextPage = () => {
  return (
    <div className=''>
        <ConnectButton />
    </div>
  );
};

export default Home;
