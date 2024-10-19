import React, { useState, useContext, useEffect } from 'react';
import { AppState } from '../App';
import { ethers } from 'ethers';
import Hero from './Hero';
import Confetti from 'react-confetti';
import './Confetti.css'; // Import your CSS for confetti styles

const Contributors = () => {
    const App = useContext(AppState);
    const [Amount, setAmount] = useState('');
    const [Success, setSuccess] = useState(false);
    const [Exit, setExit] = useState(false); // New state for exit animation
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const numericAmount = parseFloat(Amount);
            if (!isNaN(numericAmount) && numericAmount > 0) {
                Contribut();
            } else {
                console.log('Please enter a valid amount');
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        });

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', () => {
                setWidth(window.innerWidth);
                setHeight(window.innerHeight);
            });
        };
    }, [Amount]);

    const Contribut = async () => {
        try {
            const tx = await App.Charitycontract.sendEth({ value: ethers.utils.parseEther(Amount) });
            await tx.wait();
            alert("Donated Successfully!");
            setSuccess(true);
            setAmount('');

            // Start exit animation after 7 seconds
            setTimeout(() => {
                setExit(true); // Trigger exit animation
                setTimeout(() => {
                    setSuccess(false); // Hide confetti after the animation
                    setExit(false); // Reset exit state
                }, 1000); // Duration of exit animation
            }, 7000); // Duration before starting exit
        } catch (error) {
            if (error.message === "MetaMask Tx Signature: User denied transaction signature.") {
                alert("User denied transaction signature.");
            } else {
                console.log(error.message);
                alert("Something went wrong");
            }
        }
    };

    return (
        <div>
            <div className='min-h-screen from-slate-100 to-slate-300 bg-gradient-to-r'>
                <Hero />
                {Success && (
                    <div className={`confetti-container ${Exit ? 'confetti-exit' : ''}`}>
                        <Confetti width={width} height={height} />
                    </div>
                )} {/* Adjusting to full screen size */}
            </div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">For Contributors</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Answer the call of kindness within you—take a step and make a difference today.</p>
                    </div>
                    <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                        <div className="relative flex-grow w-full">
                            <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Amount in ETH</label>
                            <input 
                                value={Amount} 
                                onChange={(e) => setAmount(e.target.value)} 
                                type="text" 
                                id="full-name" 
                                name="full-name" 
                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-emerald-500 focus:bg-transparent focus:ring-2 focus:ring-emerald-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                            />
                        </div>
                        <button 
                            onClick={Contribut} 
                            className="text-white bg-emerald-500 border-0 py-2 px-8 focus:outline-none hover:bg-emerald-600 rounded text-lg"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contributors;
