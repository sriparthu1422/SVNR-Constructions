/** @format */

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Lightbulb, Users } from 'lucide-react';
import FoundersSection from '../components/sections/FoundersSection';
import TestimonialsSlider from '../components/common/TestimonialsSlider';
import StatsSection from '../components/sections/StatsSection';

const About = () => {
	return (
		<div className='min-h-screen bg-black text-white pt-32 pb-0'>
			{/* Section 1: Hero Content */}
			<section className='px-4 md:px-8 max-w-7xl mx-auto text-center'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}>
					<h1 className='text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight text-white'>
						Building Trust,{' '}
						<span className='text-stone-400'>Brick by Brick</span>
					</h1>

					<div className='max-w-4xl mx-auto space-y-6 text-lg md:text-xl text-stone-300 font-light leading-relaxed'>
						<p>
							At SVNR Constructions, we believe that a home is
							more than just a structure—it is a foundation for
							dreams, memories, and lasting legacies. Our
							philosophy is rooted in unwavering integrity and a
							commitment to transparency, ensuring that every
							interaction builds confidence and every project
							stands as a testament to our promise of quality.
						</p>
						<p>
							We pride ourselves on delivering premium residential
							landscapes that blend modern architecture with
							functional elegance. From prime locations in the
							Financial District to serene enclaves in Jubilee
							Hills, our developments offer superior value,
							sustainable construction quality, and a lifestyle
							designed for generations to come.
						</p>
					</div>
				</motion.div>
			</section>

			{/* Section 2: Core Values */}
			<section className='bg-stone-950 py-24 px-4 md:px-8 mt-20'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						{[
							{
								icon: <ShieldCheck size={32} />,
								title: 'Quality Construction',
								desc: 'We use premium materials and modern engineering to build homes that stand the test of time.',
							},
							{
								icon: <Clock size={32} />,
								title: 'Timely Delivery',
								desc: 'We respect your time. Our rigorous project management ensures strict adherence to timelines.',
							},
							{
								icon: <Lightbulb size={32} />,
								title: 'Innovation',
								desc: 'Integrating smart designs and sustainable practices to create future-ready living spaces.',
							},
							{
								icon: <Users size={32} />,
								title: 'Customer Focus',
								desc: 'Your satisfaction is our priority. We design living spaces that enhance your lifestyle.',
							},
						].map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									delay: index * 0.1,
									duration: 0.5,
								}}
								whileHover={{ scale: 1.02 }}
								className='bg-stone-900/50 p-8 border border-white/5 rounded-sm hover:border-yellow-500/30 transition-colors group'>
								<div className='mb-6 text-yellow-500 bg-white/5 p-4 w-fit rounded-sm group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300'>
									{item.icon}
								</div>
								<h3 className='text-xl font-bold text-white mb-4'>
									{item.title}
								</h3>
								<p className='text-gray-400 text-sm leading-relaxed'>
									{item.desc}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Section 3: Founders / Promoters */}
			<FoundersSection />

			{/* Section 4: Testimonials */}
			<TestimonialsSlider />

			{/* Section 5: Stats / Numbers Achieved */}
			<StatsSection />
		</div>
	);
};

export default About;
