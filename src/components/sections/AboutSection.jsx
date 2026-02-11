/** @format */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
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
							At SVNR Constructions, we don't just build
							structures; we create landmarks that stand the test
							of time. With a decade of unwavering commitment to
							quality and innovation, we have transformed the
							skyline and the lives of hundreds of families. Our
							philosophy blends sustainable engineering with
							luxury aesthetics.
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
							276
						</span>
						<span className='text-sm text-gray-400 border-t border-gray-700 pt-2 w-full text-center tracking-wider'>
							UNITS DELIVERED
						</span>
					</div>
				</div>

				{/* 3. Images (Desktop: Col 3, Mobile: Order 3) */}
				<div className='flex flex-col space-y-6 order-3 lg:col-span-1 lg:row-span-2'>
					{/* Main Large Image */}
					<div className='relative h-64 lg:h-80 w-full overflow-hidden rounded-sm group'>
						<img
							src='https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'
							alt='Construction Site'
							className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>
						<div className='absolute bottom-4 left-4 text-white font-medium tracking-wide'>
							Precision Engineering
						</div>
					</div>

					{/* Bottom Row: 3 Equal Image Cards */}
					<div className='grid grid-cols-3 gap-2 h-24'>
						<div className='relative group overflow-hidden border border-white/10 rounded-sm'>
							<img
								src='https://images.unsplash.com/photo-1531834685032-c34bf0d84c7c?q=80&w=1997&auto=format&fit=crop'
								alt='Award'
								className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all'
							/>
						</div>
						<div className='relative group overflow-hidden border border-white/10 rounded-sm'>
							<img
								src='https://images.unsplash.com/photo-1556156653-e9998110eadd?q=80&w=2070&auto=format&fit=crop'
								alt='Cert'
								className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all'
							/>
						</div>
						<div className='relative group overflow-hidden border border-white/10 rounded-sm'>
							<img
								src='https://images.unsplash.com/photo-1581094794329-cd1196532882?q=80&w=2070&auto=format&fit=crop'
								alt='Team'
								className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all'
							/>
						</div>
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
