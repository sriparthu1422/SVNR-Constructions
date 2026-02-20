/** @format */

import React from 'react';

const stats = [
	{ label: 'Happy Families', value: '1500+' },
	{ label: 'Units Delivered', value: '276' },
	{ label: 'Years of Excellence', value: '10+' },
	{ label: 'Sq. Ft. Delivered', value: '2M+' },
	{ label: 'Ongoing Projects', value: '5' },
];

import {
	// eslint-disable-next-line no-unused-vars
	motion,
	useMotionValue,
	useTransform,
	animate,
	useInView,
} from 'framer-motion';
import { useRef, useEffect } from 'react';

const AnimatedCounter = ({ value }) => {
	// Parse numeric part and suffix
	const numericValue = parseInt(value.replace(/,/g, ''), 10);
	const suffix = value.replace(/[\d,]/g, '');

	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-50px' });
	const count = useMotionValue(0);
	const rounded = useTransform(count, Math.round);

	useEffect(() => {
		if (isInView) {
			const controls = animate(count, numericValue, {
				duration: 2.5,
				ease: 'easeOut',
			});
			return controls.stop;
		}
	}, [isInView, numericValue, count]);

	return (
		<span
			ref={ref}
			className='text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors flex items-center justify-center'>
			<motion.span>{rounded}</motion.span>
			<span>{suffix}</span>
		</span>
	);
};

const StatCard = ({ label, value }) => (
	<div className='aspect-square flex flex-col items-center justify-center border border-white/20 bg-stone-900/40 backdrop-blur-sm hover:bg-stone-800 hover:border-yellow-500/50 transition-all duration-300 rounded-sm group'>
		<AnimatedCounter value={value} />
		<span className='text-sm md:text-base text-gray-400 font-medium tracking-wider uppercase'>
			{label}
		</span>
	</div>
);

const StatsSection = () => {
	return (
		<section className='py-24 px-4 bg-stone-950 text-center border-t border-white/5'>
			<div className='max-w-6xl mx-auto'>
				<h2 className='text-3xl md:text-5xl font-bold text-white mb-6 tracking-wide'>
					The Numbers We've Achieved
				</h2>
				<p className='text-gray-400 text-lg md:text-xl font-light max-w-4xl mx-auto mb-16 leading-relaxed'>
					Over the last two decades, SVNR Constructions has achieved
					several incredible milestones. Powered by our values and
					ethos, the organisation's numbers are a testament to our
					long-term consistency and passion.
				</p>

				<div className='grid grid-cols-2 lg:grid-cols-5 gap-6'>
					{stats.map((stat, index) => (
						<StatCard
							key={index}
							{...stat}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default StatsSection;
