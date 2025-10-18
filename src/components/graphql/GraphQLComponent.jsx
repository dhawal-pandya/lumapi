import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '../ui/CodeEditor';
import { users } from '../../lib/mock-data';

const GraphQLComponent = () => {
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [scenario, setScenario] = useState('single'); // 'single' or 'list'
  const [fetchNameOnly, setFetchNameOnly] = useState(false);

  useEffect(() => {
    updateRequest();
  }, [scenario, fetchNameOnly]);

  const updateRequest = () => {
    if (scenario === 'single') {
      setRequest(`query GetUser {
  user(id: "1") {
    id
    name
    email
  }
}`);
    } else {
      if (fetchNameOnly) {
        setRequest(`query GetUsers {
  users {
    name
  }
}`);
      } else {
        setRequest(`query GetUsers {
  users {
    id
    name
  }
}`);
      }
    }
  };

  const handleSend = () => {
    setLoading(true);
    setResponse('');
    const startTime = performance.now();

    let delay = 200; // Base delay for GraphQL
    if (scenario === 'list') {
      delay += 100; // Extra delay for fetching a list
      if (fetchNameOnly) {
        delay -= 25; // Slightly faster when fetching less data
      }
    }

    // Simulate API call
    setTimeout(() => {
      const endTime = performance.now();
      setTimer(endTime - startTime);
      if (scenario === 'single') {
        setResponse(JSON.stringify({
          data: {
            user: users[0]
          }
        }, null, 2));
      } else {
        let usersData;
        if (fetchNameOnly) {
          usersData = users.map(user => ({ name: user.name }));
        } else {
          usersData = users.map(user => ({ id: user.id, name: user.name }));
        }
        setResponse(JSON.stringify({
          data: {
            users: usersData
          }
        }, null, 2));
      }
      setLoading(false);
    }, delay);
  };

  return (
    <div className="relative">
      <div className="mb-4 p-4 bg-gray-800 border border-purple-500 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-purple-400">GraphQL</h2>
        <p className="mb-4 text-gray-300">
          GraphQL is a query language for APIs and a server-side runtime for executing queries by using a type system you define for your data. Unlike REST, GraphQL allows clients to request exactly the data they need, making it a powerful tool for building efficient and flexible APIs. It uses a single endpoint for all data requests, and the schema defines a strong contract between the client and the server.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h3 className="font-bold text-purple-400">Pros:</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">Efficient Data Fetching:</span> Eliminates over-fetching and under-fetching by allowing clients to specify their exact data requirements.</li>
              <li><span className="font-semibold">Strongly Typed Schema:</span> The schema serves as a contract, enabling better tooling and fewer integration issues.</li>
              <li><span className="font-semibold">Single Endpoint:</span> Simplifies the API by exposing a single endpoint for all queries, mutations, and subscriptions.</li>
              <li><span className="font-semibold">Real-time Data:</span> Built-in support for real-time updates through subscriptions.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-purple-400">Cons:</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">Complexity:</span> Can be more complex to set up and manage compared to REST.</li>
              <li><span className="font-semibold">Caching:</span> Caching is more complex due to the single endpoint and varied query structures.</li>
              <li><span className="font-semibold">Performance Bottlenecks:</span> Deeply nested or complex queries can lead to performance issues on the server.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-purple-400">Common Use Cases:</h3>
            <ul className="list-disc list-inside">
              <li>Mobile applications where bandwidth is a concern.</li>
              <li>Complex front-end applications that need to fetch data from multiple sources.</li>
              <li>Applications with nested or relational data.</li>
              <li>Real-time applications like chat or live sports updates.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <button onClick={() => setScenario('single')} className={`mr-2 py-1 px-3 rounded ${scenario === 'single' ? 'bg-purple-600' : 'bg-gray-700'}`}>Single User</button>
        <button onClick={() => setScenario('list')} className={`py-1 px-3 rounded ${scenario === 'list' ? 'bg-purple-600' : 'bg-gray-700'}`}>User List</button>
        {scenario === 'list' && (
          <div className="ml-4 flex items-center">
            <input type="checkbox" id="fetchNameOnly" checked={fetchNameOnly} onChange={() => setFetchNameOnly(!fetchNameOnly)} />
            <label htmlFor="fetchNameOnly" className="ml-2">Fetch name only</label>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">Request</h3>
          <CodeEditor language="graphql" value={request} onChange={setRequest} />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Response</h3>
          <CodeEditor language="json" value={response} />
        </div>
      </div>
      <div className="flex items-center">
        <button onClick={handleSend} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
        {timer > 0 && <div className="ml-4 mt-4 text-gray-400">{timer.toFixed(2)} ms</div>}
      </div>
      {loading && (
        <motion.div
          className="absolute top-1/2 left-1/4 w-8 h-8 bg-purple-500 rounded-full shadow-lg"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: '200%', y: 0, opacity: 1 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
};

export default GraphQLComponent;
