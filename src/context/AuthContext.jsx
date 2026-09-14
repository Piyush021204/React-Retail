import {
  createContext,
  useContext,
  useReducer,
} from "react";

const AuthContext = createContext();

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
         localStorage.setItem("isLoggedIn", "true");

      return {
             ...state,
   isLoggedIn: true,
      };
 
    case "LOGOUT":
        localStorage.removeItem("isLoggedIn");

      return {
      ...state,
           isLoggedIn: false,
      };

    default:
      
    return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(
    authReducer,
    {
      isLoggedIn:
        localStorage.getItem("isLoggedIn") === "true",
    }
  );

  const login = () => {
      dispatch({ type: "LOGIN" });
  };

const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (

    <AuthContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        login,
        logout,
      }}
    >
      
      
      {children}
       </AuthContext.Provider>
  );
}

export function useAuth() {
    return useContext(AuthContext);
}