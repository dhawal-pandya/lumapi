import { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import RestComponent from "./components/rest/RestComponent";
import GraphQLComponent from "./components/graphql/GraphQLComponent";
import GRPCComponent from "./components/grpc/GRPCComponent";
import WebSocketComponent from "./components/websocket/WebSocketComponent";
import MQTTComponent from "./components/mqtt/MQTTComponent";
import SOAPComponent from "./components/soap/SOAPComponent";
import MobileModal from "./components/ui/MobileModal";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col min-h-screen font-sans">
      <MobileModal isOpen={isMobile} onClose={() => setIsMobile(false)} />
      <main className="flex-grow">
        <h1 className="text-5xl text-center mb-8 text-gray-200">LumAPI</h1>
        <Tabs defaultValue="rest" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-gray-800 rounded-lg">
            <TabsTrigger value="rest" data-protocol="rest">REST</TabsTrigger>
            <TabsTrigger value="graphql" data-protocol="graphql">GraphQL</TabsTrigger>
            <TabsTrigger value="grpc" data-protocol="grpc">gRPC</TabsTrigger>
            <TabsTrigger value="websocket" data-protocol="websocket">WebSocket</TabsTrigger>
            <TabsTrigger value="mqtt" data-protocol="mqtt">MQTT</TabsTrigger>
            <TabsTrigger value="soap" data-protocol="soap">SOAP</TabsTrigger>
          </TabsList>
          <TabsContent value="rest">
            <RestComponent />
          </TabsContent>
          <TabsContent value="graphql">
            <GraphQLComponent />
          </TabsContent>
          <TabsContent value="grpc">
            <GRPCComponent />
          </TabsContent>
          <TabsContent value="websocket">
            <WebSocketComponent />
          </TabsContent>
          <TabsContent value="mqtt">
            <MQTTComponent />
          </TabsContent>
          <TabsContent value="soap">
            <SOAPComponent />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="text-center p-4 text-gray-400">
        Made with ❤️ by <a href="https://dhawal-pandya.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Dhawal Pandya</a>
      </footer>
    </div>
  );
}

export default App;
