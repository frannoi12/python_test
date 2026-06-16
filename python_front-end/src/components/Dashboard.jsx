import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Barre de navigation supérieure */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 text-white p-2 rounded-lg font-bold text-lg tracking-wider">
            eL
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">E-Learning Platform</span>
        </div>
        
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
        >
          Déconnexion
        </button>
      </nav>

      {/* Contenu principal */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Tableau de bord</h1>
          <p className="text-sm text-gray-500 mt-1">Connexion réussie via Google OAuth 2.0</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Carte Profil de l'utilisateur */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="relative">
              {user?.pk || user?.id ? (
                <div className="h-20 w-20 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-bold uppercase ring-4 ring-indigo-50">
                  {user?.username?.substring(0, 2) || "U"}
                </div>
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-200 animate-pulse" />
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{user?.username || "Utilisateur Test"}</h3>
              <p className="text-sm text-gray-500">{user?.email || "email@exemple.com"}</p>
            </div>

            <div className="w-full pt-4 border-t border-gray-100 flex justify-around text-xs font-medium text-gray-500">
              <div>
                <span className="block text-gray-900 font-bold">ID Utilisateur</span>
                <span>#{user?.pk || user?.id || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Carte État technique (Redux & Tokens) */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm md:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
              Données de session (Redux Toolkit)
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Statut de l'état global
                </label>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  Authentifié avec succès
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Access Token (JWT)
                </label>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-[11px] break-all max-h-24 overflow-y-auto border border-gray-800 shadow-inner">
                  {token || "Aucun jeton trouvé dans le store"}
                </div>
              </div>

              <div className="pt-2 text-xs text-gray-400 italic">
                💡 Le composant "ProtectedRoute" utilise cet état pour sécuriser l'accès à cette page.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;