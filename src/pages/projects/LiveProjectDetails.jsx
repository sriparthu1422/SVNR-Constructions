/** @format */

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	Camera,
	Calendar,
	FileText,
	Download,
	Play,
	CheckCircle,
	MapPin,
	Phone,
} from 'lucide-react';

const LiveProjectDetails = () => {
	const { id } = useParams();
	const [viewMode, setViewMode] = useState('render'); // 'render' or 'site'
	const [activeTab, setActiveTab] = useState('overview');

	return (
		<div className='bg-black text-white min-h-screen pt-20 pb-20'>
			{/* 1. Hero / Header */}
			<div className='relative h-[60vh] md:h-[80vh] w-full overflow-hidden'>
				<img
					src={
						viewMode === 'render'
							? 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop'
							: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'
					}
					alt='Project Hero'
					className='w-full h-full object-cover'
				/>
				<div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-8 md:p-16'>
					<div className='max-w-7xl mx-auto'>
						<span className='bg-yellow-500 text-black px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-4 inline-block'>
							Finishing Stage
						</span>
						<h1 className='text-4xl md:text-6xl font-bold mb-2'>
							The Ayati
						</h1>
						<p className='text-xl text-gray-300 flex items-center gap-2'>
							<MapPin size={20} /> Financial District, Hyderabad
						</p>

						<div className='flex gap-4 mt-6'>
							<button
								onClick={() => setViewMode('render')}
								className={`px-6 py-2 rounded-full border ${viewMode === 'render' ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/50 hover:bg-white/10'}`}>
								Render View
							</button>
							<button
								onClick={() => setViewMode('site')}
								className={`px-6 py-2 rounded-full border ${viewMode === 'site' ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/50 hover:bg-white/10'}`}>
								Real Site Photos
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12'>
				{/* LEFT CONTENT COLUMN */}
				<div className='lg:col-span-2 space-y-16'>
					{/* Milestone Tracker */}
					<section>
						<h2 className='text-2xl font-bold mb-6 border-l-4 border-yellow-500 pl-4'>
							Construction Milestones
						</h2>
						<div className='relative pl-8 border-l border-white/20 space-y-8'>
							{[
								{
									title: 'Foundation',
									date: 'Jan 2023',
									status: 'completed',
								},
								{
									title: 'Structure Completed',
									date: 'Aug 2023',
									status: 'completed',
								},
								{
									title: 'Brick Work',
									date: 'Dec 2023',
									status: 'completed',
								},
								{
									title: 'Finishing Works',
									date: 'In Progress',
									status: 'current',
								},
								{
									title: 'Handover',
									date: 'Dec 2024',
									status: 'upcoming',
								},
							].map((milestone, idx) => (
								<div
									key={idx}
									className='relative'>
									<div
										className={`absolute -left-[41px] w-6 h-6 rounded-full border-4 border-black ${milestone.status === 'completed' ? 'bg-green-500' : milestone.status === 'current' ? 'bg-yellow-500 animate-pulse' : 'bg-gray-600'}`}></div>
									<h3
										className={`text-lg font-bold ${milestone.status === 'current' ? 'text-yellow-500' : 'text-white'}`}>
										{milestone.title}
									</h3>
									<span className='text-sm text-gray-400'>
										{milestone.date}
									</span>
								</div>
							))}
						</div>
					</section>

					{/* Monthly Construction Gallery */}
					<section>
						<h2 className='text-2xl font-bold mb-6 border-l-4 border-yellow-500 pl-4'>
							Construction Progress Gallery
						</h2>
						<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
							{[1, 2, 3, 4, 5, 6].map((item) => (
								<div
									key={item}
									className='aspect-square bg-stone-900 rounded-lg overflow-hidden relative group'>
									<img
										src={`https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop`}
										className='w-full h-full object-cover group-hover:scale-110 transition-transform'
										alt='site'
									/>
									<div className='absolute bottom-0 left-0 w-full p-2 bg-black/60 text-xs text-white'>
										March 2024
									</div>
								</div>
							))}
						</div>
					</section>

					{/* Approvals List */}
					<section className='bg-stone-900 p-8 rounded-xl border border-white/10'>
						<h2 className='text-2xl font-bold mb-6'>
							Approvals & Certificates
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{[
								'RERA Approved',
								'GHMC Sanctioned',
								'Environmental Clearance',
								'Fire NOC',
								'Pollution Control Board',
							].map((approval) => (
								<div
									key={approval}
									className='flex items-center gap-3 text-gray-300'>
									<CheckCircle
										size={18}
										className='text-green-500'
									/>
									{approval}
								</div>
							))}
						</div>
					</section>

					{/* Unit Types Table */}
					<section>
						<h2 className='text-2xl font-bold mb-6 border-l-4 border-yellow-500 pl-4'>
							Unit Configurations
						</h2>
						<div className='overflow-x-auto'>
							<table className='w-full text-left border-collapse'>
								<thead>
									<tr className='text-gray-400 border-b border-white/20'>
										<th className='p-4'>Type</th>
										<th className='p-4'>Size (Sft)</th>
										<th className='p-4'>Facing</th>
										<th className='p-4'>Status</th>
									</tr>
								</thead>
								<tbody className='text-white'>
									<tr className='border-b border-white/10 hover:bg-white/5'>
										<td className='p-4 font-bold'>
											3 BHK East
										</td>
										<td className='p-4'>2400</td>
										<td className='p-4'>East</td>
										<td className='p-4 text-green-400'>
											Available
										</td>
									</tr>
									<tr className='border-b border-white/10 hover:bg-white/5'>
										<td className='p-4 font-bold'>
											3 BHK West
										</td>
										<td className='p-4'>2200</td>
										<td className='p-4'>West</td>
										<td className='p-4 text-red-400'>
											Sold Out
										</td>
									</tr>
									<tr className='border-b border-white/10 hover:bg-white/5'>
										<td className='p-4 font-bold'>
											4 BHK Sky Villa
										</td>
										<td className='p-4'>4500</td>
										<td className='p-4'>East</td>
										<td className='p-4 text-yellow-500'>
											Few Left
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</section>
				</div>

				{/* RIGHT STICKY SIDEBAR */}
				<div className='lg:col-span-1'>
					<div className='sticky top-28 space-y-6'>
						{/* Brochure Download */}
						<div className='bg-stone-900 border border-white/10 p-6 rounded-xl'>
							<h3 className='text-xl font-bold mb-4'>
								Project Documentation
							</h3>
							<button className='w-full py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded flex items-center justify-center gap-3 text-yellow-500 font-bold transition-all'>
								<Download size={20} />
								Download Brochure
							</button>
						</div>

						{/* Sticky Enquiry Form */}
						<div className='bg-white text-black p-8 rounded-xl shadow-2xl'>
							<h3 className='text-2xl font-bold mb-2'>
								Interested?
							</h3>
							<p className='text-gray-600 mb-6 text-sm'>
								Request a call back or book a site visit.
							</p>

							<form className='space-y-4'>
								<input
									type='text'
									placeholder='Name'
									className='w-full bg-gray-100 p-3 rounded border border-gray-300 focus:border-black outline-none transition-colors'
								/>
								<input
									type='text'
									placeholder='Phone +91'
									className='w-full bg-gray-100 p-3 rounded border border-gray-300 focus:border-black outline-none transition-colors'
								/>
								<input
									type='email'
									placeholder='Email'
									className='w-full bg-gray-100 p-3 rounded border border-gray-300 focus:border-black outline-none transition-colors'
								/>
								<textarea
									rows='3'
									placeholder='Message'
									className='w-full bg-gray-100 p-3 rounded border border-gray-300 focus:border-black outline-none transition-colors resize-none'></textarea>
								<button className='w-full bg-black text-white font-bold py-4 rounded hover:bg-stone-800 transition-colors uppercase tracking-wider'>
									Submit Enquiry
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LiveProjectDetails;
