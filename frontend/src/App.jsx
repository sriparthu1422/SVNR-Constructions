/** @format */

import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BookSiteVisitModal from './components/common/BookSiteVisitModal';

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const ExploreVR = React.lazy(() => import('./pages/ExploreVR'));
const LiveProjects = React.lazy(() => import('./pages/projects/LiveProjects'));
const LiveProjectDetails = React.lazy(() => import('./pages/projects/LiveProjectDetails'));
const DeliveredProjects = React.lazy(() => import('./pages/projects/DeliveredProjects'));
const DeliveredProjectDetails = React.lazy(() => import('./pages/projects/DeliveredProjectDetails'));
const UpcomingProjects = React.lazy(() => import('./pages/projects/UpcomingProjects'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Luxury branding-compliant loader fallback spinner
const LoadingSpinner = () => (
	<div className='flex items-center justify-center min-h-[60vh] bg-black'>
		<div className='relative w-12 h-12'>
			<div className='absolute inset-0 rounded-full border-4 border-white/10 border-t-yellow-500 animate-spin'></div>
		</div>
	</div>
);

import ReactGA from 'react-ga4';

// Initialize GA4
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
	ReactGA.initialize(GA_MEASUREMENT_ID);
}

// ScrollToTop component to reset scroll on route change and page load
const ScrollToTop = () => {
	const { pathname, search } = useLocation();

	useEffect(() => {
		// Browser history scroll restoration handling
		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual';
		}

		// Temporarily set scroll behavior to auto to force an instant jump
		document.documentElement.style.scrollBehavior = 'auto';
		window.scrollTo(0, 0);
		try {
			window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
		} catch {
			// Ignore error for older browsers that don't support 'instant'
		}

		setTimeout(() => {
			document.documentElement.style.scrollBehavior = '';
		}, 10);

		if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
			ReactGA.send({ hitType: 'pageview', page: pathname + search });
		}

		return () => {
			if ('scrollRestoration' in window.history) {
				window.history.scrollRestoration = 'auto';
			}
		};
	}, [pathname, search]);

	return null;
};

import ChatWidget from './components/common/ChatWidget';

function AppContent() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const location = useLocation();

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	// Hide WhatsApp button and footer on Explore VR page
	const isExploreVR = location.pathname === '/explore-vr';

	return (
		<>
			<ScrollToTop />
			<div className='flex flex-col min-h-screen bg-black text-white font-sans'>
				{!isExploreVR && <ChatWidget />}
				<Navbar onBookVisit={openModal} />
				<main className='flex-grow'>
					<React.Suspense fallback={<LoadingSpinner />}>
						<Routes>
							<Route
								path='/'
								element={<Home openBookVisit={openModal} />}
							/>
							<Route
								path='/about-us'
								element={<About />}
							/>

							<Route
								path='/live-projects'
								element={<LiveProjects />}
							/>
							<Route
								path='/live-projects/:id'
								element={<LiveProjectDetails />}
							/>
							<Route
								path='/delivered-projects'
								element={<DeliveredProjects />}
							/>
							<Route
								path='/delivered-projects/:id'
								element={<DeliveredProjectDetails />}
							/>
							<Route
								path='/upcoming-projects'
								element={<UpcomingProjects />}
							/>
							<Route
								path='/contact'
								element={<Contact />}
							/>
							<Route
								path='/explore-vr'
								element={<ExploreVR />}
							/>
							<Route
								path='*'
								element={<NotFound />}
							/>
						</Routes>
					</React.Suspense>
				</main>
				{!isExploreVR && <Footer />}
				<BookSiteVisitModal
					isOpen={isModalOpen}
					onClose={closeModal}
				/>
			</div>
		</>
	);
}

function App() {
	return (
		<Router>
			<AppContent />
		</Router>
	);
}

export default App;
