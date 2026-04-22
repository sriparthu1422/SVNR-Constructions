/** @format */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import {
	MessageCircle,
	X,
	Send,
	User,
	ChevronLeft,
} from 'lucide-react';

// Social media icons
const WhatsAppIcon = () => (
	<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
		<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
	</svg>
);
const InstagramIcon = () => (
	<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
		<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
	</svg>
);
const FacebookIcon = () => (
	<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
		<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
	</svg>
);
const LinkedInIcon = () => (
	<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
		<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
	</svg>
);

const SOCIAL_LINKS = [
	{
		name: 'WhatsApp',
		icon: WhatsAppIcon,
		url: 'https://wa.me/917842080707',
		color: '#25D366',
		desc: 'Chat on WhatsApp',
	},
	{
		name: 'Instagram',
		icon: InstagramIcon,
		url: 'https://instagram.com/svnrconstructions',
		color: '#E4405F',
		desc: 'Follow on Instagram',
	},
	{
		name: 'Facebook',
		icon: FacebookIcon,
		url: 'https://facebook.com/svnrconstructions',
		color: '#1877F2',
		desc: 'Visit on Facebook',
	},
	{
		name: 'LinkedIn',
		icon: LinkedInIcon,
		url: 'https://linkedin.com/company/svnrconstructions',
		color: '#0A66C2',
		desc: 'Connect on LinkedIn',
	},
];

const SOCKET_URL = 'http://localhost:5000';

const ChatWidget = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [view, setView] = useState('welcome'); // 'welcome' | 'nameInput' | 'chat'
	const [visitorName, setVisitorName] = useState('');
	const [sessionId, setSessionId] = useState('');
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');
	const [unread, setUnread] = useState(0);
	const [connected, setConnected] = useState(false);
	const socketRef = useRef(null);
	const messagesEndRef = useRef(null);
	const inputRef = useRef(null);

	// Load session from localStorage
	useEffect(() => {
		const saved = localStorage.getItem('svnr_chat_session');
		if (saved) {
			try {
				const data = JSON.parse(saved);
				if (data.sessionId && data.visitorName) {
					setSessionId(data.sessionId);
					setVisitorName(data.visitorName);
					setView('chat');
				}
			} catch {}
		}
	}, []);

	// Connect Socket.IO when chat view is active
	useEffect(() => {
		if (view !== 'chat' || !sessionId) return;

		const socket = io(SOCKET_URL, { transports: ['websocket', 'polling'] });
		socketRef.current = socket;

		socket.on('connect', () => {
			setConnected(true);
			socket.emit('visitor:join', { sessionId, visitorName });
		});

		socket.on('chat:history', (history) => {
			setMessages(history || []);
		});

		socket.on('chat:message', (msg) => {
			setMessages((prev) => [...prev, msg]);
			if (msg.sender === 'admin' && !isOpen) {
				setUnread((prev) => prev + 1);
			}
		});

		socket.on('chat:closed', () => {
			// Session was closed by admin
		});

		socket.on('disconnect', () => {
			setConnected(false);
		});

		return () => {
			socket.disconnect();
			socketRef.current = null;
		};
	}, [view, sessionId]);

	// Auto-scroll to bottom on new messages
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	// Focus input when chat opens
	useEffect(() => {
		if (isOpen && view === 'chat') {
			setTimeout(() => inputRef.current?.focus(), 300);
		}
	}, [isOpen, view]);

	const handleOpen = () => {
		setIsOpen(true);
		setUnread(0);
	};

	const handleStartChat = () => {
		if (!visitorName.trim()) return;
		const id = `visitor_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
		setSessionId(id);
		setView('chat');
		localStorage.setItem('svnr_chat_session', JSON.stringify({ sessionId: id, visitorName: visitorName.trim() }));
	};

	const handleSend = () => {
		if (!input.trim() || !socketRef.current) return;
		socketRef.current.emit('visitor:message', { sessionId, text: input.trim() });
		setInput('');
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	const formatTime = (ts) => {
		const d = new Date(ts);
		return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	};

	return (
		<>
			{/* ── STYLES ────────────────────────────── */}
			<style>{`
				.svnr-chat-fab {
					position: fixed;
					bottom: 24px;
					right: 24px;
					z-index: 9999;
					width: 60px;
					height: 60px;
					border-radius: 50%;
					background: #03a84e;
					border: none;
					cursor: pointer;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #fff;
					box-shadow: 0 4px 14px rgba(3,168,78,0.4);
					transition: transform 0.2s;
				}
				.svnr-chat-fab:hover {
					transform: scale(1.05);
				}
				.svnr-chat-fab .badge-count {
					position: absolute;
					top: -2px;
					right: -2px;
					background: #ef4444;
					color: #fff;
					font-size: 11px;
					font-weight: 700;
					width: 22px;
					height: 22px;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					border: 2px solid #fff;
				}

				.svnr-chat-panel {
					position: fixed;
					bottom: 24px;
					right: 24px;
					z-index: 10000;
					width: 350px;
					max-width: calc(100vw - 32px);
					height: 580px;
					max-height: calc(100vh - 100px);
					border-radius: 12px;
					background: #fff;
					box-shadow: 0 5px 40px rgba(0,0,0,0.16);
					display: flex;
					flex-direction: column;
					overflow: hidden;
					animation: svnrChatSlideUp 0.3s ease;
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
				}

				@keyframes svnrChatSlideUp {
					from { opacity: 0; transform: translateY(15px); }
					to { opacity: 1; transform: translateY(0); }
				}

				.svnr-chat-header {
					background: #03a84e;
					padding: 24px 20px;
					display: flex;
					align-items: flex-start;
					justify-content: space-between;
					color: #fff;
				}
				.svnr-header-info {
					display: flex;
					align-items: center;
					gap: 14px;
				}
				.svnr-header-avatar {
					width: 48px;
					height: 48px;
					border-radius: 50%;
					background: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #03a84e;
					box-shadow: 0 2px 6px rgba(0,0,0,0.1);
				}
				.svnr-header-text h3 {
					margin: 0 0 4px;
					font-size: 16px;
					font-weight: 600;
					color: #fff;
				}
				.svnr-header-text p {
					margin: 0;
					font-size: 13px;
					color: rgba(255,255,255,0.9);
					display: flex;
					align-items: center;
					gap: 6px;
				}
				.svnr-chat-close {
					background: transparent;
					border: none;
					color: rgba(255,255,255,0.8);
					cursor: pointer;
					padding: 4px;
					transition: color 0.2s;
				}
				.svnr-chat-close:hover {
					color: #fff;
				}

				/* Welcome / Name Input */
				.svnr-welcome {
					flex: 1;
					background: #f9f9f9;
					display: flex;
					flex-direction: column;
					padding: 24px;
					overflow-y: auto;
				}
				.svnr-welcome-card {
					background: #fff;
					border-radius: 8px;
					padding: 20px;
					box-shadow: 0 2px 8px rgba(0,0,0,0.04);
					margin-bottom: 20px;
				}
				.svnr-welcome-card h4 {
					margin: 0 0 8px;
					font-size: 15px;
					color: #222;
				}
				.svnr-welcome-card p {
					margin: 0 0 16px;
					font-size: 13px;
					color: #666;
					line-height: 1.5;
				}
				.svnr-welcome-input {
					width: 100%;
					padding: 12px;
					border: 1px solid #e0e0e0;
					border-radius: 6px;
					font-size: 14px;
					color: #000;
					background: #fff;
					margin-bottom: 12px;
					outline: none;
					transition: border-color 0.2s;
				}
				.svnr-welcome-input:focus {
					border-color: #03a84e;
				}
				.svnr-start-btn {
					width: 100%;
					padding: 12px;
					background: #03a84e;
					color: #fff;
					border: none;
					border-radius: 6px;
					font-size: 14px;
					font-weight: 600;
					cursor: pointer;
					transition: background 0.2s;
				}
				.svnr-start-btn:hover:not(:disabled) {
					background: #028c41;
				}
				.svnr-start-btn:disabled {
					opacity: 0.5;
					cursor: not-allowed;
				}

				.svnr-social-links {
					display: flex;
					justify-content: center;
					gap: 16px;
					margin-top: auto;
					padding-top: 20px;
				}
				.svnr-social-links a {
					color: #888;
					transition: color 0.2s;
				}
				.svnr-social-links a:hover {
					color: #03a84e;
				}

				/* Chat View */
				.svnr-chat-body {
					flex: 1;
					background: #f4f6f8;
					display: flex;
					flex-direction: column;
					overflow: hidden;
				}
				.svnr-messages {
					flex: 1;
					padding: 20px;
					overflow-y: auto;
				}
				.svnr-messages::-webkit-scrollbar { width: 6px; }
				.svnr-messages::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }

				.svnr-msg-row {
					display: flex;
					margin-bottom: 16px;
				}
				.svnr-msg-row.visitor {
					justify-content: flex-end;
				}
				.svnr-msg-row.admin {
					justify-content: flex-start;
					gap: 8px;
				}

				.svnr-admin-avatar {
					width: 28px;
					height: 28px;
					border-radius: 50%;
					background: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #03a84e;
					box-shadow: 0 1px 3px rgba(0,0,0,0.1);
					flex-shrink: 0;
				}

				.svnr-bubble {
					max-width: 75%;
					padding: 12px 16px;
					border-radius: 8px;
					font-size: 13px;
					line-height: 1.5;
					word-wrap: break-word;
					box-shadow: 0 1px 2px rgba(0,0,0,0.05);
				}
				.visitor .svnr-bubble {
					background: #03a84e;
					color: #fff;
					border-bottom-right-radius: 2px;
				}
				.admin .svnr-bubble {
					background: #fff;
					color: #333;
					border-bottom-left-radius: 2px;
				}
				.svnr-msg-time {
					font-size: 10px;
					color: #999;
					margin-top: 4px;
				}
				.visitor .svnr-msg-time { text-align: right; }

				/* Chat Input */
				.svnr-chat-input-area {
					background: #fff;
					border-top: 1px solid #eaeaea;
					padding: 12px 16px;
				}
				.svnr-input-wrapper {
					display: flex;
					align-items: center;
					background: #f9f9f9;
					border: 1px solid #eaeaea;
					border-radius: 24px;
					padding: 4px 4px 4px 16px;
				}
				.svnr-input-wrapper input {
					flex: 1;
					border: none;
					background: transparent;
					outline: none;
					font-size: 14px;
					color: #333;
				}
				.svnr-input-wrapper input::placeholder {
					color: #aaa;
				}
				.svnr-send-btn {
					width: 36px;
					height: 36px;
					border-radius: 50%;
					background: #03a84e;
					color: #fff;
					border: none;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					transition: background 0.2s;
				}
				.svnr-send-btn:hover:not(:disabled) {
					background: #028c41;
				}
				.svnr-send-btn:disabled {
					background: #ccc;
					cursor: not-allowed;
				}

				.svnr-conn-dot {
					width: 8px;
					height: 8px;
					border-radius: 50%;
					display: inline-block;
				}
				.svnr-conn-dot.online { background: #4ade80; }
				.svnr-conn-dot.offline { background: #fca5a5; }
				
				@media (max-width: 480px) {
					.svnr-chat-panel {
						bottom: 0;
						right: 0;
						width: 100vw;
						height: calc(100vh - 60px);
						max-height: none;
						max-width: none;
						border-radius: 16px 16px 0 0;
					}
					.svnr-chat-fab { bottom: 16px; right: 16px; }
				}
			`}</style>

			{/* ── FAB BUTTON ──────────────────────── */}
			{!isOpen && (
				<button className="svnr-chat-fab" onClick={handleOpen} aria-label="Open chat">
					<MessageCircle size={28} />
					{unread > 0 && <span className="badge-count">{unread}</span>}
				</button>
			)}

			{/* ── CHAT PANEL ─────────────────────── */}
			{isOpen && (
				<div className="svnr-chat-panel">
					{/* Header */}
					<div className="svnr-chat-header">
						<div className="svnr-header-info">
							<div className="svnr-header-avatar">
								<User size={24} />
							</div>
							<div className="svnr-header-text">
								<h3>SVNR Constructions</h3>
								<p>
									<span className={`svnr-conn-dot ${connected ? 'online' : 'offline'}`}></span>
									{connected ? 'We are online' : 'Connecting...'}
								</p>
							</div>
						</div>
						<div style={{ display: 'flex', gap: 4 }}>
							{(view === 'nameInput' || view === 'chat') && (
								<button className="svnr-chat-close" onClick={() => setView('welcome')} title="Back">
									<ChevronLeft size={20} />
								</button>
							)}
							<button className="svnr-chat-close" onClick={() => setIsOpen(false)} title="Close">
								<X size={20} />
							</button>
						</div>
					</div>

					{/* ── Welcome / Name Input View ── */}
					{(view === 'welcome' || view === 'nameInput') && (
						<div className="svnr-welcome">
							<div className="svnr-welcome-card">
								<h4>Hi there 👋</h4>
								<p>We are here to help you. Before starting the chat, please tell us your name.</p>
								<input
									className="svnr-welcome-input"
									type="text"
									placeholder="Enter your name"
									value={visitorName}
									onChange={(e) => setVisitorName(e.target.value)}
									onKeyDown={(e) => e.key === 'Enter' && handleStartChat()}
								/>
								<button
									className="svnr-start-btn"
									onClick={handleStartChat}
									disabled={!visitorName.trim()}
								>
									Start Chat
								</button>
							</div>

							<div style={{ textAlign: 'center', marginTop: '45px' }}>
								<p style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>Or reach us on</p>
								<div className="svnr-social-links">
									{SOCIAL_LINKS.map((s) => (
										<a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.desc}>
											<s.icon />
										</a>
									))}
								</div>
							</div>
						</div>
					)}

					{/* ── Chat View ── */}
					{view === 'chat' && (
						<div className="svnr-chat-body">
							<div className="svnr-messages">
								{/* Social Row Header in Chat */}
								<div style={{ display: 'flex', justifyContent: 'center', gap: '20px', paddingBottom: '20px', marginBottom: '20px', borderBottom: '1px solid #e0e0e0' }}>
									{SOCIAL_LINKS.map((s) => (
										<a
											key={s.name}
											href={s.url}
											target="_blank"
											rel="noopener noreferrer"
											title={s.desc}
											style={{ color: '#888', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
											onMouseOver={(e) => { e.currentTarget.style.color = s.color; }}
											onMouseOut={(e) => { e.currentTarget.style.color = '#888'; }}
										>
											<s.icon />
										</a>
									))}
								</div>

								{messages.length === 0 && (
									<div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
										<MessageCircle size={32} style={{ margin: '0 auto 8px', opacity: 0.2 }} />
										<p style={{ fontSize: 13 }}>Send a message to start the conversation!</p>
									</div>
								)}

								{messages.map((msg, i) => (
									<div key={i} className={`svnr-msg-row ${msg.sender}`}>
										{msg.sender === 'admin' && (
											<div className="svnr-admin-avatar">
												<User size={16} />
											</div>
										)}
										<div>
											<div className="svnr-bubble">{msg.text}</div>
											<div className="svnr-msg-time">{formatTime(msg.timestamp)}</div>
										</div>
									</div>
								))}
								<div ref={messagesEndRef} />
							</div>

							<div className="svnr-chat-input-area">
								<div className="svnr-input-wrapper">
									<input
										ref={inputRef}
										type="text"
										placeholder="Type your message here..."
										value={input}
										onChange={(e) => setInput(e.target.value)}
										onKeyDown={handleKeyDown}
									/>
									<button className="svnr-send-btn" onClick={handleSend} disabled={!input.trim()}>
										<Send size={16} style={{ marginLeft: '-2px' }} />
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default ChatWidget;
