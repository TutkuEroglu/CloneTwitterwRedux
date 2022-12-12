import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Login/LoginPage";
import HomePage from "../Pages/HomePage/HomePage";
import ProfilePage from "../Pages/Profile/ProfilePage";
import Notify from "../Pages/Notify/Notify";
import { useSelector } from "react-redux";

const Routing = () => {
  const { isLoggedIn, USERNAME } = useSelector((state) => state.AUTH);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isLoggedIn === false) {
      setIsAuthorized(false);
    } else if (isLoggedIn === true) {
      setIsAuthorized(true);
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      {isAuthorized ? (
        <Routes>
          <Route path="/CloneTwitterwRedux/" element={<HomePage />} />
          <Route path={"/CloneTwitterwRedux/home"} exact element={<HomePage />} />
          <Route path={`/CloneTwitterwRedux/${USERNAME}`} exact element={<ProfilePage />} />
          <Route path={"/CloneTwitterwRedux/notifications"} exact element={<Notify />} />
        </Routes>
      ) : (
        <Routes>
          <Route index path={"/CloneTwitterwRedux/"} exact element={<LoginPage />} />
          <Route path="*" element={<p>Path not resolved</p>} />
          <Route path={"/CloneTwitterwRedux/login"} element={<LoginPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default Routing;
