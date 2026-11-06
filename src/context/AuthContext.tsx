import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, signInWithGoogle, logOut } from '../firebase';
import {
  saveUserProfile,
  saveSignatureToCloud,
  fetchUserSignatures,
  deleteSignatureFromCloud,
  SavedSignatureRecord,
} from '../services/signatureService';
import { SignatureState } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  savedSignatures: SavedSignatureRecord[];
  refreshSignatures: () => Promise<void>;
  saveCurrentSignature: (title: string, state: SignatureState) => Promise<SavedSignatureRecord>;
  deleteSignature: (signatureId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [savedSignatures, setSavedSignatures] = useState<SavedSignatureRecord[]>([]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser);
      if (currentUser) {
        try {
          await saveUserProfile(currentUser);
          const sigs = await fetchUserSignatures(currentUser.uid);
          setSavedSignatures(sigs);
        } catch (err) {
          console.error('Error syncing user data on sign in:', err);
        }
      } else {
        setSavedSignatures([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshSignatures = async () => {
    if (!user) return;
    try {
      const sigs = await fetchUserSignatures(user.uid);
      setSavedSignatures(sigs);
    } catch (err) {
      console.error('Error refreshing cloud signatures:', err);
    }
  };

  const signIn = async () => {
    try {
      const loggedInUser = await signInWithGoogle();
      if (loggedInUser) {
        await saveUserProfile(loggedInUser);
        const sigs = await fetchUserSignatures(loggedInUser.uid);
        setSavedSignatures(sigs);
      }
    } catch (err) {
      console.error('Sign in failed:', err);
      throw err;
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      setUser(null);
      setSavedSignatures([]);
    } catch (err) {
      console.error('Sign out failed:', err);
      throw err;
    }
  };

  const saveCurrentSignature = async (title: string, state: SignatureState) => {
    if (!user) {
      throw new Error('Please sign in to save signatures to the cloud.');
    }
    const saved = await saveSignatureToCloud(user.uid, title, state);
    await refreshSignatures();
    return saved;
  };

  const deleteSignature = async (signatureId: string) => {
    if (!user) return;
    await deleteSignatureFromCloud(user.uid, signatureId);
    await refreshSignatures();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut: handleSignOut,
        savedSignatures,
        refreshSignatures,
        saveCurrentSignature,
        deleteSignature,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
