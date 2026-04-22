import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { MessageCircle, Send, User, X as XIcon, Trash2 } from 'lucide-react';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

const LiveChat = () => {
  const { token, API_URL } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const selectedIdRef = useRef(null);

  useEffect(() => {
    selectedIdRef.current = selectedId;
  }, [selectedId]);

  // Connect to Socket.IO as admin
  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ['websocket', 'polling'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('admin:join');
    });

    // When a visitor sends a message or a new session is created
    socket.on('chat:session_update', (session) => {
      setSessions((prev) => {
        const exists = prev.find((s) => s.sessionId === session.sessionId);
        if (exists) {
          return prev.map((s) => (s.sessionId === session.sessionId ? { ...s, ...session } : s));
        }
        return [session, ...prev];
      });
    });

    socket.on('chat:new_message', ({ sessionId, visitorName, message }) => {
      setSessions((prev) =>
        prev.map((s) =>
          s.sessionId === sessionId
            ? { ...s, lastMessage: message, updatedAt: new Date().toISOString() }
            : s
        )
      );
      // If this session is currently selected, add the message
      if (selectedIdRef.current === sessionId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    socket.on('chat:session_closed', ({ sessionId }) => {
      setSessions((prev) =>
        prev.map((s) => (s.sessionId === sessionId ? { ...s, status: 'closed' } : s))
      );
    });

    socket.on('disconnect', () => setConnected(false));

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  // Fetch existing sessions on mount
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch(`${API_URL}/chat/sessions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (Array.isArray(data)) setSessions(data);
      } catch {}
    };
    fetchSessions();
  }, [token, API_URL]);

  // When selecting a session, fetch its messages and join the room
  const selectSession = async (session) => {
    setSelectedId(session.sessionId);
    setMessages([]);
    try {
      const res = await fetch(`${API_URL}/chat/sessions/${session._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.messages) setMessages(data.messages);
      socketRef.current?.emit('admin:join_session', { sessionId: session.sessionId });
    } catch {}
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !selectedId || !socketRef.current) return;
    const text = input.trim();
    socketRef.current.emit('admin:message', { sessionId: selectedId, text });
    
    // Optimistic update for admin messages
    const msg = { sender: 'admin', text, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, msg]);
    setSessions((prev) => 
      prev.map((s) => 
        s.sessionId === selectedId ? { ...s, lastMessage: msg, updatedAt: new Date().toISOString() } : s
      )
    );
    setInput('');
  };

  const handleClose = (sessionId) => {
    socketRef.current?.emit('admin:close_session', { sessionId });
  };

  const handleDelete = async (session) => {
    if (!confirm('Delete this chat session?')) return;
    try {
      await fetch(`${API_URL}/chat/sessions/${session._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessions((prev) => prev.filter((s) => s._id !== session._id));
      if (selectedId === session.sessionId) {
        setSelectedId(null);
        setMessages([]);
      }
    } catch {}
  };

  const formatTime = (ts) => {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (ts) => {
    if (!ts) return '';
    const d = new Date(ts);
    const now = new Date();
    if (d.toDateString() === now.toDateString()) return 'Today';
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const selectedSession = sessions.find((s) => s.sessionId === selectedId);

  return (
    <>
      <div className="admin-header">
        <div>
          <h2>Live Chat</h2>
          <p>
            <span
              style={{
                width: 8, height: 8, borderRadius: '50%',
                display: 'inline-block', marginRight: 6,
                background: connected ? '#22c55e' : '#71717a',
                boxShadow: connected ? '0 0 6px rgba(34,197,94,0.5)' : 'none',
              }}
            />
            {connected ? 'Connected' : 'Connecting...'} · {sessions.filter((s) => s.status === 'active').length} active chats
          </p>
        </div>
      </div>
      <div className="admin-content" style={{ padding: 0, display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* ── Sessions List ── */}
        <div
          style={{
            width: 320,
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-secondary)',
            overflowY: 'auto',
          }}
        >
          {sessions.length === 0 ? (
            <div className="empty-state" style={{ padding: '60px 20px' }}>
              <MessageCircle size={36} />
              <h3>No chats yet</h3>
              <p>Visitor chats will appear here in real-time.</p>
            </div>
          ) : (
            sessions.map((s) => (
              <div
                key={s.sessionId}
                onClick={() => selectSession(s)}
                style={{
                  padding: '14px 18px',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                  background: selectedId === s.sessionId ? 'var(--bg-hover)' : 'transparent',
                  transition: 'background 0.15s',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: s.status === 'active' ? 'var(--accent-dim)' : 'rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: s.status === 'active' ? 'var(--accent)' : 'var(--text-muted)',
                  }}
                >
                  <User size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>
                      {s.visitorName}
                    </span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                      {formatDate(s.updatedAt)}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: 'var(--text-muted)',
                      marginTop: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {s.lastMessage?.text || 'New session'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Chat Pane ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
          {selectedId && selectedSession ? (
            <>
              {/* Chat Header */}
              <div
                style={{
                  padding: '14px 20px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'var(--bg-card)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: 'var(--accent-dim)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent)',
                    }}
                  >
                    <User size={16} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{selectedSession.visitorName}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      <span className={`badge badge-${selectedSession.status === 'active' ? 'live' : 'cancelled'}`}>
                        {selectedSession.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {selectedSession.status === 'active' && (
                    <button className="btn-icon" onClick={() => handleClose(selectedId)} title="Close session">
                      <XIcon size={15} />
                    </button>
                  )}
                  <button className="btn-icon danger" onClick={() => handleDelete(selectedSession)} title="Delete session">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '16px 20px',
                }}
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: 12,
                      display: 'flex',
                      justifyContent: msg.sender === 'admin' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          maxWidth: 360,
                          padding: '10px 14px',
                          borderRadius: 14,
                          fontSize: 13,
                          lineHeight: 1.5,
                          wordWrap: 'break-word',
                          ...(msg.sender === 'admin'
                            ? {
                                background: 'linear-gradient(135deg, #eab308, #ca8a04)',
                                color: '#000',
                                borderBottomRightRadius: 4,
                              }
                            : {
                                background: 'var(--bg-card)',
                                color: 'var(--text-secondary)',
                                border: '1px solid var(--border)',
                                borderBottomLeftRadius: 4,
                              }),
                        }}
                      >
                        {msg.text}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: 'var(--text-muted)',
                          marginTop: 4,
                          textAlign: msg.sender === 'admin' ? 'right' : 'left',
                          paddingInline: 4,
                        }}
                      >
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Reply Input */}
              <div
                style={{
                  padding: '12px 20px',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  gap: 10,
                  background: 'var(--bg-card)',
                }}
              >
                <input
                  ref={inputRef}
                  className="table-search"
                  style={{ flex: 1, width: 'auto' }}
                  placeholder="Type a reply..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  style={{ padding: '9px 14px' }}
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state" style={{ margin: 'auto' }}>
              <MessageCircle size={48} />
              <h3>Select a conversation</h3>
              <p>Pick a chat from the left to start replying.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LiveChat;
