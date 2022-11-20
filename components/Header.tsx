import ethers from 'ethers'
import abi from '../abi/abi.json'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

async function validate () {
    const ethereum = (window as any).ethereum;
    const accounts = await ethereum.request({
        method: "eth_requestAccounts"

    });
    
    const provider = new ethers.providers.Web3Provider(ethereum)
    const account_id = 0
    const walletAddress = accounts[account_id]
    const signer = provider.getSigner(walletAddress)
    const GovernorAlpha = new ethers.Contract("0xF191A42BA8F28b0DdAd37327f0cfa1399fa87991", abi, signer)
    const rewarded_tokens = 1
    const validate = await GovernorAlpha.validate(rewarded_tokens)
}

export default function Header() {
    return (
        <div className="header ">
            <div className='grid grid-cols-6 py-5 items-center bg-gray-800/60 rounded-b-2xl px-5 text-white text-xl gap-20'> 
                <div><span>5 </span>proposals</div>
                <div><span>5 </span>✨</div>
                <div className='hover:text-pink-500 font-bold cursor-pointer' onClick={() => validate()}>Certification</div>
                <Link href='/newProposal'>
                    <div className='hover:text-pink-500 font-bold cursor-pointer'>+ New proposal</div></Link>
                <div className='col-span-2'><ConnectButton /></div>
            </div>
          
            
        </div>
    )
}

