import React, { useContext, useState, useEffect, ReactNode, Context } from 'react';
import { auth, signInWithEmailAndPassword } from '../firebase';
import { onAuthStateChanged, User, UserCredential } from 'firebase/auth';

interface AuthContextProps {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
}

const AuthContext: Context<AuthContextProps | undefined> = React.createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const value = {
    currentUser,
    login,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
