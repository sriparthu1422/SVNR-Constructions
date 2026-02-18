/** @format */

import React from 'react';
import { motion } from 'framer-motion';
import videoBg from '../../assets/svnr.mp4';

const HeroSection = () => {
	return (
		<section
			id='home'
			className='relative h-screen w-full overflow-hidden'>
			{/* Background Video */}
			<video
				autoPlay
				loop
				muted
				playsInline
				preload='auto'
				className='absolute top-0 left-0 w-full h-full object-cover'>
				<source
					src={videoBg}
					type='video/mp4'
				/>
				Your browser does not support the video tag.
			</video>

			{/* Overlay */}
			<div className='absolute inset-0 bg-black/40 w-full h-full' />

			{/* Scroll Indicator */}
			<div className='relative z-10 flex flex-col items-center justify-center h-full text-center px-4'>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 2 }}
					className='absolute bottom-10 animate-bounce'>
					<div className='w-[30px] h-[50px] rounded-full border-2 border-black flex justify-center pt-2'>
						<div className='w-1.5 h-3 bg-black rounded-full animate-pulse' />
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default HeroSection;
