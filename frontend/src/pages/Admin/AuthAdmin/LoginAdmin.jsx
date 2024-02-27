import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiLogIn } from 'react-icons/bi';

import Card from '../../../components/card/Card';
import Loader from '../../../components/loader/Loader'
import { validateEmail } from '../../../utils/validations';
import { signAdminIn } from "../../../redux/states/AdminSlice/AdminActions";
import { getAdminLoginStatus } from "../../../redux/states/AdminSlice/AdminActions";
import styles from './AuthAdmin.module.scss';


const initialState = {
  email: "",
  password: "",
};

const LoginAdmin = () => {

  const adminData = useSelector((state) => state.adminReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setformData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    dispatch(getAdminLoginStatus())
  }, [dispatch])

  useEffect(()=>{
    if(adminData.isSignedIn){
      navigate('/admin/home')
    }
  },[adminData.isSignedIn])


  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Completa todos los campos");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const adminData = {
      email,
      password,
    };

    setIsLoading(true);

    try {
      dispatch(signAdminIn(adminData))
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }

  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>
          <form onSubmit={login}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
          </form>
          <Link to="/admin/forgot">Forgot Password</Link>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p> &nbsp; Don't have an account? &nbsp;</p>
            <Link to="/admin/register">Register</Link>
          </span>
        </div>
      </Card>
    </div>
  )
}

export default LoginAdmin