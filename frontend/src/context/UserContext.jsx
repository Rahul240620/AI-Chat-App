import { createContext, useContext, useState } from "react";

export const UserDataContext = createContext(null);

// custom hook
export default function UserContext() {
  return useContext(UserDataContext);
}

export function UserDataProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
}
