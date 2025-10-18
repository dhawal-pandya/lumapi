import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '../ui/CodeEditor';

const WebSocketComponent = () => {
  const [message, setMessage] = useState('Hello');
  const [log, setLog] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [sending, setSending] = useState(false);
  const [receiving, setReceiving] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    setLog('Connecting...\n');
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      setLog(prevLog => prevLog + 'Connected!\n');
    }, 1000);
  };

  const handleSend = () => {
    setSending(true);
    setLog(prevLog => prevLog + `Sent: ${message}\n`);
    setTimeout(() => {
      setSending(false);
      setReceiving(true);
      setTimeout(() => {
        setReceiving(false);
        setLog(prevLog => prevLog + 'Received: Hi there!\n');
      }, 500);
    }, 500);
  };

  return (
    <div className="relative">
      <div className="mb-4 p-4 bg-gray-800 border border-blue-500 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-blue-400">WebSocket</h2>
        <p className="mb-4 text-gray-300">
          WebSocket is a communication protocol that provides a full-duplex, persistent connection between a client and a server over a single TCP connection. Unlike the request-response model of HTTP, WebSockets allow for real-time, bidirectional communication, making them ideal for applications that require low-latency updates and interactive features.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h3 className="font-bold text-blue-400">Pros:</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">Real-time Communication:</span> Enables instant data exchange between client and server.</li>
              <li><span className="font-semibold">Low Latency:</span> Reduces the overhead of establishing new connections for each message.</li>
              <li><span className="font-semibold">Bidirectional:</span> Both the client and server can send messages at any time.</li>
              <li><span className="font-semibold">Efficient:</span> Less overhead compared to HTTP polling or long-polling.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-blue-400">Cons:</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">Stateful:</span> Requires both the client and server to maintain the connection state.</li>
              <li><span className="font-semibold">Complexity:</span> Can be more complex to implement and manage than traditional HTTP.</li>
              <li><span className="font-semibold">Scalability Challenges:</span> Managing a large number of persistent connections can be a challenge.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-blue-400">Common Use Cases:</h3>
            <ul className="list-disc list-inside">
              <li>Real-time chat applications.</li>
              <li>Live sports or financial data feeds.</li>
              <li>Multiplayer online games.</li>
              <li>Collaborative editing tools.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">Client</h3>
          <CodeEditor language="text" value={message} onChange={setMessage} />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Log</h3>
          <CodeEditor language="text" value={log} />
        </div>
      </div>
      {!connected ? (
        <button onClick={handleConnect} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300" disabled={connecting}>
          {connecting ? 'Connecting...' : 'Connect'}
        </button>
      ) : (
        <button onClick={handleSend} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300" disabled={sending || receiving}>
          {sending ? 'Sending...' : 'Send'}
        </button>
      )}
      {connecting && (
        <motion.div
          className="absolute top-1/2 left-1/4 w-8 h-8 bg-blue-500 rounded-full shadow-lg"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: '200%', y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      )}
      {sending && (
        <motion.div
          className="absolute top-1/2 left-1/4 w-4 h-4 bg-green-500 rounded-full shadow-lg"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: '400%', y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      )}
      {receiving && (
        <motion.div
          className="absolute top-1/2 right-1/4 w-4 h-4 bg-yellow-500 rounded-full shadow-lg"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: '-400%', y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
};

export default WebSocketComponent;
