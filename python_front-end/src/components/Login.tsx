import React from 'react';
import { CLIENT_ID, REDIRECT_URI, SCOPE } from '../types/google';

const Login: React.FC = () => {

  const handleGoogleLogin = (): void => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPE)}&access_type=online`;
    window.location.href = googleAuthUrl;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-sm border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Connexion</h2>
          <p className="mt-2 text-sm text-gray-600">Accédez à votre espace e-learning</p>
        </div>
        
        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.68 14.96 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.79 2.94C6.07 7.42 8.78 5.04 12 5.04z" />
            <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.43h6.45c-.28 1.47-1.11 2.72-2.36 3.56l3.66 2.84c2.14-1.98 3.39-4.89 3.39-8.49z" />
            <path fill="#FBBC05" d="M5.18 14.5c-.23-.69-.37-1.43-.37-2.2s.14-1.51.37-2.2L1.39 7.56C.5 9.35 0 11.33 0 13.4s.5 4.05 1.39 5.84l3.79-2.94z" />
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.66-2.84c-1.01.68-2.31 1.09-4.3 1.09-3.22 0-5.93-2.38-6.82-5.52L1.39 16.36C3.37 20.33 7.35 23 12 23z" />
          </svg>
          Continuer avec Google
        </button>
      </div>
    </div>
  );
};

export default Login;