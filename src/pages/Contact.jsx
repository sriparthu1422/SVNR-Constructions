/** @format */

import React from 'react';
import { MapPin, Phone, Mail, Building, ArrowRight } from 'lucide-react';

const projects = [
	{
		id: 1,
		name: 'The Ayati',
		address:
			'Plot No. 24, Financial District, Gachibowli, Hyderabad, Telangana 500032',
		phone: '+91 99887 76655',
		email: 'sales@theayati.com',
	},
	{
		id: 2,
		name: 'SVNR Heights',
		address:
			'Road No. 45, Jubilee Hills, Near Checkpost, Hyderabad, Telangana 500033',
		phone: '+91 98765 43210',
		email: 'info@svnrheights.com',
	},
	{
		id: 3,
		name: 'Green Valley Villas',
		address: 'Green Hills Road, Manikonda, Hyderabad, Telangana 500089',
		phone: '+91 91234 56789',
		email: 'enquiry@greenvalley.com',
	},
	{
		id: 4,
		name: 'Skyline Towers',
		address: 'Hitech City Main Road, Madhapur, Hyderabad, Telangana 500081',
		phone: '+91 88990 07766',
		email: 'sales@skylinetowers.com',
	},
	{
		id: 5,
		name: 'Urban Enclave',
		address: 'Kondapur, Near Botanical Garden, Hyderabad, Telangana 500084',
		phone: '+91 77665 54433',
		email: 'contact@urbanenclave.com',
	},
	{
		id: 6,
		name: 'Lakeview Residency',
		address: 'Kukatpally, Near Forum Mall, Hyderabad, Telangana 500072',
		phone: '+91 66554 43322',
		email: 'sales@lakeview.com',
	},
];

const ProjectLocationCard = ({ project }) => (
	<div className='bg-stone-900 border border-white/10 rounded-lg p-6 hover:border-yellow-500/30 transition-all duration-300 group flex flex-col h-full'>
		<h3 className='text-xl font-bold text-white mb-4 group-hover:text-yellow-500 transition-colors'>
			{project.name}
		</h3>
		<div className='w-full h-px bg-white/10 mb-6 group-hover:bg-yellow-500/50 transition-colors'></div>

		<div className='space-y-4 flex-grow'>
			<div className='flex items-start gap-3 text-gray-400'>
				<MapPin
					size={20}
					className='text-yellow-500 mt-1 flex-shrink-0'
				/>
				<p className='text-sm leading-relaxed'>{project.address}</p>
			</div>

			<div className='flex items-center gap-3 text-gray-400'>
				<Phone
					size={20}
					className='text-yellow-500 flex-shrink-0'
				/>
				<p className='text-sm'>{project.phone}</p>
			</div>
		</div>

		<div className='mt-8 grid grid-cols-3 gap-3 pt-6 border-t border-white/5'>
			<button className='px-2 py-2 text-xs font-medium text-white border border-white/20 rounded hover:bg-white hover:text-black hover:border-white transition-all text-center'>
				Site Visit
			</button>
			<button className='px-2 py-2 text-xs font-medium text-white border border-white/20 rounded hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all text-center'>
				Location
			</button>
			<a
				href={`mailto:${project.email}`}
				className='px-2 py-2 text-xs font-medium text-white border border-white/20 rounded hover:bg-stone-700 transition-all text-center flex items-center justify-center'>
				Email
			</a>
		</div>
	</div>
);

const Contact = () => {
	return (
		<div className='min-h-screen bg-black text-white pt-24'>
			{/* Section 1: Contact Banner */}
			<section className='px-4 md:px-8 mb-20'>
				<div className='w-full h-[300px] md:h-[400px] relative rounded-3xl overflow-hidden'>
					<img
						src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
						alt='Contact Banner'
						className='w-full h-full object-cover'
					/>
					<div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
						<h1 className='text-4xl md:text-6xl font-bold text-white tracking-wider uppercase'>
							Contact Us
						</h1>
					</div>
				</div>
			</section>

			{/* Section 2: Locations of the Projects */}
			<section className='px-4 md:px-8 max-w-7xl mx-auto mb-24 cursor-default'>
				<div className='mb-12 border-l-4 border-yellow-500 pl-4'>
					<h2 className='text-3xl md:text-4xl font-bold text-white'>
						Locations of the projects
					</h2>
					<p className='text-gray-400 mt-2'>
						Find our premium developments across the city
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{projects.map((project) => (
						<ProjectLocationCard
							key={project.id}
							project={project}
						/>
					))}
				</div>
			</section>

			{/* Section 3: Map Section */}
			<section className='w-full h-[500px] bg-stone-900 relative'>
				<iframe
					title='SVNR Projects Map'
					src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.463321948719!2d78.3845!3d17.4425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzMzLjAiTiA3OMKwMjMnMDQuMiJF!5e0!3m2!1sen!2sin!4v1631234567890!5m2!1sen!2sin'
					width='100%'
					height='100%'
					style={{
						border: 0,
						filter: 'grayscale(100%) invert(92%) contrast(83%)',
					}}
					allowFullScreen=''
					loading='lazy'
					className='opacity-80 hover:opacity-100 transition-opacity duration-500'
				/>
				<div className='absolute bottom-8 right-8 bg-black/80 backdrop-blur-md p-4 rounded-lg border border-white/10 hidden md:block'>
					<p className='text-xs text-yellow-500 font-bold uppercase tracking-wider mb-1'>
						Headquarters
					</p>
					<p className='text-white font-medium'>
						Financial District, Hyderabad
					</p>
				</div>
			</section>
		</div>
	);
};

export default Contact;
