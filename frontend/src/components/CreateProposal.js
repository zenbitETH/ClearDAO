import { useState, useContext, useEffect } from 'react';
import { Form, Row} from 'react-bootstrap';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import IsLoadingModal from '../modals/IsLoadingModal';
import CreateProposalSuccessModal from '../modals/CreateProposalSuccessModal';
import CreateProposalErrorModal from '../modals/CreateProposalErrorModal';
import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';
import { EthersContext } from '../contexts/EthersContext';
import { VotoContext } from '../contexts/VotoContext';


import Voto from '../contracts/contracts/Voto.sol/Voto.json';
import votoAddress from '../contracts/contracts/Voto/contract-address.json';

import GovernorAlpha from '../contracts/contracts/GovernorAlpha.sol/GovernorAlpha.json';
import governorAlphaAddress from '../contracts/contracts/GovernorAlpha/contract-address.json';

const CreateProposal = () => {
  let [form, setForm] = useState();
  let [loadingModalShow, setLoadingModalShow] = useState();
  let [errorModalShow, setErrorModalShow] = useState();
  let [isConnected, setIsConnected] = useState();
  let [ethersProvider, setEthersProvider] = useState();
  let [signerAddress, setSignerAddress] = useState();
  let [successModalShow, setSuccessModalShow] = useState();

  let {ethersSigner, setEthersSigner, provider, setProvider} = useContext(EthersContext);
  let {voto, setVoto} = useContext(VotoContext);
  let {governorAlpha, setGovernorAlpha} = useContext(GovernorAlphaContext);
  
  useEffect(() => {
    const main = async () => {
      // setIsMetamaskInstalled(true);
      setIsConnected(false);
      try {
        //detect whether the browser is connected to a provider
        let ethereumProvider = await detectEthereumProvider();
        if (ethereumProvider) {
          // setProvider(ethereumProvider);
          startApp(ethereumProvider);
        } else {
          // setIsMetamaskInstalled(false);
          return;
        };
      } catch (error) {
        console.error(error);
      };

      async function startApp(_ethereumProvider) {
        try {
          //The provider detected by detectEthereumProvider() must be the same as window.ethereum
          if (_ethereumProvider !== window.ethereum) {
            // setIsMetamaskInstalled(false);
            return;
          };

          //Check if a MetaMask account has permission to connect to app
          let metamaskAccount;
          let accounts = await _ethereumProvider.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
              metamaskAccount = accounts[0];
              // setCurrentMetaMaskAccount(accounts[0]);
              // setIsMetamaskInstalled(true);
              setIsConnected(true);
            };
          console.log(`metamaskAccount ${metamaskAccount}`);

          //Force the browser to refresh whenever the network chain is changed
          // let chainId = await _ethereumProvider.request({ method: 'eth_chainId' });
          // _ethereumProvider.on('chainChanged', handleChainChanged);
          // console.log('chainId: ', chainId);

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

            let _signerAddress = await signer.getAddress();
            // console.log("signerAddress: ", _signerAddress);
            setSignerAddress(_signerAddress);

            // let _userBalance = await _voto.balanceOf(signerAddress);
            // console.log('_userBalance in useEffect: ', _userBalance.toString());
            // if(_userBalance) {
            //   setUserBalance(_userBalance.toString());
            // };

            const _governorAlpha = new ethers.Contract(
              governorAlphaAddress.GovernorAlpha,
              GovernorAlpha.abi,
              signer
            );
            setGovernorAlpha(_governorAlpha);
          };
        } catch (error) {
          console.error(error);
        };
      };
    };
    main();
  }, []);

  //Delay function is only for development
  // const delay = () => new Promise(res => setTimeout(res, 2000));

  const handleOnSubmit = async e => {
    e.preventDefault();
    setLoadingModalShow(true);
    console.log('form: ', form);

    try {
      //form.fileURL = ethers.BigNumber.from(form.fileURL);

      let tx = await governorAlpha.propose(form);
      let txReceipt = await tx.wait(1);
      console.log('form tx: ', txReceipt);
      handleOnLoadingModal();
      setSuccessModalShow(true);
    } catch (e) {
      handleOnLoadingModal();
      setErrorModalShow(true);
    };
  };
  //expiration and requiredVotoToVote are hardcoded because these fields are needed for the smart contract.  The front end is not ready to use these fields.  Later, when the front end is ready, these inputs can be added back into the form inputs.
  const setField = (field, value) => {
    const date = new Date();
    const time = date.getTime();
    let timeAsBigNumber = ethers.BigNumber.from(time);

    setForm({
      ...form,
      [field]: value,
      expiration: 0,
      requiredVotoToVote: 0,
      proposalTime: timeAsBigNumber,
      proposer: signerAddress
    });
  };

  const handleOnChangeTitle = e => {
    setField('title', (e.target.value).toString());
  };

  const handleOnChangeTypeOfAction = e => {
    setField('typeOfAction', (e.target.value).toString());
  };

  const handleOnChangeLocationURL = e => {
    setField('locationURL', (e.target.value).toString());
  };

  const handleOnChangeWeb2URL = e => {
    setField('web2URL', (e.target.value).toString());
  };

  const handleOnChangeDescription = e => {
    setField('description', (e.target.value).toString());
  };

  // const handleOnChangeExpiration = e => {
  //   setField('expiration', ethers.BigNumber.from(e.target.value));
  // };

  const handleOnChangeFileURL = e => {
    setField('fileURL', (e.target.value).toString());
  };

  // const handleOnChangeRequiredVotoToVote = e => {
  //   setField('requiredVotoToVote', ethers.BigNumber.from(e.target.value));
  // };

  const handleOnLoadingModal = () => {
    setLoadingModalShow(false);
  };

  const handleOnErrorModal = () => {
    setErrorModalShow(false);
    window.location.reload();
  };

  const handleOnAlreadySubmitted = () => {
    window.location.reload();
  };
  



  return (
    <body id="quiz">
      <div id="proposal" class="newprop">
        <h2><span  class="yellow">Nueva propuesta</span></h2><br/><br/>
          
        <Form autocomplete="off" id="margin">
            <Form.Group as={Row} controlId="formTitle">
            <Form.Label  >
              1. Nombre de la propuesta
              </Form.Label>
              <Form.Control type="text"
                placeholder="🎯 ¿Qué hay que hacer?"
                onChange={handleOnChangeTitle}/>
            </Form.Group>
          

          
            <Form.Group as={Row} controlId="formTypeOfAction">
            <Form.Label >
              2. Tipo de actividad 
              </Form.Label>
              <Form.Control as="select" data-live-search="true"
                onChange={handleOnChangeTypeOfAction}>
                  <option disabled selected>⚙️ Selecciona el tipo de actividad</option>
                 <option> 🌳 Evento presencial </option>
                 <option> 💻 Evento en línea </option>
                 <option> ⚠️ Reporte de seguridad </option>
                 <option> 👷 Solicitar obra o mantenimiento </option>
                 <option> ⚙️ Añadir función en Ciudades DAO </option>
              </Form.Control>
            </Form.Group>
          
            
          
            <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
              <Form.Label>
               3. Descripción
            </Form.Label>
            <Form.Control className="description" as="textarea"
              type="text" rows={3}
              placeholder="📑Describe a detalle tu propuesta."
              onChange={handleOnChangeDescription}/>
            </Form.Group>

            <Form.Group as={Row} controlId="formLocationURL" >
              <Form.Label  >
              4. Ubicación de la propuesta
              </Form.Label>
                <Form.Control type="text"
                  placeholder="🗺️ Pega el URL de Google Maps de la ubicación."
                  onChange={handleOnChangeLocationURL}>
                </Form.Control>
            </Form.Group>

            <Form.Group as={Row} controlId="formWeb2URL">    
              <Form.Label  >
                5. Referencia en redes sociales
              </Form.Label>
              <Form.Control type="text"
                placeholder="🤳 Pega el URL de la referencia en twitter, facebook, etc."
                onChange={handleOnChangeWeb2URL}>
              </Form.Control>
            </Form.Group>

            {/*
            <Form.Group as={Row} controlId="formExpiration">
              <Form.Label  >
                Expiration
              </Form.Label>
              <Form.Control type="text" placeholder="expiration" onChange={handleOnChangeExpiration}/>
            </Form.Group>
            */}
 
            <Form.Group as={Row} controlId="formFileURL">
              <Form.Label  >
                6. Archivo o contenido 
              </Form.Label>
              <Form.Control type="text"
                placeholder="☁️ Pega el URL donde esté almacenado el archivo o contenido."
                onChange={handleOnChangeFileURL}/>
            </Form.Group>
            {/*
            <Form.Group as={Row} controlId="formRequiredVotoToVote">
              <Form.Label  >
                Required VOTO to vote
            </Form.Label>
              <Form.Control type="text" placeholder="required VOTO to vote" onChange={handleOnChangeRequiredVotoToVote}/>
            </Form.Group>
            */}
            <a class="about-bt" href="#proposal">Revisa tu puesta antes de enviar</a>
              <div class="center"><div class="quiz-bt" classntype="submit" onClick={handleOnSubmit}>💡 Enviar propuesta</div></div>
            </Form>
          <IsLoadingModal
            show={loadingModalShow}
            onHide={handleOnLoadingModal}
          />
 
          <CreateProposalErrorModal
            show={errorModalShow}
            onHide={handleOnErrorModal}
          />
 
          <CreateProposalSuccessModal
            show={successModalShow}
            onHide={handleOnAlreadySubmitted}
          />
        </div>
      </body>
      );
    };
export default CreateProposal;
