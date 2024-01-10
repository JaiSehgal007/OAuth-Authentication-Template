import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

const getUser = async () => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
    const response = await axios.get(url, { withCredentials: true });
    setUser(JSON.stringify(response.data.user));
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};


  useEffect(() => {
    getUser();
	// eslint-disable-next-line
  }, []);

  return (
    <div className="container">
	  {console.log(user)}
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </div>
  );
}

export default App;
