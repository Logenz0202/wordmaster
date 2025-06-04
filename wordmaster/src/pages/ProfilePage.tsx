import React, { useEffect, useReducer, useMemo } from 'react';
import { auth } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const initialState = {
  displayName: '',
  photoURL: '',
};

type State = typeof initialState;

type Action =
  | { type: 'SET_DISPLAY_NAME'; payload: string }
  | { type: 'SET_PHOTO_URL'; payload: string }
  | { type: 'RESET'; payload: State };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DISPLAY_NAME':
      return { ...state, displayName: action.payload };
    case 'SET_PHOTO_URL':
      return { ...state, photoURL: action.payload };
    case 'RESET':
      return action.payload;
    default:
      return state;
  }
};

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      dispatch({ type: 'RESET', payload: { displayName: currentUser.displayName || '', photoURL: currentUser.photoURL || '' } });
    }
  }, [currentUser]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      try {
        await updateProfile(currentUser, {
          displayName: state.displayName,
          photoURL: state.photoURL,
        });
        alert('Profile updated successfully');
      } catch (error) {
        console.error('Error updating profile', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  const memoizedProfileInfo = useMemo(() => {
    return {
      displayName: state.displayName,
      photoURL: state.photoURL,
    };
  }, [state.displayName, state.photoURL]);

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      {currentUser ? (
        <>
          <p>Logged in as: {currentUser.email}</p>
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-3">
              <label htmlFor="displayName" className="form-label">Display Name</label>
              <input
                type="text"
                className="form-control"
                id="displayName"
                value={memoizedProfileInfo.displayName}
                onChange={(e) => dispatch({ type: 'SET_DISPLAY_NAME', payload: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="photoURL" className="form-label">Photo URL</label>
              <input
                type="text"
                className="form-control"
                id="photoURL"
                value={memoizedProfileInfo.photoURL}
                onChange={(e) => dispatch({ type: 'SET_PHOTO_URL', payload: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">Update Profile</button>
          </form>
          <button className="btn btn-secondary mt-3" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default ProfilePage;