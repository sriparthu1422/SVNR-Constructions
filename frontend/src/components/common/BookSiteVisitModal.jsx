/** @format */

import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BookSiteVisitModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		date: '',
		project: '',
		message: '',
		agreement: false,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle submission logic here
		console.log(formData);
		setTimeout(() => {
			onClose();
			alert('Request Submitted Successfully!');
		}, 1000);
	};

	const inputClasses =
		'w-full p-3 border border-gray-300 rounded-md text-gray-700 text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all placeholder-gray-400';

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className='fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]'
					/>

					{/* Modal Container */}
					<div className='fixed inset-0 flex items-center justify-center p-4 z-[70] pointer-events-none'>
						<motion.div
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							className='bg-white w-full max-w-lg shadow-2xl pointer-events-auto relative flex flex-col max-h-[90vh]'>
							{/* Scrollable Content Area */}
							<div className='overflow-y-auto custom-scrollbar p-6 md:p-8'>
								{/* Close Button */}
								<button
									onClick={onClose}
									className='absolute top-4 right-4 text-gray-400 hover:text-black transition-colors'>
									<X size={24} />
								</button>

								{/* Header */}
								<div className='text-center mb-8 mt-2'>
									<h2 className='text-2xl font-bold text-gray-900 mb-1'>
										Talk to our Sales Representative
									</h2>
								</div>

								{/* Form */}
								<form
									onSubmit={handleSubmit}
									className='space-y-4'>
									{/* Name */}
									<div>
										<input
											type='text'
											name='name'
											value={formData.name}
											onChange={handleChange}
											placeholder='Your Name'
											className={inputClasses}
											required
										/>
									</div>

									{/* Email */}
									<div>
										<input
											type='email'
											name='email'
											value={formData.email}
											onChange={handleChange}
											placeholder='Your Email Address'
											className={inputClasses}
											required
										/>
									</div>

									{/* Phone Number */}
									<div className='relative flex items-center'>
										<div className='absolute left-3 flex items-center space-x-1 border-r border-gray-300 pr-2'>
											<span className='text-lg'>🇮🇳</span>
											<span className='text-gray-500 text-sm font-medium'>
												+91
											</span>
										</div>
										<input
											type='tel'
											name='phone'
											value={formData.phone}
											onChange={handleChange}
											placeholder='Your Phone Number*'
											className={`${inputClasses} pl-20`}
											required
										/>
									</div>

									{/* Preferred Date */}
									<div>
										<input
											type='text'
											onFocus={(e) =>
												(e.target.type = 'date')
											}
											onBlur={(e) =>
												(e.target.type = 'text')
											}
											name='date'
											value={formData.date}
											onChange={handleChange}
											placeholder='Preferred Visit Date'
											className={`${inputClasses} cursor-pointer`}
										/>
									</div>

									{/* Project Dropdown */}
									<div className='relative'>
										<select
											name='project'
											value={formData.project}
											onChange={handleChange}
											className={`${inputClasses} appearance-none cursor-pointer bg-white`}>
											<option
												value=''
												disabled>
												Interested Project
											</option>
											<option value='The Ayati'>
												The Ayati
											</option>
											<option value='SVNR Heights'>
												SVNR Heights
											</option>
											<option value='Green Valley'>
												Green Valley
											</option>
											<option value='Skyline Towers'>
												Skyline Towers
											</option>
										</select>
										<ChevronDown
											className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
											size={16}
										/>
									</div>

									{/* Message */}
									<div>
										<textarea
											name='message'
											rows='4'
											value={formData.message}
											onChange={handleChange}
											placeholder='Your Message'
											className={`${inputClasses} resize-none`}></textarea>
									</div>

									{/* Checkbox */}
									<div className='flex items-start gap-3 mt-2'>
										<input
											type='checkbox'
											name='agreement'
											id='agreement'
											checked={formData.agreement}
											onChange={handleChange}
											className='mt-1 w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500 cursor-pointer'
											required
										/>
										<label
											htmlFor='agreement'
											className='text-xs text-gray-500 cursor-pointer selection:bg-yellow-100'>
											I agree to receive newsletters, or
											relevant marketing content and{' '}
											<a
												href='#'
												className='text-blue-500 hover:underline'>
												Terms and Conditions
											</a>
										</label>
									</div>

									{/* Submit Button */}
									<button
										type='submit'
										className='w-full py-3 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition-colors shadow-md mt-2'>
										Submit
									</button>
								</form>
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
};

export default BookSiteVisitModal;
