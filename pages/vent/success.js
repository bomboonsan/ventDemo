import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../../styles/hint/vent.module.scss'
import Link from "next/link";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../lottiefiles/checkmark.json';

export default function Intruction_1() {
    const router = useRouter()
    const [textHint, setTextHint] = useState('เก่งมากค่ะ!');
    const [showLottie, setShowLottie] = useState(false);
    function nextStep() {
        router.push('/menulearningmode')
    }

    useEffect(() => {
        setShowLottie(true)
        setTimeout(() => { 
            setShowLottie(false)
         }, 2000)

    }, []);

    // lottie
    const lottieOptions = {
        animationData: animationData,
        // loop: true,
        loop: false,
        autoplay: true,
        rendererSettings: {
        // preserveAspectRatio: 'xMidYMid slice'
        preserveAspectRatio: 'none'
        }
    };


    return (
        <div className={styles.container}>
            <Head>
                <title>SUCCESS</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='prev_page'>
                <Link href="/quiz/brain"> 
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

            <div className={styles.container_hint}>

            {showLottie &&
            <div className={styles.lottieCheck}>
                <Lottie options={lottieOptions} />
            </div>
            }    
                <div className={styles.row_hint}>                    

                    <div className={styles.col_text_box_brain_short}>
                        <div className={styles.text_box_wrap}>
                            <p>
                                {textHint}
                            </p>
                        </div>

                        <div className={styles.btn_group}>
                            <button onClick={nextStep}>
                                FINISH
                            </button>
                        </div>                        
                    </div>                
                    
                    <div className={styles.col_image}>
                        <Image
                            src="/images/hin-ture.png"
                            alt="Women"
                            // layout="fill"
                            // objectFit="cover"
                            width={1279}
                            height={1739}
                        />
                    </div>
                </div>
            </div>            
        
        </div>
    )
}
