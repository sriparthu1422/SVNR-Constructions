/** @format */

import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
	{
		id: 1,
		name: 'The Ayati',
		location: 'Financial District',
		status: 'Ongoing',
		image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
	},
	{
		id: 2,
		name: 'SVNR Heights',
		location: 'Jubilee Hills',
		status: 'Ongoing',
		image: 'https://images.unsplash.com/photo-1600596542815-e36cb0654136?q=80&w=2070&auto=format&fit=crop',
	},
	{
		id: 3,
		name: 'Green Valley',
		location: 'Gachibowli',
		status: 'Ongoing',
		image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
	},
	{
		id: 4,
		name: 'Urban Towers',
		location: 'Hitech City',
		status: 'Upcoming',
		image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
	},
	{
		id: 5,
		name: 'Skyline Residency',
		location: 'Kondapur',
		status: 'Ongoing',
		image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop',
	},
];

const ProjectCard = ({ project }) => {
	const linkTo =
		project.status === 'Upcoming'
			? '/upcoming-projects'
			: `/live-projects/${project.id}`;

	return (
		<Link to={linkTo}>
			<div className='relative h-[300px] w-[500px] flex-shrink-0 group overflow-hidden border border-white/10 rounded-sm cursor-pointer shadow-lg outline outline-1 outline-white/5 hover:outline-pink-500/30 transition-all'>
				{/* Full Background Image */}
				<img
					src={project.image}
					alt={project.name}
					className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
				/>

				{/* Hover Overlay - 90% Coverage */}
				<div className='absolute bottom-0 left-0 w-full h-full bg-black/90 translate-y-full group-hover:translate-y-[10%] transition-transform duration-500 ease-in-out flex flex-col justify-start p-8'>
					<div className='mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex flex-col h-full'>
						<div className='flex justify-between items-start'>
							<div>
								<span className='text-yellow-500 text-xs font-bold uppercase tracking-[0.2em] mb-2 block'>
									{project.status}
								</span>
								<h3 className='text-2xl font-bold text-white mb-2'>
									{project.name}
								</h3>
								<div className='flex items-center text-gray-400 text-sm'>
									<MapPin
										size={16}
										className='mr-2 text-yellow-500'
									/>
									{project.location}
								</div>
							</div>
							<div className='p-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors'>
								<ArrowUpRight size={18} />
							</div>
						</div>

						<div className='mt-auto'>
							<p className='text-gray-400 text-sm line-clamp-3 leading-relaxed mb-4'>
								Designed with precision and crafted for luxury.{' '}
								{project.name} represents the pinnacle of modern
								living in {project.location}.
							</p>
							<button className='text-sm font-semibold text-white border-b border-yellow-500 pb-1 hover:text-yellow-500 transition-colors uppercase tracking-widest'>
								View Project
							</button>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

const ProjectSlider = () => {
	// Duplicate projects for seamless looping
	const duplicatedProjects = [...projects, ...projects, ...projects];

	return (
		<section className='bg-stone-950 py-24 overflow-hidden border-t border-white/5 relative'>
			{/* Section Header */}
			<div className='text-center mb-16 px-4'>
				<h2 className='text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight'>
					Ongoing Projects
				</h2>
				<h3 className='text-gray-400 text-2xl font-light tracking-wide'>
					Crafted with Passion,{' '}
					<span className='text-pink-500/80 font-medium'>
						Designed for Generations
					</span>
				</h3>
			</div>

			{/* Slider Container */}
			<div className='relative w-full'>
				<div className='flex space-x-8 w-max animate-scroll hover:[animation-play-state:paused] px-4'>
					{duplicatedProjects.map((project, index) => (
						<ProjectCard
							key={`${project.id}-${index}`}
							project={project}
						/>
					))}
				</div>

				{/* Gradient Masks for Fade Effect at Edges */}
				<div className='pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-stone-950 to-transparent z-10 hidden md:block'></div>
				<div className='pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-stone-950 to-transparent z-10 hidden md:block'></div>
			</div>

			{/* Mobile Stacked Layout */}
			<div className='md:hidden flex flex-col space-y-6 px-4 mt-8'>
				{projects.map((project) => (
					<Link
						to={
							project.status === 'Upcoming'
								? '/upcoming-projects'
								: `/live-projects/${project.id}`
						}
						key={project.id}>
						<div className='relative h-64 w-full overflow-hidden rounded-md border border-white/10 shadow-lg'>
							<img
								src={project.image}
								alt={project.name}
								className='w-full h-full object-cover'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end'>
								<span className='text-yellow-500 text-xs font-bold uppercase tracking-widest'>
									{project.status}
								</span>
								<h3 className='text-2xl font-bold text-white my-1'>
									{project.name}
								</h3>
								<div className='flex items-center text-gray-300 text-xs mb-3'>
									<MapPin
										size={12}
										className='mr-1'
									/>
									{project.location}
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>

			<style jsx>{`
				@media (max-width: 768px) {
					.animate-scroll {
						display: none;
					}
				}
			`}</style>
		</section>
	);
};

export default ProjectSlider;
