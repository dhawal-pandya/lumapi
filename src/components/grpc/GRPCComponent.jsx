import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '../ui/CodeEditor';
import { users } from '../../lib/mock-data';

const GRPCComponent = () => {
  const [proto, setProto] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [scenario, setScenario] = useState('single'); // 'single' or 'list'

  const protoContent = `syntax = "proto3";

service UserService {
  rpc GetUser (GetUserRequest) returns (User);
  rpc ListUsers (ListUsersRequest) returns (UserList);
}

message GetUserRequest {
  string id = 1;
}

message ListUsersRequest {
  // Could be empty or include pagination fields
}

message User {
  string id = 1;
  string name = 2;
  string email = 3;
}

message UserList {
  repeated User users = 1;
}
`;

  useEffect(() => {
    setProto(protoContent);
  }, []);

  const handleSend = () => {
    setLoading(true);
    setResponse('');
    const startTime = performance.now();
    // Simulate API call
    setTimeout(() => {
      const endTime = performance.now();
      setTimer(endTime - startTime);
      if (scenario === 'single') {
        setResponse(JSON.stringify(users[0], null, 2));
      } else {
        setResponse(JSON.stringify({ users: users }, null, 2));
      }
      setLoading(false);
    }, 100);
  };

  return (
    <div className="relative">
      <div className="mb-4 p-4 bg-gray-800 border border-green-500 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-green-400">gRPC (Google Remote Procedure Call)</h2>
        <p className="mb-4 text-gray-300">
          gRPC is a high-performance, open-source RPC (Remote Procedure Call) framework developed by Google. It uses Protocol Buffers (Protobuf) as its interface definition language and data serialization format, which is more efficient than JSON. gRPC is designed for low-latency, high-throughput communication and is particularly well-suited for microservices architectures.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h3 className="font-bold text-green-400">Pros:</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">High Performance:</span> Uses binary serialization (Protobuf) and HTTP/2, resulting in lower latency and smaller payloads.</li>
              <li><span className="font-semibold">Streaming:</span> Native support for bidirectional streaming, allowing for real-time communication.</li>
              <li><span className="font-semibold">Strictly Typed Contracts:</span> The `.proto` file defines a strict contract, reducing integration errors.</li>
              <li><span className="font-semibold">Code Generation:</span> Automatic generation of client and server code in multiple languages.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-green-400">Cons:</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">Limited Browser Support:</span> Requires a proxy (like gRPC-web) for use in web browsers.</li>
              <li><span className="font-semibold">Not Human-Readable:</span> The binary format is not easily debugged without specialized tools.</li>
              <li><span className="font-semibold">Steeper Learning Curve:</span> More complex to set up and learn compared to REST.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-green-400">Common Use Cases:</h3>
            <ul className="list-disc list-inside">
              <li>Internal communication between microservices.</li>
              <li>Real-time applications requiring low latency.</li>
              <li>Polyglot environments where services are written in different languages.</li>
              <li>Network-constrained environments like mobile applications.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <button onClick={() => setScenario('single')} className={`mr-2 py-1 px-3 rounded ${scenario === 'single' ? 'bg-green-600' : 'bg-gray-700'}`}>GetUser</button>
        <button onClick={() => setScenario('list')} className={`py-1 px-3 rounded ${scenario === 'list' ? 'bg-green-600' : 'bg-gray-700'}`}>ListUsers</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">.proto</h3>
          <CodeEditor language="protobuf" value={proto} onChange={setProto} />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Response</h3>
          <CodeEditor language="json" value={response} />
        </div>
      </div>
      <div className="flex items-center">
        <button onClick={handleSend} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
        {timer > 0 && <div className="ml-4 mt-4 text-gray-400">{timer.toFixed(2)} ms</div>}
      </div>
      {loading && (
        <motion.div
          className="absolute top-1/2 left-1/4 w-8 h-8 bg-green-500 rounded-full shadow-lg"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: '200%', y: 0, opacity: 1 }}
          transition={{ duration: 0.1, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
};

export default GRPCComponent;
