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
          <Link href="/brain/howto"> 
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
                    src="/video/video-main-menu.png"
                    alt="Women"
                    // layout="fill"
                    // objectFit="cover"
                    width={1000}
                    height={1000}
                />
              </div>
              <div className={styles.text_wrap}>
                <p>
                Bispectral Index คือการรับสัญญาณที่ซับซ้อน (EEG) วิเคราะห์ และประมวลผลผลลัพธ์ เป็นหนึ่งในหลายเทคโนโลยีที่ใช้ในการตรวจสอบความลึกของการระงับความรู้สึก ซึ่งแสดงผลเป็นตัวเลข Bispectral Index Range โดยมีค่าตั้งแต่ 0 (เทียบเท่ากับความเงียบของ EEG) ถึง 100 ค่า BIS ระหว่าง 40 ถึง 60 บ่งชี้ระดับที่เหมาะสมสำหรับการดมยาสลบ 
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