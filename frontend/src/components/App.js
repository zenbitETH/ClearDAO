import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ValidationRequiredContext } from '../contexts/ValidationRequiredContext';
import { VotoContext } from '../contexts/VotoContext';
import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';
import { LanguageContext } from '../contexts/LanguageContext';
import { EthersContext } from '../contexts/EthersContext';
import { ConnectedContext } from '../contexts/ConnectedContext';
import { useLocalState } from '../contexts/hooks';

import Home from './Home';
import About from './About';
import ProposalList from './ProposalList';
import Quiz from './Quiz';
import Hud from './Hud';
import CreateProposal from './CreateProposal';
import PastProposals from './PastProposals';

function App() {
  let [isValidated, setIsValidated] = useState();
  let [voto, setVoto] = useState();
  // let [isEnglish, setIsEnglish] = useState();
  let [governorAlpha, setGovernorAlpha] = useState();
  let [ethersSigner, setEthersSigner] = useState();
  let [isConnected, setIsConnected] = useState();
  let [provider, setProvider] = useState();

  const [isEnglish, setLoc] = useLocalState();

    return (
    <div>
      <LanguageContext.Provider value={[isEnglish, setLoc]}>
        <GovernorAlphaContext.Provider value={{governorAlpha, setGovernorAlpha}}>
          <VotoContext.Provider value={{voto, setVoto}}>
            <EthersContext.Provider value={{ethersSigner, setEthersSigner, provider, setProvider}}>
              <ValidationRequiredContext.Provider value={{isValidated, setIsValidated}}>
                <ConnectedContext.Provider value={{isConnected, setIsConnected}}>
                  <Router>
                    <Hud />
                    <Switch>
                      <Route path="/about"><About /></Route>
                      <Route path="/ProposalList"><ProposalList /></Route>
                      <Route path="/createproposal"><CreateProposal /></Route>
                      <Route path="/quiz"><Quiz /></Route>
                      <Route path="/pastproposals"><PastProposals /></Route>
                      <Route path="/"><Home /></Route>
                    </Switch>
                  </Router>
                </ConnectedContext.Provider>
              </ValidationRequiredContext.Provider>
            </EthersContext.Provider>
          </VotoContext.Provider>
        </GovernorAlphaContext.Provider>
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
