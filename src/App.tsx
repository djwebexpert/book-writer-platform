import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
import React, { lazy } from "react";
import ProtectedRoute from "./components/layout/protected-routes";
import NavBar from "./components/layout/navbar";
import Home from "./pages/home";

import "./styles/components";
import store from "./redux/store";

const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const Profile = lazy(() => import("./pages/profile"));
const Collaborators = lazy(() => import("./pages/collbrators"));

const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <NavBar />
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<ProtectedRoute element={<Home />} />} />
              <Route
                path="/profile"
                element={<ProtectedRoute element={<Profile />} />}
              />
              <Route
                path="/collaborators"
                element={<ProtectedRoute element={<Collaborators />} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </React.Suspense>
          <ToastContainer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
