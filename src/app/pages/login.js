import Image from 'next/image';
import styles from '../Login.module.css'; // Assuming you create a CSS module for styling

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.avatar}>
          <Image
            src="/avatar-placeholder.png" // Path to your avatar image in the public folder
            alt="Avatar"
            width={80}
            height={80}
            className={styles.avatarImage}
          />
        </div>
        <form>
          <div className={styles.inputGroup}>
            <label htmlFor="email">
              <i className="fa fa-envelope"></i> Email ID
            </label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">
              <i className="fa fa-lock"></i> Password
            </label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          <div className={styles.options}>
            <div className={styles.rememberMe}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
          </div>
          <button type="submit" className={styles.loginBtn}>Login</button>
        </form>
      </div>
    </div>
  );
}
