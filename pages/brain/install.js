import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../../styles/brain/install.module.scss'
import Link from "next/link";
// import { useRouter } from 'next/router'
import BrainInstall from '../../components/brainInstall';

export default function Braininstall() {
  return (
    <div className={styles.container}>
      <Head>        
        <title>Install</title>
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
      <div>
        <BrainInstall />
      </div>
    </div>
  )
}