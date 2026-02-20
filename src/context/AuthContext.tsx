import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'counsellor';
  onboardingComplete: boolean;
  profile?: any;
  specialization?: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string, role?: string) => Promise<{ success: boolean; error?: string }>;
  sendOtp: (name: string, email: string, password: string, role: string) => Promise<{ success: boolean; error?: string; otp?: string }>;
  verifyOtp: (email: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (profileData: any) => Promise<boolean>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('cc_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem('cc_user'); }
    }
    setLoading(false);
  }, []);

  const sendOtp = useCallback(async (name: string, email: string, password: string, role: string) => {
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (res.ok) return { success: true, otp: data.otp }; // otp only returned in dev when email not configured
      return { success: false, error: data.message };
    } catch {
      return { success: false, error: 'Cannot connect to server' };
    }
  }, []);

  const verifyOtp = useCallback(async (email: string, otp: string) => {
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        localStorage.setItem('cc_user', JSON.stringify(data));
        return { success: true };
      }
      return { success: false, error: data.message };
    } catch {
      return { success: false, error: 'Cannot connect to server' };
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        localStorage.setItem('cc_user', JSON.stringify(data));
        return { success: true };
      }
      return { success: false, error: data.message };
    } catch {
      return { success: false, error: 'Cannot connect to server. Ensure backend is running.' };
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string, role = 'student') => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        localStorage.setItem('cc_user', JSON.stringify(data));
        return { success: true };
      }
      return { success: false, error: data.message };
    } catch {
      return { success: false, error: 'Cannot connect to server.' };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('cc_user');
  }, []);

  const updateProfile = useCallback(async (profileData: any) => {
    if (!user) return false;
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ profile: profileData }),
      });
      const data = await res.json();
      if (res.ok) {
        const updated = { ...data, token: user.token };
        setUser(updated);
        localStorage.setItem('cc_user', JSON.stringify(updated));
        return true;
      }
      return false;
    } catch { return false; }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, signup, sendOtp, verifyOtp, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
