/** @format */

import React from 'react';
import {
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Mail,
	Phone,
	MapPin,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className='bg-neutral-950 text-white border-t border-white/10'>
			<div className='max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12'>
				{/* Brand Info */}
				<div className='lg:col-span-4 pr-0 lg:pr-8'>
					<h2 className='text-2xl font-bold tracking-wider mb-6'>
						SVNR Constructions<span className='text-yellow-500'>.</span>
					</h2>
					<p className='text-gray-400 text-sm leading-relaxed mb-6'>
						Building dreams with concrete precision. Trusted by
						hundreds of families for quality, integrity, and timely
						delivery.
					</p>
					<div className='flex space-x-4'>
						<Facebook
							size={20}
							className='text-gray-400 hover:text-white cursor-pointer transition-colors'
						/>
						<Twitter
							size={20}
							className='text-gray-400 hover:text-white cursor-pointer transition-colors'
						/>
						<Instagram
							size={20}
							className='text-gray-400 hover:text-white cursor-pointer transition-colors'
						/>
						<Linkedin
							size={20}
							className='text-gray-400 hover:text-white cursor-pointer transition-colors'
						/>
					</div>
				</div>

				{/* Quick Links */}
				<div className='lg:col-span-2'>
					<h3 className='text-lg font-semibold mb-6'>Quick Links</h3>
					<ul className='space-y-3 text-sm text-gray-400'>
						<li>
							<Link
								to='/about-us'
								className='hover:text-yellow-500 transition-colors'>
								About Us
							</Link>
						</li>
						<li>
							<Link
								to='/live-projects'
								className='hover:text-yellow-500 transition-colors'>
								Live Projects
							</Link>
						</li>
						<li>
							<Link
								to='/delivered-projects'
								className='hover:text-yellow-500 transition-colors'>
								Delivered Projects
							</Link>
						</li>
						<li>
							<Link
								to='/contact'
								className='hover:text-yellow-500 transition-colors'>
								Contact Us
							</Link>
						</li>
						<li>
							<Link
								to='/explore-vr'
								className='hover:text-yellow-500 transition-colors'>
								Explore VR
							</Link>
						</li>
					</ul>
				</div>

				{/* Projects */}
				<div className='lg:col-span-3'>
					<h3 className='text-lg font-semibold mb-6'>
						Latest Projects
					</h3>
					<ul className='space-y-3 text-sm text-gray-400'>
						<li>
							<Link
								to='/live-projects/1'
								className='hover:text-yellow-500 transition-colors'>
								The Ayati
							</Link>
						</li>
						<li>
							<Link
								to='/live-projects/2'
								className='hover:text-yellow-500 transition-colors'>
								SVNR Heights
							</Link>
						</li>
						<li>
							<Link
								to='/live-projects/3'
								className='hover:text-yellow-500 transition-colors'>
								Green Valley
							</Link>
						</li>
						<li>
							<Link
								to='/upcoming-projects'
								className='hover:text-yellow-500 transition-colors'>
								Urban Towers
							</Link>
						</li>
					</ul>
				</div>

				{/* Contact */}
				<div className='lg:col-span-3 pb-8 lg:pb-0'>
					<h3 className='text-lg font-semibold mb-6'>Contact Us</h3>
					<div className='space-y-4 text-sm text-gray-400'>
						<div className='flex items-start gap-3'>
							<MapPin
								size={18}
								className='mt-1 text-yellow-500 flex-shrink-0'
							/>
							<span className='leading-relaxed'>
								ORR Exit - 5, Saragudem ( V ), <span className="whitespace-nowrap">Gandi Maisamma</span>, Medchal Malkajgiri ( D ), Hyderabad - 500043, Telangana.
							</span>
						</div>
						<div className='flex items-center gap-3'>
							<Phone
								size={18}
								className='text-yellow-500 flex-shrink-0'
							/>
							<span>7842080707, 7842090707</span>
						</div>
						<div className='flex items-center gap-3'>
							<Mail
								size={18}
								className='text-yellow-500 flex-shrink-0'
							/>
							<span className='break-all'>svnrconstruction@gmail.com</span>
						</div>
					</div>
				</div>
			</div>

			<div className='border-t border-white/10 bg-black py-6 pb-40 lg:pb-6'>
				<div className='max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4 md:gap-0'>
					<p className='text-center md:text-left leading-relaxed'>
						&copy; 2021, SVNR Constructions Pvt. Ltd. All Rights Reserved.
						<span className='block sm:inline sm:ml-1 mt-1 sm:mt-0'>
							Designed by{' '}
							<a
								href='https://sriparthu1422.github.io/NSP-portfolio/'
								target='_blank'
								rel='noopener noreferrer'
								className='text-yellow-500 hover:text-white transition-colors font-medium tracking-wider'>
								NSP
							</a>
						</span>
					</p>
					<div className='flex space-x-6'>
						<a
							href='#'
							className='hover:text-white transition-colors tracking-wide'>
							Privacy Policy
						</a>
						<a
							href='#'
							className='hover:text-white transition-colors tracking-wide'>
							Terms of Service
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
