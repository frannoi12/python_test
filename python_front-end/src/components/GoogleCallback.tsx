import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGoogleLoginMutation } from '../store/apiSlice';
import { useAppSelector } from '../hooks/store_hook';

const GoogleCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasCalled = useRef(false);
  
  const [googleLogin, { isLoading, error }] = useGoogleLoginMutation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const code = searchParams.get('code');

    if (code&& !hasCalled.current) {
      hasCalled.current = true;
      googleLogin({ code })
        .unwrap()
        .catch((err) => {
          console.error("Erreur mutation d'authentification Google :", err);
        });
    }
  }, [searchParams, googleLogin]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm font-medium text-gray-600">Communication avec l'API Django en cours...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const errorMessage = 'status' in error 
      ? (error.data as any)?.detail || JSON.stringify(error.data)
      : error.message || "Une erreur inconnue est survenue.";

    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-lg bg-red-50 p-4 border border-red-200 text-center">
          <h3 className="text-sm font-medium text-red-800">Erreur d'authentification</h3>
          <p className="mt-2 text-xs text-red-700">{errorMessage}</p>
          <button 
            onClick={() => navigate('/login')}
            className="mt-4 inline-flex items-center rounded-md bg-red-100 px-3 py-2 text-xs font-medium text-red-800 hover:bg-red-200"
          >
            Retourner au Login
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default GoogleCallback;