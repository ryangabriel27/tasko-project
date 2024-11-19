import React, { useState, useContext, createContext } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

// Criar contexto de autenticação
const AuthContext = createContext(null);

// Provider do contexto de autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Importante para manter a sessão
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const userData = await response.json();
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      return await response.json();
    } catch (err) {
      setError(err.message || 'Erro ao registrar');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await fetch('/api/auth/user', {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Não autenticado');
      }

      const userData = await response.json();
      setUser(userData);
      return userData;
    } catch (err) {
      setUser(null);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, getCurrentUser, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

    