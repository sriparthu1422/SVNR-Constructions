/** @format */

import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/logo.png';

const Navbar = ({ onBookVisit }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
	const [isProjectsHovered, setIsProjectsHovered] = useState(false);
	const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		// Only track scroll position on the home page
		if (location.pathname !== '/') {
			// setIsScrolledPastHero(true); // Unnecessary because isVisible derived value handles this
			return;
		}

		const heroElement = document.getElementById('home');
		if (!heroElement) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				// If Hero is intersecting, we are seeing it -> Nav hidden
				// If Hero is NOT intersecting, we scrolled past -> Nav visible
				setIsScrolledPastHero(!entry.isIntersecting);
			},
			{
				root: null,
				threshold: 0,
				rootMargin: '-80px 0px 0px 0px',
			},
		);

		observer.observe(heroElement);
		return () => {
			if (heroElement) observer.unobserve(heroElement);
		};
	}, [location.pathname]);

	const isVisible = location.pathname !== '/' || isScrolledPastHero;

	const navLinks = [
		{ name: 'Home', path: '/' },
		{ name: 'About Us', path: '/about-us' },
		{ name: 'Projects', path: '#', type: 'dropdown' },
		{ name: 'Contact', path: '/contact' },
		{ name: 'Explore VR', path: '/explore-vr' },
	];

	return (
		<nav
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${isVisible
				? 'translate-y-0 opacity-100'
				: '-translate-y-full opacity-0'
				} bg-black/90 backdrop-blur-md border-b border-white/10`}>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-20'>
					{/* Logo */}
					<div className='flex-shrink-0 cursor-pointer'>
						<Link to='/' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
							<img
								src={logo}
								alt='SVNR Constructions'
								className='h-25 mt-2 w-auto object-contain'
							/>
						</Link>
					</div>

					{/* Desktop Menu */}
					<div className='hidden lg:block'>
						<div className='ml-10 flex items-baseline space-x-8'>
							{navLinks.map((link) => {
								if (link.type === 'dropdown') {
									return (
										<div
											key={link.name}
											className='relative group inline-block'
											onMouseEnter={() =>
												setIsProjectsHovered(true)
											}
											onMouseLeave={() =>
												setIsProjectsHovered(false)
											}>
											<button
												onClick={() => setIsProjectsHovered(!isProjectsHovered)}
												className='text-gray-300 hover:text-yellow-500 hover:scale-105 transition-all text-lg font-medium tracking-wide flex items-center gap-1 py-6 focus:outline-none'>
												{link.name}
												<ChevronDown
													size={14}
													className={`transition-transform duration-300 ${isProjectsHovered ? 'rotate-180 text-yellow-500' : ''}`}
												/>
											</button>

											{/* Mega Menu Dropdown */}
											<div
												className={`absolute left-1/2 -translate-x-1/2 mt-0 w-[800px] bg-stone-950 border border-white/10 rounded-xl shadow-2xl p-6 grid grid-cols-3 gap-6 transition-all duration-300 origin-top ${isProjectsHovered
													? 'opacity-100 scale-100 visible'
													: 'opacity-0 scale-95 invisible'
													}`}>
												{/* Delivered Projects */}
												<Link
													to='/delivered-projects'
													className='group/card block'>
													<div className='h-40 bg-stone-900 rounded-lg overflow-hidden mb-3 relative'>
														<img
															src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
															alt='Delivered'
															className='w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500'
														/>
														<div className='absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase'>
															Completed
														</div>
													</div>
													<div className='text-white font-bold text-lg group-hover/card:text-yellow-500 transition-colors'>
														Delivered Projects
													</div>
													<p className='text-gray-400 text-xs mt-1'>
														Explore our completed
														landmarks
													</p>
												</Link>

												{/* Live Projects */}
												<Link
													to='/live-projects'
													className='group/card block'>
													<div className='h-40 bg-stone-900 rounded-lg overflow-hidden mb-3 relative'>
														<img
															src='https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'
															alt='Live'
															className='w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500'
														/>
														<div className='absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase'>
															Ongoing
														</div>
													</div>
													<div className='text-white font-bold text-lg group-hover/card:text-yellow-500 transition-colors'>
														Live Projects
													</div>
													<p className='text-gray-400 text-xs mt-1'>
														Track real-time
														construction progress
													</p>
												</Link>

												{/* Upcoming Projects */}
												<Link
													to='/upcoming-projects'
													className='group/card block'>
													<div className='h-40 bg-stone-900 rounded-lg overflow-hidden mb-3 relative'>
														<img
															src='https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop'
															alt='Upcoming'
															className='w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500'
														/>
														<div className='absolute top-2 right-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase'>
															Coming Soon
														</div>
													</div>
													<div className='text-white font-bold text-lg group-hover/card:text-yellow-500 transition-colors'>
														Upcoming Projects
													</div>
													<p className='text-gray-400 text-xs mt-1'>
														Get early access to
														future launches
													</p>
												</Link>
											</div>
										</div>
									);
								}
								return (
									<Link
										key={link.name}
										to={link.path}
										className='text-gray-300 hover:text-yellow-500 hover:scale-105 transition-all text-[15px] font-medium tracking-wide'>
										{link.name}
									</Link>
								);
							})}
						</div>
					</div>

					{/* Right Side Buttons */}
					<div className='hidden lg:flex items-center space-x-4'>
						<button
							onClick={onBookVisit}
							className='px-6 py-2.5 bg-transparent text-white font-semibold text-sm rounded-none hover:text-black hover:bg-yellow-500
							hover:border-black transition-colors border border-white inline-block text-center cursor-pointer'>
							Book Site Visit
						</button>
						<button
							className='p-2.5 text-white border border-white/100 hover:border-black hover:bg-yellow-500
							hover:text-black transition-all rounded-none flex items-center justify-center'>
							<MapPin size={20} />
						</button>
					</div>

					{/* Mobile menu button */}
					<div className='lg:hidden flex items-center'>
						<button
							onClick={() =>
								setIsMobileMenuOpen(!isMobileMenuOpen)
							}
							className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none'>
							{isMobileMenuOpen ? (
								<X size={24} />
							) : (
								<Menu size={24} />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className='lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 mb-4 h-screen overflow-y-auto pb-20'>
					<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
						{navLinks.map((link) => {
							if (link.type === 'dropdown') {
								return (
									<div
										key={link.name}
										className='border-b border-white/10 pb-2 mb-2'>
										<button
											onClick={() =>
												setIsMobileProjectsOpen(
													!isMobileProjectsOpen,
												)
											}
											className='w-full flex justify-between items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium'>
											{link.name}
											<ChevronDown
												size={16}
												className={`transition-transform ${isMobileProjectsOpen ? 'rotate-180' : ''}`}
											/>
										</button>

										{isMobileProjectsOpen && (
											<div className='pl-6 space-y-2 mt-1'>
												<Link
													to='/delivered-projects'
													className='block text-gray-400 hover:text-yellow-500 py-1 text-sm'
													onClick={() =>
														setIsMobileMenuOpen(
															false,
														)
													}>
													Delivered Projects
												</Link>
												<Link
													to='/live-projects'
													className='block text-gray-400 hover:text-yellow-500 py-1 text-sm'
													onClick={() =>
														setIsMobileMenuOpen(
															false,
														)
													}>
													Live Projects
												</Link>
												<Link
													to='/upcoming-projects'
													className='block text-gray-400 hover:text-yellow-500 py-1 text-sm'
													onClick={() =>
														setIsMobileMenuOpen(
															false,
														)
													}>
													Upcoming Projects
												</Link>
											</div>
										)}
									</div>
								);
							}
							return (
								<Link
									key={link.name}
									to={link.path}
									className='text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
									onClick={() => setIsMobileMenuOpen(false)}>
									{link.name}
								</Link>
							);
						})}
						<div className='mt-4 flex flex-col space-y-3 px-3'>
							<button
								onClick={() => {
									onBookVisit();
									setIsMobileMenuOpen(false);
								}}
								className='w-full px-6 py-3 bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors border border-white block text-center'>
								Book Site Visit
							</button>
							<button className='w-full flex items-center justify-center space-x-2 px-6 py-3 text-white border border-white/30 hover:border-white hover:bg-white/10 transition-all'>
								<MapPin size={20} />
								<span>Locate Us</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
