import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '../ui/CodeEditor';
import { users } from '../../lib/mock-data';

const RestComponent = () => {
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [scenario, setScenario] = useState('single'); // 'single' or 'list'
  const [useQueryParams, setUseQueryParams] = useState(false);

  useEffect(() => {
    updateRequest();
  }, [scenario, useQueryParams]);

  const updateRequest = () => {
    if (scenario === 'single') {
      setRequest('GET /users/1');
    } else {
      let req = 'GET /users';
      if (useQueryParams) {
        req += '?sort=name';
      }
      setRequest(req);
    }
  };

  const handleSend = () => {
    setLoading(true);
    setResponse('');
    const startTime = performance.now();

    let delay = 300; // Base delay
    if (scenario === 'list') {
      delay += 150; // Extra delay for fetching a list
      if (useQueryParams) {
        delay += 150; // Extra delay for sorting
      }
    }

    // Simulate API call
    setTimeout(() => {
      const endTime = performance.now();
      setTimer(endTime - startTime);
      if (scenario === 'single') {
        setResponse(JSON.stringify(users[0], null, 2));
      } else {
        let usersData = [...users];
        if (useQueryParams) {
          usersData.sort((a, b) => a.name.localeCompare(b.name));
        }
        setResponse(JSON.stringify(usersData, null, 2));
      }
      setLoading(false);
    }, delay);
  };

  return (
    <div className="relative">
      <div className="mb-4 p-4 bg-gray-800 border border-blue-500 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-blue-400">REST (Representational State Transfer)</h2>
        <p className="mb-4 text-gray-300">
          REST is an architectural style that defines a set of constraints for creating web services. It is the most popular and widely adopted approach for designing networked applications, especially for public APIs. RESTful services use standard HTTP methods (GET, POST, PUT, DELETE) and are stateless, meaning each request from a client to a server must contain all the information needed to understand and complete the request.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h3 className="font-bold text-blue-400">Pros:</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">Simplicity & Familiarity:</span> Uses standard HTTP methods, making it easy to understand and implement.</li>
              <li><span className="font-semibold">Scalability:</span> The stateless nature of REST allows it to scale horizontally with ease.</li>
              <li><span className="font-semibold">Flexibility:</span> Supports various data formats like JSON, XML, and plain text.</li>
              <li><span className="font-semibold">Cacheable:</span> Responses can be cached to improve performance and reduce server load.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-blue-400">Cons:</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">Over/Under-fetching:</span> Clients often receive more or less data than they need, leading to inefficient data transfer.</li>
              <li><span className="font-semibold">Multiple Round Trips:</span> Complex queries may require multiple requests to fetch all the necessary data.</li>
              <li><span className="font-semibold">No Strict Contract:</span> Relies on documentation, which can be inconsistent or outdated.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-blue-400">Common Use Cases:</h3>
            <ul className="list-disc list-inside">
              <li>Public-facing APIs for web and mobile applications.</li>
              <li>Simple, resource-oriented web services.</li>
              <li>CRUD (Create, Read, Update, Delete) operations.</li>
              <li>Content delivery networks (CDNs).</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <button onClick={() => setScenario('single')} className={`mr-2 py-1 px-3 rounded ${scenario === 'single' ? 'bg-blue-600' : 'bg-gray-700'}`}>Single User</button>
        <button onClick={() => setScenario('list')} className={`py-1 px-3 rounded ${scenario === 'list' ? 'bg-blue-600' : 'bg-gray-700'}`}>User List</button>
        {scenario === 'list' && (
          <div className="ml-4 flex items-center">
            <input type="checkbox" id="queryParams" checked={useQueryParams} onChange={() => setUseQueryParams(!useQueryParams)} />
            <label htmlFor="queryParams" className="ml-2">Add query params? (?sort=name)</label>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">Request</h3>
          <CodeEditor language="http" value={request} onChange={setRequest} />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Response</h3>
          <CodeEditor language="json" value={response} />
        </div>
      </div>
      <div className="flex items-center">
        <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
        {timer > 0 && <div className="ml-4 mt-4 text-gray-400">{timer.toFixed(2)} ms</div>}
      </div>
      {loading && (
        <motion.div
          className="absolute top-1/2 left-1/4 w-8 h-8 bg-blue-500 rounded-full shadow-lg"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: '200%', y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
};

export default RestComponent;
