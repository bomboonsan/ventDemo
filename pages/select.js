import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/select.module.css'
import Link from "next/link";

export default function Select() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Select Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.headerbar1}>
        <p className='headerbar_text'>
          Which of  these best describes you?
        </p>
      </header>
      <div className={styles.row}>
        <div className={styles.col_item}>
          <Link href="/registordoctor"> 
          <div className={styles.card}>
            <div className={styles.card_thumbnail}>
              <Image
                    className={styles.bisitem}
                    src="/images/doctor.png"
                    alt="Women"
                    // layout="fill"
                    // objectFit="cover"
                    width={460}
                    height={810}
                />
            </div>
            <div className={styles.card_title}>
              <p>
                Doctor
              </p>
            </div>            
          </div>
          </Link>
        </div>
        <div className={styles.col_item}>
          <Link href="/registornurse"> 
          <div className={styles.card}>
            <div className={styles.card_thumbnail}>
              <Image
                    className={styles.bisitem}
                    src="/images/nurse.png"
                    alt="Women"
                    // layout="fill"
                    // objectFit="cover"
                    width={460}
                    height={810}
                />
            </div>
            <div className={styles.card_title}>
              <p>
                Nurse
              </p>
            </div>            
          </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
