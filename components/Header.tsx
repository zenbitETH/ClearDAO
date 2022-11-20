import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';


export default function Header() {
    return (
        <div className="header ">
            <div className='grid grid-cols-6 py-5 items-center bg-gray-500/75 rounded-b-2xl px-5'> 
                <div><span>#</span>Proposals</div>
                <div><span>#</span>Rewards</div>
                <div className='hover:text-white font-bold cursor-pointer'>Certification</div>
                <Link href='/newProposal'>
                    <div className='hover:text-white font-bold cursor-pointer'>New proposal</div></Link>
                <div className='col-span-2'><ConnectButton /></div>
            </div>
          
          
        </div>
    )
}