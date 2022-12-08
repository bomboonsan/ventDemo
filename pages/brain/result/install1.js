import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../../../styles/result/main.module.scss'
import Link from "next/link";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';

export default function CaseDetail() {
    const router = useRouter()
    const [instructionStep, setInstructionStep] = useState(1);
    const [instructionImg, setInstructionImg] = useState('/images/imageBrain1.png');
    const [instructionText, setInstructionText] = useState('ตำแหน่งการวาง sensor เป็นอีกขั้นตอนสำคัญ เพื่อให้ได้ข้อมูล EEG ที่แม่นยำ  อิเล็กโทรด1  ควรจะวางอยู่กลางหน้าผาก โดยอยู่เหนือกว่าจมูก 2 นิ้ว หรือ 5 เซนติเมตร    ตำแหน่งลูกศรที่อยู่บนอิเล็กโทรด 1 ต้องชี้ตรงกับจมูก');
    const handleClick = () => {
        console.log('click')
        setInstructionStep(instructionStep+1)
        if (instructionStep == 1) {
            setInstructionText('ตำแหน่งของอิเล็กโทรดที่ 4 ควรอยู่เหนือคิ้ว และ ตำแหน่งของอิเล็กโทรดที่ 3 จะอยู่ระหว่างหางตากับ ไรผม')
            setInstructionImg('/images/imageBrain2.png')
        }
        if (instructionStep == 2) {
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