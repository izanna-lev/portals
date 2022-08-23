/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LoginSpinner from "../../components/LoginSpinner";
import Nav from "../nav/index";
import logo from "../../images/signin.png";
import { login } from "../../store/Actions/login";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./index.scss";


const LandingPage = () => {
  const navigate = useNavigate();
  const [passVisibleStatus, setPassVisibleStatus] = useState(false);

  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.login.accessToken);
  const show = useAppSelector((state) => state.loader.value);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/dashboard");
    }
  }, [accessToken, navigate]);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      login({
        email: (document.getElementById("email") as HTMLInputElement).value,
        password: (document.getElementById("password") as HTMLInputElement)
          .value,
      })
    );
  };

  return (
    <section className="loginPage" id="loginPage">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Nav />
      <div className="login">
        <img className="signin-image" src={logo} alt="signinImage" />
        <div className="login-form">
          <div className="heading">
            Welcome to <strong className="strong-heading">Onsite Travel</strong>
          </div>

          <form className="user-login" onSubmit={submitForm}>
            <div className="input-field-text">
              <div className="label">Email</div>
              <div className="input-login-containers">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@abc.com"
                  className="custom-field"
                  autoFocus
                  autoComplete="email"
                  required
                  defaultValue={localStorage.getItem("user") || ""}
                />
              </div>
            </div>

            <div className="input-field-text">
              <div className="label">Password</div>
              <div className="input-login-containers password">
                <input
                  id="password"
                  name="password"
                  type={passVisibleStatus ? "text" : "password"}
                  placeholder="XXXXXXXXXXXX"
                  className="custom-field"
                  autoFocus
                  autoComplete="password"
                  required
                />
                <div
                  className="password-icon"
                  onClick={() => {
                    setPassVisibleStatus(!passVisibleStatus);
                  }}
                >
                  {passVisibleStatus ? (
                    <VisibilityOutlinedIcon className="input-icon" />
                  ) : (
                    <VisibilityOffOutlinedIcon className="input-icon" />
                  )}
                </div>
              </div>
            </div>

            <div className="button-login">
              { show ? <LoginSpinner/> : <button className="button">Log In</button> }
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;