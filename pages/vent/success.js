import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../../styles/hint/vent.module.scss'
import Link from "next/link";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../lottiefiles/checkmark.json';

import Swal from 'sweetalert2'
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function Intruction_1() {
    
    const router = useRouter()
    const [textHint, setTextHint] = useState('เก่งมากค่ะ!');
    const [showLottie, setShowLottie] = useState(false);
    function nextStep() {
        router.push('/menulearningmode')
    }

    useEffect(() => {
        setShowLottie(true)
        setTimeout(() => { 
            setShowLottie(false)
         }, 2000)

    }, []);

    // lottie
    const lottieOptions = {
        animationData: animationData,
        // loop: true,
        loop: false,
        autoplay: true,
        rendererSettings: {
        // preserveAspectRatio: 'xMidYMid slice'
        preserveAspectRatio: 'none'
        }
    };


    const [cookies, setCookie] = useCookies(['data','signature']);

    useEffect(() => {
      // ส่งข้อมูลกลับที่ไปที่ CV learn
      if (!cookies.data || !cookies.signature) {
        return false
      }

      const fetchData = async () => {
        const userData = await axios.post('/api/cvlearn-test', {
          data: cookies.data,
          signature: cookies.signature,
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Equipment set up success",
          text: `${userData.data.data.user_profile.first_name}  ${userData.data.data.user_profile.last_name}`,
          showConfirmButton: false,
          timer: 5500
        }).then((result) => {
          // alert('send data to cvLearn')
          sendDataToApi(userData.data.data.user_profile.ref_id, "1", "100")
        });
      }
      fetchData();

      const sendDataToApi = async (ref_id, course_id, percent_progress) => {

        const url = 'https://demo.mycourseville.com/?q=cvapi/post/saveprogress';
      
        const postData = {
          ref_id: ref_id,
          course_id: course_id,
          percent_progress: percent_progress,
        };
      
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer pF8KfLpeOU4S0hYqkp4bZIq0qwluah',
          },
          body: new URLSearchParams(postData),
        };
      
        try {
          const response = await fetch(url, requestOptions);
          const data = await response.json();
          console.log('Response:', data);
          return data; // หากต้องการให้ฟังก์ชั่นส่งค่าไปยังที่อื่น
        } catch (error) {
          console.error('Error:', error);
          throw error; // หากต้องการจัดการข้อผิดพลาดหรือส่งไปยังที่อื่น
        }
      }

    }, [cookies]);



    return (
        <div className={styles.container}>
            <Head>
                <title>SUCCESS</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='prev_page'>
                <Link href="/quiz/brain"> 
                <Image
                    src="/images/prev.png"
                    alt="Women"
                    // layout="fill"
                    // objectFit="cover"
                    width={196}
                    height={196}
                />
                </Link>
            </div>{/* prev_page */}

            <div className={styles.container_hint}>

            {showLottie &&
            <div className={styles.lottieCheck}>
                <Lottie options={lottieOptions} />
            </div>
            }    
                <div className={styles.row_hint}>                    

                    <div className={styles.col_text_box_brain_short}>
                        <div className={styles.text_box_wrap}>
                            <p>
                                {textHint}
                            </p>
                        </div>

                        <div className={styles.btn_group}>
                            <button onClick={nextStep}>
                                FINISH
                            </button>
                        </div>                        
                    </div>                
                    
                    <div className={styles.col_image}>
                        <Image
                            src="/images/hin-ture.png"
                            alt="Women"
                            // layout="fill"
                            // objectFit="cover"
                            width={1279}
                            height={1739}
                        />
                    </div>
                </div>
            </div>            
        
        </div>
    )
}
