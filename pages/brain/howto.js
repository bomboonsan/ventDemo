import Head from 'next/head'
import { useState , useEffect } from 'react';
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../../styles/brain/howto.module.scss'
import Link from "next/link";
// import { useRouter } from 'next/router'
import BrainVideo from '../../components/brainvideo';
import dynamic from 'next/dynamic'

const TestimonialCard = dynamic(() => import('../../components/brainvideo'), { ssr: false })

export default function Howto() {
  const [message, setMessage] = useState(null);
  useEffect(() => setMessage('1'), [])
  let brainElement = null
  if (!!message) {
    brainElement = <BrainVideo />
  }
  return (
    <div className={styles.container}>
      <Head>
        
        <title>How To</title>
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
      <div className={styles.video_wrapper}>
        {/* <BrainVideo /> */}
        {brainElement}
      </div>
    </div>
  )
}