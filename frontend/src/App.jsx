import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { UserDataProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserDataProvider>
      <AppRoutes />
    </UserDataProvider>
  );
};

export default App;
