import { useGoogleLogin } from '@react-oauth/google';
import { useGoogleLoginMutation } from '../store/apiSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [googleLoginBackend, { isLoading }] = useGoogleLoginMutation();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Token reçu de Google :", tokenResponse);
      
      try {
        await googleLoginBackend({ access_token: tokenResponse.access_token }).unwrap();
        navigate('/dashboard');
      } catch (err) {
        console.error("Erreur lors de la liaison avec le backend Django :", err);
      }
    },
    onError: (error) => {
      console.error("Échec de la connexion Google Popup :", error);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-sm border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Connexion</h2>
          <p className="mt-2 text-sm text-gray-600">Accédez à votre espace e-learning</p>
        </div>
        
        <button
          onClick={() => handleGoogleLogin()}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.68 14.96 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.79 2.94C6.07 7.42 8.78 5.04 12 5.04z" />
              <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.33H12v4.42h6.45c-.28 1.47-1.11 2.72-2.36 3.56l3.66 2.84c2.14-1.98 3.38-4.89 3.38-8.49z" />
              <path fill="#FBBC05" d="M5.18 14.5c-.23-.69-.36-1.43-.36-2.2s.13-1.51.36-2.2L1.39 7.16C.5 8.93 0 10.91 0 13s.5 4.07 1.39 5.84l3.79-2.34z" />
              <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.91l-3.66-2.84c-1.01.68-2.31 1.09-4.3 1.09-3.22 0-5.93-2.38-6.91-5.57L1.29 15.11C3.27 19.01 7.25 23 12 23z" />
            </svg>
          )}
          <span>{isLoading ? "Vérification..." : "Continuer avec Google"}</span>
        </button>
      </div>
    </div>
  );
};

export default Login;