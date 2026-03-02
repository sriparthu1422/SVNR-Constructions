import React, { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';

const Contact = () => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

	const isFormValid =
		formData.name.trim() !== '' &&
		formData.email.trim() !== '' &&
		formData.subject.trim() !== '' &&
		formData.message.trim() !== '';

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isFormValid) return;
		setIsSubmitting(true);

		// Simulate API call for premium interaction feel
		setTimeout(() => {
			setIsSubmitting(false);
			setIsSubmitted(true);
			setTimeout(() => setIsSubmitted(false), 4000);
			setFormData({ name: '', email: '', subject: '', message: '' });
			e.target.reset();
		}, 1500);
	};

	return (
		<div className='min-h-screen bg-black text-white font-sans flex flex-col'>
			<div className='flex-grow w-full flex items-center justify-center pt-24 pb-24 md:pb-12 px-4 md:px-8'>
				{/* Main Container - 1200px Max Width */}
				<ScrollReveal animation="fadeUp" className='max-w-[1200px] w-full mx-auto bg-white rounded-[20px] shadow-2xl flex flex-col md:flex-row overflow-hidden relative'>

					{/* LEFT PANEL – Contact Information Card */}
					<div className='w-full md:w-1/2 bg-gradient-to-br from-[#1a1c20] via-[#2a2d34] to-[#121316] text-white p-10 md:py-[60px] md:px-12 relative flex flex-col justify-center min-h-[500px]'>

						{/* Decorative abstract shape */}
						<div className='absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-500/20 rounded-full blur-[60px] pointer-events-none'></div>
						<div className='absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[40px] pointer-events-none'></div>

						<div className='relative z-10'>
							<h1 className='text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight'>
								Contact Information
							</h1>
							<p className='text-gray-400 text-sm md:text-base leading-relaxed mb-12 max-w-[85%]'>
								Let’s help you find your perfect home. Reach out to our property experts.
							</p>

							{/* Contact details list */}
							<div className='space-y-6'>
								<div className='flex items-center gap-5 group'>
									<div className='w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 group-hover:border-yellow-500/50 group-hover:bg-yellow-500/10 transition-all duration-300'>
										<Phone className='text-yellow-500' size={20} strokeWidth={1.5} />
									</div>
									<div>
										<p className='text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1'>Phone</p>
										<p className='text-lg font-medium'>+91 99887 76655</p>
									</div>
								</div>

								<div className='flex items-center gap-5 group'>
									<div className='w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 group-hover:border-yellow-500/50 group-hover:bg-yellow-500/10 transition-all duration-300'>
										<Phone className='text-yellow-500' size={20} strokeWidth={1.5} />
									</div>
									<div>
										<p className='text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1'>Alternate Phone</p>
										<p className='text-lg font-medium'>+91 98765 43210</p>
									</div>
								</div>

								<div className='flex items-center gap-5 group'>
									<div className='w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 group-hover:border-yellow-500/50 group-hover:bg-yellow-500/10 transition-all duration-300'>
										<Mail className='text-yellow-500' size={20} strokeWidth={1.5} />
									</div>
									<div>
										<p className='text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1'>Email</p>
										<p className='text-lg font-medium'>sales@svnrconstructions.com</p>
									</div>
								</div>

								<div className='flex items-center gap-5 group'>
									<div className='w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 group-hover:border-yellow-500/50 group-hover:bg-yellow-500/10 transition-all duration-300 hover:rotate-3'>
										<MapPin className='text-yellow-500' size={20} strokeWidth={1.5} />
									</div>
									<div>
										<p className='text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1'>Location</p>
										<p className='text-lg font-medium'>Financial District, Hyderabad, India</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* RIGHT PANEL – Contact Form */}
					<div className='w-full md:w-1/2 bg-white text-black p-10 md:py-[60px] md:px-12 flex flex-col justify-center'>
						<form onSubmit={handleSubmit} className='space-y-[30px] w-full max-w-lg mx-auto md:mx-0'>

							{/* Row 1: Your Name & Your Email */}
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-[30px]'>
								<div className='flex flex-col'>
									<label htmlFor='name' className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>
										Your Name
									</label>
									<input
										type='text'
										id='name'
										value={formData.name}
										onChange={handleChange}
										required
										onInvalid={(e) => e.target.setCustomValidity('Please enter your Name')}
										onInput={(e) => e.target.setCustomValidity('')}
										className='w-full bg-transparent border-b-2 border-gray-200 py-2 text-lg text-black focus:outline-none focus:border-stone-900 transition-colors duration-300'
									/>
								</div>
								<div className='flex flex-col'>
									<label htmlFor='email' className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>
										Your Email
									</label>
									<input
										type='email'
										id='email'
										value={formData.email}
										onChange={handleChange}
										required
										onInvalid={(e) => e.target.setCustomValidity('Please enter your Email')}
										onInput={(e) => e.target.setCustomValidity('')}
										className='w-full bg-transparent border-b-2 border-gray-200 py-2 text-lg text-black focus:outline-none focus:border-stone-900 transition-colors duration-300'
									/>
								</div>
							</div>

							{/* Row 2: Subject */}
							<div className='flex flex-col'>
								<label htmlFor='subject' className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>
									Subject
								</label>
								<input
									type='text'
									id='subject'
									value={formData.subject}
									onChange={handleChange}
									required
									onInvalid={(e) => e.target.setCustomValidity('Please enter a Subject')}
									onInput={(e) => e.target.setCustomValidity('')}
									className='w-full bg-transparent border-b-2 border-gray-200 py-2 text-lg text-black focus:outline-none focus:border-stone-900 transition-colors duration-300'
								/>
							</div>

							{/* Row 3: Message */}
							<div className='flex flex-col mb-4'>
								<label htmlFor='message' className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>
									Message
								</label>
								<textarea
									id='message'
									value={formData.message}
									onChange={handleChange}
									required
									onInvalid={(e) => e.target.setCustomValidity('Please enter your Message')}
									onInput={(e) => e.target.setCustomValidity('')}
									className='w-full h-[120px] bg-transparent border-b-2 border-gray-200 py-2 text-lg text-black focus:outline-none focus:border-stone-900 transition-colors duration-300 resize-none'
								></textarea>
							</div>

							{/* CTA & Success Message */}
							<div className='pt-6 relative min-h-[60px] flex justify-center items-center'>
								{isSubmitted ? (
									<div className='flex items-center justify-center gap-2 text-green-600 font-bold px-8 py-3 animate-[pulse_1s_ease-in-out_1]'>
										<CheckCircle size={24} className='text-green-500' />
										<span>Message sent successfully!</span>
									</div>
								) : (
									<button
										type='submit'
										disabled={isSubmitting || !isFormValid}
										className={`w-full sm:w-auto px-12 py-4 font-bold rounded-full transition-all duration-300 flex items-center justify-center ${isFormValid
											? 'bg-stone-900 text-white hover:bg-stone-800 hover:shadow-lg hover:-translate-y-1'
											: 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
											}`}
									>
										{isSubmitting ? (
											<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
										) : (
											'Send Inquiry'
										)}
									</button>
								)}
							</div>
						</form>
					</div>

				</ScrollReveal>
			</div>

			{/* Section: Map Section */}
			<ScrollReveal animation="fadeIn">
				<section className='w-full h-[500px] bg-stone-900 relative mt-auto'>
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
					<div className='absolute bottom-2 left-20 bg-black/80 backdrop-blur-md p-4 rounded-lg border border-white/10 hidden md:block'>
						<p className='text-xs text-yellow-500 font-bold uppercase tracking-wider mb-1'>
							Headquarters
						</p>
						<p className='text-white font-medium'>
							Financial District, Hyderabad
						</p>
					</div>
				</section>
			</ScrollReveal>
		</div>
	);
};

export default Contact;
