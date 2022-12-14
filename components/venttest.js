import { useState, useEffect } from 'react';
import styles from './venttest.module.scss'
import Image from 'next/image'
import Link from "next/link";
import ReactPlayer from 'react-player'
import { useRouter } from 'next/router'
import Moveable from "react-moveable"; // preact-moveable
// import dynamic from 'next/dynamic'



// 
// ถ้าติดผิก ให้แสดงหน้า HINT ของอาจารย์ว่า ลองใหม่อีกครั้ง (เหมือนในหน้าตอบคำถาม)
// 
// 

export default function VentTest() {
    const router = useRouter()
    const [btnSetupRecord, setBtnSetupRecord] = useState([]);
    const [varBtnSetting, setvarBtnSetting] = useState([10,300,39,10,3.0,40,40,75,50,0.0,0,5.0,25,3.0,750,'ET']);
    const [btnSetup, setBtnSetup] = useState();
    const [stepCount, setStepCount] = useState(1);
    const [isSetWeight, setIsSetWeight] = useState(0);
    const [isSetHeight, setIsSetHeight] = useState(0);
    const [focusSetting, setFocusSetting] = useState(0);
    const [isSetting, setIsSetting] = useState(0);
    const [target, setTarget] = useState();
    const [varX, setVarX] = useState();
    const [varY, setVarY] = useState();
    const [varR, setVarR] = useState(0);    
    const [preVarR, setPreVarR] = useState(0);
    const [footerText, setFooterText] = useState('ตั้งค่า ventilator ใส่ข้อมูลคนไข้เพศชาย สูง 170 ซม.');
    const [footerTextStep, setFooterTextStep] = useState(0);
    const [status, setStatus] = useState(null);
    const [frame, setFrame] = useState({
        translate: [0,0],
        rotate: 1,
        transformOrigin: "50% 50%",
    });

    // Var Control
    const [weight, setWeight] = useState(50);
    const [height, setHeight] = useState(152);


    const [playing, setPlaying] = useState(false);
    const [loopSet, setLoopSet] = useState(true);
    const [mutedSet, setmutedSet] = useState(true);
    const reset = () => {
        console.log('Reset')
    }

    // let showBtnSetting = [10,300,39,10,3.0,40,8.0,75,50,0.0,0,5.0,25,3.0,750,'ET'];

    useEffect(() => {
        // Var for Moveable
        setTarget(document.querySelector("#traget"));
        

    }, []);

    useEffect(() => {
        if(isSetWeight == 1) {
            if (varR == 0) {
                console.log('varR=0');
            } else {
                let newWeight = Number(weight)+(varR/360);
                console.log(newWeight);
                setWeight(newWeight.toFixed(1));
            }
    
        }
        if(isSetHeight == 1) {
            if (varR == 0) {
                console.log('varR=0');
            } else {
                let newHeight = Number(height)+(varR/360);
                console.log(newHeight);
                setHeight(newHeight.toFixed(1));
            }
        }
        if(isSetting == 1) {
            resetRotate()
            const currentVar = varBtnSetting;
            // console.log(currentVar)
            let newVar = Number(currentVar[focusSetting-1])+(varR/360);
            changeVarBtnSetting(newVar.toFixed(1) , focusSetting);
            
        }



        
        
    }, [varR]);



    // useEffect(() => {
    //     if (height == 170) {
    //         setFooterText('ตั้งค่า ventilator mode ตามความเหมาะสมของคนไข้')
    //     } else {
    //         setFooterText('ตั้งค่า ventilator ใส่ข้อมูลคนไข้เพศชาย สูง 170 ซม.')
    //     }       
    // }, [height]);


    let listFooterText = [
        'ตั้งค่า ventilator ใส่ข้อมูลคนไข้เพศชาย สูง 170 ซม.',
        'ตั้งค่า ventilator mode ตามความเหมาะสมของคนไข้',
        'ตั้งค่า Flow trigger 5L/min',
        'ตั้งค่า Peep 5 cmH2O',
        'ตั้งค่าให้ pressure support 10 cmH2O',
        'คนไข้มีภาวะของ Airway resistance ปรับ rise time เป็น 75%',
        'ตั้งค่า %O2 : 40',
        'พบว่าคนไข้มีdelay cycling ปรับ Esens 50%',
        'ปรับหน้าจอให้เป็น 3 Waveform'

    ]
    const nextText = () => {
        if (footerTextStep+1 < listFooterText.length) {
            setFooterTextStep(footerTextStep+1);
            setFooterText(listFooterText[footerTextStep+1])
        }        
    }
    const previosText = () => {
        if (footerTextStep-1 >= 0) {
            setFooterTextStep(footerTextStep-1);
            setFooterText(listFooterText[footerTextStep-1])
        }
    }




    // FN Setup
    const handleClick = (event) => {
        event.currentTarget.classList.add(styles['btn_setting_up_active']);
        console.log(event.currentTarget);
    };

    const handleSetWeight = (event) => {
        resetSetupBtn()
        event.currentTarget.classList.add(styles['btn_setting_up_active']);
        setIsSetWeight(1)
        setIsSetHeight(0)
        resetRotate()

        setFocusSetting(0)
        setIsSetting(0)
        resetSettingBtn()
        console.log(event.currentTarget)
    };
    const handleSetHeight = (event) => {
        resetSetupBtn()
        event.currentTarget.classList.add(styles['btn_setting_up_active']);
        setIsSetHeight(1)
        setIsSetWeight(0)
        resetRotate()

        setFocusSetting(0)
        setIsSetting(0)
        resetSettingBtn()
    };

    const handleSetupbtn = (event) => {
        resetSetupBtn()
        setIsSetHeight(0)
        setIsSetWeight(0)
        resetRotate()
        
        setFocusSetting(0)
        setIsSetting(0)
        resetSettingBtn()

        const btnName = event.currentTarget.getAttribute('data-btnName');
        console.log(btnName);
        const btnTrID = event.currentTarget.getAttribute('data-tr');
        handleResetSetupbtn(btnTrID);
        event.currentTarget.classList.add(styles['setupCaptionActive2']);

        setBtnSetup(btnName)
        
        const btnSetupAll = document.querySelectorAll("#tableBtnsettingGroup tr td div")
        btnSetupAll.forEach(function (i) {
            i.classList.remove(styles['btn_disable']);
        });
        // START LOGIC
        if (btnName == 'Invasive') {
            const arrBtnDisableList = ['CPAP']
            arrBtnDisableList.forEach(function(name){
                document.querySelector(`[data-btnName='${name}']`).classList.add(styles['btn_disable']);
            })
        }
        if (btnName == 'SPOINT') {
            const arrBtnDisableList = ['PC','VC','VC+' ,'CPAP']
            arrBtnDisableList.forEach(function(name){
                document.querySelector(`[data-btnName='${name}']`).classList.add(styles['btn_disable']);
            })
        }
        if (btnName == 'TC') {
            const arrBtnDisableList = ['PC','VC','VC+' ,'CPAP' , 'IE Sync']
            arrBtnDisableList.forEach(function(name){
                document.querySelector(`[data-btnName='${name}']`).classList.add(styles['btn_disable']);
            })
        }
        if (btnName == 'V-Trig') {
            const arrBtnDisableList = ['PC','VC','VC+' ,'CPAP' , 'IE Sync']
            arrBtnDisableList.forEach(function(name){
                document.querySelector(`[data-btnName='${name}']`).classList.add(styles['btn_disable']);
            })
            logicSettingGridShow()
        } else {
            resetSettingGridShow()
        }
    }

    function handleResetSetupbtn(index) {
        const trIndex = Number(index)-1; // DEMO
        const trAll = document.querySelectorAll("#tableBtnsettingGroup tr");
        
        const setupBtnAll = trAll[trIndex].querySelectorAll("td div");
        setupBtnAll.forEach(function (i) {
            i.classList.remove(styles['setupCaptionActive2']);
        });
    }

    const resetRotate = () => {
        // console.log('reset');
        setVarR(0);
        setFrame(
            {
                translate: [0,0],
                rotate: 1,
            }
        )
    }

    const resetSetupBtn = () => {
        document.querySelector('#weightSetupBtn')?.classList.remove(styles['btn_setting_up_active']);
        document.querySelector('#heightSetupBtn')?.classList.remove(styles['btn_setting_up_active']);
    }


    
    // TAble 2 setupBtn

    function logicSettingGridShow() {        
        let btnSettingGridAll =  document.querySelectorAll('#tableBtnsettingGrid td > div');
        btnSettingGridAll.forEach(function(i){
            i.classList.add(styles['invisible']);
        })
        const arrItemShow = [4,5,6,7,9,13,14];
        arrItemShow.forEach(function(i){
            btnSettingGridAll[i-1].classList.remove(styles['invisible']);
        })
    }
    function resetSettingGridShow() {
        let btnSettingGridAll =  document.querySelectorAll('#tableBtnsettingGrid td > div');
        btnSettingGridAll.forEach(function(i){
            i.classList.remove(styles['invisible']);
        })
    }

    const handleSettingbtn = (event) => {
        resetSetupBtn()
        setIsSetHeight(0)
        setIsSetWeight(0)
        resetRotate()
        resetSettingBtn()

        const btnID = event.currentTarget.getAttribute('data-settingid');
        // const btnName = event.currentTarget.getAttribute('data-btnName');
        // console.log(btnName);
        event.currentTarget.classList.add(styles['btn_setting_up_active']);

        setFocusSetting(btnID)
        setIsSetting(1)
        
    }
    const handleInputChange = (event) => {
        const btnID = event.currentTarget.getAttribute('data-settingid');
        // changeVarBtnSetting(newVar.toFixed(1) , focusSetting);
        const valueSetting = event.target.value;
        changeVarBtnSetting(valueSetting , focusSetting);
    }
    const resetSettingBtn = () => {
        const settingBtnAll = document.querySelectorAll('#tableBtnsettingGrid td > div')
        settingBtnAll.forEach( function(i) {
            i.classList.remove(styles['btn_setting_up_active']);
        } )
    }
    


    function changeVarBtnSetting(newVar,indexToChange) {
        // varBtnSetting
        // setvarBtnSetting
        const arrNewVar = [];
        varBtnSetting.forEach(function(i,index) {
            if (index == indexToChange-1) {
                arrNewVar.push(newVar)
            } else {
                arrNewVar.push(i)
            }
        })
        setvarBtnSetting(arrNewVar)
    }
    

    // checkAns
    const checkAns = () => {
        // arrItemShow = [4,5,6,7,9,13,14];
        // varBtnSetting
        if (varBtnSetting[3] == 10 && varBtnSetting[4] == 5 && varBtnSetting[5] == 40 & varBtnSetting[6] == 40 & varBtnSetting[8] == 75 & varBtnSetting[12] == 50 & varBtnSetting[13] == 5 ) {
            console.log('succecfully')
            setPlaying(true)
            document.querySelector('#main')?.classList.add(styles['hidden']);
            document.querySelector('#video')?.classList.add(styles['showVideo']);
            // router.push('/vent/finish')
        } else {
            console.log('fail')
            router.push('/hint/vent-false')
        }
    }

    const showSwitchPanel = () => {
        document.querySelector('#switchWaveFormPanel')?.classList.toggle(styles['showPanel']);
    }

    const twoWave = '../video/2wave.mp4'
    const threeWave = '../video/3wave.mp4'
    const [waveVideo, setWaveVideo] = useState(twoWave);
    const showTwoWave = () => {
        setWaveVideo('../video/2wave.mp4')
    }
    const showThreeWave = () => {
        setWaveVideo('../video/3wave.mp4')

    //     setTimeout(function(){
    //         router.push('/vent/finish')

    // ซ่อนกล่องข้อความ แล้วใส่ปุ่ม FINISH 


    //    }, 2000);
    }

    
    return (           
        <>
        <section id='ventContainer' className={styles.vent_container}>
            <header className={styles.panel_top}>
                <div className={styles.panel_top_content}>
                    <h2>New Patient Setup</h2>
                    <h3>Vent startup in progress</h3>
                </div>
            </header>
            <main id='main' className={styles.main}>
                <div className={styles.VentSetup}>
                    <section className={styles.sidebar}>
                        <div className={styles.sideLogo}>
                            <p>
                                Setup
                            </p>
                        </div>
                        <div className={styles.sideList}>
                            <ul>
                                <li className={styles.active}>
                                    <span>Vent</span>
                                </li>
                                <li>
                                    <span>Apnea</span>
                                </li>
                                <li>
                                    <span>Alarms</span>
                                </li>
                                <li>
                                    <span>More <br/> Settings</span>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.kgbox}>
                            <div className={styles.kg}>
                                <span className={styles.spnkg}>
                                    {weight}
                                </span>
                                <span className={styles.spnkgc}>
                                    kg
                                </span>
                            </div>
                            <div className={styles.mlkg}>
                                <span className={styles.spnmlkg}>
                                    6.00
                                </span>
                                <span className={styles.spnlmkgc}>
                                    mL/kg
                                </span>
                            </div>
                        </div>
                    </section>
                    <section className={styles.Ventcontent}>
                        <div className={styles.settings_box}>
                            <div className={styles.leftCol}>
                                <h4>
                                    Setup Vent
                                </h4>
                                <div className={styles.helpText}>
                                    <span>Enter predicted body weight</span>
                                </div>
                                <div className={styles.weightBox}>
                                    <div id="weightSetupBtn" className={styles.btn_setting_up} onClick={event => handleSetWeight(event)}>
                                        <div className={styles.btnsLineMid}>{weight}</div>
                                        <div className={styles.btnsLineTop}>kg</div>
                                        <div className={styles.btnsLineBot}>(110)</div>
                                    </div>
                                </div>
                                <div className={styles.orBox}>
                                    <span>— OR —</span>
                                </div>
                                <div className={styles.helpText}>
                                    <span>gender and height</span>
                                </div>
                                <div className={styles.genderBox}>
                                    <div className={styles.genderbtn}>
                                        <Image
                                            src="/vent/button-gender-male.png"
                                            alt="button-gender-male"
                                            // layout="fill"
                                            // objectFit="cover"
                                            width={196}
                                            height={196}
                                        />
                                    </div>
                                    <div className={styles.genderbtn}>
                                    <Image
                                            src="/vent/button-gender-female.png"
                                            alt="button-gender-female"
                                            // layout="fill"
                                            // objectFit="cover"
                                            width={196}
                                            height={196}
                                        />
                                    </div>
                                </div>
                                <div className={styles.heightBox}>
                                    <div id="heightSetupBtn" className={styles.btn_setting_up} onClick={event => handleSetHeight(event)}>
                                        {/* <div className={styles.btnsLineMid}>
                                        {height} 
                                        </div> */}
                                        <input type='text' class={styles.inputSetting} value={height} onChange={event => setHeight(event.target.value)} />    
                                        <div className={styles.btnsLineTop}>cm</div>
                                        <div className={styles.btnsLineBot}>(110)</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rightCol}>
                                <table id='tableBtnsettingGroup' className={styles.table_btngroup} width="100%" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td className={styles.td_title}>
                                                <div className={styles.setupCaption}>
                                                    <span>Ventilation Type</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='Invasive' data-tr='1' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='NIV' data-tr='1' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>NIV</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='HFO' data-tr='1' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>HFO<sub>2</sub>T</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.td_title}>
                                                <div className={styles.setupCaption}>
                                                    <span>Mode</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='A/C' data-tr='2' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>A/C</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='SIMV' data-tr='2' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>SIMV</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='SPOINT' data-tr='2' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>SPOINT</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='BiLevel' data-tr='2' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>BiLevel</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='CPAP' data-tr='2' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>CPAP</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.td_title}>
                                                <div className={styles.setupCaption}>
                                                    <span>Mandatory Type</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='PC' data-tr='3' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>PC</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='VC' data-tr='3' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>VC</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='VC+' data-tr='3' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>VC+</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.td_title}>
                                                <div className={styles.setupCaption}>
                                                    <span>Spontaneous Type</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='PS' data-tr='4' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>PS</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='TC' data-tr='4' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>TC</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='VS' data-tr='4' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>VS</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='PAV+' data-tr='4' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>PAV+</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.td_title}>
                                                <div className={styles.setupCaption}>
                                                    <span>Trigger Type</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='P-Trig' data-tr='5' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>P-Trig</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='V-Trig' data-tr='5' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>V-Trig</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='IE Sync' data-tr='5' className={styles.setupbtn} onClick={handleSetupbtn}>
                                                    <span>IE Sync</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table id='tableBtnsettingGrid' className={styles.table_btnsetting} width="100%" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                    <tr>
                                            <td>
                                                <div data-settingid='1' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        f
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                        {varBtnSetting[0]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={varBtnSetting[0]} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        1/min
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='2' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        V<sub>T</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                        {varBtnSetting[1]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={varBtnSetting[1]} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        mL
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='3' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        V<sub>MAX</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                        {varBtnSetting[2]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={varBtnSetting[2]} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        L/min
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='4' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        P<sub>SUPP</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                        {varBtnSetting[3]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={varBtnSetting[3]} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        cmH<sub>2</sub>O
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='5' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        V <sub>SENS</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                        {varBtnSetting[4]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={varBtnSetting[4]} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        L/min
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='6' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        O<sub>2</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[5]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={varBtnSetting[5]} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        %
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='7' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        P<sub>PEAK</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[6]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={varBtnSetting[6]} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        cmH<sub>2</sub>O
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='8' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        D<sub>SENS</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[7]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={varBtnSetting[7]} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        L/min
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        
                                        <tr>
                                            <td>
                                                <div data-settingid='9' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[8]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={varBtnSetting[8]} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        %
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='10' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        T<sub>PL</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[9]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={varBtnSetting[9]} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        S
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='11' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        Ramp
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[10]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={varBtnSetting[10]} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                    &nbsp;
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='12' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        l SPONT
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[11]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={varBtnSetting[11]} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        S
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='13' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        E<sub>SENS</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[12]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={varBtnSetting[12]} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        %
                                                    </div>
                                                </div>
                                            </td>                                            
                                            <td>
                                                <div data-settingid='14' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        PEEP
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[13]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={varBtnSetting[13]} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        cmH<sub>2</sub>O
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='15' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        V<sub>Tl</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[14]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={varBtnSetting[14]} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        mL
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='16' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        Tube
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[15]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={varBtnSetting[15]} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        Type
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        
                                    </tbody>
                                </table>
                                <div className={styles.btn_group_area}>
                                    <div className={styles.btn_group}>
                                        <button className={styles.btnAccept} onClick={checkAns}>
                                            Accept All
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <div id='video' className={styles.videoContainer}>
                <ReactPlayer 
                // className={styles.video_item} 
                url={waveVideo}  
                playing={playing} 
                onEnded={reset}
                muted={mutedSet}
                loop={loopSet}
                width='100%'
                height='100%'
                />
                <div className={styles.switchWaveFormToggle} onClick={showSwitchPanel}></div>
                <div id='switchWaveFormPanel' className={styles.switchWaveFormPanel}>
                <Image                
                    src="/images/switchWaveForm.png"
                    alt="switchWaveForm"
                    // layout="fill"
                    // objectFit="cover"
                    width={2024}
                    height={1138}
                />   
                <div className={styles.btnTwoWave} onClick={showTwoWave}></div>
                <div className={styles.btnThreeWave} onClick={showThreeWave}></div>
                </div>
            </div>
            <div className={styles.statBar}>
                {/* <div className={styles.log_box}>
                    {varR} degree
                </div> */}
            </div>
            <div className={styles.footer}>
                <div id='introductionBox' className={styles.introduction_box}>
                    <p>
                        {footerText}
                    </p>
                    <div className={styles.btnGroup}>
                        <button className={styles.btnItem} onClick={previosText}>
                            PREVIOUS 
                        </button>
                        <button id='btnNext' className={styles.btnItem} onClick={nextText}>
                            NEXT
                        </button>
                    </div>
                </div>
            </div>
            <footer id='footer_controlPanel' className={styles.controlpanel_wrap}>
                <div className={styles.controlpanel_row}>
                    <div className={styles.controlpanel}>
                        <Image
                            src="/vent/displaybrightnesskey.png"
                            alt="displaybrightnesskey"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                    <div className={styles.controlpanel}>
                        <Image
                            src="/vent/displaylockkey.png"
                            alt="displaylockkey"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                    <div className={styles.controlpanel}>
                        <Image
                            src="/vent/displayvolumekey.png"
                            alt="displayvolumekey"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                    <div className={styles.controlpanel}>
                        <Image
                            src="/vent/manualinspirationkey.png"
                            alt="manualinspirationkey"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                    <div id="traget" className={styles.controlpanel_knob_box}>
                        <Image
                            src="/vent/covidienknob.png"
                            alt="covidienknob"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}                            
                        />
                    </div>
                    <div className={styles.controlpanel}>
                        <Image
                            src="/vent/inspiratorypausekey.png"
                            alt="inspiratorypausekey"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                    <div className={styles.controlpanel}>
                        <Image
                            src="/vent/expiratorypausekey.png"
                            alt="expiratorypausekey"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                    <div className={styles.controlpanel}>
                        <Image
                            src="/vent/alarmresetkey.png"
                            alt="alarmresetkey"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                    <div className={styles.controlpanel}>
                        <Image
                            src="/vent/alarmsilencekey.png"
                            alt="alarmsilencekey"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                </div>
            </footer>
            <Moveable
                target={target}
                originDraggable={true}
                originRelative={true}
                draggable={false}
                throttleDrag={0}
                startDragRotate={0}
                throttleDragRotate={0}
                zoom={1}
                // origin={true}
                origin={false}
                padding={{"left":0,"top":0,"right":0,"bottom":0}}
                rotatable={true}
                pinchable={true}
                scalable={false}
                throttleRotate={0}
                rotationPosition={"top"}
                onDragOriginStart={e => {
                    e.dragStart && e.dragStart.set(frame.translate);
                }}
                onDragOrigin={e => {
                    frame.translate = e.drag.beforeTranslate;
                    frame.transformOrigin = e.transformOrigin;
                }}
                onDragStart={e => {
                    e.set(frame.translate);
                }}
                onDrag={e => {
                    frame.translate = e.beforeTranslate;
                }}
                onRotateStart={e => {
                    e.set(frame.rotate);
                }}
                onRotate={e => {
                    frame.rotate = e.beforeRotate;
                }}
                onRender={e => {
                    const { translate, rotate, transformOrigin } = frame;
                    e.target.style.transformOrigin = transformOrigin;
                    e.target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`
                        +  ` rotate(${rotate}deg)`;
                    // console.log(e.target.style.transform);
                    setVarX(translate[0])
                    setVarY(translate[1])
                    setVarR(rotate)
                }}
            />
        </section>    
        </> 
    )
}