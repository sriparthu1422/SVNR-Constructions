/** @format */

import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const BookSiteVisitModal = ({ isOpen, onClose }) => {
	const getTodayDate = () => {
		const today = new Date();
		const yyyy = today.getFullYear();
		const mm = String(today.getMonth() + 1).padStart(2, '0');
		const dd = String(today.getDate()).padStart(2, '0');
		return `${yyyy}-${mm}-${dd}`;
	};

	const formatDateToDDMMYYYY = (dateString) => {
		if (!dateString) return '';
		const [yyyy, mm, dd] = dateString.split('-');
		if (!yyyy || !mm || !dd) return dateString;
		return `${dd}/${mm}/${yyyy}`;
	};

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		date: '',
		project: '',
		message: '',
		agreement: false,
	});

	const [dateInputType, setDateInputType] = useState('text');
	const [isSubmitted, setIsSubmitted] = useState(false);

	const resetForm = () => {
		setFormData({
			name: '',
			email: '',
			phone: '',
			date: '',
			project: '',
			message: '',
			agreement: false,
		});
		setDateInputType('text');
		setIsSubmitted(false);
	};

	useEffect(() => {
		if (isOpen) {
			resetForm();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	// Check if all fields are properly filled
	const isFormValid =
		formData.name.trim() !== '' &&
		formData.email.trim() !== '' &&
		formData.phone.trim() !== '' &&
		formData.date.trim() !== '' &&
		formData.project.trim() !== '' &&
		formData.message.trim() !== '' &&
		formData.agreement === true;

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isFormValid) return;

		// Handle submission logic here
		console.log(formData);
		setIsSubmitted(true);

		setTimeout(() => {
			setIsSubmitted(false);
			onClose();
			resetForm();
		}, 3000); // Wait 3 seconds to show the message before closing
	};

	const inputClasses =
		'w-full p-2.5 border border-gray-300 rounded-md text-gray-700 text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all placeholder-gray-400';

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
							className='bg-white w-full max-w-lg shadow-2xl pointer-events-auto relative flex flex-col max-h-[96vh] rounded-xl overflow-hidden'>
							{/* Scrollable Content Area */}
							<div className='overflow-y-auto custom-scrollbar p-5 pb-20 md:p-6'>
								{/* Close Button */}
								<button
									onClick={onClose}
									className='absolute top-4 right-4 text-gray-400 hover:text-black transition-colors'>
									<X size={24} />
								</button>

								{/* Header */}
								<div className='text-center mb-5 mt-2'>
									<h2 className='text-xl md:text-2xl font-bold text-gray-900 mb-1'>
										Talk to our Sales Representative
									</h2>
								</div>

								{/* Form */}
								<form
									onSubmit={handleSubmit}
									className='space-y-3'>
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
											onInvalid={(e) => e.target.setCustomValidity('Please Enter your name')}
											onInput={(e) => e.target.setCustomValidity('')}
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
											onInvalid={(e) => e.target.setCustomValidity('Please Enter your email')}
											onInput={(e) => e.target.setCustomValidity('')}
										/>
									</div>

									{/* Phone Number */}
									<div className='relative flex items-center'>
										<div className='absolute left-3 flex items-center space-x-1 border-r border-gray-300 pr-2'>
											<img
												src='https://flagcdn.com/w20/in.png'
												srcSet='https://flagcdn.com/w40/in.png 2x'
												width='20'
												alt='India'
												className='rounded-sm shrink-0'
											/>
											<span className='text-gray-500 text-sm font-medium'>
												+91
											</span>
										</div>
										<input
											type='tel'
											name='phone'
											value={formData.phone}
											onChange={handleChange}
											placeholder='Your Mobile Number*'
											className={`${inputClasses} pl-20`}
											required
											onInvalid={(e) => e.target.setCustomValidity('Please Enter your mobile number')}
											onInput={(e) => e.target.setCustomValidity('')}
										/>
									</div>

									{/* Preferred Date */}
									<div>
										<input
											type={dateInputType}
											onFocus={() => setDateInputType('date')}
											onBlur={() => setDateInputType('text')}
											name='date'
											value={dateInputType === 'date' ? formData.date : formatDateToDDMMYYYY(formData.date)}
											onChange={handleChange}
											min={getTodayDate()}
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
											rows='3'
											value={formData.message}
											onChange={handleChange}
											placeholder='Your Message'
											className={`${inputClasses} resize-none`}
											required
											onInvalid={(e) => e.target.setCustomValidity('Please Enter your message')}
											onInput={(e) => e.target.setCustomValidity('')}></textarea>
									</div>

									{/* Checkbox */}
									<div className='flex items-start gap-3 mt-2'>
										<input
											type='checkbox'
											name='agreement'
											id='agreement'
											checked={formData.agreement}
											onChange={handleChange}
											className='mt-1 w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500 cursor-pointer flex-shrink-0'
											required
										/>
										<label
											htmlFor='agreement'
											className='text-xs text-gray-500 cursor-pointer selection:bg-yellow-100 flex-1 leading-snug'>
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
										disabled={!isFormValid}
										className={`w-full py-2.5 font-bold rounded-md transition-all duration-300 mt-2 ${isFormValid
											? 'bg-yellow-500 text-white hover:bg-yellow-600'
											: 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
											}`}>
										Submit
									</button>

									{/* Success Message */}
									<AnimatePresence>
										{isSubmitted && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												className='text-center text-green-600 font-medium text-sm mt-3'>
												Message Sent Successfully!
											</motion.div>
										)}
									</AnimatePresence>
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
