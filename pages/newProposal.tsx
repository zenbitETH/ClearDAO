export default function NewProposal() {
    return (
        <div className="relative justify-center sm:items-center py-4 sm:pt-0 font-exo ">
      <div className="card0 px-5 max-w-3xl ">
        <div className="col-span-12 row-span-5 text-center rounded-3xl p-5">
          <form >
          <div className="text-white text-4xl mb-10">⛲ Add Place</div>
            <div className="text-left text-lg">
              <label className="text-white">1. Proposal tittle</label>
              <input type="text" name="placeName"  placeholder="🎯 Name your propsal"  className="formInput mt-2 mb-5" 
              />
              <label className="text-white">2. Type of activity:</label>
              <select id="TypeOfPlace" placeholder="Park" name="placeType" className="bg-white mb-5 pl-5 text-black w-full rounded-lg px-6 py-3 mt-2 ">
                <option disabled selected>⚙️ Select the type of activity</option>
                  <option> 🌳 In-person event </option>
                  <option> 💻 Online event </option>
                  <option> ⚠️ Security report </option>
                  <option> 👷 Request public work or maintenance </option>
                  <option> ⚙️ Add function to ClearDAO</option>
              </select>
              <label className="text-white">3. Description</label>
              <textarea name="placeName"  placeholder="📑 Describe your propsal and add any relevant detail"  className="formInput mt-2 mb-5" 
              />
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                    <label className="text-white">4. Location</label>
                    <input type="text" name="latitude"  placeholder="🗺️ paste the google maps url" className="formInput mt-2 mb-5"/>
                </div>
                <div>
                    <label className="text-white">Social media</label>
                    <input type="text" name="longitude"  placeholder="🤳 paste a social media url" className="formInput mt-2 mb-5"/>
                </div>
              </div>
              <div className='p-5'>
                    <div className='text-white text-center'>☁️ Upload PNT file</div>
                    <div className="flex justify-center items-center w-full">
                        <label className="formFile">
                            <div className="cursor-pointer flex flex-col justify-center items-center pt-5 pb-6">
                                <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className=" mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>

                            </div>
                            <input id="dropzone-file" type="file" className="hidden" />
                          

                        </label>
                    </div>
                </div>
             
              
            </div>
          </form>
          
        </div>
        <div className="col-span-12 text-center mb-10">
          {/*onClick={() => tx(writeContracts.YourContract.registerUser(name, hometown, country))} */}
          <div className="formBT">Create Proposal</div>
        </div>
      </div>
      </div>
    )
}