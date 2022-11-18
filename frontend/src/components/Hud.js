import { useEffect, useState, useContext } from 'react';
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers';
import ConnectButton from './buttons/ConnectButton';
import ConnectingButton from './buttons/ConnectingButton';
import InstallMetamaskAlert from './InstallMetamaskAlert';
import PolygonButton from './buttons/PolygonButton';
import PolygonSwitch from './buttons/PolygonSwitch';
import SwitchPolygonAlert from './SwitchPolygonAlert';
import { ValidationRequiredContext } from '../contexts/ValidationRequiredContext';
import { VotoContext } from '../contexts/VotoContext';
import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';
import { EthersContext } from '../contexts/EthersContext';
import { ConnectedContext } from '../contexts/ConnectedContext';

import Voto from '../contracts/contracts/Voto.sol/Voto.json';
import votoAddress from '../contracts/contracts/Voto/contract-address.json';
import logo from '../assets/Logoww.png'
import CIT from '../assets/certamenIT.png'

import GovernorAlpha from '../contracts/contracts/GovernorAlpha.sol/GovernorAlpha.json'
import governorAlphaAddress from '../contracts/contracts/GovernorAlpha/contract-address.json';

const Header = () => {
  let [ethersProvider, setEthersProvider] = useState();
  let [isConnecting, setIsConnecting] = useState();
  let [isMetamaskInstalled, setIsMetamaskInstalled] = useState();
  let [IsPolygonSwitched, setIsPolygonSwitched] = useState();
  let [currentMetaMaskAccount, setCurrentMetaMaskAccount] = useState(null);
  var [userBalance, setUserBalance] = useState();
  let [isConnectingToPolygon, setIsConnectingToPolygon] = useState();

  let {isValidated,setIsValidated} = useContext(ValidationRequiredContext);
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
        rpcUrls: "https://matic-mumbai.chainstacklabs.com",
        nativeCurrency: {
          name: "MATIC",
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
          method: "wallet_switchEthereumChain",
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
      <div class="center">
        <nav>    
          {isConnected ? 
          <div>            
            <div class="topHud">
              <div class="topGrid">
                <a href='/CreateProposal' class="hudH">
                  <div>{userBalance} VOTO</div>
                </a> 
              </div>
              <div class="double"></div>
            </div>
            <div class="bottomHud">
              <div class="bottomGrid">
                <a class="hud0" href='/'>
                  <div>🏠<div class="MiniTitle">Inicio</div></div>
                </a>

                {isValidated ? 
                <>
                  <a class="hud1" href='/PastProposal'>
                    <div>💡<div class="MiniTitle">Proponer</div></div>
                  </a>
                  <a class="hud1" href='/ProposalList'>
                    <div>🗳️<div class="MiniTitle">Por votar</div></div>
                  </a>
                  <a class="hud2" href='/PastProposals'>
                    <div>📅<div class="MiniTitle">Historial</div></div>
                  </a>
                </>
                : 
                <a href='/Quiz' class="no-validation">
                  <div >Realiza la certificación Web3</div>
                </a>
                }
                
              </div>
            </div> 
         </div>
          : 
          <div>  
            
            <div class="walletHud">
              {!isMetamaskInstalled ?
                <InstallMetamaskAlert /> : isConnected ?'' : isConnecting ?
                <ConnectingButton /> : <ConnectButton handleOnConnect={handleOnConnect}/>
              }
            </div>
            
          </div> }       
          
          {/*!IsPolygonSwitched ?
            <div>
              <SwitchPolygonAlert/> {isConnectingToPolygon ?
              <PolygonSwitch /> : <PolygonButton handleOnClick={listPolygonInMetamask}/>}
            </div>

            <a class="hudB" href='https://github.com/zenbitETH/Ciudades-DAO#readme'>
                  <div>📚<div class="MiniTitle">Documentación</div></div>
                </a>
                <a class="hudB1" href='https://discord.gg/mn8GhcPeEb'>
                  <div>💬<div class="MiniTitle">Discord</div></div>
                </a>
                <a class="hudB2" href='/'>
                  <div>👨‍🏫<div class="MiniTitle">Tutoriales</div></div>
                </a>
            : 
            ''
              */}         
        </nav>          
      </div>
    </div>
  );
};


export default Header;
