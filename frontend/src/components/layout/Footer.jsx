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

const WhatsappIcon = ({ size = 20, className = "" }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
		className={className}
	>
		<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
	</svg>
);

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
					<div className='flex space-x-4 items-center'>
						<a href='#' target='_blank' rel='noopener noreferrer'>
							<Facebook
								size={20}
								className='text-gray-400 hover:text-[#1877F2] cursor-pointer transition-colors'
							/>
						</a>
						<a href='#' target='_blank' rel='noopener noreferrer'>
							<Twitter
								size={20}
								className='text-gray-400 hover:text-[#1DA1F2] cursor-pointer transition-colors'
							/>
						</a>
						<a href='#' target='_blank' rel='noopener noreferrer'>
							<Instagram
								size={20}
								className='text-gray-400 hover:text-[#E4405F] cursor-pointer transition-colors'
							/>
						</a>
						<a href='#' target='_blank' rel='noopener noreferrer'>
							<Linkedin
								size={20}
								className='text-gray-400 hover:text-[#0A66C2] cursor-pointer transition-colors'
							/>
						</a>
						<a href='https://wa.me/917842080707' target='_blank' rel='noopener noreferrer'>
							<WhatsappIcon
								size={20}
								className='text-gray-400 hover:text-[#25D366] cursor-pointer transition-colors'
							/>
						</a>
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
