// import detectEthereumProvider from '@metamask/detect-provider';
// import { ethers } from 'ethers';
// import { EthersContext } from '../contexts/EthersContext';
// import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';

// import Voto from '../contracts/contracts/Voto.sol/Voto.json';
// import votoAddress from '../contracts/contracts/Voto/contract-address.json';
//
// import GovernorAlpha from '../contracts/contracts/GovernorAlpha.sol/GovernorAlpha.json';
// import governorAlphaAddress from '../contracts/contracts/GovernorAlpha/contract-address.json';

const RejectedProposal = ({title, typeOfAction, locationURL, web2URL, description, expiration, fileURL, requiredVotoToVote, forVotes, againstVotes, id, proposer, proposalYear, proposalMonth, proposalDay}) => {
  // let [governorAlpha, setGovernorAlpha] = useState();
  // let [voto, setVoto] = useState();
  // let [signerAddress, setSignerAddress] = useState();
  // let {governorAlpha} = useContext(GovernorAlphaContext);
  // let {provider} = useContext(EthersContext);
  //
  // useEffect(() => {
  //   const main = async () => {
  //     // setIsMetamaskInstalled(true);
  //     // setIsConnected(false);
  //     try {
  //       //detect whether the browser is connected to a provider
  //       let ethereumProvider = await detectEthereumProvider();
  //       if (ethereumProvider) {
  //         // setProvider(ethereumProvider);
  //         startApp(ethereumProvider);
  //       } else {
  //         // setIsMetamaskInstalled(false);
  //         return;
  //       };
  //     } catch (error) {
  //       console.error(error);
  //     };
  //
  //     async function startApp(_ethereumProvider) {
  //       try {
  //         //The provider detected by detectEthereumProvider() must be the same as window.ethereum
  //         if (_ethereumProvider !== window.ethereum) {
  //           // setIsMetamaskInstalled(false);
  //           return;
  //         };
  //
  //         //Check if a MetaMask account has permission to connect to app
  //         let metamaskAccount;
  //         let accounts = await _ethereumProvider.request({ method: 'eth_accounts' });
  //           if (accounts.length > 0) {
  //             metamaskAccount = accounts[0];
  //             // setCurrentMetaMaskAccount(accounts[0]);
  //             // setIsMetamaskInstalled(true);
  //             // setIsConnected(true);
  //           };
  //         console.log(`metamaskAccount ${metamaskAccount}`);
  //
  //         //Force the browser to refresh whenever the network chain is changed
  //         // let chainId = await _ethereumProvider.request({ method: 'eth_chainId' });
  //         // _ethereumProvider.on('chainChanged', handleChainChanged);
  //         // console.log('chainId: ', chainId);
  //
  //         //Create the Ethers.js provider and set it in state
  //         let _ethersProvider = await new ethers.providers.Web3Provider(_ethereumProvider);
  //         // setEthersProvider(_ethersProvider);
  //         console.log('_ethersProvider: ', _ethersProvider)
  //         // make call to contract to check if current user is validated.
  //         // this may need to be done inside handleOnConnect as well
  //         // if user is validated, then set isValidated(true)
  //
  //         if(accounts.length !== 0) {
  //           let signer = await _ethersProvider.getSigner();
  //           // setEthersSigner(signer);
  //
  //           const _voto = new ethers.Contract(
  //             votoAddress.Voto,
  //             Voto.abi,
  //             signer
  //           );
  //           setVoto(_voto);
  //
  //           let _signerAddress = await signer.getAddress();
  //           // console.log("signerAddress: ", _signerAddress);
  //           setSignerAddress(_signerAddress);
  //
  //           // let _userBalance = await _voto.balanceOf(signerAddress);
  //           // console.log('_userBalance in useEffect: ', _userBalance.toString());
  //           // if(_userBalance) {
  //           //   setUserBalance(_userBalance.toString());
  //           // };
  //
  //           const _governorAlpha = new ethers.Contract(
  //             governorAlphaAddress.GovernorAlpha,
  //             GovernorAlpha.abi,
  //             signer
  //           );
  //           setGovernorAlpha(_governorAlpha);
  //         };
  //       } catch (error) {
  //         console.error(error);
  //       };
  //     };
  //   };
  //   main();
  // }, []);

  return (
    <div>
    <div class="proposal">
      <div class="proposal-expiration">
          <div class="prop-title">💡 Propuesta # {id}</div>
          <span class="yellowr"> Hecha el {proposalDay}/{proposalMonth}/{proposalYear}</span> 
        </div>
        <div class="rproposal">Rechazada por {againstVotes} votes</div>
        <div class="mini-title">🎯 Objetivo:</div>
        <div class="prop-hl2"> {title}</div><br/><br/>
        <div class="grid-prop">
          <div class="minit-bg">⚙️ Acción: <div class="prop-hl2">{typeOfAction}</div></div>
          <div class="minit-bg2">🤳 Social Media: <a href={web2URL}><div className="prop-hl">Ver publicación</div></a></div>      
          <div class="minit-bg3"> 📍 Dónde: <a href={locationURL}><div className="prop-hl">Ver Gooogle Maps</div></a></div>
          <div class="minit-bg3">☁️ Archivo o Contenido: <a href={fileURL}><div className="prop-hl">Ver en la nube</div></a> </div>
        </div>
        <div class="description-bg">📑 Descripción: <div class="prop-description">{description}</div></div>
          {/*}
          <div className ="proposal-main">
            <div className="proposal-sub">Costo: {fileURL}</div>
            <div className="proposal-subaction">VOTO to vote:{requiredVotoToVote} VOTO</div>
          </div>
          */}
      <div class="author"> Hecha por {proposer}</div><br/>
        <div className="vote-grid">
          <div class="prop-bgw">Votos a favor:<br/>{forVotes}<br/>VOTO</div>    
          <div class="prop-bga2">Rechazada por:<br/>{againstVotes}<br/> VOTO</div>
        </div>
      </div>
    </div>
  );
};

export default RejectedProposal;
