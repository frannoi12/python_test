import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      // Requête vers l'API Django configurée avec v1/auth/google/
      fetch('http://localhost:8000/api/v1/auth/google/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Échec de la validation du code auprès de Django REST API.');
          }
          return res.json();
        })
        .then((data) => {
          console.log("Données reçues de Django :", data);
          
          // On envoie le JSON reçu (access, refresh, user) à Redux Toolkit
          dispatch(loginSuccess(data));
          
          setLoading(false);
          // Redirection finale vers le Dashboard de test
          navigate('/dashboard'); 
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
          setLoading(false);
        });
    } else {
      setError("Aucun code d'authentification trouvé dans l'URL.");
      setLoading(false);
    }
  }, [searchParams, navigate, dispatch]);

  if (loading) {
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
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-lg bg-red-50 p-4 border border-red-200 text-center">
          <h3 className="text-sm font-medium text-red-800">Erreur d'authentification</h3>
          <p className="mt-2 text-xs text-red-700">{error}</p>
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