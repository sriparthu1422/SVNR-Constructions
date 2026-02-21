/** @format */

import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const founders = [
	{
		id: 1,
		name: 'Sri. V. Narayana Reddy',
		role: 'Founder & Chairman',
		image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop',
		description:
			"With over 25 years of experience in the construction industry, Mr. Narayana Reddy has been the driving force behind SVNR's legacy of trust. His vision for sustainable urban living has transformed the city's skyline, ensuring that every project reflects quality, integrity, and long-term value for homeowners.",
	},
	{
		id: 2,
		name: 'Smt. K. Lakshmi',
		role: 'Managing Director',
		image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2776&auto=format&fit=crop',
		description:
			'A stalwart in operational excellence, Mrs. Lakshmi brings a detailed-oriented approach to execution. Her focus on customer satisfaction and timely delivery has helped the company build a loyal clientele. She believes that a home is built with hands, but a household is built with hearts.',
	},
	{
		id: 3,
		name: 'Mr. Arjun Reddy',
		role: 'Director of Innovation',
		image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2144&auto=format&fit=crop',
		description:
			'Leading the technological integration at SVNR, Arjun ensures that all projects meet modern standards of smart living. From eco-friendly materials to automation-ready infrastructure, his forward-thinking strategies prepare our homes for the future generations.',
	},
	{
		id: 4,
		name: 'Ram Krishna',
		role: 'Founder',
		image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
		description:
			'A visionary leader and instrumental force behind SVNR, Ram Krishna brings strategic direction and profound expertise to the organization, shaping our long-term goals and commitment to excellence.',
	},
];

const FoundersSection = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % founders.length);
		}, 5000);

		return () => clearInterval(timer);
	}, []);

	return (
		<section className='py-24 px-4 bg-black relative overflow-hidden'>
			{/* Background Elements */}
			<div className='absolute top-0 right-0 w-1/3 h-full bg-stone-900/20 skew-x-12 transform origin-top-right' />

			<div className='max-w-7xl mx-auto'>
				{/* Section Header - Mobile Only (Desktop has it in layout) */}
				<div className='md:hidden mb-12 text-center'>
					<span className='text-yellow-500 font-bold tracking-widest uppercase text-sm'>
						Founders
					</span>
					<h2 className='text-3xl font-bold text-white mt-2'>
						Background of Promoters
					</h2>
				</div>

				<div className='flex flex-col md:flex-row items-center justify-center min-h-[450px]'>
					{/* Left Panel: Image Only */}
					<div className='w-full md:w-1/2 h-[350px] md:h-[450px] relative z-0 md:mr-[-80px]'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={founders[currentIndex].id}
								initial={{ opacity: 0, scale: 1.05 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.8 }}
								className='absolute inset-0 w-full h-full rounded-lg overflow-hidden'>
								<div className='absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10 md:hidden' />{' '}
								{/* Mobile Overlay */}
								<img
									src={founders[currentIndex].image}
									alt={founders[currentIndex].name}
									className='w-full h-full object-cover transition-all duration-700'
								/>
							</motion.div>
						</AnimatePresence>

						{/* Static Text Overlay on Image for "Founders" label - Desktop */}
						<div className='hidden md:block absolute top-8 left-8 z-20'>
							<div className='flex items-center space-x-3'>
								<div className='w-10 h-1 bg-yellow-500' />
								<span className='text-white font-bold tracking-widest uppercase text-sm'>
									Founders
								</span>
							</div>
							<h2 className='text-3xl lg:text-4xl font-bold text-white mt-3 max-w-xs leading-tight drop-shadow-lg'>
								Background of <br /> Promoters
							</h2>
						</div>
					</div>

					{/* Right Panel: Content Card */}
					<div className='w-full md:w-3/5 relative z-10 mt-6 md:mt-0'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={founders[currentIndex].id}
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -50 }}
								transition={{ duration: 0.6, ease: 'easeOut' }}
								className='bg-stone-900/90 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-xl shadow-2xl md:ml-12'>
								<Quote
									className='text-yellow-500 mb-4 opacity-50'
									size={36}
								/>

								<h3 className='text-2xl md:text-3xl font-bold text-white mb-2'>
									{founders[currentIndex].name}
								</h3>
								<p className='text-yellow-500 font-medium tracking-wide uppercase text-xs mb-6'>
									{founders[currentIndex].role}
								</p>

								<p className='text-gray-300 text-base leading-relaxed font-light'>
									{founders[currentIndex].description}
								</p>

								{/* Progress Bar */}
								<div className='mt-8 flex space-x-2'>
									{founders.map((_, idx) => (
										<div
											key={idx}
											className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-10 bg-yellow-500' : 'w-3 bg-white/20'}`}
										/>
									))}
								</div>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FoundersSection;
