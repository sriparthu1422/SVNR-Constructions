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
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ExploreVR from './pages/ExploreVR';
import BookSiteVisitModal from './components/common/BookSiteVisitModal';
import LiveProjects from './pages/projects/LiveProjects';
import LiveProjectDetails from './pages/projects/LiveProjectDetails';
import DeliveredProjects from './pages/projects/DeliveredProjects';
import DeliveredProjectDetails from './pages/projects/DeliveredProjectDetails';
import UpcomingProjects from './pages/projects/UpcomingProjects';


import ReactGA from 'react-ga4';

// Initialize GA4
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
	ReactGA.initialize(GA_MEASUREMENT_ID);
}

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
	const { pathname, search } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
		if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
			ReactGA.send({ hitType: 'pageview', page: pathname + search });
		}
	}, [pathname, search]);
	return null;
};

import TawkToChat from './components/common/TawkToChat';

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<Router>
			<ScrollToTop />
			<div className='flex flex-col min-h-screen bg-black text-white font-sans'>
				<TawkToChat />
				<Navbar onBookVisit={openModal} />
				<main className='flex-grow'>
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
					</Routes>
				</main>
				<Footer />
				<BookSiteVisitModal
					isOpen={isModalOpen}
					onClose={closeModal}
				/>
			</div>
		</Router>
	);
}

export default App;
