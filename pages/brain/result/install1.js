import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../../../styles/result/main.module.scss'
import Link from "next/link";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';

import Swal from 'sweetalert2'
import { useCookies } from 'react-cookie';
import axios from 'axios';

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
          sendDataToApi(userData.data.data.user_profile.ref_id, "3", "100")
        });
      }
      fetchData();

      const sendDataToApi = async (ref_id, course_id, percent_progress) => {

        const url = 'https://www.mycourseville.com/?q=cvapi/post/saveprogress';
      
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
            'Authorization': 'Bearer NTnKSjmdrue5ND8gFzlPbIyFpGCvfh9oMADydPgrFqVQS',
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


    const router = useRouter()
    const [instructionStep, setInstructionStep] = useState(1);
    const [instructionImg, setInstructionImg] = useState('/images/equipment-success1.png');
    const [instructionText, setInstructionText] = useState('ตำแหน่งการวาง sensor เป็นอีกขั้นตอนสำคัญ เพื่อให้ได้ข้อมูล EEG ที่แม่นยำ  อิเล็กโทรด1  ควรจะวางอยู่กลางหน้าผาก โดยอยู่เหนือกว่าจมูก 2 นิ้ว หรือ 5 เซนติเมตร    ตำแหน่งลูกศรที่อยู่บนอิเล็กโทรด 1 ต้องชี้ตรงกับจมูก');
    const handleClick = () => {
        console.log('click')
        setInstructionStep(instructionStep+1)
        if (instructionStep == 1) {
            setInstructionText('ตำแหน่งของอิเล็กโทรดที่ 2 และ 4 จะเรียงตัวเหนือคิ้วโดยหลีกเลี่ยงบนเส้นคิ้ว')
            setInstructionImg('/images/equipment-success2.png')
        }
        if (instructionStep == 2) {
          setInstructionText('ตำแหน่งของอิเล็กโทรดที่ 3 อยู่บริเวณขมับ และอยู่ในระดับเดียวกับหางตา')
          setInstructionImg('/images/equipment-success3.png')
      }
        if (instructionStep == 3) {
            router.push('/brain/sensor')
        }
    };
    return (
    <div className={styles.container}>
      <Head>
        <title>Trouble shooting </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='prev_page'>
          <Link href="/mainbrain"> 
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
          <div className='col-11'>
            <div className={styles.box_wrapper}>
              <h2>
                Equipment set up success
              </h2>
              <div className={styles.image}>
                <Image
                    src={instructionImg}
                    alt="Women"
                    // layout="fill"
                    // objectFit="cover"
                    width={1000}
                    height={1000}
                />
              </div>
              <div className={styles.text_wrap}>
                <p>
                  {instructionText}
                </p>
              </div>
            </div>
          </div>
          <div className='col-11 position-relative'>
            <div className={styles.btn_area}>
              <div className={styles.btn_container}>
                  <button className={styles.next_btn} onClick={handleClick}>
                  NEXT
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}