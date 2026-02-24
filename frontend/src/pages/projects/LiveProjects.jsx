/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import {
	ArrowRight,
	Activity,
	MapPin,
	Calendar,
	BarChart2,
} from 'lucide-react';
import ankuraFarms from '../../assets/images/AboutSectionImages/AnkuraFarms.png';

export const liveProjects = [
	{
		id: 1,
		name: 'Ankura Farms',
		location: 'Thimajipet, Jadcherla',
		stage: 'Finishing',
		progress: 90,
		completion: 'Dec 2024',
		image: ankuraFarms,
	},
	{
		id: 2,
		name: 'The Ayati',
		location: 'Jubilee Hills, Hyderabad',
		stage: 'Structure',
		progress: 60,
		completion: 'June 2025',
		image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=2009&auto=format&fit=crop',
	},
];

const LiveProjects = () => {
	return (
		<div className='min-h-screen bg-black text-white pt-24 px-4 md:px-8 pb-12'>
			<div className='max-w-7xl mx-auto'>
				<div className='mb-12 border-l-4 border-yellow-500 pl-6'>
					<h1 className='text-4xl md:text-5xl font-bold mb-2'>
						Live Projects
					</h1>
					<p className='text-gray-400'>
						Track the progress of our ongoing developments in
						real-time.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{liveProjects.map((project) => (
						<div
							key={project.id}
							className='bg-stone-900 border border-white/10 rounded-lg overflow-hidden group hover:border-yellow-500/50 transition-all duration-300'>
							{/* Hero Image */}
							<div className='relative h-64 overflow-hidden'>
								<img
									src={project.image}
									alt={project.name}
									className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
								/>
								<div className='absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1'>
									<Activity size={12} />
									{project.stage}
								</div>
							</div>

							{/* Content */}
							<div className='p-6 space-y-4'>
								<div>
									<h3 className='text-2xl font-bold mb-1 group-hover:text-yellow-500 transition-colors'>
										{project.name}
									</h3>
									<div className='flex items-center text-gray-400 text-sm gap-2'>
										<MapPin size={14} />
										{project.location}
									</div>
								</div>

								{/* Progress Bar */}
								<div className='space-y-2'>
									<div className='flex justify-between text-xs font-medium text-gray-400 uppercase tracking-widest'>
										<span>Construction Progress</span>
										<span className='text-white'>
											{project.progress}%
										</span>
									</div>
									<div className='w-full bg-stone-800 h-2 rounded-full overflow-hidden'>
										<div
											className='bg-yellow-500 h-full rounded-full transition-all duration-1000 ease-out'
											style={{
												width: `${project.progress}%`,
											}}></div>
									</div>
								</div>

								<div className='flex items-center justify-between pt-4 border-t border-white/5'>
									<div className='flex items-center gap-2 text-gray-300 text-sm'>
										<Calendar
											size={16}
											className='text-yellow-500'
										/>
										<span>
											Completion:{' '}
											<span className='text-white font-medium'>
												{project.completion}
											</span>
										</span>
									</div>
								</div>

								<Link to={`/live-projects/${project.id}`}>
									<button className='w-full mt-4 py-3 bg-stone-800 hover:bg-white hover:text-black border border-white/10 text-white font-medium transition-all rounded flex items-center justify-center gap-2'>
										View Live Details
										<ArrowRight size={16} />
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

export default LiveProjects;
