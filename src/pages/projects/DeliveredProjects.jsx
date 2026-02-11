/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, CheckCircle } from 'lucide-react';

const deliveredProjects = [
	{
		id: 1,
		name: 'Skyline Luxury Apartments',
		location: 'Gachibowli, Hyderabad',
		completionYear: '2022',
		units: 140,
		area: '2.5 Lakh Sqft',
		image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop',
		testimonial: 'Exceeded all expectations in quality and timeline.',
	},
	{
		id: 2,
		name: 'Urban Heights',
		location: 'Kondapur, Hyderabad',
		completionYear: '2020',
		units: 85,
		area: '1.2 Lakh Sqft',
		image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
		testimonial: 'Truly premium living experience.',
	},
];

const DeliveredProjects = () => {
	return (
		<div className='min-h-screen bg-black text-white pt-24 px-4 md:px-8 pb-12'>
			<div className='max-w-7xl mx-auto'>
				<div className='mb-12 border-l-4 border-yellow-500 pl-6'>
					<h1 className='text-4xl md:text-5xl font-bold mb-2'>
						Delivered Projects
					</h1>
					<p className='text-gray-400'>
						Our legacy of completed landmarks across the city.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{deliveredProjects.map((project) => (
						<div
							key={project.id}
							className='bg-stone-900 border border-white/10 rounded-lg overflow-hidden group hover:border-yellow-500/50 transition-all duration-300 shadow-lg'>
							<div className='relative h-72 overflow-hidden'>
								<img
									src={project.image}
									alt={project.name}
									className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
								/>
								<div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-6'>
									<div className='flex items-center gap-2 mb-1'>
										<CheckCircle
											size={16}
											className='text-green-500'
										/>
										<span className='text-green-400 text-xs font-bold uppercase tracking-wider'>
											Completed {project.completionYear}
										</span>
									</div>
									<h3 className='text-2xl font-bold text-white group-hover:text-yellow-500 transition-colors'>
										{project.name}
									</h3>
								</div>
							</div>

							<div className='p-6 space-y-4'>
								<div className='flex items-center gap-2 text-gray-400 text-sm'>
									<MapPin
										size={16}
										className='text-yellow-500'
									/>
									{project.location}
								</div>

								<div className='grid grid-cols-2 gap-4 pt-4 border-t border-white/10'>
									<div>
										<span className='block text-xs text-gray-500 uppercase tracking-wider mb-1'>
											Units Delivered
										</span>
										<span className='text-xl font-bold text-white'>
											{project.units}
										</span>
									</div>
									<div>
										<span className='block text-xs text-gray-500 uppercase tracking-wider mb-1'>
											Built-up Area
										</span>
										<span className='text-xl font-bold text-white'>
											{project.area}
										</span>
									</div>
								</div>

								<Link to={`/delivered-projects/${project.id}`}>
									<button className='w-full mt-4 py-3 bg-transparent border border-white/30 hover:bg-white hover:text-black hover:border-white text-white font-medium transition-all rounded text-sm uppercase tracking-wide'>
										View Project Gallery
									</button>
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default DeliveredProjects;
