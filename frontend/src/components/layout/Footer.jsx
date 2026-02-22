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
			<div className='max-w-7xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
				{/* Brand Info */}
				<div>
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
				<div>
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
					</ul>
				</div>

				{/* Projects */}
				<div>
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
				<div>
					<h3 className='text-lg font-semibold mb-6'>Contact Us</h3>
					<div className='space-y-4 text-sm text-gray-400'>
						<div className='flex items-start gap-3'>
							<MapPin
								size={18}
								className='mt-1 text-yellow-500 flex-shrink-0'
							/>
							<span>
								123, Luxury Lane, Financial District, Hyderabad,
								500032
							</span>
						</div>
						<div className='flex items-center gap-3'>
							<Phone
								size={18}
								className='text-yellow-500 flex-shrink-0'
							/>
							<span>+91 98765 43210</span>
						</div>
						<div className='flex items-center gap-3'>
							<Mail
								size={18}
								className='text-yellow-500 flex-shrink-0'
							/>
							<span>info@svnrconstructions.com</span>
						</div>
					</div>
				</div>
			</div>

			<div className='border-t border-white/10 bg-black py-6'>
				<div className='max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500'>
					<p>&copy; 2024 SVNR Constructions. All rights reserved.</p>
					<div className='flex space-x-6 mt-4 md:mt-0'>
						<a
							href='#'
							className='hover:text-white'>
							Privacy Policy
						</a>
						<a
							href='#'
							className='hover:text-white'>
							Terms of Service
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
