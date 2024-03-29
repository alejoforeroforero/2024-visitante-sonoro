import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import styles from "./AuthAdmin.module.scss";
import { MdPassword } from "react-icons/md";
import Card from "../../../components/card/Card"
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPasswordAdmin } from "../../../redux/states/AdminSlice/AdminActions";

const initialState = {
  password: "",
  password2: "",
};

const ResetAdmin = () => {

  const dispatch = useDispatch();

  const [formData, setformData] = useState(initialState);
  const { password, password2 } = formData;

  const { resetToken } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const adminData = {
      passwords:{
        password,
        password2,
      },
      resetToken      
    };

    try {
      dispatch(resetPasswordAdmin(adminData))
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={reset}>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="/login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default ResetAdmin