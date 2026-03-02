import { createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const Login = async (data) => {
  return (
    <AuthContext.Provider
      value={{
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};