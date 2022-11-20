export default function VoteProposal() {
    return (
        <div className="relative justify-center sm:items-center py-4 sm:pt-0 font-exo ">
            <div className="card1 px-5 max-w-3xl ">
                <div className="col-span-12 grid grid-cols-2 text-center text-white font-bold text-xl">
                    <div>Proposal id</div>
                    <div>Time left to vote</div>
                </div>
                <div className="col-span-12 text-center py-5 gap-3 grid text-white">
                    <div className="text-xl">Proposal tittle</div>
                    <div>Type of activity</div>
                    <div>Description</div>
                    <div>Author</div>
                </div>
                <div className="col-span-12 grid grid-cols-3 text-center py-5 gap-5">
                    <div className="bg-gray-100 rounded-xl hover:bg-blue-500 px-3 py-2 cursor-pointer hover:text-white">Location</div>
                    <div className="bg-gray-100 rounded-xl hover:bg-blue-500 px-3 py-2 cursor-pointer hover:text-white">Social media URL</div>
                    <div className="bg-gray-100 rounded-xl hover:bg-blue-500 px-3 py-2 cursor-pointer hover:text-white">File on filecoin</div>
                </div>
                <div className="col-span-12 grid grid-cols-2 text-center items-center gap-5">
                    <div className="py-3 rounded-xl bg-green-100 hover:bg-green-500 cursor-pointer">Vote to</div>
                    <div className="py-3 rounded-xl bg-red-100 hover:bg-red-500 cursor-pointer">Vote against</div>
                </div>


            </div>
        </div>
    )
}