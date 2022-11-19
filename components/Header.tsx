import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function Header() {
    return (
        <div className="header">
          <div className="wrap">
          <a href="/" className="grid items-center text-2xl font-bold">
            ClearDAO
          </a>
            <div className="border-backgrounds-400 border-white border rounded-but py-1 px-10 hover:cursor-pointer dark:hover:bg-solar-100 hover:bg-lunar-100 text-backgrounds-400 text-white hover:border-lunar-100">
                <ConnectButton />
          </div>
          </div>
        </div>
    )
}