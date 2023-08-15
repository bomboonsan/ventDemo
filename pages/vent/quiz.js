import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../../styles/vent/quiz.module.scss'
import Link from "next/link";
import VentInto from '../../components/ventinto'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import Lottie from 'react-lottie';
import animationData from '../../lottiefiles/checkmark.json';

export default function Instruction() {
  const router = useRouter()
  const [dataSelector, setDataSelector] = useState({
    mode : '',
    triggering_variable : '',
    control_pressure_variable : '',
    cycling_variable : '',
  });
  const [modeCurrent, setModeCurrent] = useState('Pressure Control');
  const [showLottie, setShowLottie] = useState(false);


  useEffect(()=>{   


      const { queryMode } = router.query; 
      if(!queryMode) {
        router.query.queryMode="Pressure Control"
        router.push(router)
      } else {
        setModeCurrent(queryMode)
        dataSelector['mode'] = queryMode;
        setModeCurrent(queryMode)
      }



    }
  ,[router.isReady])

  useEffect(()=>{   

    if(modeCurrent !== 'Pressure Control') {
      router.query.queryMode=modeCurrent
      router.push(router)
    }


  }
,[modeCurrent])

  var ansMode0 = {
    // mode : 'Pressure Control',
    mode: '',
    triggering_variable : 'PatientMachine',
    control_pressure_variable : 'Pressure',
    cycling_variable : 'Time',
  }

  var ansMode1 = {
    // mode : 'Pressure Control',
    mode: '',
    triggering_variable : 'MachinePatient',
    control_pressure_variable : 'Pressure',
    cycling_variable : 'Time',
  }

  var ansMode0_2 = {
    mode : 'Pressure Control',
    // mode: '',
    triggering_variable : 'PatientMachine',
    control_pressure_variable : 'Pressure',
    cycling_variable : 'Time',
  }

  var ansMode1_2 = {
    mode : 'Pressure Control',
    // mode: '',
    triggering_variable : 'MachinePatient',
    control_pressure_variable : 'Pressure',
    cycling_variable : 'Time',
  }

  var ansMode2 = {
    mode : 'Volume Control',
    // mode: '',
    triggering_variable : 'MachinePatient',
    control_pressure_variable : 'Flow',
    cycling_variable : 'Volume',
  }

  var ansMode3 = {
    mode : 'Volume Control',
    // mode: '',
    triggering_variable : 'PatientMachine',
    control_pressure_variable : 'Flow',
    cycling_variable : 'Volume',
  }

  var ansMode4 = {
    mode : 'Pressure Support',
    // mode: '',
    triggering_variable : 'Patient',
    control_pressure_variable : 'Pressure',
    cycling_variable : 'Flow',
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

      const btnName = event.currentTarget.getAttribute('data-btnName');
      const btnStep = event.currentTarget.getAttribute('data-step');
      console.log(btnName);

      // Remove Active class All
      const btnOtherAll = document.querySelectorAll(`[data-step=${btnStep}]`);
      btnOtherAll.forEach((element) => {
        element.classList.remove(styles['btnActive']);
      });
      // Add Active class
      event.currentTarget.classList.add(styles['btnActive']);

      // Set data
      dataSelector[btnStep] = btnName;
      setDataSelector(dataSelector)

      console.log(dataSelector)
  }

  const handleSettingbtn2 = (event) => {

    const btnName = event.currentTarget.getAttribute('data-btnName');
    const btnStep = event.currentTarget.getAttribute('data-step');
    console.log(btnName);

    // Remove Active class All
    // const btnOtherAll = document.querySelectorAll(`[data-step=${btnStep}]`);
    // btnOtherAll.forEach((element) => {
    //   element.classList.remove(styles['btnActive']);
    // });
    // Add Active class
    event.currentTarget.classList.add(styles['btnActive']);

    // Set data
    if (dataSelector[btnStep].includes(btnName)) {
      // REMOVE
      event.currentTarget.classList.remove(styles['btnActive']);
      dataSelector[btnStep] = dataSelector[btnStep].replace(btnName,'');
    } else {
      // ADD
      dataSelector[btnStep] += btnName;
    }
    setDataSelector(dataSelector)

    console.log(dataSelector)
}

  const handleSubmit = () => {
      console.log('Submit');

      // const dataMode = dataSelector.mode
      // const triggering_variable = dataSelector.triggering_variable
      // const control_pressure_variable = dataSelector.control_pressure_variable
      // const cycling_variable = dataSelector.cycling_variable


      if (JSON.stringify(dataSelector) === JSON.stringify(ansMode0) || JSON.stringify(dataSelector) === JSON.stringify(ansMode1) || JSON.stringify(dataSelector) === JSON.stringify(ansMode0_2) || JSON.stringify(dataSelector) === JSON.stringify(ansMode1_2) || JSON.stringify(dataSelector) === JSON.stringify(ansMode2) || JSON.stringify(dataSelector) === JSON.stringify(ansMode3) || JSON.stringify(dataSelector) === JSON.stringify(ansMode4)) {
        console.log('ถูก')

        // setShowLottie(true)

        console.log(modeCurrent)
        
        if (modeCurrent == 'Pressure Control') {
          dataSelector['mode'] = 'Volume Control';
          setModeCurrent('Volume Control')
        } else if (modeCurrent == 'Volume Control') {
          dataSelector['mode'] = 'Pressure Support';
          setModeCurrent('Pressure Support')
        } else if (modeCurrent == 'Pressure Support') {
          router.push('/vent/success')
        }

        const mainWrap = document.querySelector('#main')
        mainWrap.classList.add(styles['hidden']);
        mainWrap.classList.remove(styles['flade']);
        setTimeout(() => { 
          mainWrap.classList.remove(styles['hidden']);
          mainWrap.classList.add(styles['flade']);

          dataSelector['triggering_variable'] = '';

          // setShowLottie(false)
          // if (modeCurrent == 'Pressure Support') {
          //   router.push('/menulearningmode')
          // }
          // router.push('/menulearningmode')
         }, 2000)

        const btnAll = document.querySelectorAll(`.${styles.btnSelect}`);
        btnAll.forEach((element) => {
          element.classList.remove(styles['btnActive']);
        });

      } else {
        console.log('ผิด')
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


        <div id='main' className='row g-5 py-2 pt-lg-5'>         
          <div className='col-12 mb-3'>

            <div className={styles.quiz_title}>
              เลือกเงื่อนไขในการตั้งค่าสำหรับสำหรับโหมด <br/>
              <strong>
                {modeCurrent.includes("Pressure Control") && 'Pressure Control'} {modeCurrent.includes("Volume Control") && 'Volume Control'} {modeCurrent.includes("Pressure Support") && 'Pressure Support'}
              </strong>            
            </div>
          </div>
          {/* <div className='col-12 col-md-6 col-lg-3 master-col'>
            <div className={styles.title_col}>
              Mode
            </div>
            {modeCurrent.includes("Pressure Control") &&
            <button className={styles.btnSelect} data-btnName='Pressure Control' data-step='mode' onClick={handleSettingbtn}>
              Pressure<br/>
              Control
            </button>
            }
            {modeCurrent.includes("Volume Control") &&
            <button className={styles.btnSelect} data-btnName='Volume Control' data-step='mode' onClick={handleSettingbtn}>
              Volume<br/>
              Control
            </button>
            }
            {modeCurrent.includes("Pressure Support") &&            
            <button className={styles.btnSelect} data-btnName='Pressure Support' data-step='mode' onClick={handleSettingbtn}>
              Pressure<br/>
              Support
            </button>
            }
          </div> */}

          <div className='col-12 col-md-6 col-lg-4 master-col'>
            <div className={styles.title_col}>
              Triggering <br/>
              variable
            </div>
            <button className={styles.btnSelect} data-btnName='Machine' data-step='triggering_variable' onClick={handleSettingbtn2}>
              Machine
            </button>
            <button className={styles.btnSelect} data-btnName='Patient' data-step='triggering_variable' onClick={handleSettingbtn2}>
              Patient
            </button>
          </div>

          <div className='col-12 col-md-6 col-lg-4 master-col'>
            <div className={styles.title_col}>
              Control of <br/>
              pressure variable
            </div>
            <button className={styles.btnSelect} data-btnName='Flow' data-step='control_pressure_variable' onClick={handleSettingbtn}>
              Flow
            </button>
            <button className={styles.btnSelect} data-btnName='Pressure' data-step='control_pressure_variable' onClick={handleSettingbtn}>
              Pressure
            </button>
          </div>

          <div className='col-12 col-md-6 col-lg-4 master-col'>
            <div className={styles.title_col}>
              Cycling off <br/>
              variable
            </div>
            <button className={styles.btnSelect} data-btnName='Time' data-step='cycling_variable' onClick={handleSettingbtn}>
              Time
            </button>
            <button className={styles.btnSelect} data-btnName='Volume' data-step='cycling_variable' onClick={handleSettingbtn}>
              Volume
            </button>
            <button className={styles.btnSelect} data-btnName='Flow' data-step='cycling_variable' onClick={handleSettingbtn}>
              Flow
            </button>
          </div>


          <div className='col-12 text-end'>
            <button className={styles.btnSubmit} onClick={handleSubmit}>
                SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}