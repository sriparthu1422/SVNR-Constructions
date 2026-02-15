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
import OngoingProjects from './pages/projects/OngoingProjects';
import CompletedProjects from './pages/projects/CompletedProjects';
import News from './pages/News';
import Contact from './pages/Contact';
import ExploreVR from './pages/ExploreVR';
import BookSiteVisitModal from './components/common/BookSiteVisitModal';
import LiveProjects from './pages/projects/LiveProjects';
import LiveProjectDetails from './pages/projects/LiveProjectDetails';
import DeliveredProjects from './pages/projects/DeliveredProjects';
import DeliveredProjectDetails from './pages/projects/DeliveredProjectDetails';
import UpcomingProjects from './pages/projects/UpcomingProjects';


// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return null;
};

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<Router>
			<ScrollToTop />
			<div className='flex flex-col min-h-screen bg-black text-white font-sans'>
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
							path='/ongoing-projects'
							element={<OngoingProjects />}
						/>
						<Route
							path='/completed-projects'
							element={<CompletedProjects />}
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
							path='/news'
							element={<News />}
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
