import React from 'react';

const Footer = () => {
    return (
        <div className='md:flex w-full p-4 justify-around bg-gray-700 text-white py-7 mt-auto'>
            <div className='text-center md:text-start py-4 md:py-0'>
                <p className='text-xl '>
                    BonCoeur
                </p>
                <p className='text-gray-300' >
                    French for Good Heart ❤️
                </p>
                <p className='text-sm text-gray-400'>Make the change today!</p>
            </div>
            <div className='text-center md:text-start text-sm'>
                Learn more about me?
                <ul className='text-gray-400 flex flex-col'>
                    <a target='blank' href='https://github.com/aman090304' className='hover:bg-gradient-to-r  hover:from-yellow-200 hover:to-red-600 hover:bg-clip-text hover:text-transparent transition duration-300'>
                        Github
                    </a>
                    <a target='blank' href='https://www.linkedin.com/in/aman-gupta0903/' className='hover:bg-gradient-to-r  hover:from-yellow-200 hover:to-red-600 hover:bg-clip-text hover:text-transparent transition duration-300'>
                        Linkedin
                    </a>
                    <a target='blank' href='https://next-portfolio-xi-rosy.vercel.app/' className='hover:bg-gradient-to-r  hover:from-yellow-200 hover:to-red-600 hover:bg-clip-text hover:text-transparent transition duration-300'>
                        Portfolio
                    </a>
                </ul>
            </div>

        </div>
    );
}

export default Footer;
