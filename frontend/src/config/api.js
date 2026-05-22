/** @format */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Normalize the base URL (remove trailing slash and ensure it ends with /api)
let normalizedUrl = API_BASE;
if (normalizedUrl.endsWith('/')) {
	normalizedUrl = normalizedUrl.slice(0, -1);
}

export const API_URL = normalizedUrl;
