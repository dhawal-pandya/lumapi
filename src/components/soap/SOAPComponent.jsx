import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '../ui/CodeEditor';

const SOAPComponent = () => {
  const [request, setRequest] = useState(`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:user="http://example.com/user">
  <soapenv:Header/>
  <soapenv:Body>
    <user:GetUserRequest>
      <user:id>1</user:id>
    </user:GetUserRequest>
  </soapenv:Body>
</soapenv:Envelope>`);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleSend = () => {
    setLoading(true);
    const startTime = performance.now();
    // Simulate API call
    setTimeout(() => {
      const endTime = performance.now();
      setTimer(endTime - startTime);
      setResponse(`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Body>
    <user:GetUserResponse xmlns:user="http://example.com/user">
      <user:name>Albus</user:name>
    </user:GetUserResponse>
  </soapenv:Body>
</soapenv:Envelope>`);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="relative">
      <div className="mb-4 p-4 bg-gray-800 border border-gray-500 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-gray-400">SOAP (Simple Object Access Protocol)</h2>
        <p className="mb-4 text-gray-300">
          SOAP is a protocol for exchanging structured information in the implementation of web services. It relies on XML for its message format and typically uses HTTP as a transport protocol. SOAP was once the standard for web services, but has largely been superseded by REST and other more lightweight protocols. However, it is still used in some enterprise and legacy systems.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h3 className="font-bold text-gray-400">Pros:</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">Standardized & Well-defined:</span> Provides a strict contract through WSDL (Web Services Description Language).</li>
              <li><span className="font-semibold">Robust Security:</span> WS-Security offers comprehensive security features for enterprise-level applications.</li>
              <li><span className="font-semibold">Built-in Error Handling:</span> The protocol includes standardized error handling.</li>
              <li><span className="font-semibold">Transactional:</span> Supports ACID transactions, which are crucial for financial and other sensitive operations.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-400">Cons:</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">Verbose:</span> The XML format is verbose and leads to larger payloads.</li>
              <li><span className="font-semibold">Complex:</span> Difficult to implement and debug compared to modern protocols.</li>
              <li><span className="font-semibold">Poor Performance:</span> Slower due to the overhead of XML parsing and processing.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-400">Common Use Cases:</h3>
            <ul className="list-disc list-inside">
              <li>Enterprise applications requiring high security and reliability.</li>
              <li>Financial services and payment gateways.</li>
              <li>Legacy systems that have not been updated to more modern protocols.</li>
              <li>Telecommunication services.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">Request</h3>
          <CodeEditor language="xml" value={request} onChange={setRequest} />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Response</h3>
          <CodeEditor language="xml" value={response} />
        </div>
      </div>
      <div className="flex items-center">
        <button onClick={handleSend} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
        {timer > 0 && <div className="ml-4 mt-4 text-gray-400">{timer.toFixed(2)} ms</div>}
      </div>
      {loading && (
        <motion.div
          className="absolute top-1/2 left-1/4 w-8 h-8 bg-gray-500 rounded-full shadow-lg"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: '200%', y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
};

export default SOAPComponent;
