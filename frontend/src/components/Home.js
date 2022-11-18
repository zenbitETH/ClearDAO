import { useEffect, useState, useContext } from 'react';
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers';
import PolygonButton from './buttons/PolygonButton';
import PolygonSwitch from './buttons/PolygonSwitch';
import SwitchPolygonAlert from './SwitchPolygonAlert';
import { ValidationRequiredContext } from '../contexts/ValidationRequiredContext';
import { VotoContext } from '../contexts/VotoContext';
import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';
import { EthersContext } from '../contexts/EthersContext';
import { ConnectedContext } from '../contexts/ConnectedContext';
import VideoEmbed from '../components/VideoEmbed'

import test from '../assets/testnet.svg';
import wallet from '../assets/confirm.svg'
import prop from '../assets/prop.svg';
import past from '../assets/vote.svg';
import verify from '../assets/verify.svg';
import gas from '../assets/gas.svg';
import logo from '../assets/Logoww.png';
import CIT from '../assets/certamenIT.png'
import tuto from '../assets/tuto.svg'


import Voto from '../contracts/contracts/Voto.sol/Voto.json';
import votoAddress from '../contracts/contracts/Voto/contract-address.json';

import GovernorAlpha from '../contracts/contracts/GovernorAlpha.sol/GovernorAlpha.json'
import governorAlphaAddress from '../contracts/contracts/GovernorAlpha/contract-address.json';

function Home() {
  let [ethersProvider, setEthersProvider] = useState();
  let [isConnecting, setIsConnecting] = useState();
  let [isMetamaskInstalled, setIsMetamaskInstalled] = useState();
  let [IsPolygonSwitched, setIsPolygonSwitched] = useState();
  let [currentMetaMaskAccount, setCurrentMetaMaskAccount] = useState(null);
  var [userBalance, setUserBalance] = useState();
  let [isConnectingToPolygon, setIsConnectingToPolygon] = useState();

  let {setIsValidated,isValidated} = useContext(ValidationRequiredContext);
  let {setVoto} = useContext(VotoContext);
  let {setGovernorAlpha} = useContext(GovernorAlphaContext);
  let {setEthersSigner, provider, setProvider} = useContext(EthersContext);
  let {isConnected, setIsConnected} = useContext(ConnectedContext);

  useEffect(() => {
    const init = async () => {
      setIsMetamaskInstalled(true);
      setIsConnected(false);
      try {
        //detect whether the browser is connected to a provider
        let ethereumProvider = await detectEthereumProvider();
        if (ethereumProvider) {
          setProvider(ethereumProvider);
          startApp(ethereumProvider);
        } else {
          setIsMetamaskInstalled(false);
          return;
        };
      } catch (error) {
        console.error(error);
      };

      async function startApp(_ethereumProvider) {
        try {
          //The provider detected by detectEthereumProvider() must be the same as window.ethereum
          if (_ethereumProvider !== window.ethereum) {
            setIsMetamaskInstalled(false);
            return;
          };

         // Force the browser to refresh whenever the network chain is changed
          let chainId = await _ethereumProvider.request({ method: 'eth_chainId' });
          _ethereumProvider.on('chainChanged', handleChainChanged);
          console.log('chainId: ', chainId);
         
          if (chainId === '80001') {
            setIsPolygonSwitched(true);
          };

          //Check if a MetaMask account has permission to connect to app
          let metamaskAccount;
          let accounts = await _ethereumProvider.request({ method: 'eth_accounts' });

          if (accounts.length > 0) {
            metamaskAccount = accounts[0];
            setCurrentMetaMaskAccount(accounts[0]);
            setIsMetamaskInstalled(true);
            setIsConnected(true);
          };
          console.log(`metamaskAccount ${metamaskAccount}`);

          //Create the Ethers.js provider and set it in state
          let _ethersProvider = await new ethers.providers.Web3Provider(_ethereumProvider);
          setEthersProvider(_ethersProvider);
          console.log('_ethersProvider: ', _ethersProvider)
          // make call to contract to check if current user is validated.
          // this may need to be done inside handleOnConnect as well
          // if user is validated, then set isValidated(true)

          if(accounts.length !== 0) {
            let signer = await _ethersProvider.getSigner();
            setEthersSigner(signer);

            const _voto = new ethers.Contract(
              votoAddress.Voto,
              Voto.abi,
              signer
            );
            setVoto(_voto);

            let signerAddress = await signer.getAddress();
            console.log("signerAddress: ", signerAddress);

            let _userBalance = await _voto.balanceOf(signerAddress);
                _userBalance = _userBalance.div(Math.pow(10,18).toString());
              console.log('_userBalance in useEffect: ', _userBalance.toString());
            if(_userBalance) {
              setUserBalance(_userBalance.toString());
            };

            const _governorAlpha = new ethers.Contract(
              governorAlphaAddress.GovernorAlpha,
              GovernorAlpha.abi,
              signer
            );
            setGovernorAlpha(_governorAlpha);

            let _isValidated = await _governorAlpha.getValidityStatus();
            let userExpirationTime = _isValidated[0].toNumber();
            let currentBlockTimestamp = _isValidated[1].toNumber();

            if(userExpirationTime === 0) {
              console.log('user is zero time; not validated');
              setIsValidated(false);
            } else if (currentBlockTimestamp > userExpirationTime){
              console.log('user is past validity period; not validated');
              setIsValidated(false);
            } else {
              setIsValidated(true);
              console.log('user exp time: ', _isValidated[0].toNumber());
              console.log('block.timestamp: ', _isValidated[1].toNumber());
            };

          };
        } catch (error) {
          console.error(error);
        };
      };
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Enable app to have Polygon among listed networks
  const listPolygonInMetamask = async () => {
    setIsConnectingToPolygon(true);
    //let endpoint = "http://eth-global-11.skalenodes.com:10323";
    let chainId = "0x13881";

    let switchToPOLYGON = {
      chainId: chainId,
      chainName: "Polygon Testnet",
      rpcUrls: "https://matic-mumbai.chainstacklabs.com/",
      nativeCurrency: {
        name: "MATIC token",
        symbol: "MATIC",
        decimals: 18
      },
      blockExplorerUrls: [
        "https://mumbai.polygonscan.com/"
      ]
    };
    //Request current account selected in Metamask
    let metamaskAccount;
    let accounts = await provider.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        metamaskAccount = accounts[0];
        setCurrentMetaMaskAccount(accounts[0]);
        setIsMetamaskInstalled(true);
        setIsConnected(true);
      } else {
      };
    console.log(`metamaskAccount in Skale function: ${metamaskAccount}`);

    //Request change to Polygon network
    try {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [switchToPOLYGON, accounts[0]]
      });

      setIsConnectingToPolygon(false);
      setIsPolygonSwitched(true);

      window.location.reload();
    }catch (error) {
      console.log(error);
      window.location.reload();
    };
  };

  const getAccounts = async () => {
    try {
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      await handleAccountsChanged(accounts);
    } catch (error) {
      console.error(error);
    };
  };

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentMetaMaskAccount) {
      console.log('account[0]: ', accounts[0]);
      setCurrentMetaMaskAccount(accounts[0]);
      setIsConnected(true);
      setIsConnecting(false);
      setIsMetamaskInstalled(true);
    }
  };

  function handleChainChanged(_chainId) {
    window.location.reload();
  };

  //Give a MetaMask account permission to interact with the app
  const handleOnConnect = async () => {
    setIsConnecting(true);
    try {
      await getAccounts();

      provider.on('accountsChanged', handleAccountsChanged);

      let signer = await ethersProvider.getSigner();
      setEthersSigner(signer);

      const _voto = new ethers.Contract(
        votoAddress.Voto,
        Voto.abi,
        signer
      );
      setVoto(_voto);

      let signerAddress = await signer.getAddress();
      console.log("signerAddress in handleOnConnect: ", signerAddress);

      let _userBalance = await _voto.balanceOf(signerAddress);
          _userBalance = _userBalance.div(Math.pow(10,18).toString());
          console.log('_userBalance in useEffect: ', _userBalance.toString());
        if(_userBalance) {
          setUserBalance(_userBalance.toString());
        };

      const _governorAlpha = new ethers.Contract(
        governorAlphaAddress.GovernorAlpha,
        GovernorAlpha.abi,
        signer
      );
      setGovernorAlpha(_governorAlpha);
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <div>
      <div class="App">
        <div class="grid-block">
          <div className='homemargin'>
            {isConnected ?
            <section id="">
              <div class="headline">
                <h2>Actividades en Ciudades DAO</h2>
              </div>
              
              <div class="homegrid">
                {/*<a class="bg-grid0"href="/About">
                  <img src={tuto} class="homevan"/>
                  <div class="propsub">¿Sin idea que hacer?</div>
                  <div class="propopt">Ver tutoriales</div>
                </a>*/}
                {isValidated ? '':
                <a class="bg-grid0"href="/Quiz">
                  <img src={verify} class="homevan"/>
                  <div class="propsub">Obtén hasta 100 VOTOs</div>
                  <div class="propopt">Certificación Web3</div>
                </a>}
                {isValidated ? <a class="bg-grid0" href="/createProposal">
                  <img src={prop} class="homevan"/> 
                  <div class="propsub">Obtén 10 VOTOs por hacer</div>
                  <div class="propopt">Propuestas DAO</div>
                </a>
                 : <div class="bg-blocked" >
                 <img src={prop} class="homevan"/> 
                 <div class="propsub">Certificate para desbloquear</div>
                 <div class="propopt">Propuestas DAO</div>
               </div>}
               {isValidated ?
              <a class="bg-grid0" href="/ProposalList">
                  <img src={past} class="homevan"/> 
                  <div class="propsub">Usa tus VOTOs en</div>
                  <div class="propopt">Querétaro DAO</div>
                </a>
                :
                <div class="bg-blocked" >
                  <img src={past} class="homevan"/> 
                  <div class="propsub">Certificate para desbloquear</div>
                  <div class="propopt">Qurétaro DAO</div>
                </div>}
              </div>
            </section>
            :
            <section>
                <div class="homemargin">
                  <a href='/'>
                    <img class="hudlogo" src={logo}/>
                  </a>
                  <a href='https://certamentransparencia.org.mx/'>
                    <img class="hudCIT" src={CIT}/>
                  </a>
                </div>
                <div className='videoMargin'>
                  <VideoEmbed
                  embedId="Dn3ryqVLCvo" 
                  />
                </div>
              <div class="headline">
                <h2>¿Ya tienes las herramientas Web3 necesarias?</h2>
              </div>
              
                <div class="grid-blocked">
                  <a href="https://metamask.io/" class="bg-grid0">
                    <img src={wallet} class="homevan"/> 
                    <div class="propsub">¿Tienes cómo conectarte?</div>
                    <div class="propopt">1. Ir por Wallet Web3</div>
                  </a>
                  <a class="bg-grid0" href="https://chainlist.org/chain/80001/">
                    <img src={test} class="homevan"/> 
                    <div class="propsub">¿Estás en la red correcta?</div>
                    <div class="propopt">2. Ir a red de pruebas </div>
                  </a>
                  <a class="bg-grid0" href="https://faucet.polygon.technology/">
                    <img src={gas} class="homevan"/> 
                    <div class="propsub">¿Tienes gas? </div>
                    <div class="propopt">3. Conseguir Gas </div>
                  </a>
                </div>
            </section>      
            }
          </div>
        </div>
      </div>
    </div> 
  );
}


export default Home;

