/** @format */

import React, { useState } from 'react';
import { ArrowRight, Lock, MapPin, Calendar, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const upcomingProjects = [
	{
		id: 1,
		name: 'SVNR Signature',
		location: 'Kokapet, Hyderabad',
		size: '3000 - 4500 sft',
		launch: 'Q3 2025',
		image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
		concept: 'Super Luxury Sky Villas',
	},
	{
		id: 2,
		name: 'The Lakefront',
		location: 'Osman Sagar, Hyderabad',
		size: 'Plot Sizes: 400 - 1000 Sq yds',
		launch: 'Q4 2025',
		image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
		concept: 'Premium Villa Plots',
	},
];

const UpcomingProjects = () => {
	const [showForm, setShowForm] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);

	const handleEarlyAccess = (project) => {
		setSelectedProject(project);
		setShowForm(true);
	};

	return (
		<div className='min-h-screen bg-black text-white pt-24 px-4 md:px-8 pb-12'>
			<div className='max-w-7xl mx-auto'>
				<div className='mb-12 border-l-4 border-yellow-500 pl-6'>
					<h1 className='text-4xl md:text-5xl font-bold mb-2'>
						Upcoming Projects
					</h1>
					<p className='text-gray-400'>
						Be the first to know about our future landmarks.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{upcomingProjects.map((project) => (
						<div
							key={project.id}
							className='bg-stone-900 border border-white/10 rounded-lg overflow-hidden group hover:border-yellow-500/50 transition-all duration-300 relative'>
							{/* Blur Overlay for "Teaser" Effect */}
							<div className='relative h-80 overflow-hidden'>
								<img
									src={project.image}
									alt={project.name}
									className='w-full h-full object-cover filter blur-[2px] group-hover:blur-0 transition-all duration-700'
								/>
								<div className='absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center'>
									<Lock
										size={32}
										className='text-yellow-500 mb-4 animate-pulse'
									/>
									<h3 className='text-2xl font-bold text-white mb-2 uppercase tracking-widest'>
										{project.concept}
									</h3>
									<p className='text-sm text-gray-400'>
										Coming Soon to {project.location}
									</p>
								</div>
							</div>

							<div className='p-6 space-y-4 bg-stone-950'>
								<div className='flex justify-between items-start'>
									<div>
										<h3 className='text-xl font-bold text-white mb-1'>
											{project.name}
										</h3>
										<div className='flex items-center gap-2 text-gray-500 text-sm'>
											<MapPin size={14} />
											{project.location}
										</div>
									</div>
								</div>

								<div className='grid grid-cols-2 gap-4 pt-4 border-t border-white/10'>
									<div className='flex items-center gap-2 text-sm text-gray-400'>
										<Layout
											size={16}
											className='text-yellow-500'
										/>
										{project.size}
									</div>
									<div className='flex items-center gap-2 text-sm text-gray-400'>
										<Calendar
											size={16}
											className='text-yellow-500'
										/>
										Launch: {project.launch}
									</div>
								</div>

								<button
									onClick={() => handleEarlyAccess(project)}
									className='w-full mt-4 py-3 bg-yellow-500 text-black font-bold uppercase tracking-wider hover:bg-white transition-colors rounded shadow-lg shadow-yellow-500/20'>
									Get Early Access
								</button>
							</div>
						</div>
					))}
				</div>

				{/* Early Access Modal */}
				<AnimatePresence>
					{showForm && (
						<div className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								className='bg-stone-900 border border-white/10 rounded-xl p-8 max-w-md w-full relative'>
								<button
									onClick={() => setShowForm(false)}
									className='absolute top-4 right-4 text-gray-400 hover:text-white'>
									<svg
										className='w-6 h-6'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M6 18L18 6M6 6l12 12'></path>
									</svg>
								</button>

								<h3 className='text-2xl font-bold text-white mb-2'>
									Get Early Access
								</h3>
								<p className='text-gray-400 text-sm mb-6'>
									Register your interest for{' '}
									<strong>{selectedProject?.name}</strong> and
									get exclusive pre-launch offers.
								</p>

								<form className='space-y-4'>
									<input
										type='text'
										placeholder='Full Name'
										className='w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-yellow-500 outline-none'
									/>
									<input
										type='text'
										placeholder='Phone Number'
										className='w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-yellow-500 outline-none'
									/>
									<input
										type='email'
										placeholder='Email Address'
										className='w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-yellow-500 outline-none'
									/>
									<button className='w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-white transition-colors'>
										Request Types & Pricing
									</button>
								</form>
							</motion.div>
						</div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default UpcomingProjects;
