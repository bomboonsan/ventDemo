import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../../../styles/result/main.module.scss'
import Link from "next/link";
import { useRouter } from 'next/router'


export default function CaseDetail() {
  
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
                    src="/images/video-main-menu-thumbnail.png"
                    alt="Women"
                    // layout="fill"
                    // objectFit="cover"
                    width={1000}
                    height={1000}
                />
              </div>
              <div className={styles.text_wrap}>
                <p>
                Brain Monitoring คือ อุปกรณ์ที่จะแสดงค่าตัวเลข (Index) บนจอ ซึ่งเป็นค่าชุดตัวเลขอย่างง่าย 0 – 100 ที่ได้จากการดึงเอาสัญญาณคลิ่นไฟฟ้าสมอง (EEG: Electroencephalogram) ผ่านตัวรับ 4 ตัว (electrodes) วางเรียงอยู่บนเซ็นเซอร์ที่ติดบนหน้าผากคนไข้ ผ่านเข้ากับชุดคำสั่งที่สร้างไว้ตามขั้นตอนประมวลผล (Algorithm) ตัวเลขที่ได้จะแสดงผลตั้งแต่ 0 หมายถึง ไม่มีสัญญาณสมอง ไปจนถึง 100 หมายถึง ตื่นตัวเต็มที่ ค่าตัวเลขที่เหมาะสมของการระงับความรูสึกของคนไข้ให้อยู่ในระดับ “General Anesthesia” คือ ช่วงตัวเลข – 40 - 60
                </p>
              </div>
            </div>
          </div>
          <div className='col-11 position-relative'>
            <div className={styles.btn_area}>
              <div className={styles.btn_container}>
                  <Link href="/mainbrain"> 
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