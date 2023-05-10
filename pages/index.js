import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useEffect , useState} from 'react';
import { useRouter } from 'next/router'
import HomeAlert from '../components/homealert'

export default function Home() {
  const router = useRouter()
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const handleChange = event => {
    setPassword(event.target.value);
    console.log('value is:', event.target.value);    
    setMessage(null);
  };

  const checkPassword = () => {
    const correctPassword = '9876543';
    if (password === correctPassword) {
      // router.push('/select');
      router.push('/welcome');
    } else {
      setMessage('Incorrect password');
    }
  };

  const handleRegister = () => {
    router.push('/select');
  }

  // Elements
  const alertElement = message ? <HomeAlert message={message} /> : null;



  // 
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedIn === 'true');

    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://192.168.1.99:2000/user/8', {
          // headers: {
          //   Authorization: 'Bearer YOUR_ACCESS_TOKEN',
          // },
          headers: {
            'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
        });
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setUserData(data);
          setIsLoggedIn(true);
          sessionStorage.setItem('userData', JSON.stringify(data));
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchUserData();
  }, []);  

  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('userData');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>i-MEDucation</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.login_page}>
        <div className={styles.login_container}>
          <h1>i-MEDucation</h1>
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
            <div>
              <button 
              onClick={handleRegister}
              className={styles.submit_btn}>Register</button>
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
