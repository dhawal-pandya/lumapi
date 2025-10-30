# LumAPI

**LumAPI: An interactive visual playground for exploring and comparing modern API protocols.**

LumAPI is a single-page interactive website that visually explains and simulates different API communication paradigms. It's an API museum, playground, and visual guide all in one, designed to help developers and students understand the nuances of various API protocols in a hands-on, engaging way.

![LumAPI](https://github.com/dhawal-pandya/lumapi/blob/main/image.png)

## Core Features

*   **Protocol Exploration:** Dive into detailed explanations and interactive simulations for REST, GraphQL, gRPC, WebSocket, MQTT, and SOAP.
*   **Interactive Playground:** Edit and send mock requests to see simulated responses, helping you understand the request/response cycle of each protocol.
*   **Visual Flow Diagrams:** Visualize the data flow between client and server for different protocols to understand their underlying mechanics.
*   **Latency Simulator:** "Feel" the performance differences between protocols by simulating various network latencies.
*   **Comparison Mode:** See a side-by-side comparison of the same operation across different API styles to understand their structural differences.
*   **Mini Chat Demo:** See a real-time chat demo powered by MQTT or WebSocket to understand their power in event-driven communication.

## Tech Stack

*   **Framework:** React (Vite)
*   **Styling:** TailwindCSS
*   **UI Components:** Shadcn/UI
*   **Animations:** Framer Motion

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   npm

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/dhawal-pandya/lumapi.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Start the development server
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:5173`.
