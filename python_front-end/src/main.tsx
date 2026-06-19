import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { Configuration, PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'


const MICROSOFT_CLIENT_ID = (import.meta as any).env.VITE_MICROSOFT_OAUTH_CLIENT_ID || "";

const msalConfiguration: Configuration = {
    auth: {
        clientId: MICROSOFT_CLIENT_ID,
        redirectUri: "http://localhost:5173",
    }
};

const msalInstance = new PublicClientApplication(msalConfiguration);

const container = document.getElementById('root')!;
const root = createRoot(container);

msalInstance.initialize().then(() => {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </Provider>
    </StrictMode>,
  );
}).catch((error) => {
  console.error("Échec de l'initialisation de MSAL :", error);
});
