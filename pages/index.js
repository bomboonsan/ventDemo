import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useEffect , useState} from 'react';
import { useRouter } from 'next/router'
import HomeAlert from '../components/homealert'
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function Home() {
  const router = useRouter()

  const handle = useFullScreenHandle();

  const [passwordAll, setPasswordAll] = useState([]);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const handleChange = event => {
    setPassword(event.target.value);
    console.log('value is:', event.target.value);    
    setMessage(null);
  };

  const checkPassword = () => {
    // const correctPassword = '9876543';
    // if (password === correctPassword) {
    //   // router.push('/select');
    //   router.push('/welcome');
    //   document.documentElement.requestFullscreen();
    // } else {
    //   setMessage('Incorrect password');
    // }

    if (checkPasswordMatch(passwordAll, password)) {
      document.documentElement.requestFullscreen();
      router.push('/welcome');
    } else {
      setMessage('Incorrect password');
    }
  };

  const handleRegister = () => {
    router.push('/select');
    document.documentElement.requestFullscreen();
  }

  // Elements
  const alertElement = message ? <HomeAlert message={message} /> : null;



  // 
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('userData');
  };


  function checkPasswordMatch(jsonArray, inputPassword) {
    for (let i = 0; i < jsonArray.length; i++) {
      const obj = jsonArray[i];
      const password = obj.password;
  
      if (password === inputPassword) {
        return true; // Password matches
      }
    }
  
    return false; // No matching password found
  }
  

  return (
    <div className={styles.container}>
      <Head>
        <title>LOGIN</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.login_page}>
        <div className={styles.login_container}>
          <h1>LOGIN</h1>
          <p>{alertElement}</p>
          <input 
          className={styles.login_input} 
          type="text" 
          placeholder='Enter Password'
          onChange={handleChange}
          value={password} />

          {/* <button 
          onClick={checkPassword}
          className={styles.submit_btn}>Login</button>

          <button 
          onClick={handleRegister}
          className={styles.submit_btn}>Register</button> */}

          <div className={styles.btn_group}>
            <div>
              <button 
              onClick={checkPassword}
              className={styles.submit_btn}>Login</button>          
            </div>
          </div>


          {/* <div>
            {isLoggedIn ? (
              <>
                <h1>Welcome, {userData ? userData['first_name'] : ''}!</h1>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <h1>Login</h1>
                <button onClick={handleLogin}>Login</button>
              </>
            )} 
          </div> */}
          

        </div>        
      </div>
    </div>
  )
}
