import img from '../assets/about-img.svg';
import vote from '../assets/vote.svg';

import TAROrew from '../assets/TAROrew.png';
import moon from '../assets/moon.svg'

const About = () => {
  
  return (
    <body id="">
      <section class="about">
         <h1 class = "white"> <span class = "jos"> ¿Cómo participar? </span> </h1>

        <div class = "about-grid">
          <div class = "bg-grid"> <a>
           <div class = "about-hl"> 1. Obtén una llave Web3 </div> <br/>
          <img src = {img} class ="about-img"/>
          <span class = "ustext"> <div class = "center"></div> <br/> Metamask es una wallet de ethereum con la que puedes <span class = "yellow"> crear una llave Web3. </span> Esta cartera es descentralizada, por lo que solo tú tendrás acceso a ella y custodia total de los activos digitales que se depositan. Descárguela de su sitio en una computadora o dispositivo móvil:

          <div class = "usgrid">
            <a class="about-bt" href="https://metamask.io"> Descargar Metamask </a>
          </div>

          </span>

          </a> </div>
          <div class = "bg-grid02"> <a href="#step1">
           <div class = "about-hl"> 2. How te get VOTO </div> <br/>
          <img src={TAROrew} class="about-img"/>
          <span class = "ustext"> <div class = "center"> </div> <br/> <span class = "yellow"> Get 1,000 VOTO </span> when obtaining your crypto key and validating it.
            Once you have your crypto key validated <span class = "yellow"> you can get 50 VOTO for each one </span> of the first 20 proposals you make. <br/> <br/>
          <div class = "usgrid">
            <a class="bg-grid03" href="/Quiz"> Validate <br/> (1000 VOTO) </a>
            <a class="bg-grid03" href="/CreateProposal"> Propose <br/> (50 VOTO) </a>
          </div>
          <br/>
          <div class = "center"> <a class="about-bt" href="/CreateProposal"> Read about VOTO token </a> </div>
          </span>


          </a> </div>
          <div class = "bg-grid"> <a href="#step2">
           <div class = "about-hl"> 3. Vote in City DAO </div> <br/>
          <img src = {vote} class = "about-img" />
          <span class = "ustext"> <div class = "center"></div> <br/> VoVOTO is a DAO (Decentralized Autonomous Organization)
          with the aim of creating a decentralized fileURL and managing the decision-making of the city of Querétaro through smart contracts. <span class = "yellow"> Each VOTO you obtain is equivalent to one vote </span> and each proposal can be voted on for 15 days.
          <div class = "usgrid">
            <a class="about-bt" href="/Quiz"> Proposals to vote </a>
            <a class="about-bt" href="/CreateProposal"> Read about City DAO </a>
          </div>
          </span>

          </a> </div>
          <div class = "bg-grid"> <a href="#step3">
           <div class = "about-hl"> 4. Roadmap </div>
          <img src = {moon} class = "about-img" />
          <span class = "ustext"> <div class = "center"> </div> <br/>
          To participate in a DAO it is necessary to have the digital skills necessary to interact with web tools 3 such as a crypto key or use your
          VOTO tokens to vote. <span class = "yellow"> Know what they are and the roadmap to improve them </span> with your participation in the DAO of the city of Querétaro.
          <br/><br/>
          <div class = "center"> <a class="about-bt" href="/CreateProposal"> View roadmap </a> </div>
          </span>

          </a></div>
        </div>
      </section>
    </body>
  );
};

export default About;