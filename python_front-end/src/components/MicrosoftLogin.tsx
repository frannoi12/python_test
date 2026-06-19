import React, { useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { useMicrosoftLoginMutation } from '../store/apiSlice';


const MicrosoftLoginView = () => {
    const { instance, inProgress } = useMsal();
    const [isLoading, setIsLoading] = useState(false);
    
    const [microsoftLogin] = useMicrosoftLoginMutation();

    const handleMicrosoftLogin = () => {
        setIsLoading(true);

        const loginRequest = {
            scopes: ["User.Read"],
            prompt: "select_account"
        };

        instance.loginPopup(loginRequest)
            .then((response) => {
                console.log("=== SUCCÈS FRONTEND MICROSOFT ===");
                console.log("Objet response complet :", response);
                console.log("Token d'accès :", response.accessToken);
                console.log("Nom de l'utilisateur :", response.account.name);
                console.log("Email de l'utilisateur :", response.account.username);
                console.log("==================================");

                // if (token) {
                //     microsoftLogin({ access_token:token })
                //         .unwrap()
                //         .then((data) => {
                //             console.log("Synchronisation backend Microsoft réussie :", data);
                //         })
                //         .catch((err) => {
                //             console.error("Erreur mutation backend Microsoft :", err);
                //         });
                // }
            })
            .catch((error) => {
                console.error("=== ERREUR FRONTEND MICROSOFT ===");
                console.error(error);
                console.error("=================================");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const isLoginInProgress = inProgress === "startup" || isLoading;

    return (
        <div className="flex flex-col items-center justify-center">
            <button 
                onClick={handleMicrosoftLogin} 
                disabled={isLoginInProgress}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
                {isLoginInProgress ? 'Connexion en cours...' : 'Sign in with Microsoft'}
            </button>
        </div>
    );
};

export default MicrosoftLoginView;