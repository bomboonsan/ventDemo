import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../../styles/casedetail.module.css'
import Link from "next/link";
// import { useRouter } from 'next/router'


export default function CaseDetail() {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Trouble shooting </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container'>
        <div className='row justify-content-center align-items-center min-h-screen'>
          <div className='col-11'>
            <div className={styles.case_wrapper}>
              <div className='prev_page_case'>
                <Link href="/menutroubleshooting"> 
                  <Image
                      src="/images/prev.png"
                      alt="Women"
                      // layout="fill"
                      // objectFit="cover"
                      width={196}
                      height={196}
                  />
                  </Link>
              </div>
              <div className={styles.case_row}>
                <div className={styles.case_colleft}>
                  <div className={styles.case_thumbnail}>
                    <Image
                        src="/images/card1-rounded.png"
                        alt="case1"
                        // layout="fill"
                        // objectFit="cover"
                        width={500}
                        height={500}
                    />
                  </div>
                  <div className={styles.case_simpledetail}>
                    <h2 className={styles.case_name}>Patient 1</h2>
                    <div className={styles.case_simpledetail_byline}>
                      <ul>
                        <li>
                          Age : <strong>49</strong>
                        </li>
                        <li>
                          Sex : <strong>Male</strong>
                        </li>
                        <li>
                          Weight : <strong>67 kg</strong>
                        </li>
                        <li>
                          Height : <strong>167 Cm</strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={styles.case_colright}>
                  <div className={styles.right_row}>
                    <div className={styles.right_colbox}>
                      <div className={styles.detail_row}>
                        <div className={styles.detail_colfull}>
                          <div className={styles.case_fulldetail}>
                            <h3>
                              Procedure : 
                            </h3>
                            <p>
                              Enteral Stent
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className={styles.detail_row}>
                        <div className={styles.detail_col_1}>
                          <div className={styles.case_fulldetail}>
                            <h3>
                              ASA Status : 
                            </h3>
                            <p>
                              |||
                            </p>
                          </div>
                          <div className={styles.case_fulldetail}>
                            <h3>
                              ASA Status : 
                            </h3>
                            <p>
                              |||
                            </p>
                          </div>
                        </div>
                        <div className={styles.detail_col_2}>
                          <div className={styles.case_fulldetail}>
                            <h3>
                              Sedative : 
                            </h3>
                            <p>
                              2 mg Midazolam & 50 mcg Fentanyl
                            </p>
                          </div>
                          <div className={styles.case_fulldetail}>
                            <h3>
                              Medication :  
                            </h3>
                            <p>
                              4 Lpm O2
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className={styles.detail_row}>
                        <div className={styles.detail_colfull}>
                          <div className={styles.case_fulldetail}>
                            <span className={styles.case_note}>
                            The patient is in the left lateral decubitus position with a bite block inserted
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.btn_monitor_thumbnail_area}>
                    <div className={styles.btn_monitor_thumbnail}>
                      <Image
                          src="/images/monitor.png"
                          alt="case1"
                          // layout="fill"
                          // objectFit="cover"
                          width={500}
                          height={500}
                      />
                    </div>
                  </div>
                  <div className={styles.btn_area}>
                    <button className={styles.next_btn}>
                      NEXT
                    </button>
                  </div>
                </div>
                {/* case_colright */}
              </div>
            </div> 
          </div>          
        </div>
      </div>
    </div>
  )
}