import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '../ui/CodeEditor';

const MQTTComponent = () => {
  const [topic, setTopic] = useState('/chat/global');
  const [message, setMessage] = useState('Hi!');
  const [log, setLog] = useState('');
  const [publishing, setPublishing] = useState(false);

  const handlePublish = () => {
    setPublishing(true);
    setLog(`Publishing to ${topic}: ${message}\n`);
    setTimeout(() => {
      setPublishing(false);
      setLog(prevLog => prevLog + 'Message published!\n');
      setTimeout(() => {
        setLog(prevLog => prevLog + `Subscriber received: ${message}\n`);
      }, 500);
    }, 1000);
  };

  return (
    <div className="relative">
      <div className="mb-4 p-4 bg-gray-800 border border-red-500 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-red-400">MQTT (Message Queuing Telemetry Transport)</h2>
        <p className="mb-4 text-gray-300">
          MQTT is a lightweight, publish-subscribe messaging protocol designed for constrained devices and low-bandwidth, high-latency, or unreliable networks. It is widely used in the Internet of Things (IoT) and other applications where efficient and reliable messaging is critical. The protocol's small footprint and low power consumption make it ideal for embedded systems.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h3 className="font-bold text-red-400">Pros:</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">Lightweight & Efficient:</span> Minimal overhead, making it suitable for constrained devices.</li>
              <li><span className="font-semibold">Publish/Subscribe Model:</span> Decouples clients, allowing for scalable and flexible architectures.</li>
              <li><span className="font-semibold">Quality of Service (QoS):</span> Provides three levels of message delivery guarantees.</li>
              <li><span className="font-semibold">Reliable:</span> Designed to handle unreliable networks and reconnect automatically.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-red-400">Cons:</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">Not for Large Payloads:</span> Less suitable for transferring large files or messages.</li>
              <li><span className="font-semibold">Broker as Single Point of Failure:</span> The central broker can be a bottleneck if not properly managed.</li>
              <li><span className="font-semibold">Security:</span> Security is not part of the core protocol and must be implemented separately (e.g., using TLS).</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-red-400">Common Use Cases:</h3>
            <ul className="list-disc list-inside">
              <li>Internet of Things (IoT) devices and sensors.</li>
              <li>Mobile applications requiring low power consumption.</li>
              <li>Industrial automation and monitoring systems.</li>
              <li>Home automation and smart devices.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">Publisher</h3>
          <CodeEditor language="text" value={`Topic: ${topic}\nMessage: ${message}`} onChange={(value) => {
            const [topicLine, messageLine] = value.split('\n');
            setTopic(topicLine.replace('Topic: ', ''));
            setMessage(messageLine.replace('Message: ', ''));
          }} />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Log</h3>
          <CodeEditor language="text" value={log} />
        </div>
      </div>
      <button onClick={handlePublish} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300" disabled={publishing}>
        {publishing ? 'Publishing...' : 'Publish'}
      </button>
      {publishing && (
        <motion.div
          className="absolute top-1/2 left-1/4 w-8 h-8 bg-red-500 rounded-full shadow-lg"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: '200%', y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
};

export default MQTTComponent;
