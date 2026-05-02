import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
			<h1 className="text-7xl font-bold text-[#f3f4f6] mb-4">404</h1>
			<h2 className="text-3xl font-semibold text-white mb-6">Page Not Found</h2>
			<p className="text-gray-400 max-w-md mb-8">
				The page you are looking for (like /wp-admin) does not exist or has been moved. SVNR Constructions is now powered by a modern infrastructure.
			</p>
			<Link
				to="/"
				className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors duration-300"
			>
				Return to Home
			</Link>
		</div>
	);
};

export default NotFound;
