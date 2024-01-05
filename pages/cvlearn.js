import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
// import styles from '../styles/mainmenu2.module.css'
import styles from '../styles/mainmenu.module.css'
import Link from "next/link";
import { useState , useEffect } from 'react';
import { useRouter } from 'next/router'

import axios from 'axios';


import Swal from 'sweetalert2'
import { useCookies } from 'react-cookie';


export default function Main_menu() {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['data','signature']);
  const [user, setUser] = useState({
    user_profile: {
      ref_id: '',
      first_name: '',
      last_name: '',
    },
    company_code: '',
    course_id: ''
  });
  const [data, setData] = useState('');
  const [signature, setSignature] = useState('');
  const { query } = useRouter();
  const { token } = query;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/user/' + token);
      if(!response.data.success) {
        Swal.fire('Error', 'Invalid Token', 'error').then((result) => {
          router.push('/')
        });
        return;        
      }
      // console.log(response.data.data)
      setData(response.data.data.dataBody);
      setSignature(response.data.data.signatureBody);

      const userData = await axios.post('/api/cvlearn-test', {
        data: response.data.data.dataBody,
        signature: response.data.data.signatureBody,
      });
      // console.log(userData.data.data)
      setUser(userData.data.data)

      setCookie('data', response.data.data.dataBody);
      setCookie('signature', response.data.data.signatureBody);      

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Success",
        text: `${userData.data.data.user_profile.first_name}  ${userData.data.data.user_profile.last_name}`,
        showConfirmButton: false,
        timer: 5500
      }).then((result) => {
        router.push('/menuventilator')
      });

    };  

    if (!token) {
      return;
    }

    fetchData();
    
  }, [token]);

  return (
    <div className={styles.container}>
        <Head>
        <title>CV Learn Auth</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>          
            {/* {user.user_profile.ref_id}
            {user.user_profile.first_name}
            {user.user_profile.last_name}
            {user.company_code}
            {user.course_id} */}
        </main>



    </div>
  )
}