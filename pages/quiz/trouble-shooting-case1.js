import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../../styles/quiz/main.module.scss'
import Link from "next/link";
import { useRouter } from 'next/router'
import { useState, useEffect,useRef } from 'react';

import ReactPlayer from 'react-player'
import { findDOMNode } from 'react-dom'
// import { useRouter } from 'next/router'
import screenfull from 'screenfull'

import Lottie from 'react-lottie';
import animationData from '../../lottiefiles/checkmark.json';

export default function Main_menu() {
  const router = useRouter()
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [stepQuiz, setStepQuiz] = useState('1');
  const [ansArr, setAnsArr] = useState([]);  
  const [showLottie, setShowLottie] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const [playing, setPlaying] = useState(true);
  // const troubleShootingVideo = 'https://wish-integrate.com/vent-video/trouble-shooting-edit.mp4'
  const troubleShootingVideo = 'https://wish-integrate.com/vent-video/trouble/Patient1Pre.mp4'

  const playerRef = useRef(null);
  const onClickFullscreen = () => {
    if (screenfull.isEnabled && playerRef.current) {
      screenfull.toggle(playerRef.current.wrapper);
    }
  };
  function reset() {
    
  }
  const videoStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  useEffect(() => {
    const { step } = router.query;
    // console.log(step)
    if (step === null || step === undefined) {
      // Handle when 'step' is null or undefined
      console.log('Step is null or undefined');
    } else {
      // Handle when 'step' has a value
      console.log('Step:', step);
      setStepQuiz(step)
    }
    // setStepQuiz(step)
  }, []);


  const handleAnsClick = (event) => {

    const btnID = event.currentTarget.id;    
    const btnAns = document.querySelector("#"+btnID)    

    // ตรวจว่ามี class หรือยัง
    if(btnAns.classList.contains(styles['quiz_active'])) {
      btnAns.classList.remove(styles['quiz_active']);
    } else {
      btnAns.classList.add(styles['quiz_active']);
    }

    // 
    let newAnsArr = ansArr
     
    // newAnsArr.push(btnID)
    // ตรวจว่ามีคำตอบอยู่ใน Arr?
    if (newAnsArr.includes(btnID)) {
      // ถ้ามี string ให้ลบออก
      newAnsArr = newAnsArr.filter(e => e !== btnID); // https://stackoverflow.com/questions/9792927/javascript-array-search-and-remove-string
    } else {
      // ถ้าไม่มีให้เพิ่ม
      newAnsArr.push(btnID)
    }

    setAnsArr(newAnsArr)

  }

  const handleInputChange1 = (event) => {
    setInputValue1(event.target.value);
  }
  const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
  }

  const checkAns2 = () => {
    
    
    if (inputValue1 == '400' && inputValue2 == '255') {
      setQueryParam('step', 3);
      setStepQuiz("3")
      const mainWrap = document.querySelector('#main')
      mainWrap.classList.remove(styles['flade']);
      mainWrap.classList.add(styles['hidden']);
      
      setTimeout(() => { 
        mainWrap.classList.remove(styles['hidden']);
        mainWrap.classList.add(styles['flade']);
      }, 200)

    } else {
      router.push('/hint/trouble-shooting-false')
    }
    
  }

  const checkAns = () => {
    
    // เรียงลำดับ Array
    const ansArrSort = ansArr.sort();
    
    if (ansArrSort.toString() == 'ans1,ans4' || ansArrSort.toString() == 'ans4,ans1') {
      

      setShowLottie(true)
      const mainWrap = document.querySelector('#main')
      mainWrap.classList.add(styles['hidden']);

      setTimeout(() => { 
        router.push('/trouble-shooting/case1-step1')
       }, 2000)


    } else {
      router.push('/hint/trouble-shooting-false')
    }
    
  }

  const handleTrue_1 = () => {
    setStepQuiz("2")
    setQueryParam('step', 2);
    const mainWrap = document.querySelector('#main')
    mainWrap.classList.remove(styles['flade']);
    mainWrap.classList.add(styles['hidden']);
    
    setTimeout(() => { 
      mainWrap.classList.remove(styles['hidden']);
      mainWrap.classList.add(styles['flade']);
    }, 200)
  }
  const handleFalse = () => {
    router.push('/hint/trouble-shooting-false')
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

  // Function to handle setting query parameters
  const setQueryParam = (name, value) => {
    const queryParams = { ...router.query, [name]: value };
    router.push({ pathname: router.pathname, query: queryParams });
  };

  // const { step } = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>Quiz</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='prev_page'>
          <Link href="/case/brain/1"> 
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
      <div className={styles.quiz_container}>
        <div className='container'>
          {showLottie &&
            <div className={styles.lottieCheck}>
              <Lottie options={lottieOptions} />
            </div>
          } 
          <div id='main' className='row justify-content-center align-items-center min-h-screen'>

            {stepQuiz.includes("1") &&   
            <div className='col-11 col-lg-8'>
              <div className={styles.quiz_image}>
              {/* <Image                
                  src="/images/quiz-trouble1.png"
                  alt="Women"
                  // layout="fill"
                  // objectFit="cover"
                  width={800}
                  height={800}
              /> */}
                <div>
                  {isFullScreen ? (
                    <div
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 9999,
                        background: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onClick={toggleFullScreen}
                    >
                      <img
                        src="/images/quiz-trouble1.png"
                        alt="Full-Screen Image"
                        style={{ maxHeight: '100%', maxWidth: '100%' , width: '100%' }}
                      />
                    </div>
                  ) : (
                    <img
                      src="/images/quiz-trouble1.png"
                      alt="Normal Image"
                      style={{ cursor: 'pointer' }}
                      onClick={toggleFullScreen}
                    />
                  )}
                </div>
              </div>
              <h1 className={styles.quiz_title}>
                โหมดของเครื่องช่วยหายใจที่มีการตั้งให้กับคนไข้คนนี้คือโหมดใด
              </h1>

              <div className={styles.quiz_row}>        
                <div id='ans1' className={styles.quiz_col} onClick={handleTrue_1}>
                  <p>Volume Control</p> 
                  {/*  */}
                </div>
                <div id='ans2' className={styles.quiz_col} onClick={handleFalse}>
                  <p>Volume Assist</p>
                </div>
                <div id='ans3' className={styles.quiz_col} onClick={handleFalse}>
                  <p>Pressure Control</p>
                </div>
                <div id='ans4' className={styles.quiz_col} onClick={handleFalse}>
                  <p>Pressure Assist</p>
                  {/*  */}
                </div>
                <div id='ans5' className={styles.quiz_col} onClick={handleFalse}>
                  <p>Pressure Support</p>
                </div>
                {/* <div id='ans6' className={styles.quiz_col} onClick={handleFalse}>
                  <p>Pressure Support</p>
                </div> */}
              </div>

            </div>
            }

            {stepQuiz.includes("2") &&   
            <div className='col-11 col-lg-8'>
              {/* <h1 className={styles.quiz_title}>
              Tidal Volume มีค่าเท่ากับเท่าไหร่ <br/>และ Exhale tidal volume มีค่าเท่าไหร่
              </h1> */}
              <div className={styles.quiz_image}>
              {/* <Image                  
                  src="/images/quiz-trouble1.png"
                  alt="Women"
                  // layout="fill"
                  // objectFit="cover"
                  width={800}
                  height={800}
              /> */}
                <div>
                  {isFullScreen ? (
                    <div
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 9999,
                        background: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onClick={toggleFullScreen}
                    >
                      <img
                        src="/images/quiz-trouble1.png"
                        alt="Full-Screen Image"
                        style={{ maxHeight: '100%', maxWidth: '100%' , width: '100%' }}
                      />
                    </div>
                  ) : (
                    <img
                      src="/images/quiz-trouble1.png"
                      alt="Normal Image"
                      style={{ cursor: 'pointer' }}
                      onClick={toggleFullScreen}
                    />
                  )}
                </div>
              </div>
              <div className='mt-5'></div>
              <p className={styles.quiz_title3}>
                Inhale Tidal Volume มีค่าเท่ากับ <input type="number" className={styles.inline_input} placeholder='ระบุค่าเป็นตัวเลข' onChange={handleInputChange1} />
              </p>
              <p className={styles.quiz_title3}>
                และ Exhale tidal volume มีค่าเท่ากับ <input type="number" className={styles.inline_input} placeholder='ระบุค่าเป็นตัวเลข' onChange={handleInputChange2} />
              </p>

              {/* <div className={styles.quiz_row}>        
                <div className={styles.quiz_input} >
                  <div className="input-group">
                    <span className={styles.input_text} >Tidal Volume </span>
                    <input type="number" className="form-control" placeholder='ระบุค่าเป็นตัวเลข' onChange={handleInputChange1} />
                  </div>
                </div>
                <div className={styles.quiz_input} >
                  <div className="input-group">
                    <span className={styles.input_text}>Exhale tidal volume  </span>
                    <input type="number" className="form-control" placeholder='ระบุค่าเป็นตัวเลข' onChange={handleInputChange2} />
                  </div>
                </div>
              </div> */}
              <div className={styles.btn_area}>
                  <div className={styles.btn_container}>
                      <button className={styles.next_btn} onClick={checkAns2}>
                      NEXT
                      </button>
                  </div>
              </div>
            </div>
            }

            {stepQuiz.includes("3") &&   
            <div className='col-11 col-lg-8'>
              <div className={styles.quiz_image_2}>
              {/* <Image                  
                  src="/images/quiz-trouble1.png"
                  alt="Women"
                  // layout="fill"
                  // objectFit="cover"
                  width={600}
                  height={600}
              /> */}
                <div>
                  {isFullScreen ? (
                    <div
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 9999,
                        background: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onClick={toggleFullScreen}
                    >
                      <img
                        src="/images/quiz-trouble1.png"
                        alt="Full-Screen Image"
                        style={{ maxHeight: '100%', maxWidth: '100%' , width: '100%' }}
                      />
                    </div>
                  ) : (
                    <img
                      src="/images/quiz-trouble1.png"
                      alt="Normal Image"
                      style={{ cursor: 'pointer' }}
                      onClick={toggleFullScreen}
                    />
                  )}
                </div>
              </div>
              <div className='mt-xl-5'></div>
              <h1 className={styles.quiz_title}>
              ลักษณะใดของกราฟที่บ่งชี้ว่าคนไข้มีโอกาสเกิด air trapping บ้าง
              </h1>

              <div className={styles.quiz_row_2}>        
                <div id='ans1' className={styles.quiz_col} onClick={handleAnsClick}>
                  <p>Peak airway pressure สูงขึ้น Control</p> 
                  {/*  */}
                </div>
                <div id='ans2' className={styles.quiz_col} onClick={handleAnsClick}>
                  <p>Peak airway pressure ลดลงขึ้น</p>
                </div>
                <div id='ans3' className={styles.quiz_col} onClick={handleAnsClick}>
                  <p>Exhale tidal volume สูงกว่า Inhale tidal volume</p>
                </div>
                <div id='ans4' className={styles.quiz_col} onClick={handleAnsClick}>
                  <p>Exhale tidal volume ต่ำกว่า Inhale tidal volume</p>
                  {/*  */}
                </div>
              </div>
              <div className={styles.btn_area}>
                  <div className={styles.btn_container_2}>
                      <button className={styles.next_btn} onClick={checkAns}>
                      NEXT
                      </button>
                  </div>
              </div>
            </div>
            }


          </div>
        </div>
      </div>
    </div>
  )
}