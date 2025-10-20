import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '../ui/CodeEditor';

const MQTTComponent = () => {
  const [log, setLog] = useState('');
  const [subscribedTopic, setSubscribedTopic] = useState('/sensors/#');
  const [connected, setConnected] = useState(false);
  const [temperature, setTemperature] = useState('22.5');
  const [lightStatus, setLightStatus] = useState('On');
  const [doorStatus, setDoorStatus] = useState('Closed');
  const [temperatureError, setTemperatureError] = useState('');

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

  const validateTemperature = (value) => {
    if (isNaN(value)) {
      setTemperatureError('Temperature must be a number.');
    } else {
      setTemperatureError('');
    }
    setTemperature(value);
  };

  return (
    <div className="relative">
      <div className="mb-4 p-4 bg-gray-800 border border-red-500 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-red-400">MQTT (Message Queuing Telemetry Transport)</h2>
        <p className="mb-4 text-gray-300">
          MQTT is a lightweight, publish-subscribe network protocol that transports messages between devices. It is designed for connections with remote locations where a small code footprint is required or the network bandwidth is limited. This simulation demonstrates an IoT sensor network using MQTT.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h3 className="font-bold text-red-400">Pros:</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">Lightweight & Efficient:</span> Minimal packet overhead, making it ideal for constrained devices and low-bandwidth networks.</li>
              <li><span className="font-semibold">Publish/Subscribe Model:</span> Decouples clients from each other, enabling scalable and flexible architectures.</li>
              <li><span className="font-semibold">Quality of Service (QoS):</span> Provides three levels of QoS to ensure message delivery based on application requirements.</li>
              <li><span className="font-semibold">Session Awareness:</span> Can maintain session state, allowing for reliable message delivery even with intermittent connections.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-red-400">Cons:</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">No Standard for Message Format:</span> The payload can be in any format, which can lead to interoperability issues without proper documentation.</li>
              <li><span className="font-semibold">Broker as Single Point of Failure:</span> The broker can be a bottleneck and a single point of failure if not set up in a high-availability configuration.</li>
              <li><span className="font-semibold">Security:</span> Security is not a core part of the protocol and must be implemented separately (e.g., using TLS and authentication).</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-red-400">Common Use Cases:</h3>
            <ul className="list-disc list-inside">
              <li>Internet of Things (IoT) devices and sensor networks.</li>
              <li>Mobile applications requiring efficient push notifications.</li>
              <li>Home automation systems.</li>
              <li>Industrial control systems (SCADA).</li>
              <li>Real-time monitoring and telemetry.</li>
            </ul>
          </div>
        </div>
      </div>
      {!connected ? (
        <button onClick={handleConnect} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300">
          Connect to Broker
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-bold mb-2">IoT Devices (Publishers)</h3>
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block mb-2">Temperature (°C)</label>
                <input
                  type="text"
                  value={temperature}
                  onChange={(e) => validateTemperature(e.target.value)}
                  className={`w-full bg-gray-900 border ${temperatureError ? 'border-red-500' : 'border-gray-600'} rounded px-2 py-1`}
                />
                {temperatureError && <p className="text-red-500 text-sm mt-1">{temperatureError}</p>}
                <button onClick={() => handlePublish('/sensors/living_room/temperature', `${temperature}°C`)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2" disabled={!!temperatureError}>
                  Publish Temperature
                </button>
              </div>
              <div>
                <label className="block mb-2">Light Status</label>
                <select value={lightStatus} onChange={(e) => setLightStatus(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1">
                  <option value="On">On</option>
                  <option value="Off">Off</option>
                </select>
                <button onClick={() => handlePublish('/sensors/living_room/light', `intensity: ${lightStatus === 'On' ? '100%' : '0%'}`)} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2">
                  Publish Light Status
                </button>
              </div>
              <div>
                <label className="block mb-2">Door Status</label>
                <select value={doorStatus} onChange={(e) => setDoorStatus(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1">
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
                <button onClick={() => handlePublish('/sensors/front_door/status', doorStatus)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                  Publish Door Status
                </button>
              </div>
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
