/** @format */
/* eslint-disable react-refresh/only-export-components */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	ArrowRight,
	Activity,
	MapPin,
	Calendar,
} from 'lucide-react';
import ScrollReveal from '../../components/ui/ScrollReveal';
import ProjectSkeleton from '../../components/ui/ProjectSkeleton';
import getProjectImage from '../../utils/projectImages';

// Fallback data
import ankuraFarms from '../../assets/images/AboutSectionImages/AnkuraFarms.png';
import TheAyati from '../../assets/images/HomeImage/TheAyati2.jpeg';

const fallbackProjects = [
	{
		_id: 'fallback-live-1',
		name: 'Ankura Farms',
		location: 'Thimajipet, Jadcherla',
		stage: 'Finishing',
		progress: 90,
		completion: 'Dec 2024',
		image: ankuraFarms,
	},
	{
		_id: 'fallback-live-2',
		name: 'The Ayati',
		location: 'Jubilee Hills, Hyderabad',
		stage: 'Structure',
		progress: 60,
		completion: 'June 2025',
		image: TheAyati,
	},
];

const LiveProjects = () => {
	const [projects, setProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
		setIsLoading(true);
		fetch(`${API_URL}/projects?type=live`)
			.then(r => r.json())
			.then(data => {
				if (Array.isArray(data) && data.length > 0) {
					setProjects(data);
				} else {
					setProjects(fallbackProjects);
				}
			})
			.catch(() => {
				setProjects(fallbackProjects);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<div className='min-h-screen bg-black text-white pt-24 px-4 md:px-8 pb-24 md:pb-12'>
			<div className='max-w-7xl mx-auto'>
				<ScrollReveal animation="fadeUp">
					<div className='mb-12 border-l-4 border-yellow-500 pl-6'>
						<h1 className='text-4xl md:text-5xl font-bold mb-2'>
							Live Projects
						</h1>
						<p className='text-gray-400'>
							Track the progress of our ongoing developments in
							real-time.
						</p>
					</div>
				</ScrollReveal>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{isLoading ? (
						[...Array(3)].map((_, i) => <ProjectSkeleton key={i} />)
					) : (
						projects.map((project, index) => (
							<ScrollReveal animation="fadeUp" delay={index * 0.1} key={project._id}>
								<div
									className='bg-stone-900 border border-white/10 rounded-lg overflow-hidden group hover:border-yellow-500/50 transition-all duration-300 h-full flex flex-col'>
									{/* Hero Image */}
									<div className='relative h-64 overflow-hidden shrink-0'>
										<img
											src={getProjectImage(project)}
											alt={project.name}
											className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
										/>
										<div className='absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1'>
											<Activity size={12} />
											{project.stage}
										</div>
									</div>

									{/* Content */}
									<div className='p-6 space-y-4 flex flex-col flex-grow'>
										<div className='flex-grow'>
											<h3 className='text-2xl font-bold mb-1 group-hover:text-yellow-500 transition-colors'>
												{project.name}
											</h3>
											<div className='flex items-center text-gray-400 text-sm gap-2'>
												<MapPin size={14} />
												{project.location}
											</div>
										</div>

										{/* Progress Bar */}
										<div className='space-y-2 mt-auto'>
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

										<Link to={`/live-projects/${project._id}`}>
											<button className='w-full mt-4 py-3 bg-stone-800 hover:bg-white hover:text-black border border-white/10 text-white font-medium transition-all rounded flex items-center justify-center gap-2'>
												View Live Details
												<ArrowRight size={16} />
											</button>
										</Link>
									</div>
								</div>
							</ScrollReveal>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default LiveProjects;
