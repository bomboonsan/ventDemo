import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../../styles/vent/quiz0.module.scss'
import Link from "next/link";
import VentInto from '../../components/ventinto'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'

import Lottie from 'react-lottie';
import animationData from '../../lottiefiles/checkmark.json';

export default function Instruction() {
  const router = useRouter()
  
  const [urlVideo, setUrlVideo] = useState('https://wish-integrate.com/vent-video/howtoplay_final2.mp4');
  const [playing, setPlaying] = useState(true);
  const [gotit, setGotit] = useState(true);


  const [checkTidalVolume, setCheckTidalVolume] = useState(false);
  const [checkMinuteVentilation, setCheckMinuteVentilation] = useState(false);
  const [checkPIP, setCheckPIP] = useState(false);
  const [checkP_rise, setCheckP_rise] = useState(false);
  const [checkPEEP, setCheckPEEP] = useState(false);

  const [currentColor, setCurrentColor] = useState('');
  const [currentStep, setCurrentStep] = useState('');
  const [dataSelection, setDataSelection] = useState({
    TidalVolume: '',
    MinuteVentilation : '',
    PIP : '',
    P_rise : '',
    PEEP : ''
  });
  const [showLottie, setShowLottie] = useState(false);

  function reset() {        
    
  }
  function showBtnNextVideo() {
    // if(videoStep == 4) {
    //     setUrlVideo(video4);
    //     setIsShowBtn(false);
    //     setVideoStep(5)
    // } else {
    //     setShowNext(true)
    // }

  }

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


  const handleSettingbtn = (event) => {

      document.querySelector(`.${styles.btnOrangeOutline}`).classList.remove(styles['btnOutlineActive']);
      document.querySelector(`.${styles.btnRedOutline}`).classList.remove(styles['btnOutlineActive']);
      document.querySelector(`.${styles.btnBlueOutline}`).classList.remove(styles['btnOutlineActive']);
      document.querySelector(`.${styles.btnGreenOutline}`).classList.remove(styles['btnOutlineActive']);
      document.querySelector(`.${styles.btnPinkOutline}`).classList.remove(styles['btnOutlineActive']);


      event.currentTarget.classList.add(styles['btnOutlineActive']);

      const btnStep = event.currentTarget.getAttribute('data-step');
      const btnColor = event.currentTarget.getAttribute('data-color');
      setCurrentStep(btnStep)
      setCurrentColor(btnColor)

  }

  const handleSelectbtn = (event) => {
      if (currentStep == '') {
        alert('กรุณาเลือกคำถาม')
      } else {

        let btnName = event.currentTarget.getAttribute('data-btnName');

        event.currentTarget.classList.remove(styles['btnGray']);
        event.currentTarget.classList.remove(styles['btnOrange']);
        event.currentTarget.classList.remove(styles['btnRed']);
        event.currentTarget.classList.remove(styles['btnBlue']);
        event.currentTarget.classList.remove(styles['btnGreen']);
        event.currentTarget.classList.remove(styles['btnPink']);


        event.currentTarget.classList.add(styles['btn'+currentColor]);
        

        // Checking for duplicate value
        if (dataSelection[currentStep].includes(btnName)) {
          console.log("Duplicate data found!");

          event.currentTarget.classList.remove(styles['btn'+currentColor]);
          event.currentTarget.classList.add(styles['btnGray']);

          dataSelection.TidalVolume = dataSelection.TidalVolume.replace(btnName + ", ", "").replace(btnName, "");
          dataSelection.MinuteVentilation = dataSelection.MinuteVentilation.replace(btnName + ", ", "").replace(btnName, "");
          dataSelection.PIP = dataSelection.PIP.replace(btnName + ", ", "").replace(btnName, "");
          dataSelection.P_rise = dataSelection.P_rise.replace(btnName + ", ", "").replace(btnName, "");
          dataSelection.PEEP = dataSelection.PEEP.replace(btnName + ", ", "").replace(btnName, "");
          
        } else {

          dataSelection.TidalVolume = dataSelection.TidalVolume.replace(btnName + ", ", "").replace(btnName, "");
          dataSelection.MinuteVentilation = dataSelection.MinuteVentilation.replace(btnName + ", ", "").replace(btnName, "");
          dataSelection.PIP = dataSelection.PIP.replace(btnName + ", ", "").replace(btnName, "");
          dataSelection.P_rise = dataSelection.P_rise.replace(btnName + ", ", "").replace(btnName, "");
          dataSelection.PEEP = dataSelection.PEEP.replace(btnName + ", ", "").replace(btnName, "");

          dataSelection[currentStep] += btnName + ", ";
        }

        
        
        setDataSelection(dataSelection)

        console.log(dataSelection)

      }
      checkSelectbtn()
      
  }
  // const [checkTidalVolume, setCheckTidalVolume] = useState(false);
  // const [checkMinuteVentilation, setCheckMinuteVentilation] = useState(false);
  // const [checkPIP, setCheckPIP] = useState(false);
  // const [checkP_rise, setCheckP_rise] = useState(false);
  // const [checkPEEP, setCheckPEEP] = useState(false);
  const checkSelectbtn = () => {
    if ( dataSelection['TidalVolume'].includes('ปริมาตรอากาศที่ไหลเข้าถุงลมต่อหนึ่งครั้ง') &&
        dataSelection['TidalVolume'].length == '42'
      ) {
      setCheckTidalVolume(true)
    } else {
      setCheckTidalVolume(false)
    }
    if ( 
      dataSelection['MinuteVentilation'].length == '55' &&
      dataSelection['MinuteVentilation'].includes('VT x RR') &&
      dataSelection['MinuteVentilation'].includes('ปริมาตรอากาศที่เข้าสู่ปอดของผู้ป่วยใน 1 นาที'
      
      )
     ) {
      setCheckMinuteVentilation(true)
    } else {
      setCheckMinuteVentilation(false)
    }
    if ( 
      dataSelection['PIP'].length == '49' &&
      dataSelection['PIP'].includes('Peak Inspiration pressure') &&
      dataSelection['PIP'].includes('Peak airway pressure')
     ) {      
      setCheckPIP(true)
    } else {
      setCheckPIP(false)
    }
    if ( 
      dataSelection['P_rise'].length == '98' &&
      dataSelection['P_rise'].includes('Pressurization slope') &&
      dataSelection['P_rise'].includes('อัตราเร่งการไหลของลมขณะหายใจเข้า') &&
      dataSelection['P_rise'].includes('มีความสัมพันธ์กับการไหลของลมขณะหายใจเข้า')
     ) {
      setCheckP_rise(true)
    } else {
      setCheckP_rise(false)
    }
    if ( 
      dataSelection['PEEP'].length == '97' &&
      dataSelection['PEEP'].includes('Positive End Expiratory Pressure') &&
      dataSelection['PEEP'].includes('แรงดันบวกของอากาศหายใจที่ค้างอยู่ในปอดเมื่อสิ้นสุดการหายใจออก')
     ) {
      setCheckPEEP(true)
    } else {
      setCheckPEEP(false)
    }
  }
  const handleGotit = () => {
    document.querySelector('#main').classList.remove(styles['backdrop']);
    setGotit(false);
  }
  const handleSubmit = () => {
    if(
      
      dataSelection['TidalVolume'].includes('ปริมาตรอากาศที่ไหลเข้าถุงลมต่อหนึ่งครั้ง') &&
      dataSelection['MinuteVentilation'].includes('VT x RR') &&
      dataSelection['MinuteVentilation'].includes('ปริมาตรอากาศที่เข้าสู่ปอดของผู้ป่วยใน 1 นาที') &&
      dataSelection['PIP'].includes('Peak Inspiration pressure') &&
      dataSelection['PIP'].includes('Peak airway pressure') &&
      dataSelection['P_rise'].includes('Pressurization slope') &&
      dataSelection['P_rise'].includes('อัตราเร่งการไหลของลมขณะหายใจเข้า') &&
      dataSelection['P_rise'].includes('มีความสัมพันธ์กับการไหลของลมขณะหายใจเข้า') &&
      dataSelection['PEEP'].includes('Positive End Expiratory Pressure') &&
      dataSelection['PEEP'].includes('แรงดันบวกของอากาศหายใจที่ค้างอยู่ในปอดเมื่อสิ้นสุดการหายใจออก')
    
      ) {
        
        console.log('ถูก')

        setShowLottie(true)

        const mainWrap = document.querySelector('#main')
        mainWrap.classList.add(styles['hidden']);
        mainWrap.classList.remove(styles['flade']);
        setTimeout(() => { 
          // mainWrap.classList.remove(styles['hidden']);
          // mainWrap.classList.add(styles['flade']);

          setShowLottie(false)

          router.push('/vent/quiz')
        }, 2000)


    } else {
      // alert('ผิด')
      router.push('/hint/brain-false')
    }
  }
  
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Instruction </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='prev_page'>
          <Link href="/menulearningmode"> 
            <Image
                src="/images/prev.png"
                alt="Women"
                width={196}
                height={196}
            />
            </Link>
      </div>{/* prev_page */}
      <div className='container'>
          {showLottie &&
          <div className={styles.lottieCheck}>
            <Lottie options={lottieOptions} />
          </div>
          }
          {gotit &&
          <aside className={styles.howtoplay}>
            <h2>วิธีการเล่น</h2>
            <p>
            เลือก Terminology จับคู่กับคำอธิบายด้านล่างให้ถูกต้อง โดยคำอธิบายอาจจะมีมากกว่า 1 ข้อ
            </p>
            <ReactPlayer 
              className={styles.video_item} 
              url={urlVideo}  
              playing={playing}
              loop={true}
              onEnded={showBtnNextVideo}
              width='100%'
              height='100%'
              muted={true}
              controls
              // muted={false}
            />
            <div className='text-center'>
              <button className={styles.btnSubmitGotit} onClick={handleGotit}>
                    GOT IT
              </button>
            </div>
          </aside>
          }
          <main id='main' className={styles.backdrop} >
            <section className='pt-5'>
              <div className={styles.quiz_title}>
                {/* จับคู่ กด ชื่อ กดคำอธิบาย เปลี่ยนสีตามคำที่เลือก */}

                เลือกจับคู่ tem และคำอธิบายให้ถูกต้อง
              </div>
            </section>

            <section className='pt-4'>
              <div className={styles.boxGrid}>         
                <button className={styles.btnOrangeOutline} data-step='TidalVolume' data-color='Orange' onClick={handleSettingbtn}>
                  Tidal Volume
                  {checkTidalVolume &&
                  <i className={styles.iconChecked}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#7EAA26" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                  </i>
                  }
                  
                </button>
                <button className={styles.btnRedOutline} data-step='MinuteVentilation' data-color='Red' onClick={handleSettingbtn}>
                Minute <br/>
                Ventilation
                  {checkMinuteVentilation && 
                  <i className={styles.iconChecked}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#7EAA26" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                  </i>
                  }                  
                </button>
                <button className={styles.btnBlueOutline} data-step='PIP' data-color='Blue' onClick={handleSettingbtn}>
                  PIP
                  {checkPIP &&
                  <i className={styles.iconChecked}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#7EAA26" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                  </i>
                  }                  
                </button>
                <button className={styles.btnGreenOutline} data-step='P_rise' data-color='Green' onClick={handleSettingbtn}>
                  P rise
                  {checkP_rise &&
                  <i className={styles.iconChecked}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#7EAA26" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                  </i>
                  }                  
                </button>
                <button className={styles.btnPinkOutline} data-step='PEEP' data-color='Pink' onClick={handleSettingbtn}>
                  PEEP
                  {checkPEEP &&
                  <i className={styles.iconChecked}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#7EAA26" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                  </i>
                  }                  
                </button>
              </div>
            </section>

            <section>
              <hr></hr>
            </section>

            <section className='pt-4'>
              <div className={styles.boxGrid}>         
                <button className={styles.btnGray} data-btnName='VT x RR' onClick={handleSelectbtn}>
                  VT x RR
                </button>
                <button className={styles.btnGray} data-btnName='Pressurization slope' onClick={handleSelectbtn}>
                Pressurization slope
                </button>
                <button className={styles.btnGray} data-btnName='ปริมาตรอากาศที่เข้าสู่ปอดของผู้ป่วยใน 1 นาที' onClick={handleSelectbtn}>
                ปริมาตรอากาศที่เข้าสู่ปอดของผู้ป่วยใน 1 นาที
                </button>
                <button className={styles.btnGray} data-btnName='Peak Inspiration pressure' onClick={handleSelectbtn}>
                Peak Inspiration pressure
                </button>
                <button className={styles.btnGray} data-btnName='Positive End Expiratory Pressure' onClick={handleSelectbtn}>
                Positive End Expiratory Pressure
                </button>

                <button className={styles.btnGray} data-btnName='อัตราเร่งการไหลของลมขณะหายใจเข้า' onClick={handleSelectbtn}>
                อัตราเร่งการไหลของลมขณะหายใจเข้า
                </button>
                <button className={styles.btnGray} data-btnName='Peak airway pressure' onClick={handleSelectbtn}>
                Peak airway pressure
                </button>
                <button className={styles.btnGraySm} data-btnName='แรงดันบวกของอากาศหายใจที่ค้างอยู่ในปอดเมื่อสิ้นสุดการหายใจออก' onClick={handleSelectbtn}>
                แรงดันบวกของอากาศหายใจที่ค้างอยู่ในปอดเมื่อสิ้นสุดการหายใจออก
                </button>
                <button className={styles.btnGray} data-btnName='ปริมาตรอากาศที่ไหลเข้าถุงลมต่อหนึ่งครั้ง' onClick={handleSelectbtn}>
                ปริมาตรอากาศที่ไหลเข้าถุงลมต่อหนึ่งครั้ง
                </button>
                <button className={styles.btnGray} data-btnName='มีความสัมพันธ์กับการไหลของลมขณะหายใจเข้า' onClick={handleSelectbtn}>
                มีความสัมพันธ์กับการไหลของลมขณะหายใจเข้า
                </button>
              </div>
            </section>
            <section className='text-end w-100 mt-5'>
              <button className={styles.btnSubmit} onClick={handleSubmit}>
                  SUBMIT
              </button>
            </section>
          </main>
          
      </div>
    </div>
  )
}