import { useState, createContext, useEffect } from 'react';
import Charity from './ABI/Charity.json';
import { ethers } from "ethers";
import Header from './Component/Header';
import Footer from './Component/Footer';
import Hero from './Component/Hero';
const AppState = createContext();

function App() {
  const [Charitycontract, setCharitycontract] = useState();
  useEffect(() => {
    const loadEthereum = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const ContractAddress = "0xb6c11a8336a0556bfb975aad13dbcd9d1eb05579";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const CharityContract = new ethers.Contract(ContractAddress, Charity.abi, signer);

        setCharitycontract(CharityContract)
      } else {
        console.log('No Ethereum provider found. Install Metamask.');
      }
    };
    loadEthereum();
  }, []);


  return (
    <AppState.Provider value={{
      Charitycontract
    }}>
      <div className='flex flex-col min-h-screen' >
        {typeof window.ethereum != "undefined" ?
          <Header /> :
          <div className='flex flex-col justify-center items-center mt-10'>
            {/* install Metamask */}
            <h1 class=" text-xl title-font  text-black mb-1">Install Metamask to access DAO</h1>
            <a target={"_blank"} href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">
              <div className='flex border-opacity-60 bg-opacity-90 text-lg font-medium border-2 border-black cursor-pointer bg-black text-white mt-4 rounded-lg justify-center items-center py-1 px-2'>
                Install Metamask
                <img className='h-10' src='metamask.png' />
              </div>
            </a>
            <p className='text-white text-lg mt-2'>Login Required Metamask Extension</p>
          </div>
        }
        <Footer />
      </div>
    </AppState.Provider>
  );
}

export default App;
export { AppState }
