/** @format */

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, MapPin, Quote, ArrowLeft } from 'lucide-react';
import { deliveredProjects } from './DeliveredProjects';

const DeliveredProjectDetails = () => {
	const { id } = useParams();
	const [sliderValue, setSliderValue] = useState(50); // For before/after swipe

	const project = deliveredProjects.find(p => p.id === parseInt(id));

	if (!project) {
		return (
			<div className='min-h-screen bg-black text-white flex flex-col items-center justify-center'>
				<h1 className='text-4xl font-bold mb-4'>Project Not Found</h1>
				<Link to='/delivered-projects' className='text-yellow-500 hover:text-yellow-400 flex items-center gap-2'>
					<ArrowLeft size={20} /> Back to Delivered Projects
				</Link>
			</div>
		);
	}

	return (
		<div className='bg-black text-white min-h-screen pt-20 pb-32 md:pb-20'>
			{/* HERRO */}
			<div className='relative h-[60vh] w-full overflow-hidden'>
				<img
					src={project.image}
					className='w-full h-full object-cover'
					alt='Hero'
				/>
				<div className='absolute inset-0 bg-black/40 flex flex-col justify-end p-8 md:p-16'>
					<div className='max-w-7xl mx-auto'>
						<h1 className='text-4xl md:text-6xl font-bold mb-2 uppercase'>
							{project.name}
						</h1>
						<p className='text-xl text-gray-300 flex items-center gap-2'>
							<MapPin size={20} /> {project.location}
						</p>
					</div>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-20'>
				{/* Delivery Metrics */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-6 bg-stone-900 border border-white/10 p-8 rounded-xl text-center divide-x divide-white/10'>
					<div>
						<span className='block text-3xl font-bold text-yellow-500 mb-1'>
							{project.completionYear}
						</span>
						<span className='text-sm text-gray-400 uppercase tracking-wider'>
							Completion Year
						</span>
					</div>
					<div>
						<span className='block text-3xl font-bold text-yellow-500 mb-1'>
							{project.units}
						</span>
						<span className='text-sm text-gray-400 uppercase tracking-wider'>
							Units
						</span>
					</div>
					<div>
						<span className='block text-3xl font-bold text-yellow-500 mb-1 uppercase'>
							{project.area.split(' ')[0]}
						</span>
						<span className='text-sm text-gray-400 uppercase tracking-wider'>
							{project.area.split(' ').slice(1).join(' ')}
						</span>
					</div>
					<div>
						<span className='block text-3xl font-bold text-yellow-500 mb-1'>
							100%
						</span>
						<span className='text-sm text-gray-400 uppercase tracking-wider'>
							On-Time Delivery
						</span>
					</div>
				</div>

				{/* Before / After Slider */}
				<section>
					<h2 className='text-3xl font-bold mb-8 text-center'>
						Transformation Journey
					</h2>
					<div className='relative w-full h-[50vh] overflow-hidden rounded-xl border border-white/20 select-none cursor-ew-resize group'>
						{/* After Image (Background) */}
						<img
							src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop'
							className='absolute inset-0 w-full h-full object-cover'
							alt='After'
						/>

						{/* Before Image (Foreground - Clipped) */}
						<div
							className='absolute inset-0 w-full h-full overflow-hidden'
							style={{ width: `${sliderValue}%` }}>
							<img
								src='https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'
								className='absolute inset-0 w-full h-full object-cover grayscale'
								alt='Before'
							/>
							<div className='absolute top-4 left-4 bg-black/70 px-4 py-2 text-white font-bold rounded'>
								BEFORE (2019)
							</div>
						</div>

						{/* Slider Handle */}
						<input
							type='range'
							min='0'
							max='100'
							value={sliderValue}
							onChange={(e) => setSliderValue(e.target.value)}
							className='absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20'
						/>
						<div
							className='absolute top-0 bottom-0 w-1 bg-yellow-500 z-10 pointer-events-none'
							style={{ left: `${sliderValue}%` }}>
							<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-xl'>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='text-black'>
									<path d='M18 8L22 12L18 16'></path>
									<path d='M6 8L2 12L6 16'></path>
								</svg>
							</div>
						</div>

						<div className='absolute top-4 right-4 bg-green-600 px-4 py-2 text-white font-bold rounded z-0'>
							AFTER (2022)
						</div>
					</div>
				</section>

				{/* Final Photos Gallery */}
				<section>
					<h2 className='text-3xl font-bold mb-8 border-l-4 border-yellow-500 pl-4'>
						Gallery
					</h2>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{[1, 2, 3, 4].map((i) => (
							<img
								key={i}
								src={`https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop`}
								className='w-full h-64 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer'
							/>
						))}
					</div>
				</section>

				{/* Client Testimonial */}
				<section className='bg-stone-900 p-12 rounded-xl border border-white/10 relative overflow-hidden'>
					<Quote
						size={120}
						className='absolute -top-4 -left-4 text-white/5'
					/>
					<div className='relative z-10 text-center max-w-3xl mx-auto'>
						<p className='text-2xl italic text-gray-300 mb-8'>
							"{project.testimonial}"
						</p>
						<div className='flex items-center justify-center gap-4'>
							<div className='bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center font-bold text-black text-xl'>
								RJ
							</div>
							<div className='text-left'>
								<div className='font-bold text-white'>
									Rajesh Jaiswal
								</div>
								<div className='text-sm text-gray-500'>
									Resident, Tower B - 402
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Brochure Download */}
				<div className='flex justify-center'>
					<button className='bg-white text-black px-8 py-4 font-bold rounded hover:bg-yellow-500 transition-colors flex items-center gap-2'>
						<Download size={20} />
						Download Completion Brochure
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeliveredProjectDetails;
