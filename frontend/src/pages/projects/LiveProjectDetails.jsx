/** @format */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
	Calendar,
	Download,
	CheckCircle,
	MapPin,
	ArrowLeft,
} from 'lucide-react';
import getProjectImage from '../../utils/projectImages';
import ankura1 from '../../assets/images/DeliveredProjectImages/ankura1.png';
import ankura2 from '../../assets/images/DeliveredProjectImages/ankura2.png';
import ankura3 from '../../assets/images/DeliveredProjectImages/ankura3.png';
import ankura4 from '../../assets/images/DeliveredProjectImages/ankura4.png';
import ankura5 from '../../assets/images/DeliveredProjectImages/ankura5.png';
import ankura6 from '../../assets/images/DeliveredProjectImages/ankura6.png';
import ankura7 from '../../assets/images/DeliveredProjectImages/ankura7.png';
import ankura8 from '../../assets/images/DeliveredProjectImages/ankura8.png';
import ankura9 from '../../assets/images/DeliveredProjectImages/ankura9.png';
import theAyati0 from '../../assets/images/HomeImage/TheAyati0.jpeg';
import theAyati7 from '../../assets/images/HomeImage/TheAyati7.jpeg';
import theAyati2 from '../../assets/images/HomeImage/TheAyati2.jpeg';
import theAyati3 from '../../assets/images/HomeImage/TheAyati3.jpeg';
import theAyati4 from '../../assets/images/HomeImage/TheAyati4.jpeg';
import theAyati5 from '../../assets/images/HomeImage/TheAyati5.jpeg';

const LiveProjectDetails = () => {
	const { id } = useParams();
	const [viewMode, setViewMode] = useState('render');
	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);
	const [enquiry, setEnquiry] = useState({ name: '', phone: '', email: '', message: '' });
	const [enquirySubmitted, setEnquirySubmitted] = useState(false);

	const handleEnquirySubmit = async (e) => {
		e.preventDefault();
		try {
			const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
			const res = await fetch(`${API_URL}/inquiries`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: enquiry.name,
					email: enquiry.email,
					subject: `Enquiry for ${project?.name || 'Project'}`,
					message: `Phone: ${enquiry.phone}\n${enquiry.message}`,
				}),
			});
			if (res.ok) {
				setEnquirySubmitted(true);
				setEnquiry({ name: '', phone: '', email: '', message: '' });
				setTimeout(() => setEnquirySubmitted(false), 4000);
			}
		} catch (error) {
			console.error('Enquiry error:', error);
			alert('Failed to submit. Please try again.');
		}
	};

	useEffect(() => {
		const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
		fetch(`${API_URL}/projects/${id}`)
			.then(r => r.json())
			.then(data => {
				if (data && data._id) setProject(data);
			})
			.catch(() => {})
			.finally(() => setLoading(false));
	}, [id]);

	// Gallery images mapped by project name
	const getGalleryImages = (name) => {
		const n = (name || '').toLowerCase();
		if (n.includes('ankura')) return { hero: ankura1, gallery: [ankura1, ankura2, ankura3, ankura4, ankura5, ankura6, ankura7, ankura8, ankura9] };
		if (n.includes('ayati')) return { hero: theAyati0, gallery: [theAyati0, theAyati7, theAyati2, theAyati3, theAyati4, theAyati5] };
		return { hero: null, gallery: [1, 2, 3, 4, 5, 6] };
	};

	if (loading) {
		return (
			<div className='min-h-screen bg-black text-white flex items-center justify-center'>
				<div className='animate-pulse text-xl text-gray-400'>Loading project...</div>
			</div>
		);
	}

	if (!project) {
		return (
			<div className='min-h-screen bg-black text-white flex flex-col items-center justify-center'>
				<h1 className='text-4xl font-bold mb-4'>Project Not Found</h1>
				<Link to='/live-projects' className='text-yellow-500 hover:text-yellow-400 flex items-center gap-2'>
					<ArrowLeft size={20} /> Back to Live Projects
				</Link>
			</div>
		);
	}

	const galleryData = getGalleryImages(project.name);

	return (
		<div className='bg-black text-white min-h-screen pt-20 pb-32 md:pb-20'>
			{/* 1. Hero / Header */}
			<div className='relative h-[60vh] md:h-[80vh] w-full overflow-hidden'>
				<img
					src={galleryData.hero || getProjectImage(project)}
					alt={project.name}
					className='w-full h-full object-cover'
				/>
				<div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-8 md:p-16'>
					<div className='max-w-7xl mx-auto'>
						<span className='bg-yellow-500 text-black px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-4 inline-block'>
							{project.stage}
						</span>
						<h1 className='text-4xl md:text-6xl font-bold mb-2'>
							{project.name}
						</h1>
						<p className='text-xl text-gray-300 flex items-center gap-2'>
							<MapPin size={20} /> {project.location}
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
							{galleryData.gallery.map((img, index) => (
								<div
									key={index}
									className='aspect-square bg-stone-900 rounded-lg overflow-hidden relative group'>
									<img
										src={typeof img === 'string' ? img : `https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop`}
										className='w-full h-full object-cover group-hover:scale-110 transition-transform'
										alt='site'
									/>
									<div className='absolute bottom-0 left-0 w-full p-2 bg-black/60 text-xs text-white'>
										{`Progress Shot ${index + 1}`}
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

							{enquirySubmitted ? (
								<div className='text-center py-8'>
									<CheckCircle size={48} className='text-green-500 mx-auto mb-4' />
									<p className='text-lg font-bold text-gray-800'>Thank you!</p>
									<p className='text-sm text-gray-500 mt-1'>We will get back to you soon.</p>
								</div>
							) : (
							<form className='space-y-4' onSubmit={handleEnquirySubmit}>
								<input
									type='text'
									placeholder='Name'
									value={enquiry.name}
									onChange={(e) => setEnquiry(prev => ({ ...prev, name: e.target.value }))}
									required
									className='w-full bg-gray-100 p-3 rounded border border-gray-300 focus:border-black outline-none transition-colors'
								/>
								<input
									type='tel'
									placeholder='Phone +91'
									value={enquiry.phone}
									onChange={(e) => setEnquiry(prev => ({ ...prev, phone: e.target.value }))}
									required
									className='w-full bg-gray-100 p-3 rounded border border-gray-300 focus:border-black outline-none transition-colors'
								/>
								<input
									type='email'
									placeholder='Email'
									value={enquiry.email}
									onChange={(e) => setEnquiry(prev => ({ ...prev, email: e.target.value }))}
									required
									className='w-full bg-gray-100 p-3 rounded border border-gray-300 focus:border-black outline-none transition-colors'
								/>
								<textarea
									rows='3'
									placeholder='Message'
									value={enquiry.message}
									onChange={(e) => setEnquiry(prev => ({ ...prev, message: e.target.value }))}
									required
									className='w-full bg-gray-100 p-3 rounded border border-gray-300 focus:border-black outline-none transition-colors resize-none'></textarea>
								<button type='submit' className='w-full bg-black text-white font-bold py-4 rounded hover:bg-stone-800 transition-colors uppercase tracking-wider'>
									Submit Enquiry
								</button>
							</form>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LiveProjectDetails;
