import { io } from 'socket.io-client';

const runTest = async () => {
  console.log('Starting test...');
  const visitorSocket = io('http://localhost:5000', { transports: ['websocket'] });
  const adminSocket = io('http://localhost:5000', { transports: ['websocket'] });

  const sessionId = 'test-' + Date.now();

  adminSocket.on('connect', () => {
    console.log('Admin connected');
    adminSocket.emit('admin:join');
  });

  adminSocket.on('chat:new_message', (data) => {
    console.log('Admin received chat:new_message:', data);
  });

  adminSocket.on('chat:message', (msg) => {
    console.log('Admin received chat:message:', msg);
  });

  visitorSocket.on('connect', () => {
    console.log('Visitor connected');
    visitorSocket.emit('visitor:join', { sessionId, visitorName: 'John' });

    setTimeout(() => {
      console.log('Visitor sending first message');
      visitorSocket.emit('visitor:message', { sessionId, text: 'Hello 1' });
    }, 1000);

    setTimeout(() => {
      console.log('Admin joining session');
      adminSocket.emit('admin:join_session', { sessionId });
    }, 2000);

    setTimeout(() => {
      console.log('Visitor sending second message');
      visitorSocket.emit('visitor:message', { sessionId, text: 'Hello 2' });
    }, 3000);

    setTimeout(() => {
      console.log('Visitor sending third message');
      visitorSocket.emit('visitor:message', { sessionId, text: 'Hello 3' });
    }, 4000);

    setTimeout(() => {
      console.log('Test complete, exiting');
      visitorSocket.disconnect();
      adminSocket.disconnect();
      process.exit(0);
    }, 5000);
  });
};

runTest();
