import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../styles/welcome.module.css'
import Link from "next/link";
import { useRouter } from 'next/router'


export default function Welcomepage() {
    const router = useRouter()
    function nextPage() {
        router.push('/mainmenu')
    }
  return (
      <div className={styles.container}>
      <Head>
          <title>Welcome</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className='prev_page'>
          <Link href="/consent"> 
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
        <div className={styles.mid_screen}>
          <div className='container'>
            <div className='row justify-content-center padding-top'>
              <div className='col-12 col-lg-7'>
                <div className={styles.card}>
                  <h1 className={styles.card_title}>
                    ยินดีต้อนรับทุกท่าน!
                  </h1>
                  <p className={styles.card_text}>
                    เข้าสู่โปรแกรมจำลองการจัดการอุปกรณ์เพื่อดูแลผู้ป่วยหน่วยเวชบำบัดวิกฤต ในสถานการณ์ต่างๆโดยโปรแกรมจำลองนี้ออกแบบมาเพื่อให้ท่านได้ฝึกฝนทักษะ
                    ในภาคปฎิบัติ ผ่านโปรแกรมจำลองจากสถานการณ์จริงที่เกิดขึ้น
                  </p>
                  <div className={styles.btn_area}>
                    <button
                    onClick={nextPage}
                    className={styles.submit_btn} >
                      NEXT
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='row justify-content-center padding-top'>
              <div className='col-9'>
                <Image
                    src="/images/group2.png"
                    alt="group2"
                    // layout="fill"
                    // objectFit="cover"
                    width={3026}
                    height={1179}
                />
              </div>
            </div>
          </div>   
        </div>             
      </div>
  )
}