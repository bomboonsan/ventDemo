import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../../styles/result/trouble.module.scss'
import Link from "next/link";
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
import { useState, useEffect, useRef } from 'react';
import screenfull from 'screenfull'

import { useCookies } from 'react-cookie';
import axios from 'axios';
import Swal from 'sweetalert2'

export default function CaseDetail() {

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
          sendDataToApi(userData.data.data.user_profile.ref_id, "2", "100")
        });
      }
      fetchData();

      const sendDataToApi = async (ref_id, course_id, percent_progress) => {

        const url = 'https://demo.mycourseville.com/?q=cvapi/post/saveprogress';
      
        const postData = {
          ref_id: ref_id,
          course_id: course_id,
          // percent_progress: percent_progress,
          percent_progress: "100",
        };
      
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer pF8KfLpeOU4S0hYqkp4bZIq0qwluah',
          },
          // body: new URLSearchParams(postData),
          body: JSON.stringify(postData),
        };
      
        try {
          const response = await fetch(url, requestOptions);
          const data = await response.json();
          // console.log('Response:', data);
          return data; // หากต้องการให้ฟังก์ชั่นส่งค่าไปยังที่อื่น
        } catch (error) {
          console.error('Error:', error);
          throw error; // หากต้องการจัดการข้อผิดพลาดหรือส่งไปยังที่อื่น
        }
      }

    }, [cookies]);


  const [playingYoutube, setPlayingYoutube] = useState(true);
  // const [urlYoutube, setUrlYoutube] = useState('https://wish-integrate.com/vent-video/trouble-success2-Trim.mp4');
  const [urlYoutube, setUrlYoutube] = useState('https://wish-integrate.com/vent-video/trouble/Patient2post.mp4');
  const resetYoutube = () => {
      // setPatientAlertStep(1)
      // setShowElement('')
  }

  const playerRef = useRef(null);
  const onClickFullscreen = () => {
    if (screenfull.isEnabled && playerRef.current) {
      screenfull.toggle(playerRef.current.wrapper);
    }
  };

  // Get Param
  const router = useRouter();
  // const { timer } = router.query;

  const [timeResult, setTimeResult] = useState(null);

  useEffect(() => {
    const { start } = router.query;
    const startTime = start;
    const finishTime = Date.now();
    const durationInSeconds = (finishTime - startTime) / 1000;
    // console.log(`Duration: ${durationInSeconds} seconds`);
    const timeToPlay = Math.floor(durationInSeconds); // ทำให้เป็นจำนวนเต็มบวก

    function formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      return `${minutes} นาที ${remainingSeconds} วินาที`;
    }


    setTimeResult(formatDuration(timeToPlay))

  }, []);


  return (
    <div className={styles.container}>
      <Head>
        <title>Trouble shooting </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='prev_page'>
          <Link href="/trouble-shooting/case2-step2"> 
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
      <div className='container'>
        <div className='row justify-content-center align-items-center min-h-screen'>
          <div className='col-11 col-md-9 col-lg-9'>
            {/* <h2 className='text-center mb-4'>
                Success
            </h2> */}
            <div className={styles.success_btn}>
            <Image
                src="/images/success_btn.png"
                alt="success"
                // layout="fill"
                // objectFit="cover"
                width={196}
                height={196}
            />
            </div>
            <div className={styles.box_wrapper}>
              <div className={styles.video}>
                <ReactPlayer 
                  onClick={onClickFullscreen}
                  className={styles.alertYoutube} 
                  url={urlYoutube}  
                  playing={playingYoutube} 
                  ref={playerRef}
                  loop={true}
                  onEnded={resetYoutube}
                  muted={true}
                  controls
                  width='100%'
                  height='100%'
                />
              </div>
            </div>
            <div className={styles.text_wrap}>
                <p>
                เสียงลมออกปากของคนไข้หายไป 
                ท่านใช้เวลาไป  {timeResult}
                </p>
            </div>
            <div className={styles.btn_area}>
              <div className={styles.btn_container}>
                  <Link href="/trouble-all"> 
                  <button className={styles.next_btn}>
                  NEXT
                  </button>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}