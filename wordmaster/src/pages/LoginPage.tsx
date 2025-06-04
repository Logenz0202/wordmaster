import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, fetchSignInMethodsForEmail, linkWithCredential, EmailAuthProvider } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/customStyles.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in with email and password');
      navigate('/');
    } catch (error: any) {
      console.error('Error logging in with email and password', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("Logged in with Google");
      navigate("/");
    } catch (error: any) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const pendingCred = GoogleAuthProvider.credentialFromError(error);
        const email = error.customData?.email;
        if (email && pendingCred) {
          try {
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            console.log("Sign-in methods for email:", signInMethods);
            if (signInMethods.includes(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)) {
              const password = prompt("Enter your password to link accounts.");
              if (password) {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                await linkWithCredential(userCredential.user, pendingCred);
                console.log("Linked Google with email/password account");
                navigate("/");
              }
            } else if (signInMethods.includes(FacebookAuthProvider.PROVIDER_ID)) {
              const facebookProvider = new FacebookAuthProvider();
              const userCredential = await signInWithPopup(auth, facebookProvider);
              await linkWithCredential(userCredential.user, pendingCred);
              console.log("Linked Google with Facebook account");
              navigate("/");
            } else {
              console.error("Unhandled sign-in method:", signInMethods);
            }
          } catch (linkError) {
            console.error("Error linking credentials", linkError);
          }
        }
      } else {
        console.error("Error logging in with Google", error);
      }
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    provider.addScope("email");
    try {
      if (auth.currentUser) {
        const result = await signInWithPopup(auth, provider);
        const credential = FacebookAuthProvider.credentialFromResult(result);
        if (credential) {
          await linkWithCredential(auth.currentUser, credential);
          console.log("Facebook account linked to existing account");
        }
      } else {
        await signInWithPopup(auth, provider);
        console.log("Logged in with Facebook");
      }
      navigate("/");
    } catch (error: any) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const pendingCred = FacebookAuthProvider.credentialFromError(error);
        const email = error.customData?.email;
        if (email && pendingCred) {
          try {
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            console.log("Sign-in methods for email:", signInMethods);
            if (signInMethods.includes(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)) {
              const password = prompt("Enter your password to link accounts.");
              if (password) {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                await linkWithCredential(userCredential.user, pendingCred);
                console.log("Linked Facebook with email/password account");
                navigate("/");
              }
            } else if (signInMethods.includes(GoogleAuthProvider.PROVIDER_ID)) {
              const googleProvider = new GoogleAuthProvider();
              const userCredential = await signInWithPopup(auth, googleProvider);
              await linkWithCredential(userCredential.user, pendingCred);
              console.log("Linked Facebook with Google account");
              navigate("/");
            } else {
              console.error("Unhandled sign-in method:", signInMethods);
            }
          } catch (linkError) {
            console.error("Error linking credentials", linkError);
          }
        }
      } else {
          console.error("Error logging in with Facebook", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-2">Login</button>
      </form>
      <h3>or</h3>
      <div className="d-flex justify-content-center mt-2" style={{ gap: '10px' }}>
        <button className="btn btn-danger" onClick={handleGoogleLogin}>Login with Google</button>
        <button className="btn btn-primary" onClick={handleFacebookLogin}>Login with Facebook</button>
      </div>
      <div className="mt-4">
        <p>Forgot your password? <Link to="/reset-password">Reset it here</Link></p>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;