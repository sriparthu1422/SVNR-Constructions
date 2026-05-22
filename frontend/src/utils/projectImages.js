/** @format */

// Local image imports for all projects
import manasaSarovar from '../assets/images/AboutSectionImages/Manasa Sarovar.png';
import vinayakHomes from '../assets/images/AboutSectionImages/Vinayak Homes.jpg';
import saiDattaResidency from '../assets/images/AboutSectionImages/SaiDatta Residency.jpg';
import greenspace from '../assets/images/AboutSectionImages/Greenspace.png';
import theLotusResidency from '../assets/images/AboutSectionImages/Lotus Residency.png';
import theBreeze from '../assets/images/AboutSectionImages/The Breeze.png';
import ankuraFarms from '../assets/images/AboutSectionImages/AnkuraFarms.png';
import theAyati from '../assets/images/HomeImage/TheAyati2.jpeg';
import twinDiamonds from '../assets/images/AboutSectionImages/Twin Diamonds.jpg';

// Map project names (lowercase) to their local images
const localImageMap = {
	'manasa sarovar': manasaSarovar,
	'vinayak homes': vinayakHomes,
	'sai datta residency': saiDattaResidency,
	'greenspace': greenspace,
	'the lotus residency': theLotusResidency,
	'the breeze': theBreeze,
	'ankura farms': ankuraFarms,
	'the ayati': theAyati,
	'twin diamonds': twinDiamonds,
};

const PLACEHOLDER = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop';

/**
 * Returns the best available image for a project.
 * Priority: database URL > local asset > placeholder
 */
export const getProjectImage = (project) => {
	// If the database has a valid image URL, use it
	if (project.image && project.image.length > 5 && !project.image.startsWith('/')) {
		return project.image;
	}

	// Otherwise, try to find a local image by project name
	const name = (project.name || '').toLowerCase();
	if (localImageMap[name]) {
		return localImageMap[name];
	}

	// Partial match (e.g. "MANASA SAROVAR" matches "manasa sarovar")
	for (const [key, img] of Object.entries(localImageMap)) {
		if (name.includes(key) || key.includes(name)) {
			return img;
		}
	}

	// Last resort: placeholder
	return PLACEHOLDER;
};

export default getProjectImage;
