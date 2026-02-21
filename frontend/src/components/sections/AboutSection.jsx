/** @format */

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const carouselImages = [
	{
		src: 'https://plus.unsplash.com/premium_photo-1681989486976-9ec9d2eac57a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		text: 'Precision Engineering'
	},
	{
		src: 'https://plus.unsplash.com/premium_photo-1681691912442-68c4179c530c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		text: 'Award Winning Quality'
	},
	{
		src: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		text: 'Certified Standards'
	},
	{
		src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		text: 'Expert Team'
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
		<section className='bg-black text-white py-20 px-4 md:px-8 overflow-hidden'>
			<div className='max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-12 lg:gap-8 items-start'>
				{/* 1. Header & Text (Desktop: Col 1 Top, Mobile: Order 1) */}
				<div className='flex flex-col space-y-8 animate-in slide-in-from-left duration-700 fade-in order-1 lg:col-span-1 lg:row-start-1'>
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
				</div>

				{/* 2. Stats (Desktop: Col 2, Mobile: Order 2) */}
				<div className='flex flex-col items-center justify-center text-center py-8 lg:py-0 border-y lg:border-y-0 lg:border-x border-white/10 h-full order-2 lg:col-span-1 lg:row-span-2'>
					<div className='relative'>
						<span className="text-[120px] md:text-[160px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-yellow-700 opacity-90 font-['Outfit']">
							10
						</span>
						<span className='absolute top-4 right-0 text-xl font-bold text-white'>
							+
						</span>
					</div>
					<div className='text-2xl font-light tracking-widest uppercase mb-8 ml-2'>
						Years Experience
					</div>

					<div className='flex flex-col items-center space-y-1'>
						<span className='text-5xl font-bold text-white'>
							1M
						</span>
						<span className='text-sm text-gray-400 border-t border-gray-700 pt-2 w-full text-center tracking-wider'>
							SQ FT CONSTRUCTED
						</span>
					</div>
				</div>

				{/* 3. Images (Desktop: Col 3, Mobile: Order 3) */}
				<div className='flex flex-col order-3 lg:col-span-1 lg:row-span-2 h-[350px] lg:h-[420px]'>
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
									className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none'></div>
								<div className='absolute bottom-4 left-4 text-white font-medium tracking-wide'>
									{image.text}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* 4. CTA (Desktop: Col 1 Bottom, Mobile: Order 4) */}
				<div className='order-4 lg:col-span-1 lg:row-start-2 lg:mt-auto pt-6 lg:pt-0'>
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
		</section>
	);
};

export default AboutSection;
