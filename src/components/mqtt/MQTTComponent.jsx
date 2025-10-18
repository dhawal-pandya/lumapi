import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '../ui/CodeEditor';

const MQTTComponent = () => {
  const [log, setLog] = useState('');
  const [subscribedTopic, setSubscribedTopic] = useState('/sensors/#');
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setLog('Connecting to MQTT broker...\n');
    setTimeout(() => {
      setConnected(true);
      setLog(prevLog => prevLog + `Connected and subscribed to topic: "${subscribedTopic}"\n`);
    }, 1000);
  };

  const handlePublish = (topic, message) => {
    if (!connected) return;
    const logMessage = `[PUBLISH] Topic: ${topic}, Message: "${message}"\n`;
    setLog(prevLog => prevLog + logMessage);

    // Check if the subscriber should receive the message
    const topicParts = topic.split('/');
    const subParts = subscribedTopic.split('/');
    let match = true;
    if (subscribedTopic !== '#') {
      if (subParts.length > topicParts.length && subParts[subParts.length - 1] !== '#') {
        match = false;
      } else {
        for (let i = 0; i < subParts.length; i++) {
          if (subParts[i] === '#') {
            break; // Matches everything else
          }
          if (subParts[i] !== '+' && subParts[i] !== topicParts[i]) {
            match = false;
            break;
          }
        }
      }
    }

    if (match) {
      setTimeout(() => {
        const receivedMessage = `[RECEIVE] Topic: ${topic}, Message: "${message}"\n`;
        setLog(prevLog => prevLog + receivedMessage);
      }, 300); // Simulate network delay
    }
  };

  return (
    <div className="relative">
      <div className="mb-4 p-4 bg-gray-800 border border-red-500 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-red-400">MQTT (Message Queuing Telemetry Transport)</h2>
        <p className="mb-4 text-gray-300">
          This simulation demonstrates an IoT sensor network using MQTT. Devices publish data to specific topics (e.g., `/sensors/temperature`). The subscriber can listen to specific topics or use wildcards (`+` for single level, `#` for multi-level) to filter messages.
        </p>
      </div>
      {!connected ? (
        <button onClick={handleConnect} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300">
          Connect to Broker
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-bold mb-2">IoT Devices (Publishers)</h3>
            <div className="flex flex-col">
              <button onClick={() => handlePublish('/sensors/living_room/temperature', `${(Math.random() * 5 + 20).toFixed(2)}°C`)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
                Publish Temperature
              </button>
              <button onClick={() => handlePublish('/sensors/living_room/light', `intensity: ${(Math.random() * 100).toFixed(0)}%`)} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2">
                Publish Light Intensity
              </button>
              <button onClick={() => handlePublish('/sensors/front_door/status', 'CLOSED')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                Publish Door Status
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Subscriber Log</h3>
            <div className="flex items-center mb-2">
              <label htmlFor="topic" className="mr-2">Subscribe to:</label>
              <input
                id="topic"
                type="text"
                value={subscribedTopic}
                onChange={(e) => setSubscribedTopic(e.target.value)}
                className="flex-grow bg-gray-900 border border-gray-600 rounded px-2 py-1"
              />
            </div>
            <CodeEditor language="text" value={log} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MQTTComponent;
