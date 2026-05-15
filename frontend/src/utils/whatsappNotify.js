/** @format */

/**
 * WhatsApp notification utility.
 * After a form submission is saved to the backend, this opens WhatsApp
 * with a pre-filled message so the visitor can send it with one tap.
 *
 * Target phone: +91 7842090707
 */

const WHATSAPP_PHONE = '917842090707';

/**
 * Formats a date string (YYYY-MM-DD) to DD/MM/YYYY for display.
 */
const formatDate = (dateStr) => {
	if (!dateStr) return 'N/A';
	const [yyyy, mm, dd] = dateStr.split('-');
	if (!yyyy || !mm || !dd) return dateStr;
	return `${dd}/${mm}/${yyyy}`;
};

/**
 * Returns a formatted timestamp for the current moment.
 */
const getTimestamp = () => {
	return new Date().toLocaleString('en-IN', {
		dateStyle: 'medium',
		timeStyle: 'short',
		timeZone: 'Asia/Kolkata',
	});
};

/**
 * Sends a WhatsApp notification for a "Book Site Visit" form submission.
 * Opens wa.me in a new tab with a pre-filled message.
 *
 * @param {{ name: string, email: string, phone: string, date: string, project: string, message: string }} data
 */
export const sendBookingWhatsApp = (data) => {
	const lines = [
		`🏗️ *New Site Visit Booking*`,
		`━━━━━━━━━━━━━━━━━━`,
		``,
		`📋 *Form:* Book Site Visit`,
		`👤 *Name:* ${data.name}`,
		`📞 *Phone:* ${data.phone}`,
		`📧 *Email:* ${data.email}`,
		`📅 *Preferred Date:* ${formatDate(data.date)}`,
		`🏠 *Interested Project:* ${data.project}`,
		`💬 *Message:* ${data.message || 'N/A'}`,
		``,
		`🕐 *Submitted At:* ${getTimestamp()}`,
		`━━━━━━━━━━━━━━━━━━`,
		`_Sent from SVNR Constructions Website_`,
	];

	const text = encodeURIComponent(lines.join('\n'));
	const url = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;

	window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Sends a WhatsApp notification for a "Contact Us" inquiry form submission.
 * Opens wa.me in a new tab with a pre-filled message.
 *
 * @param {{ name: string, email: string, subject: string, message: string }} data
 */
export const sendInquiryWhatsApp = (data) => {
	const lines = [
		`📩 *New Website Inquiry*`,
		`━━━━━━━━━━━━━━━━━━`,
		``,
		`📋 *Form:* Contact Page`,
		`👤 *Name:* ${data.name}`,
		`📧 *Email:* ${data.email}`,
		`📌 *Subject:* ${data.subject}`,
		`💬 *Message:* ${data.message}`,
		``,
		`🕐 *Submitted At:* ${getTimestamp()}`,
		`━━━━━━━━━━━━━━━━━━`,
		`_Sent from SVNR Constructions Website_`,
	];

	const text = encodeURIComponent(lines.join('\n'));
	const url = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;

	window.open(url, '_blank', 'noopener,noreferrer');
};
