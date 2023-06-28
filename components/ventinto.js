import { useState, useEffect } from 'react';
import styles from './ventinto.module.scss'
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from 'next/router'

export default function VentInto() {
    const router = useRouter()
    const [introductionTitle, setIntroductionTitle] = useState('Instruction');
    const [introductionText, setIntroductionText] = useState();
    const [stepCount, setStepCount] = useState(1);

    const [fontSize, setFontSize] = useState(100);

    useEffect(() => {
        let btn1 = document.querySelector('#btn1');
        let btn2 = document.querySelector('#btn2');
        let btn3 = document.querySelector('#btn3');  
        let tableBtngroup = document.querySelector('#table_btngroup');  
        let tableBtnsetting = document.querySelector('#table_btnsetting');  
        let nextBtn = document.querySelector('#nextBtn');  
        
        btn1.classList.add(styles['genderBoxActive']);
        tableBtngroup.classList.add(styles['invisible']);
        tableBtnsetting.classList.add(styles['invisible']);


        setIntroductionText(listInstructionText[0])
    }, []);

    function activeBtn(step) {        
        let btnNum = '#btn'+step;
        console.log(btnNum);
        if (step == '1') {
            document.querySelector(btnNum)?.classList.add(styles['genderBoxActive']);
        } else if (step >= 4 && step <= 21)  {
            document.querySelector(btnNum)?.classList.add(styles['setupCaptionActive2']);
        } else {
            document.querySelector(btnNum)?.classList.add(styles['btn_setting_up_active']);
        }

        if (step >= 4) {
            document.querySelector('#table_btngroup').classList.remove(styles['invisible']);
        }
        if (step >= 21) {
            document.querySelector('#table_btnsetting').classList.remove(styles['invisible']);
        }
    }
    function removeActiveBtn(step) {
        if (step == '1') {
            document.querySelector('#btn'+step.toString())?.classList.remove(styles['genderBoxActive']);
        } else if (step >= 4 && step <= 21) {
            document.querySelector('#btn'+step.toString())?.classList.remove(styles['setupCaptionActive2']);
        } else {
            document.querySelector('#btn'+step.toString())?.classList.remove(styles['btn_setting_up_active']);
        }
    }

    let listInstructionText = [      
        'เริ่มต้นการตั้งค่าด้วยการใส่น้ำหนัก Ideal Body Weight (Predicted Body Weight by Height) ของผู้ป่วย หรือเลือกเพศ และใส่ส่วนสูง เพื่อคำนวณเป็น Predicted Body weight อัตโนมัติ',              
        'เริ่มต้นการตั้งค่าด้วยการใส่น้ำหนัก Ideal Body Weight (Predicted Body Weight by Height) ของผู้ป่วย หรือเลือกเพศ และใส่ส่วนสูง เพื่อคำนวณเป็น Predicted Body weight อัตโนมัติ',              
        'เริ่มต้นการตั้งค่าด้วยการใส่น้ำหนัก Ideal Body Weight (Predicted Body Weight by Height) ของผู้ป่วย หรือเลือกเพศ และใส่ส่วนสูง เพื่อคำนวณเป็น Predicted Body weight อัตโนมัติ',              
        // 'เริ่มต้นเลือกเพศของผู้ป่วย เราสามารถกำหนด Predicted body weight โดยการกำหนดผ่านส่วนสูงได้',          
        
        'การใช้เครื่องช่วยหายใจผ่านท่อช่วยหายใจ (Endotracheal Tube) หรือท่อเจาะคอ (Tracheostomy Tube)',
        'การใช้เครื่องช่วยหายใจโดยไม่ผ่านท่อช่วยหายใจ <br/> <b><u>หมายเหตุ</u></b> โดยอาจใช้หน้ากากครอบจมูกและปาก เป็น Interface ในการช่วยหายใจแทน',
        'การช่วยหายใจโดยการบำบัดด้วยออกซิเจนที่มีอัตราการไหลสูง (High Flow Oxygen Therapy)',
        'Assist - Control Mode คือ โหมดที่ผสมผสานระหว่าง Assist และ Control โดยผู้ป่วยสามารถช่วยกำหนดจุดเริ่มต้นของการหายใจเข้าได้เอง (Assist Mode ) และหากผู้ป่วยไม่มีการหายใจ เครื่องสามารถจะจ่ายอากาศในการช่วยหายใจให้ผู้ป่วยได้ (Control Mode)',
        'Synchronous Intermittent Mandatory Ventilation Mode คือโหมดที่ผู้ป่วยหายใจเอง (Spontaneous Mode) สลับกับการหายใจจากเครื่องตามที่ตั้งไว้ ในลักษณะที่เป็น Assist หรือ Control',
        'Spontaneous Mode คือโหมดช่วยหายใจ โดยผู้ป่วยเป็นผู้กำหนดอัตรการหายใจ Inspiratory Time และ Tidal Volume ด้วยตัวเอง     ',
        'Bilevel ventilator คือโหมดที่สามารถหายใจบนแรงดันบวก 2 ระดับ ',
        'Continuous Positive Airway Pressure Mode คือโหมดที่จะปรากฏขึ้นเมื่อเลือกใช้บ NIV Mode เป็นการช่วยหายใจ โดยเครื่องจ่ายแรงดันบวกให้ในระดับเดียวตลอด Respiratory Cycle โดยผู้ป่วยหายใจบนแรงดันบวกนั้น ',
        'Pressure Control Mode ',
        'Volume Control Mode',
        'Volume Control Plus Mode หรือPressure Regulated Volume Control Mode (PRVC Mode)',
        'Pressure Support Mode ',
        'Tube Compensation Mode',
        'Volume Support Mode',
        'Proportional Assist Ventilation Plus Mode',
        'Pressure Trigger',
        'Flow Trigger',
        'Inspiratory Expiratory Synchrony Trigger',
        'Pressure Sensitivity คือค่าแรงดันที่เครื่องจะรับรู้ว่าผู้ป่วยมีการหายใจเข้า และเมื่อถึง Threshold ของแรงดันดังกล่าว เครื่องจะจ่ายลมเข้าสู่ผู้ป่วย', // 22        
        'Flow Sensitivity คือค่า Flow ที่เครื่องจะรับรู้ว่าผู้ป่วยมีการหายใจเข้า และเมื่อถึง Threshold ของ Flow ดังกล่าว เครื่องจะจ่ายลมเข้าสู่ผู้ป่วย',
        'Inspiratory Synchrony คือพารามิเตอร์ใน IE Sync Trigger โดยเป็นการกำหนดความไวของการหายใจเข้า        ',
        'Expiratory Synchrony คือพารามิเตอร์ใน IE Sync Trigger โดยเป็นการกำหนดค่าความไวที่เครื่องจะเปลี่ยนจากช่วงหายใจเข้าเป็นหายใจออก',
        'Oxygen Percentage คือความเข้มข้นของออกซิเจนในอากาศที่จ่ายให้ผู้ป่วย',
        'Respiratory Rate คืออัตราการหายใจที่เรากำหนด        ',
        'Positive End Expiratory Pressure คือแรงดันบวกของอากาศที่ค้างอยู่ในปอดเมื่อสิ้นสุดการหายใจออก        ',
        'Set Limitation of High Peak Circuit Pressure คือการกำหนดค่าแรงดันบวกสูงสุดที่เครื่องจะจ่ายความดันให้ หากระดับแรงดันสูงกว่าที่กำหนด เครื่องจะร้องเตือนและหยุดการจ่ายอากาศ',
        'Inspiratory Pressure คือแรงดันบวกที่ช่วยหายใจเข้า โดยเพิ่มจากระดับ PEEP ที่กำหนด',
        // 'Pressurization slope คือการตั้งอัตราการไหลของลมขณะหายใจเข้าใน Pressure target mode หน่วยเป็น % <br/> <b><u>หมายเหตุ</u></b> ค่า % สูง แสดงว่ามีการจ่ายแรงดันจนถึงค่าที่กำหนดเร็ว และ ค่า % ต่ำ แสดงว่ามีการจ่ายแรงดันจนถึงค่าที่กำหนด',
        'Pressurization slope คือการตั้งค่าเพื่อกำหนดความเร็วในการจ่ายแรงดันของเครื่องจนถึง Pressure Target ที่กำหนด หน่วยเป็น % <br/> <b><u>หมายเหตุ</u></b> ค่า % สูง แสดงว่ามีการจ่ายแรงดันจนถึงค่าที่กำหนดเร็ว และ ค่า % ต่ำ แสดงว่ามีการจ่ายแรงดันจนถึงค่าที่กำหนด',
        'Inspiratory Time คือ ระยะเวลาในการหายใจเข้า',
        'I:E คืออัตราส่วนของระยะเวลาหายใจเข้าต่อระยะเวลาหายใจออก  ',
        'Pressure  Support คือแรงดันบวกที่จ่ายให้ผู้ป่วยใน SPONT mode โดยเป็นแรงดันบวกที่จ่ายเพิ่มจากระดับ PEEP ที่กำหนด',
        'Pressurization Slope คือการตั้งอัตราการไหลของอากาศขณะหายใจเข้าใน Pressure Target Mode หน่วยเป็น % <br/> <b><u>หมายเหตุ</u></b> ค่า % สูง แสดงว่าอัตราการไหลของอากาศเร็วเพื่อให้ถึงค่าแรงดันที่กำหนด และ ค่า % ต่ำ แสดงว่าอัตราการไหลของอากาศช้าเพื่อให้ถึงค่าแรงดันที่กำหนด  ',
        'Expiratory Sensitivity Sensitivity คือระดับความไวในการหายใจออก โดยเป็นการกำหนด ของ Peak Inspiration Flow ใน Pressure Support Mode หากผู้ป่วยมี Flow ที่ลดลงจนถึงค่า % ที่ตั้งไว้ เครื่องจะหยุดการจ่ายอากาศ แล้วเปลี่ยนเป็นช่วงหายใจออก',
        'Set Limitation of High Inspire Tidal Volume คือการกำหนดค่าปริมาตรอากาศสูงสุดในการหายใจเข้าหนึ่งครั้ง ที่เครื่องจะยอมรับได้หากปริมาตรอากาศหายใจเข้าของผู้ป่วยสูงกว่าค่าที่กำหนด เครื่องจะหยุดการจ่ายอากาศเพิ่ม และจะไม่มีการจ่ายแรงดันเพิ่มขึ้นไปอีก <br/> <b><u>หมายเหตุ</u></b> จะพบพารามิเตอร์นี้ใน Volume Support Mode',
        'Tidal Volume คือปริมาตรของอากาศในช่วงหายใจเข้าหนึ่งครั้ง',
        'Peak Inspiratory Flow คืออัตราการไหลสูงสุดของอากาศในช่วงหายใจเข้า',
        'Plateau Time คือเวลาที่กำหนดเพิ่มเติมในช่วงหายใจเข้า โดยช่วงเวลาดังกล่าวเครื่องจะไม่มีการจ่ายอากาศเข้าสู่ปอด',
        'Ramp Flow Pattern คือรูปแบบของการจ่ายอากาศใน Volume Control Mode โดยมีอัตราการไหลของอากาศสูงสุดในช่วงแรกของการหายใจเข้า หลังจากนั้นอัตราการไหลของอากาศจะลดลงอย่างช้าๆจนผู้ป่วยเข้าสู่การหายใจออก',
        'Square Flow Pattern Pattern คือรูปแบบของการจ่ายอากาศใน Volume Control Mode โดยมีอัตราการไหลของอากาศคงที่ตลอดในช่วงระยะเวลาหายใจเข้า',
        'Spontaneous Inspiratory Time Limit คือพารามิเตอร์ที่อยู่ใน NIV Mode เป็นการกำหนดระยะเวลาการหายใจเข้าสูงสุด หากผู้ป่วยไม่มีการหายใจออกก่อนหน้าเวลาที่กำหนด เครื่องจะตัดการจ่ายอากาศเป็นการหายใจออกตามระยะเวลา T SPONT ที่ได้กำหนดไว้',
        'Disconnect Sensitivity เป็นการกำหนดอัตราการไหลของอากาศที่หายไป หากปริมาตรของอากาศที่หายไปใน 1 นาทีสูงกว่าค่าที่กำหนดเครื่องช่วยหายใจจะแจ้งเตือนเป็น "CIRCUIT DISCONNECT"',
        'Constant Flow Flow คือพารามิเตอร์ใน High Flow Oxygen Therapy โดยเป็นการกำหนดอัตราการไหลของอากาศเข้าสู่ผู้ป่วย',        
    ]
    
    const handlePreviosStep = () => {
        if (stepCount-1 >= 0) {
            setStepCount(stepCount-1);
            setIntroductionText(listInstructionText[stepCount-1])
            console.log('Previos')
            removeActiveBtn(stepCount);
            activeBtn(stepCount-1);
        }
        console.log(stepCount)
    }
    function handleNextStep(stepCount) {
        let stepCountNew = stepCount+1;
        setStepCount(stepCountNew);
        console.log(stepCount);

        removeActiveBtn(stepCount);
        activeBtn(stepCountNew);

        setIntroductionText(listInstructionText[stepCount])


        if (stepCount >= 45) {
            removeActiveBtn(stepCount);
            handleIntroductionClose()
            // document.querySelector('#introductionBox')?.classList.add(styles['hidden']);
            // router.push('/instruction/vent')
        }
    }
    const handleIntroductionClose = () => {
        setStepCount(0);
        removeActiveBtn(stepCount);
        document.querySelector('#introductionBox').classList.add(styles['hidden']);
        document.querySelector('#table_btngroup').classList.remove(styles['invisible']);
        document.querySelector('#table_btnsetting').classList.remove(styles['invisible']);
    }

    const handleShowIntroduction = (event) => {
        let btnID = event.currentTarget.id;
        btnID = btnID.replace('btn','')

        document.querySelector('#introductionBox').classList.remove(styles['hidden']);
        document.querySelector('#btnNext').classList.add(styles['hidden']);
        document.querySelector('#btnPrevious').classList.add(styles['hidden']);
        document.querySelector('#btnFinish').classList.add(styles['showbtn']);
        document.querySelector('#table_btngroup').classList.remove(styles['invisible']);
        document.querySelector('#table_btnsetting').classList.remove(styles['invisible']);
        setIntroductionText(listInstructionText[btnID-1])
        
        setStepCount(btnID);
        removeActiveBtn(stepCount);
        activeBtn(btnID);
    }

    const handleFinish = () => {
        router.push('/vent/quiz0')
    }

    return (
        <section id='ventContainer' className={styles.vent_container}>
            <header className={styles.panel_top}>
                <div className={styles.panel_top_content}>
                    <h2>New Patient Setup</h2>
                    <h3>Vent startup in progress</h3>
                </div>
                <div className={styles.font_control}>
                    <div className={styles.font_control_wrap}>
                        <button onClick={() => setFontSize(fontSize - 3)}>
                            -
                        </button>
                        <button onClick={() => setFontSize(fontSize + 3)}>
                            +
                        </button>
                    </div>
                </div>
            </header>
            <main className={styles.main} style={{
                fontSize: `${fontSize}%`
            }}>
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
                                <li id='btn52' onClick={handleShowIntroduction}>
                                    <span>Apnea</span>
                                    <i className={styles.alert}></i>
                                </li>
                                <li>
                                    <Image
                                        src="/vent/icon-bell.png"
                                        alt="button-gender-male"
                                        className={styles.icon_bell}
                                        width={50}
                                        height={50}
                                    />
                                    <span>Alarms</span>
                                    <i className={styles.alert}></i>
                                </li>
                                <li>
                                    <span>More <br/> Settings</span>
                                    <i className={styles.alert}></i>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.kgbox}>
                            <div className={styles.kg}>
                                <span className={styles.spnkg}>
                                    50
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
                                    <div id='btn3' className={styles.btn_setting_up} onClick={handleShowIntroduction}>
                                        <div className={styles.btnsLineMid}>50</div>
                                        <div className={styles.btnsLineTop}>kg</div>
                                        <div className={styles.btnsLineBot}>(110lb)</div>
                                    </div>
                                </div>
                                <div className={styles.orBox}>
                                    <span>— OR —</span>
                                </div>
                                <div className={styles.helpText}>
                                    <span>gender and height</span>
                                </div>
                                <div className={styles.genderBox}>
                                    <div id='btn1' className={styles.genderbtn} onClick={handleShowIntroduction}>
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
                                    <div id='btn2' className={styles.btn_setting_up} onClick={handleShowIntroduction}>
                                        <div className={styles.btnsLineMid}>150</div>
                                        <div className={styles.btnsLineTop}>cm</div>
                                        <div className={styles.btnsLineBot}>(59.8in)</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rightCol}>
                                <table id='table_btngroup' className={styles.table_btngroup} width="100%" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td className={styles.td_title}>
                                                <div className={styles.setupCaption}>
                                                    <span>Ventilation Type</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn4' className={styles.setupbtn} onClick={handleShowIntroduction}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn5' className={styles.setupbtn} onClick={handleShowIntroduction}>
                                                    <span>NIV</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn6' className={styles.setupbtn} onClick={handleShowIntroduction}>
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
                                                <div id='btn7' className={styles.setupbtn} onClick={handleShowIntroduction}>
                                                    <span>A/C</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn8' className={styles.setupbtn} onClick={handleShowIntroduction}>
                                                    <span>SIMV</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn9' className={styles.setupbtn} onClick={handleShowIntroduction}>
                                                    <span>SPONT</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn10' className={styles.setupbtn} onClick={handleShowIntroduction}>
                                                    <span>BiLevel</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn11' className={styles.setupbtn} onClick={handleShowIntroduction}>
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
                                                <div id='btn12' className={styles.setupbtn} onClick={handleShowIntroduction}>
                                                    <span>PC</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn13' className={styles.setupbtn} onClick={handleShowIntroduction}>
                                                    <span>VC</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn14' className={styles.setupbtn} onClick={handleShowIntroduction}>
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
                                                <div id='btn15' className={styles.setupbtn} onClick={handleShowIntroduction}>
                                                    <span>PS</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn16' className={styles.setupbtn} onClick={handleShowIntroduction}>
                                                    <span>TC</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn17' className={styles.setupbtn} onClick={handleShowIntroduction}>
                                                    <span>VS</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn18' className={styles.setupbtn} onClick={handleShowIntroduction}>
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
                                                <div id='btn19' className={styles.setupbtn} onClick={handleShowIntroduction}>
                                                    <span>P-Trig</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn20' className={styles.setupbtn} onClick={handleShowIntroduction}>
                                                    <span>-Trig</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn21' className={styles.setupbtn} onClick={handleShowIntroduction}>
                                                    <span>IE Sync</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table id='table_btnsetting' className={styles.table_btnsetting} width="100%" border="0" cellpadding="0" cellspacing="0">
                                    <tbody className='my-5'>
                                    <tr>
                                            <td>
                                                <div id='btn22' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        P<sub>SENS</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        2.0
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        cmH<sub>2</sub>O
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn23' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        <sub>SENS</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        3.0
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        L/min
                                                    </div>
                                                </div>
                                            </td>                                            
                                            <td>
                                                <div id='btn24' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        I<sub>SYNC</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                    <span className={styles.s0}></span>
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                    0
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn25' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        E<sub>SYNC</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                    <span className={styles.s0}></span>
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                    0
                                                    </div>
                                                </div>
                                            </td>
                                            <td></td>
                                            <td>
                                                <div id='btn26' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        O<sub>2</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        30
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        %
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn27' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        f
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        10
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        1/min
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn28' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        PEEP
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        3.0
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        cmH<sub>2</sub>O
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn29' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                    P<sub>PEAK</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        40
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        cmH<sub>2</sub>O
                                                    </div>
                                                </div>
                                            </td>
                                            {/* <td>
                                                <div className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        V<sub>T</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        300
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        mL
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        V<sub>MAX</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        39
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        L/min
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn7' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        P<sub>SUPP</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        10
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        cmH<sub>2</sub>O
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        V <sub>SENS</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        3.0
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        L/min
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        O<sub>2</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        40
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        %
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn8' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        P<sub>PEAK</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        8.0
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        cmH<sub>2</sub>O
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        D<sub>SENS</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        75
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        L/min
                                                    </div>
                                                </div>
                                            </td> */}
                                        </tr>
                                        <tr>
                                            <td>
                                                <div id='btn30' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        P<sub>l</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        15
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        cmH<sub>2</sub>O
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn31' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                    
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        50
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        %
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn32' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        T<sub>I</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        0.84
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        S
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn33' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        I:E
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        1:5.9
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                    &nbsp;
                                                    </div>
                                                </div>
                                            </td>
                                            <td></td>
                                            <td>
                                                <div id='btn34' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        P<sub>SUPP</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        10
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        cmH<sub>2</sub>O
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn35' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                    
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        50
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        %
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn36' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        E<sub>SENS</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        25
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        %
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn37' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        V<sub>Tl</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        750
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        mL
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div id='btn38' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        V<sub>T</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        300
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        mL
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn39' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        <sub>MAX</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        39
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        L/min
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn40' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        T<sub>PL</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        0.0
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        S
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn41' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        Ramp
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                    
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                    &nbsp;
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn42' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        Square
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                    
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                    &nbsp;
                                                    </div>
                                                </div>
                                            </td>
                                            <td></td>
                                            <td>
                                                <div id='btn43' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                    T<sub>l SPONT</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        3.0
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        S
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn44' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        D<sub>SENS</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        60
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        L/min
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn45' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        <sub>CONST</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        30
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        L/min
                                                    </div>
                                                </div>
                                            </td>                                            
                                        </tr>
                                        
                                        {/* <tr>
                                            <td>
                                                <div className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        50
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        %
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        T<sub>PL</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        0.0
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        S
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        Ramp
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        XXX
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        T<sub>l SPONT</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        3.0
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        S
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        E<sub>SENS</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        25
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        %
                                                    </div>
                                                </div>
                                            </td>                                            
                                            <td>
                                                <div className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        PEEP
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        3.0
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        cmH<sub>2</sub>O
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        V<sub>Tl</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        750
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        mL
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        Tube
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        ET
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        Type
                                                    </div>
                                                </div>
                                            </td>
                                        </tr> */}

                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <div className={styles.statBar}>
                
            </div>
            <div className={styles.footer}>
                <div id='introductionBox' className={styles.introduction_box}>
                    <div className={styles.introduction_box_close} onClick={handleIntroductionClose}>
                        X
                    </div>
                    {/* <p>
                        {introductionText}      
                    </p> */}
                    <p dangerouslySetInnerHTML={{ __html: introductionText }} />
                    <div id='btnGroup' className={styles.btnGroup}>
                        <button id='btnFinish' className={styles.btnItem_finish} onClick={handleFinish}>
                            FINISH 
                        </button>
                        <button id='btnPrevious' className={styles.btnItem} onClick={handlePreviosStep}>
                            PREVIOUS 
                        </button>
                        <button id='btnNext' className={styles.btnItem} onClick={() => handleNextStep(stepCount)}>
                            NEXT
                        </button>
                    </div>
                </div>
                {/* <div id='introductionBox2' className={styles.introduction_box}>
                    <Link href="/instruction/vent"> 
                        <button className={styles.introductionBtnLink} target='_blank' rel='noreferrer'>
                            FINISH
                        </button>
                    </Link>
                </div> */}
            </div>
            <footer className={styles.controlpanel_wrap}>
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
                    <div className={styles.controlpanel_knob_box}>
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
        </section>        
    )
}