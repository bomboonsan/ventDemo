import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../styles/registor.module.css'
import Link from "next/link";
import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()
    function toConsentPage() {
        router.push('/consent')
    }
  return (
    <div className={styles.container}>
      <Head>
        <title>Registor</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='prev_page'>
        <Link href="/select"> 
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
      <div className={styles.row}>
        <div className={styles.col}>
            <div className={styles.registor_wrap}>

                <div className={styles.registor_block}>
                    <div className={styles.registor_thumbnail}>
                        <Image
                            src="/images/registor-doctor.png"
                            alt="Women"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                    <h2 className={styles.registor_title}>
                        Doctor
                    </h2>
                    <div className='row mb-3'>
                        <div className='col-6'>
                            <input type="text" className="form-control border-primary" placeholder="First Name*" />
                        </div>
                        <div className='col-6'>
                            <input type="text" className="form-control border-primary" placeholder="Last Name*" />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-12'>
                            <input type="text" className="form-control border-primary" placeholder="Phone number" />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-12'>
                            <input type="text" className="form-control border-primary" placeholder="E-Mail" />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-12'>
                            <select className="form-select border-primary" aria-label="Default select example">
                                <option selected>Please Select your speciality*</option>
                                <option value="CriticalCare">Critical care</option>
                                <option value="Anesthesiology">Anesthesiology</option>
                                <option value="InternistGP">Internist/GP</option>
                                <option value="Neonatologist">Neonatologist</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className='row mb-5'>
                        <div className='col-12'>
                            <input type="text" className="form-control border-primary" placeholder="Hospital*" />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-12'>
                        <button
                        onClick={toConsentPage} 
                        type="button" 
                        className={styles.submit_btn}>Register Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
