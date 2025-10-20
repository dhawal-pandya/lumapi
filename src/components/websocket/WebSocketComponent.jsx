import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '../ui/CodeEditor';

const ChatUser = ({ name, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(name, message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center mt-2">
      <span className="font-semibold w-24">{name}:</span>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow bg-gray-900 border border-gray-600 rounded px-2 py-1"
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend} className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded transition-colors duration-300">
        Send
      </button>
    </div>
  );
};

const WebSocketComponent = () => {
  const [log, setLog] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    setLog('Connecting to chat server...\n');
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      setLog(prevLog => prevLog + 'Connected! You can now send messages.\n');
    }, 1000);
  };

  const handleSendMessage = (user, message) => {
    const formattedMessage = `[${user}]: ${message}\n`;
    // Simulate sending message to server and receiving it back
    setLog(prevLog => prevLog + formattedMessage);
  };

  return (
    <div className="relative">
      <div className="mb-4 p-4 bg-gray-800 border border-blue-500 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-blue-400">WebSocket</h2>
        <p className="mb-4 text-gray-300">
          WebSocket provides a full-duplex communication channel over a single, long-lived TCP connection. It allows for real-time, event-driven communication where both the client and server can send messages to each other at any time. This simulation demonstrates a real-time chat application powered by WebSockets.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h3 className="font-bold text-blue-400">Pros:</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">Low Latency:</span> Establishes a persistent connection, eliminating the overhead of creating new connections for each message.</li>
              <li><span className="font-semibold">Bidirectional Communication:</span> Both client and server can send data independently, enabling real-time interaction.</li>
              <li><span className="font-semibold">High Efficiency:</span> Reduces network traffic and improves performance by avoiding repetitive HTTP headers.</li>
              <li><span className="font-semibold">Stateful:</span> Maintains the connection state, simplifying the management of real-time applications.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-blue-400">Cons:</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">Complexity:</span> Can be more complex to implement and manage than traditional HTTP.</li>
              <li><span className="font-semibold">Scalability Challenges:</span> Managing a large number of persistent connections can be resource-intensive on the server.</li>
              <li><span className="font-semibold">Limited Browser Support:</span> While widely supported in modern browsers, older browsers may require fallbacks.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-blue-400">Common Use Cases:</h3>
            <ul className="list-disc list-inside">
              <li>Real-time chat applications.</li>
              <li>Live sports tickers and score updates.</li>
              <li>Collaborative editing tools (e.g., Google Docs).</li>
              <li>Multiplayer online games.</li>
              <li>Financial trading platforms.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">Chat Room</h3>
          {!connected ? (
            <button onClick={handleConnect} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300" disabled={connecting}>
              {connecting ? 'Connecting...' : 'Connect to Chat'}
            </button>
          ) : (
            <div>
              <ChatUser name="Harry" onSendMessage={handleSendMessage} />
              <ChatUser name="Hermione" onSendMessage={handleSendMessage} />
              <ChatUser name="Ron" onSendMessage={handleSendMessage} />
            </div>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Chat History</h3>
          <CodeEditor language="text" value={log} />
        </div>
      </div>
      {connecting && (
        <motion.div
          className="absolute top-1/2 left-1/4 w-8 h-8 bg-blue-500 rounded-full shadow-lg"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: '200%', y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
};

export default WebSocketComponent;
