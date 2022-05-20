import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import App from "./App";
import AuthenticationHandler from "./components/authentication/authentication-handler";
import DashboardUrlManagement from "./components/Dashboard/DashboardUrlManagement";
import SignInBg from "./assets/images/Login/Sign-in-img.jpg";
import jwt_decode from "jwt-decode";
import { AUTHENTICATION_POPUP_SHOW } from "./redux/actions/actionsTypes";
import StudentDashboardUrlManagement from "./components/StudentDashboard/StudentDashboardUrlManagement";
import Maintanance from "./components/common/Maintanance";
import {
  REMOVE_ALL_INSTITUTE_FILED,
  REMOVE_ALL_COURSES_FILED,
} from "./redux/actions/actionsTypes";
import axiosInstance from "./api/axiosInstance";
import MaintainLogin from "./components/authentication/MaintainLogin";
function UrlManagement() {
  const popup = useSelector((state) => state.authPopup.auth_popup);
  const [passwordReset, setPasswordReset] = useState("");
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState("");
  const history = useHistory();
  const [isMaintanance, setIsmaintanance] = useState(false);
  const [role, setRole] = useState("");
  function tokenManager() {
    const token = localStorage.getItem("refresh");
    let decoded;
    if (token) {
      try {
        decoded = jwt_decode(token);
      } catch (e) {
        localStorage.clear();
      }
      const loggedIn = decoded && decoded.exp && decoded.user_type && true;
      if (loggedIn) {
        setLoggedIn(loggedIn);
        const { user_type } = decoded;
        setRole(user_type);
      } else {
        window.location = "/";
        localStorage.clear();
      }
    }
  }
  const urlCheck = () => {
    let arr = window.location.href.split(
      window.location.origin + "/api/user/password-reset/"
    );
    if (arr[1]) {
      let aRR = arr[1].split("/");
      if (aRR[1]) {
        history.push("/");
        setPasswordReset({
          uid: aRR[0],
          token: aRR[1],
        });
        dispatch({
          type: AUTHENTICATION_POPUP_SHOW,
        });
      } else {
        setPasswordReset("");
      }
    } else {
      setPasswordReset("");
    }
  };
  const maintananceCheck = () => {
    axiosInstance
      .get(`/settings/maintaining-status/`)
      .then((res) => {
        setIsmaintanance(res.data.is_maintaining);
        // console.log(res.data.is_maintaining);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // to pre load the image in sign in, sign up and forgot password
    // so image does not have to be loaded while clicking in Sign in button
    const signinImage = new Image();
    signinImage.src = SignInBg;
    maintananceCheck();
    tokenManager();
    urlCheck();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    popup
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [popup]);
  useEffect(() => {
    history.listen(() => {
      dispatch({ type: REMOVE_ALL_INSTITUTE_FILED });
      dispatch({ type: REMOVE_ALL_COURSES_FILED });
      // dispatch({ type: REMOVE_HOME_COURSES_FILTER });
      localStorage.removeItem("id");
      maintananceCheck();
      tokenManager();
      urlCheck();
    });
    // eslint-disable-next-line
  }, [history]);
  // console.log("hey");

  return (
    <>
      {popup && <AuthenticationHandler passwordReset={passwordReset} />}
      <div className="relative font-overpass">
        <Switch>
          {isMaintanance && (
            <Route path="/sa/maintain/auth/login" component={MaintainLogin} />
          )}
          {loggedIn && role !== "" && !isMaintanance && (
            <Route
              path="/dashboard"
              render={(props) => (
                <DashboardUrlManagement
                  loggedIn={loggedIn}
                  role={role}
                  {...props}
                />
              )}
            />
          )}
          {loggedIn && role === "SA" && isMaintanance && (
            <Route path="/dashboard" component={DashboardUrlManagement} />
          )}
          {loggedIn && role === "ST" && !isMaintanance && (
            <Route
              path="/student-dashboard"
              component={StudentDashboardUrlManagement}
            />
          )}
          {isMaintanance && role !== "SA" ? (
            <Route path="/" component={Maintanance} />
          ) : (
            <Route
              path="/"
              render={(props) => (
                <App loggedIn={loggedIn} role={role} {...props} />
              )}
            />
          )}
          {loggedIn && role === "SA" && isMaintanance && (
            <Route
              path="/"
              render={(props) => (
                <App loggedIn={loggedIn} role={role} {...props} />
              )}
            />
          )}
        </Switch>
      </div>
    </>
  );
}

export default UrlManagement;
