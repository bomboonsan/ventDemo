import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../styles/registor.module.css'
import Link from "next/link";
import { useRouter } from 'next/router'
import { useState , useEffect } from 'react';

export default function Home() {
    const router = useRouter()
    let [ firstName , setFirstName ] = useState('');
    let [ lastName , setLastName ] = useState('');
    let [ phoneNumber , setPhoneNumber ] = useState('');
    let [ email , setEmail ] = useState('');
    let [ speciality , setSpeciality ] = useState('');
    let [ hostpital , setHostpital ] = useState('');
    let [ event , setEvent ] = useState('');


    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSpeciality(selectedValue);
    };


    // FN
    async  function toConsentPage() {
        // // console.log('hello');
        const response = await fetch("https://ventbackend.wish-integrate.com/register", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: `
                {
                    "first_name": "${firstName}",
                    "last_name": "${lastName}",
                    "phone_number": "${phoneNumber}",
                    "email": "${email}",
                    "speciality": "${speciality}",
                    "type": "Nurse",
                    "hostpital": "${hostpital}",
                    "event": "${event}"
                }
            `,
        });

        // // console.log(body);

        response.json().then(data => {
            // console.log(data[0]);
            if (data[0] == 'success' ) {
                router.push('/consent')
            }
        });

        if (firstName != '') {
            document.querySelector('#firstName').classList.remove(styles['border_red']);
        } else {
            document.querySelector('#firstName').classList.add(styles['border_red']);
        }
        if (lastName != '') {
            document.querySelector('#lastName').classList.remove(styles['border_red']);
        } else {
            document.querySelector('#lastName').classList.add(styles['border_red']);
        }
        if (phoneNumber != '') {
            document.querySelector('#phoneNumber').classList.remove(styles['border_red']);
        } else {
            document.querySelector('#phoneNumber').classList.add(styles['border_red']);
        }
        if (email != '') {
            document.querySelector('#email').classList.remove(styles['border_red']);
        } else {
            document.querySelector('#email').classList.add(styles['border_red']);
        }
        if (hospital != '') {
            document.querySelector('#hospital').classList.remove(styles['border_red']);
        } else {
            document.querySelector('#hospital').classList.add(styles['border_red']);
        }

        if ( firstName != '' && lastName != '' && phoneNumber != '' && email != '' && hospital != '' ) {
            router.push('/consent')
        }
    }

    useEffect(() => {
        // 
        if (firstName != '') {
            document.querySelector('#firstName').classList.remove(styles['border_red']);
        } else {
            document.querySelector('#firstName').classList.add(styles['border_red']);
        }
        if (lastName != '') {
            document.querySelector('#lastName').classList.remove(styles['border_red']);
        } else {
            document.querySelector('#lastName').classList.add(styles['border_red']);
        }
        if (phoneNumber != '') {
            document.querySelector('#phoneNumber').classList.remove(styles['border_red']);
        } else {
            document.querySelector('#phoneNumber').classList.add(styles['border_red']);
        }
        if (email != '') {
            document.querySelector('#email').classList.remove(styles['border_red']);
        } else {
            document.querySelector('#email').classList.add(styles['border_red']);
        }
        if (hostpital != '') {
            document.querySelector('#hospital').classList.remove(styles['border_red']);
        } else {
            document.querySelector('#hospital').classList.add(styles['border_red']);
        }
    }, [firstName , lastName , phoneNumber , email , hostpital]);

    
    useEffect(() => {
        // 
        document.querySelector('#firstName').classList.remove(styles['border_red']);
        document.querySelector('#lastName').classList.remove(styles['border_red']);
        document.querySelector('#phoneNumber').classList.remove(styles['border_red']);
        document.querySelector('#email').classList.remove(styles['border_red']);
        document.querySelector('#hospital').classList.remove(styles['border_red']);
    }, []);

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
            alt="doctor"
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
                    {/* <div className={styles.registor_thumbnail}>
                        <Image
                            src="/images/registor-doctor.png"
                            alt="Women"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div> */}
                    <div className={styles.registor_thumbnail2}>
                        <Image
                            src="/images/nurse-4.png"
                            alt="Nurse"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                    <h2 className={styles.registor_title}>
                    Nurse
                    </h2>
                    <div className='row mb-3'>
                        <div className='col-6'>
                            <input 
                            id='firstName'
                            type="text" 
                            value={firstName}
                            name="firstName"
                            onChange={e => setFirstName(e.target.value)}
                            className="form-control border-primary" 
                            placeholder="First Name*" />
                        </div>
                        <div className='col-6'>
                            <input 
                            id='lastName'
                            type="text" 
                            value={lastName}
                            name="lastName"
                            onChange={e => setLastName(e.target.value)}
                            className="form-control border-primary" 
                            placeholder="Last Name*" />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-12'>
                            <input 
                            id='phoneNumber'
                            type="text" 
                            value={phoneNumber}
                            name="phoneNumber"
                            onChange={e => setPhoneNumber(e.target.value)}
                            className="form-control border-primary" 
                            placeholder="Phone number" />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-12'>
                            <input 
                            id='email'
                            type="text" 
                            value={email}
                            name="email"
                            onChange={e => setEmail(e.target.value)}
                            className="form-control border-primary" 
                            placeholder="E-Mail" />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-12'>
                            <select className="form-select border-primary" value={speciality} onChange={handleSelectChange}>
                                <option selected>Please select your speciality*</option>
                                <option value="CriticalCare">Critical care</option>
                                <option value="Anesthesiology">Anesthesiology</option>
                                <option value="InternistGP">Internist/GP</option>
                                <option value="Neonatologist">Neonatologist</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-12'>
                            <input 
                            id='hospital'
                            type="text" 
                            value={hostpital}
                            name="hospital"
                            onChange={e => setHostpital(e.target.value)}
                            className="form-control border-primary" 
                            placeholder="Hospital*" />
                        </div>
                    </div>
                    <div className='row mb-5'>
                        <div className='col-12'>
                            <input 
                            id='event'
                            type="text" 
                            value={event}
                            name="event"
                            onChange={e => setEvent(e.target.value)}
                            className="form-control border-primary" 
                            placeholder="event*" />
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
