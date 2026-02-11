/** @format */

import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
	{
		id: 1,
		name: 'Rajesh Kumar',
		text: 'Buying a home with SVNR was the best decision we made. The quality of construction and attention to detail is unmatched in Hyderabad.',
		location: 'Software Engineer',
	},
	{
		id: 2,
		name: 'Priya Reddy',
		text: 'From the initial booking to the final handover, the process was seamless. Their transparency and timely delivery focused approach is commendable.',
		location: 'Doctor',
	},
	{
		id: 3,
		name: 'Mohan Rao',
		text: "I was impressed by the sustainable practices they follow. Living in an eco-friendly home that doesn't compromise on luxury is a dream come true.",
		location: 'Business Owner',
	},
	{
		id: 4,
		name: 'Anita Desai',
		text: 'The amenities provided at SVNR Heights are world-class. It truly feels like a community designed for modern families.',
		location: 'Architect',
	},
	{
		id: 5,
		name: 'Vikram Singh',
		text: 'Professionalism at its peak. The team was always available to answer our queries and kept us updated throughout the construction phase.',
		location: 'Investment Banker',
	},
];

const TestimonialCard = ({ data }) => (
	<div className='w-[400px] flex-shrink-0 bg-stone-900 border border-white/10 p-8 rounded-lg mx-4 hover:border-yellow-500/50 transition-colors group'>
		<Quote
			className='text-stone-700 mb-6 group-hover:text-yellow-500 transition-colors'
			size={32}
		/>
		<p className='text-gray-300 text-lg leading-relaxed mb-6 font-light italic'>
			"{data.text}"
		</p>
		<div>
			<h4 className='text-xl font-bold text-white'>{data.name}</h4>
			<span className='text-stone-500 text-sm'>{data.location}</span>
		</div>
	</div>
);

const TestimonialsSlider = () => {
	// Duplicate for seamless scroll
	const duplicatedTestimonials = [...testimonials, ...testimonials];

	return (
		<section className='bg-black py-24 pb-12 overflow-hidden border-t border-white/5'>
			<div className='text-center mb-16'>
				<span className='text-yellow-500 font-bold tracking-widest uppercase text-sm'>
					Testimonials
				</span>
				<h2 className='text-3xl md:text-5xl font-bold text-white mt-2'>
					What clients say
				</h2>
			</div>

			<div className='relative w-full'>
				<div className='flex w-max animate-scroll hover:[animation-play-state:paused]'>
					{duplicatedTestimonials.map((item, index) => (
						<TestimonialCard
							key={`${item.id}-${index}`}
							data={item}
						/>
					))}
				</div>
			</div>

			<style jsx>{`
				/* Reuse existing animate-scroll from index.css or define here if needed */
				/* Assuming animate-scroll is available globally */
			`}</style>
		</section>
	);
};

export default TestimonialsSlider;
