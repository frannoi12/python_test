import React from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";

export default function App() {
    const { instance, accounts, inProgress } = useMsal();

    if (accounts.length > 0) {
        return <span>There are currently {accounts.length} users signed in!</span>
    } else if (inProgress === "startup") {
        return <span>Login is currently in progress!</span>
    } else {
        return (
            <>
                <span>There are currently no users signed in!</span>
                <button onClick={() => instance.loginPopup()}>Login</button>
            </>
        );
    }
}