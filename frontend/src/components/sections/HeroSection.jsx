/** @format */

import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import videoBg from '../../assets/SVNR The Ayati.mp4';

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

			{/* Scroll Down Indicator */}
			<div className='relative z-10 flex flex-col items-center justify-center h-full text-center px-4'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 2, ease: 'easeOut' }}
					className='absolute bottom-8 md:bottom-12 flex flex-col items-center gap-2 cursor-pointer select-none'
					onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
					role='button'
					aria-label='Scroll down to content'
					tabIndex={0}
					onKeyDown={(e) => e.key === 'Enter' && window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
				>
					{/* "Scroll Down" Label */}
					<motion.span
						className='text-white/80 text-[11px] md:text-xs font-medium tracking-[0.25em] uppercase'
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
					>
						Scroll Down
					</motion.span>

					{/* Mouse Icon */}
					<div className='w-[26px] h-[42px] md:w-[28px] md:h-[44px] rounded-full border-[1.5px] border-white/60 flex justify-center relative mt-1'>
						<motion.div
							className='w-[3px] h-[8px] bg-white rounded-full mt-2'
							animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
							transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
						/>
					</div>

					{/* Animated Chevrons */}
					<div className='flex flex-col items-center -mt-1'>
						{[0, 1].map((i) => (
							<motion.div
								key={i}
								animate={{ y: [0, 4, 0], opacity: [0.2, 0.8, 0.2] }}
								transition={{
									duration: 1.5,
									repeat: Infinity,
									ease: 'easeInOut',
									delay: i * 0.2,
								}}
								className='-my-[5px]'
							>
								<ChevronDown className='text-white/70' size={18} strokeWidth={1.5} />
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default HeroSection;
