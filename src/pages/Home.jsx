/** @format */

import React from 'react';
import { motion } from 'framer-motion';
import {
	ArrowRight,
	Box,
	Calendar,
	CheckCircle,
	ExternalLink,
	MapPin,
} from 'lucide-react';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectSlider from '../components/common/ProjectSlider';
import { Link } from 'react-router-dom';

const ProjectCard = ({ title, status, location, img }) => (
	<div className='group relative overflow-hidden rounded-lg bg-stone-900 border border-white/10'>
		<div className='h-64 overflow-hidden'>
			<img
				src={img}
				alt={title}
				className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
			/>
		</div>
		<div className='p-6'>
			<div className='flex justify-between items-start mb-4'>
				<div>
					<h3 className='text-xl font-bold text-white mb-1 group-hover:text-yellow-500 transition-colors'>
						{title}
					</h3>
					<div className='flex items-center text-gray-400 text-sm'>
						<MapPin
							size={14}
							className='mr-1'
						/>
						{location}
					</div>
				</div>
				<span
					className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full ${status === 'Ongoing' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'}`}>
					{status}
				</span>
			</div>
			<Link
				to='/live-projects'
				className='inline-flex items-center text-sm font-medium text-white hover:text-yellow-500 transition-colors mt-2'>
				View Details{' '}
				<ArrowRight
					size={16}
					className='ml-1'
				/>
			</Link>
		</div>
	</div>
);

const SectionHeading = ({ sub, title }) => (
	<div className='text-center mb-16'>
		<span className='text-yellow-500 font-medium tracking-widest text-sm uppercase'>
			{sub}
		</span>
		<h2 className='text-3xl md:text-5xl font-bold text-white mt-3'>
			{title}
		</h2>
		<div className='w-24 h-1 bg-yellow-500 mx-auto mt-6'></div>
	</div>
);

const Home = () => {
	const ongoingProjects = [
		{
			title: 'The Ayati',
			status: 'Ongoing',
			location: 'Financial District',
			img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
		},
		{
			title: 'SVNR Heights',
			status: 'Ongoing',
			location: 'Jubilee Hills',
			img: 'https://images.unsplash.com/photo-1600596542815-e36cb0654136?q=80&w=2070&auto=format&fit=crop',
		},
		{
			title: 'Green Valley',
			status: 'Ongoing',
			location: 'Gachibowli',
			img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
		},
	];

	return (
		<div className='bg-black min-h-screen text-white'>
			{/* Section 1: Hero */}
			<div id='home'>
				{' '}
				{/* Wrap existing component or ensure component has ID */}
				<HeroSection />
			</div>

			{/* Section 2: About Us */}
			<div id='about-section'>
				<AboutSection />
			</div>

			{/* Section 3: Ongoing Projects (Slider) */}
			<ProjectSlider />

			{/* Section 4: Completed Projects Gallery */}
			<section className='py-24 px-4 md:px-8 bg-black'>
				<div className='max-w-7xl mx-auto'>
					<SectionHeading
						sub='Excellence Delivered'
						title='Completed Projects'
					/>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]'>
						<div className='col-span-2 row-span-2 relative group overflow-hidden rounded-md'>
							<img
								src='https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop'
								alt='Project'
								className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700'
							/>
							<div className='absolute inset-0 bg-black/60 group-hover:bg-transparent transition-all duration-500 flex items-end p-8'>
								<div className='text-white'>
									<h3 className='text-2xl font-bold'>
										Skyline Towers
									</h3>
									<p className='opacity-0 group-hover:opacity-100 transition-opacity delay-100 text-sm mt-2'>
										Residential • 2021
									</p>
								</div>
							</div>
						</div>
						<div className='col-span-1 row-span-1 relative group overflow-hidden rounded-md'>
							<img
								src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
								alt='Project'
								className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700'
							/>
							<div className='absolute inset-0 bg-black/50 group-hover:bg-transparent transition-all p-4 flex items-end'>
								<h3 className='font-bold'>Urban Villas</h3>
							</div>
						</div>
						<div className='col-span-1 row-span-1 relative group overflow-hidden rounded-md'>
							<img
								src='https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop'
								alt='Project'
								className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700'
							/>
							<div className='absolute inset-0 bg-black/50 group-hover:bg-transparent transition-all p-4 flex items-end'>
								<h3 className='font-bold'>The Grand</h3>
							</div>
						</div>
						<div className='col-span-2 row-span-1 relative group overflow-hidden rounded-md'>
							<img
								src='https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070&auto=format&fit=crop'
								alt='Project'
								className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700'
							/>
							<div className='absolute inset-0 bg-black/50 group-hover:bg-transparent transition-all p-4 flex items-end'>
								<h3 className='font-bold'>Emerald Gardens</h3>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section 5: Explore VR */}
			<section className='relative py-32 px-4 flex items-center justify-center overflow-hidden'>
				<img
					src='https://images.unsplash.com/photo-1558009250-d3d2229f60a9?q=80&w=2070&auto=format&fit=crop'
					alt='VR Background'
					className='absolute inset-0 w-full h-full object-cover opacity-40 fixed-bg'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black'></div>

				<div className='relative z-10 text-center max-w-5xl mx-auto -mt-24 p-12 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl'>
					<div className='inline-flex items-center justify-center p-3 rounded-full bg-yellow-500/20 text-yellow-500 mb-6 bg-blur'>
						<Box size={32} />
					</div>
					<h2 className='text-4xl md:text-6xl font-bold text-white mb-6'>
						Experience Future Living
					</h2>
					<p className='text-xl text-gray-300 mb-10 max-w-2xl mx-auto'>
						Step inside your dream home before it's even built. Try
						our immersive 3D Virtual Reality walkthroughs.
					</p>
					<Link to='/explore-vr'>
						<button className='px-10 py-4 bg-yellow-500 text-black font-bold tracking-wider hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(234,179,8,0.5)]'>
							EXPLORE IN VR
						</button>
					</Link>
				</div>
			</section>

			{/* Section 7: Contact & CTA */}
			<section className='py-24 px-4 bg-black border-t border-white/10'>
				<div className='max-w-5xl mx-auto bg-stone-900 rounded-2xl overflow-hidden flex flex-col md:flex-row'>
					<div className='md:w-1/2 p-12 flex flex-col justify-center'>
						<h2 className='text-3xl font-bold text-white mb-6'>
							Ready to find your dream home?
						</h2>
						<p className='text-gray-400 mb-8'>
							Schedule a personalized site visit today and witness
							the quality of SVNR Constructions firsthand.
						</p>
						<div className='flex flex-col space-y-4'>
							<button className='w-full py-4 bg-white text-black font-bold tracking-wide hover:bg-gray-200 transition-colors text-center'>
								BOOK SITE VISIT
							</button>
							<Link to='/contact'>
								<button className='w-full py-4 border border-white text-white font-bold tracking-wide hover:bg-white/10 transition-colors text-center'>
									CONTACT US
								</button>
							</Link>
						</div>
					</div>
					<div className='md:w-1/2 relative bg-gray-800 h-64 md:h-auto'>
						<img
							src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
							alt='Contact'
							className='absolute inset-0 w-full h-full object-cover opacity-80'
						/>
						<div className='absolute inset-0 bg-gradient-to-l from-transparent to-stone-900/50'></div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;
