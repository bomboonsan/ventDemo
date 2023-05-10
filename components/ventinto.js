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
        'เริ่มต้นการตั้งค่าด้วยการใส่น้ำหนักผู้ป่วย หรือเลือกเพศ และสามารถกำหนด Predicted body weight โดยการกำหนดผ่านส่วนสูงได้',              
        'เริ่มต้นการตั้งค่าด้วยการใส่น้ำหนักผู้ป่วย หรือเลือกเพศ และสามารถกำหนด Predicted body weight โดยการกำหนดผ่านส่วนสูงได้',              
        'เริ่มต้นการตั้งค่าด้วยการใส่น้ำหนักผู้ป่วย หรือเลือกเพศ และสามารถกำหนด Predicted body weight โดยการกำหนดผ่านส่วนสูงได้',              
        // 'เริ่มต้นเลือกเพศของผู้ป่วย เราสามารถกำหนด Predicted body weight โดยการกำหนดผ่านส่วนสูงได้',          
        
        'การใช้เครื่องช่วยหายใจผ่านท่อช่วยหายใจหรือท่อเจาะคอ  ท่อหลอดลมคอ',
        'การใช้เครื่องช่วยหายใจผ่านทางหน้ากากครอบจมูกและปาก',
        'การใช้เครื่องช่วยหายใจที่ควบคุมการให้ออกซิเจนอัตราการไหลสูง การให้ออกซิเจนที่มีอัตราการไหลสูง High Flow Oxygen Therapy',
        'Assist-Control Ventilation คือ โหมดที่ผสมผสานระหว่าง Assisted และ control ventilation โดยผู้ป่วยสามารถช่วยกำหนดจุดเริ่มต้นของการหายใจเข้าได้เอง (Assisted)         ',
        'Synchromized intermittent mandatory ventilation คือโหมดที่ผู้ป่วยหายใจเอง (spontaneous ventilation) สลับกับการหายใจจากเครื่องตามที่ตั้งไว้ ',
        'Spontaneous คือ เครื่องให้แรงดันบวกโดยผู้ป่วยหายใจเองและกำหนดอัตราการหายใจ inspiratory time และ VT ด้วยตัวเอง         ',
        'Bilevel ventilator คือโหมดที่สามารถหายใจบนแรงดันบวก 2 ระดับ ',
        'Continuous position airway pressure คือเครื่องอัดแรงดันอากาศผ่านทางจมูกหรือปากขณะหายใจเข้า เพื่อเปิดช่องทางเดินหายใจส่วนต้นให้กว้างขึ้น ',
        'Pressure control ',
        'Volume control',
        'Volume control plus : Pressure control guarantee volume',
        'Pressure support ventilation ',
        'Tube compensation',
        'Volume support ventilation',
        'Proportional assist ventilation',
        'Pressure - trigger ผู้ป่วย trigger เครื่องด้วยหลักการของ pressure',
        'Flow trigger ผู้ป่วย trigger เครื่องด้วยหลักการของ flow',
        'IE synchrony software',
        'Total respiratory rate :  อัตราการหายใจของผู้ป่วยทั้งหมด',
        'Inspiratory pressure : แรงดันอากาศหายใจเข้า',
        'Inspiratory time : ช่วงเวลาในการหายใจเข้า ระยะ        ',
        'Expiratory  time : ช่วงเวลาในการหายใจออก  ระยะ        ',
        'Flow  Sensitivity : ค่าความไวในการ Trigger เครื่องด้วยหลักการของ Flow  ค่าความไวในการ Trigger เครื่องโดยอาศัยการเปลี่ยนแปลงของการไหลของอากาศ        ',
        'Pressure  Sensitivity  :ค่าความไวในการ Trigger เครื่องด้วยหลักการของ Pressure  ค่าความไวในการ Trigger เครื่องโดยอาศัยการเปลี่ยนแปลงของความดัน ',
        'Oxygen percentage : ความเข้มข้นของออกซิเจนในอากาศที่จ่ายให้ผู้ป่วย',
        'Set limitation of  high peak circuit pressure : ค่าขีดจำกัดความดันลมในสายเครื่องช่วยหายใจสูงสุดที่ต้องการกำหนด โดยจะเตือนเมื่อความดันในสายสูงเกินกำหนด ',
        '%Rise time : การตั้งอัตราเร่งการไหลของลมขณะหายใจเข้า หน่วยเป็น %',
        'Positive end expiratory pressure : แรงดันบวกของอากาศหายใจที่ค้างอยู่ในปอดเมื่อสิ้นสุดการหายใจออก',
        'Pressure  Support : แรงดันสนับสนุนเมื่อผู้ป่วยหายใจด้วย spontaneoue mode หรือ spontaneouse breath ใน SIMV หน่วยเป็น cmH2O ',
        'Expiratory sensitivity : ระดับความไวในการหายใจออก หน่วยเป็น % ',
        'Tidal volume : ปริมาตรของลมหายใจหนึ่งครั้ง',
        'Peak inspiratory flow : อัตราการไหลของอากาศหายใจเข้าสูงสุด',
        'Plateau time : เวลาที่ตั้งให้ลมหายใจเข้าหยุดค้างในปอดก่อนหายใจออก ',
        'Ramp : flow pattern ramp : รูปแบบการไหลเวียนของอากาศ แบบ Ramp',
        'Squre : flow pattern square รูปแบบการไหลเวียนของอากาศ แบบ Squre',
        'Set limitation of  high inspire tidal volume : ค่าขีดจำกัดขอปริมาตรอากาศลมหายใจเข้าสูงสุดหนึ่งครั้ง โดยจะเตือนเมื่อปริมาตรสูงกว่ากำหนด  ',
        'High pressure (in bilevel) : ระดับความดันในช่วงหายใจเข้า ของโหมด bilevel ',
        'Low pressure (in bilevel) : ระดับความดันในช่วงหายใจออก ของโหมด bilevel ',
        'High time (in bilevel) : ช่วงเวลา หน่วยเป็นวินาที เพื่อกำหนดระยะเวลาของ high pressure (inspiratory) โหมด bilevel ',
        'Low time (in bilevel) : ช่วงเวลา หน่วยเป็นวินาที เพื่อกำหนดระยะเวลาของ low pressure (expiratory)โหมด bilevel ',
        'Precent support มีเฉพาะในโหมด PAV+ และ TC ',
        'ขนาดไซส์ของท่อช่วยหายใจ ใช้สำหรับ โหมด PAV+ และ TC ',
        'ชนิดของท่อช่วยหายใจ ใช้สำหรับ โหมด PAV+ และ TC ',
        'Inspiratory  ระดับความไวในช่วง (-2 ถึง 2) ในการช่วยให้คนไข้กระตุ้นเครื่องช่วยหายใจเวลาหายใจเข้า ',
        'Expiratiory ระดับความไวในช่วง (-2 ถึง 2) ในการช่วยให้คนไข้กระตุ้นเครื่องช่วยหายใจเวลาหายใจออก',
        'Constant flow ในโหมด high flow oxygentherapy : คือการตั้งอัตราการไหลของอากาศในขณะที่ต้องการใช้ high flow therapy ',
        'Disconnect sensitivity : เป็นการตั้งค่าที่อนุญาตให้สูญเสีย (เปอร์เซ็นต์) ปริมาตรของอากาศในการหายใจเพื่อลดการเกิดการแจ้งเตือน Circuit disconnect ในกรณีที่เปิดระบบการชดเชยการรั่วของอากาศ Disconnect Sensitivity จะเป็นการตั้งปริมาตรการรั่วสูงสุดที่เครื่องจะชดเชยให้โดยมีหน่วยเป็น ลิตรต่อนาที (L/min)        ',
        '"High Spontaneous Inspiratory Time Limit เมื่อเวลาหายใจเข้าของผู้ป่วยถึงหรือเกินขีดจำกัดที่ตั้งไว้ เครื่องช่วยหายใจจะเปลี่ยน จากหายใจเข้าเป็นหายใจออก"         ',
        'การตั้งค่าเครื่องช่วยหายใจเพื่อรับรองกรณีที่คนไข้มีภาวะหยุดหายใจ',
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


        if (stepCount >= 49) {
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
                                    <tbody>
                                    <tr>
                                            <td>
                                                <div id='btn22' className={styles.btn_setting} onClick={handleShowIntroduction}>
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
                                                <div id='btn23' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        P<sub>I</sub>
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
                                                <div id='btn24' className={styles.btn_setting} onClick={handleShowIntroduction}>
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
                                                <div id='btn25' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        T<sub>E</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        5.17
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        S
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn26' className={styles.btn_setting} onClick={handleShowIntroduction}>
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
                                                <div id='btn27' className={styles.btn_setting} onClick={handleShowIntroduction}>
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
                                                <div id='btn28' className={styles.btn_setting} onClick={handleShowIntroduction}>
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
                                                <div id='btn31' className={styles.btn_setting} onClick={handleShowIntroduction}>
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
                                                <div id='btn32' className={styles.btn_setting} onClick={handleShowIntroduction}>
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
                                                <div id='btn33' className={styles.btn_setting} onClick={handleShowIntroduction}>
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
                                                <div id='btn34' className={styles.btn_setting} onClick={handleShowIntroduction}>
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
                                                <div id='btn35' className={styles.btn_setting} onClick={handleShowIntroduction}>
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
                                                <div id='btn36' className={styles.btn_setting} onClick={handleShowIntroduction}>
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
                                                <div id='btn37' className={styles.btn_setting} onClick={handleShowIntroduction}>
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
                                        </tr>
                                        <tr>
                                            <td>
                                                <div id='btn38' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        Ramp
                                                    </div>                                                    
                                                    <div className={styles.btnsLineMid}>
                                                        <i>
                                                        
                                                        </i>
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                    &nbsp;
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn39' className={styles.btn_setting} onClick={handleShowIntroduction}>
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
                                                <div id='btn40' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        P<sub>H</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        18
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        cmH<sub>2</sub>O
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn41' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        P<sub>L</sub>
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
                                                <div id='btn42' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        T<sub>H</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        0.46
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        S
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn43' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        T<sub>L</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        5.16
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        S
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn44' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        %SUPP
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        70
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        %
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn45' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        Tube I.D.
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        8.0
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        mm
                                                    </div>
                                                </div>
                                            </td>                                            
                                        </tr>

                                        <tr>
                                            <td>
                                                <div id='btn46' className={styles.btn_setting} onClick={handleShowIntroduction}>
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
                                            <td>
                                                <div id='btn47' className={styles.btn_setting} onClick={handleShowIntroduction}>
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
                                                <div id='btn48' className={styles.btn_setting} onClick={handleShowIntroduction}>
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
                                            <td>
                                                <div id='btn49' className={styles.btn_setting} onClick={handleShowIntroduction}>
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
                                            <td>
                                                <div id='btn50' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                        P<sub>SENS</sub>
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
                                                <div id='btn51' className={styles.btn_setting} onClick={handleShowIntroduction}>
                                                    <div className={styles.btnsLineTop}>
                                                    T<sub>l SPONT</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        3.0
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        Squre
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
                    <p>
                        {introductionText}      
                    </p>
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