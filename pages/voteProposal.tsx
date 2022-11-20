import Link from "next/link"

export default function VoteProposal() {
    return (
        <div className="relative justify-center sm:items-center py-4 sm:pt-0 font-exo text-2xl">
            <div className="card1 px-5 max-w-3xl ">
                <div className="col-span-12 grid grid-cols-2 text-center text-white font-bold text-xl">
                    <div>Proposal # 1</div>
                    <div>7 days, 15 hours to vote</div>
                </div>
                <div className="col-span-12 text-center py-5 gap-3 grid text-white">
                    <div className="text-4xl font-bold">Proposal 1</div>
                    <div>👷 Request public work or maintenance</div>
                    <div>This is the description for this test proposal on the filecoin wallaby testnet</div>
                    <div className="text-lg text-white/60">made by: t410fatggwsdvm2y4qin6ubgxvqgshtw6axgjmmulcpi</div>
                </div>
                <div className="col-span-12 grid grid-cols-3 text-center py-5 gap-5">
                    <Link href="https://goo.gl/maps/WKWKG648BukfDC4v9" ><div className="bg-gray-100 rounded-xl hover:bg-blue-500 px-3 py-2 cursor-pointer hover:text-white">Location</div></Link>
                    <Link href='https://www.facebook.com/CiudadDAO.eth/posts/pfbid02AJmVZ1QyAWdG3WsAkTvTtsCvWjJFpH1sDzuaG56uYC9V1FQZkoyiHCRceRZBnPSdl?comment_id=425743546249355'><div className="bg-gray-100 rounded-xl hover:bg-blue-500 px-3 py-2 cursor-pointer hover:text-white">Social media URL</div></Link>
                    <Link href='https://bafybeigeofglv6aewbbd57b2vznipj5tsincdfad7enwapuc7ae6mwohli.ipfs.nftstorage.link/'><div className="bg-gray-100 rounded-xl hover:bg-blue-500 px-3 py-2 cursor-pointer hover:text-white">File on filecoin</div></Link>
                </div>
                <div className="col-span-12 grid grid-cols-2 text-center items-center gap-5">
                    <div className="py-3 rounded-xl bg-green-100 hover:bg-green-500 cursor-pointer">Vote to</div>
                    <div className="py-3 rounded-xl bg-red-100 hover:bg-red-500 cursor-pointer">Vote against</div>
                </div>


            </div>
        </div>
    )
}