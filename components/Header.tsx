import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function Header() {
    return (
        <div className="header ">
            <div className='grid grid-cols-6 py-5 items-center bg-gray-500/75 rounded-b-2xl px-5'> 
                <div><span>#</span>Proposals</div>
                <div><span>#</span>Rewards</div>
                <div className='hover:text-white font-bold cursor-pointer'>Certification</div>
                <div className='hover:text-white font-bold cursor-pointer'>New proposal</div>
                <div className='col-span-2'><ConnectButton /></div>
            </div>
          
          
        </div>
    )
}