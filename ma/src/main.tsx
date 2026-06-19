import React from "react";
import { createRoot } from "react-dom/client";

import { MsalProvider } from "@azure/msal-react";
import { type Configuration,  PublicClientApplication } from "@azure/msal-browser";

import App from "./App.tsx";

// MSAL configuration
const configuration: Configuration = {
    auth: {
        clientId: "44745f80-2769-4f5b-a565-c6da00fbb826",
        redirectUri: "http://localhost:5173",
    }
};

const pca = new PublicClientApplication(configuration);

// Component
const AppProvider = () => (
    <MsalProvider instance={pca}>
        <App />
    </MsalProvider>
);

// React 18+ rendering
const root = createRoot(document.getElementById("root")!);
root.render(<AppProvider />);