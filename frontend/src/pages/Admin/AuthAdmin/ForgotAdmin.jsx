import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { AiOutlineMail } from "react-icons/ai";
import Card from '../../../components/card/Card';
import { validateEmail } from '../../../utils/validations';
import { forgotAdmin } from "../../../redux/states/AdminSlice/AdminActions"

import styles from "./AuthAdmin.module.scss";

const ForgotAdmin = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter an email");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const adminData = {
      email,
    };

    try {
      dispatch(forgotAdmin(adminData))
      //setIsLoading(false);
    } catch (error) {
      //setIsLoading(false);
    }
    setEmail("");
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>

          <form onSubmit={forgot}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Get Reset Email
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/admin/home">- Home</Link>
              </p>
              <p>
                <Link to="/admin/login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default ForgotAdmin