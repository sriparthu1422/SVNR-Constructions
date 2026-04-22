import { io } from 'socket.io-client';

const runTest = async () => {
  const visitorSocket = io('http://localhost:5000', { transports: ['websocket'] });
  const sessionId = 'test-' + Date.now();

  visitorSocket.on('connect', () => {
    visitorSocket.emit('visitor:join', { sessionId, visitorName: 'John' });

    setTimeout(() => {
      visitorSocket.emit('visitor:message', { sessionId, text: 'Hello 1' });
    }, 1000);
    
    setTimeout(() => {
      visitorSocket.emit('visitor:message', { sessionId, text: 'Hello 2' });
    }, 2000);

    setTimeout(() => {
      process.exit(0);
    }, 3000);
  });

  visitorSocket.on('chat:message', (msg) => {
    console.log('Visitor received chat:message:', msg);
  });
};

runTest();
