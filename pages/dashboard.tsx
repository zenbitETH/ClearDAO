import Link from "next/link"

export default function Dashboard() {
    return (        
        <div className='bg-gray-500 text-white h-[80vh] p-5 rounded-2xl'>
            <div className='grid grid-cols-12 items-center gap-5 text-center'>
                <div className='text-center font-bold'>Prop ID</div>
                <div className='col-span-4 text-left grid font-bold'>
                    <div className='text-left'>Tittle</div>
                </div>
                <div className='col-span-1 font-bold'>
                   Status
                </div>
                <div className='col-span-2 font-bold'>
                    PNT request
                </div>
                <div className='col-span-2 font-bold'>
                    PNT File
                </div>
                <div className='grid col-span-2 font-bold '>
                    Actions
                </div>

                <div className='text-center'>
                    1
                </div>
                <div className='col-span-4 text-left grid'>
                    Proposal 1
                </div>
                <div className='col-span-1'>
                   1. voting
                </div>
                <div className='col-span-2'>
                    request id
                </div>
                <div className='col-span-2'>
                    F
                </div>
                <div className='grid col-span-2 grid-cols-2'>
                    <Link href='/voteProposal' ><div className="hover:text-green-500 cursor-pointer">Detail</div></Link>
                    <div>Add file</div>
                </div>
            </div>
        </div>
    )
}