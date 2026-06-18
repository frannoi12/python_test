import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { CLIENT_ID } from '../types/google';
import {jwtDecode} from "jwt-decode"


const Login = () => {
  
  const handleSuccess = async (credentialResponse : CredentialResponse) => {
    const token = credentialResponse.credential;
    
    if (token) {
      console.log("Token JWT brut reçu de Google :", token);
    }

    const decodedUser = jwtDecode(token ?? "");

    console.log("Infos reçu décodé :", decodedUser);
    

  }

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="flex flex-col items-center justify-center">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;