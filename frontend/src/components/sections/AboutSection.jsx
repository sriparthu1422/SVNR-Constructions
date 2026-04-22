/** @format */

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import greenspace from '../../assets/images/AboutSectionImages/Greenspace.png';
import lotusResidency from '../../assets/images/AboutSectionImages/Lotus Residency.png';
import manasaSarovar from '../../assets/images/AboutSectionImages/Manasa Sarovar.png';
import saiDatta from '../../assets/images/AboutSectionImages/SaiDatta Residency.jpg';
import twinDiamonds from '../../assets/images/AboutSectionImages/Twin Diamonds.jpg';
import vinayakHomes from '../../assets/images/AboutSectionImages/Vinayak Homes.jpg';

const carouselImages = [
	{
		src: greenspace,
		text: ''
	},
	{
		src: lotusResidency,
		text: ''
	},
	{
		src: manasaSarovar,
		text: ''
	},
	{
		src: saiDatta,
		text: ''
	},
	{
		src: twinDiamonds,
		text: ''
	},
	{
		src: vinayakHomes,
		text: ''
	}
];

const AboutSection = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
		}, 3000);
		return () => clearInterval(timer);
	}, []);

	return (
		<section className='bg-black text-white py-20 px-6 md:px-8 overflow-hidden'>
			<div className='max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-12 items-stretch'>
				{/* 1. Header & Text (Desktop: Col 1, Mobile: Order 1) */}
				<div className='flex flex-col h-full justify-between space-y-8 animate-in slide-in-from-left duration-700 fade-in order-1 lg:col-span-5'>
					<div>
						<h2 className='text-4xl md:text-5xl font-bold mb-6 tracking-wide text-white'>
							About Us
						</h2>
						<div className='w-20 h-1 bg-yellow-500 mb-6'></div>
						<div className='bg-stone-900/50 p-4 border-l-4 border-yellow-500 mb-6'>
							<p className='text-xl font-light text-white leading-relaxed'>
								Building trust through concrete excellence since
								2014.
							</p>
						</div>
						<p className='text-gray-400 leading-relaxed text-sm md:text-base text-justify'>
							SVNR Construction is one of the emerging real estate property developers in Hyderabad and Town areas (like Miryalaguda, Jadcharla, Khammam). At SVNR Construction, we believe in building an emotional connect with all our customers. We value all the investments and the trust our customers place in us to fulfil their most awaited dream.
						</p>
					</div>

					{/* CTA Button */}
					<div className='pt-6 lg:pt-0 mt-auto'>
						<Link to='/about-us'>
							<button className='group flex items-center gap-2 px-8 py-4 bg-transparent border border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 w-full md:w-max justify-center'>
								About Us
								<ArrowRight
									size={18}
									className='group-hover:translate-x-1 transition-transform'
								/>
							</button>
						</Link>
					</div>
				</div>

				{/* 2. Stats (Desktop: Col 2, Mobile: Order 2) */}
				<div className='flex flex-col items-center justify-center text-center py-8 lg:py-0 h-full order-2 lg:col-span-2 px-2'>
					<div className='flex items-start justify-center text-center'>
						<span className="text-[120px] md:text-[160px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-yellow-700 opacity-90 font-['Outfit']">
							8
						</span>
						<span className='text-4xl md:text-6xl font-bold text-white mt-4 md:mt-6 -ml-2 md:-ml-4'>
							+
						</span>
					</div>
					<div className='text-2xl font-light tracking-widest uppercase mb-8 ml-2 text-center'>
						Years Experience
					</div>

					<div className='flex flex-col items-center space-y-1'>
						<span className='text-5xl font-bold text-white'>
							1M
						</span>
						<span className='text-sm text-gray-400 border-t border-gray-700 pt-2 w-full text-center tracking-wider'>
							SFT CONSTRUCTED
						</span>
					</div>
				</div>

				{/* 3. Images (Desktop: Col 3, Mobile: Order 3) */}
				<div className='flex flex-col order-3 lg:col-span-5 h-[350px] lg:h-full'>
					{/* Automated Carousel Slide */}
					<div className='relative h-full w-full overflow-hidden rounded-sm group'>
						{carouselImages.map((image, index) => (
							<div
								key={index}
								className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
									}`}
							>
								<img
									src={image.src}
									alt={image.text}
									className='w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none'></div>
								<div className='absolute bottom-4 left-4 text-white font-medium tracking-wide'>
									{image.text}
								</div>
							</div>
						))}
					</div>
				</div>

			</div>
		</section>
	);
};

export default AboutSection;
