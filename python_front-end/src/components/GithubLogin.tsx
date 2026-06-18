import { useGitHubLogin } from '@react-oauth/github';
import { GITHUB_CLIENT_ID, GITHUB_REDIRECT_URI } from '../types/github';
import { useGithubLoginMutation } from '../store/apiSlice';

function LoginButton() {

  const [githubLogin] = useGithubLoginMutation();


  const { initiateGitHubLogin, isLoading } = useGitHubLogin({
    clientId: GITHUB_CLIENT_ID,
    redirectUri: GITHUB_REDIRECT_URI,
    onSuccess: response => {
        console.log('Authorization code:', response.code);
      // Exchange code for access token on your backend

      const code = response.code
      if(code){
        githubLogin({ code })
        .unwrap()
        .then((data) => {
          console.log("Authentification GitHub réussie et synchronisée avec le backend :", data);
        })
        .catch((err) => {
          console.error("Erreur mutation d'authentification GitHub :", err);
        });
      }
    },
    onError: error => {
      console.error('Authentication failed:', error);
    },
  });

  return (
    <button onClick={initiateGitHubLogin} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Sign in with GitHub'}
    </button>
  );
}

export default LoginButton