import { FaUser } from "react-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "../../layout";
import styles from "@/styles/AuthForm.module.css";
import AuthContext from "@/context/AuthContext";

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { register, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    //console.log({ userName, email, password });
    register({ userName, email, password });
  };
  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <imput
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.taget.value)}
            />
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <imput
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.taget.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <imput
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.taget.value)}
            />
          </div>

          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <imput
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.taget.value)}
            />
          </div>
          <input type="submit" value="register" className="btn" />
        </form>

        <p>
          Already have an account? <Link htef="/account/login">Sign In</Link>
        </p>
      </div>
    </Layout>
  );
}
