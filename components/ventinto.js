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
        'เริ่มต้นเลือกเพศของผู้ป่วย เราสามารถกำหนด Predicted body weight โดยการกำหนดผ่านส่วนสูงได้',              
        'เริ่มต้นเลือกเพศของผู้ป่วย เราสามารถกำหนด Predicted body weight โดยการกำหนดผ่านส่วนสูงได้',              
        'เริ่มต้นเลือกเพศของผู้ป่วย เราสามารถกำหนด Predicted body weight โดยการกำหนดผ่านส่วนสูงได้',              
        
        'การใช้เครื่องช่วยหายใจผ่านท่อช่วยหายใจหรือการเจาะคอ',
        'การใช้เครื่องช่วยหายใจผ่านทางหน้ากากครอบจมูกและปาก',
        'การใช้เครื่องเครื่องช่วยหายใจที่ควบคุมการให้ออกซิเจนอัตราการไหลสูง (High flow)',
        'Assist-Control Ventilation คือ โหมดที่ผสมผสานระหว่าง Assisted และ control ventilation โดยผู้ป่วยสามารถช่วยกำหนดจุดเริ่มต้นของการหายใจเข้าได้เอง (Assisted) ',
        'Synchromized intermittent mandatory ventilation คือโหมดที่ผู้ป่วยหายใจเอง (spontaneous ventilation) สลับกับการหายใจจากเครื่องตามที่ตั้งไว้ ',
        'Spontaneous คือ โหมดที่ผู้ป่วยสามารถกำหนดอัตราการหายใจ inspiratory time และ VT ด้วยตัวเอง',
        'Bilevel ventilator คือโหมดที่สามารถหายใจบนแรงดันบวก 2 ระดับ ',
        'Continuous Positive Airway Pressure คือเครื่องอัดแรงดันอากาศผ่านทางจมูกหรือปากขณะหายใจเข้า เพื่อเปิดช่องทางเดินหายใจส่วนต้นให้กว้างขึ้น ',
        'Pressure control ',
        'Volume control ',
        'Volume control plus : Pressure control garuntee Volume',
        'Pressure Support ventilation : ',
        'Tube Compensation ',
        'Volume Support ventilation: ',
        'Proportional Assist Ventilation',
        'Pressure- Trigger ผู้ป่วย Trigger เครื่องด้วยหลักการของ Pressure',
        'Flow Trigger ผู้ป่วย Trigger เครื่องด้วยหลักการของ Flow',
        'IE Synchrony Software ',
        'Total respiratory rate :  อัตราการหายใจของผู้ป่วยทั้งหมด',
        'Inspiratory Pressure : แรงดันอากาศหายใจเข้า',
        'Inspiratory time : ช่วงเวลาในการหายใจเข้า ',
        'Expiratory  time : ช่วงเวลาในการหายใจออก',
        'Flow  Sensitivity : ค่าความไวในการ Trigger เครื่องด้วยหลักการของ Flow',
        'Pressure  Sensitivity  :ค่าความไวในการ Trigger เครื่องด้วยหลักการของ Pressure',
        'Oxygen percentage : ความเข้มข้นของออกซิเจนในอากาศที่จ่ายให้ผู้ป่วย',
        'set limitation of  High Peak circuit pressure : ค่าขีดจำกัดความดันลมในสายเครื่องช่วยหายใจสูงสุดที่ต้องการกำหนด โดยจะเตือนเมื่อความดันในสายสูงเกินกำหนด ',
        '%Rise Time : การตั้งอัตราเร่งการไหลของลมขณะหายใจเข้า หน่วยเป็น %',
        'Positive end expiratory pressure : แรงดันบวกของอากาศหายใจที่ค้างอยู่ในปอดเมื่อสิ้นสุดการหายใจออก',
        'Pressure  Support :แรงดันสนับสนุนเมื่อผู้ป่วยหายใจด้วย Spontaneoue mode หรือ Spontaneouse breath ใน SIMV หน่วยเป็น cmH2O ',
        'Expiratory Sensitivity :ระดับความไวในการหายใจออก หน่วยเป็น % ',
        'Tidal Volume : ปริมาตรของลมหายใจหนึ่งครั้ง',
        'Peak inspiratory flow อัตราการไหลของอากาศหายใจเข้าสูงสุด',
        'Plateau time : เวลาที่ตั้งให้ลมหายใจเข้าหยุดค้างในปอดก่อนหายใจออก ',
        'Ramp : Flow Pattern Ramp : รูปแบบการไหลเวียนของอากาศ แบบ Ramp',
        'Squre : Flow pattern Square รูปแบบการไหลเวียนของอากาศ แบบ Squre',
        'set limitation of  High inspire Tidal Volume  : ค่าขีดจำกัดขอปริมาตรอากาศลมหายใจเข้าสูงสุดหนึ่งครั้ง โดยจะเตือนเมื่อปริมาตรสูงกว่ากำหนด  ',
        'High Pressure (in Bilevel)  ระดับความดันในช่วงหายใจเข้า ของโหมด Bilevel ',
        'Low Pressure (in Bilevel) : ระดับความดันในช่วงหายใจออก ของโหมด Billevel ',
        'High Time (in Bilevel) : ช่วงเวลา หน่วยเป็นวินาที เพื่อกำหนดระยะเวลาของ High Pressure (inspiratory) โหมด Bilevel ',
        'Low Time (in Bilevel) :ช่วงเวลา หน่วยเป็นวินาที เพื่อกำหนดระยะเวลาของ low Pressure (expiratory)โหมด Bilevel ',
        'Precent Support มีเฉพาะในโหมด PAV+ และ TC ',
        'ขนาดไซส์ของท่อช่วยหายใจ ใช้สำหรับ โหมด PAV+ และ TC ',
        'ชนิดของท่อช่วยหายใจ ใช้สำหรับ โหมด PAV+ และ TC ',
        'Inspiratory  ระดับความไวในช่วง (-2 ถึง 2) ในการช่วยให้คนไข้กระตุ้นเครื่องช่วยหายใจเวลาหายใจเข้า ',
        'Expiratiory ระดับความไวในช่วง (-2 ถึง 2) ในการช่วยให้คนไข้กระตุ้นเครื่องช่วยหายใจเวลาหายใจออก',
        'Constant Flow ในโหมด High flow Oxygentherapy คือการตั้งอัตราการไหลของอากาศในขณะที่ต้องการใช้ High flow therapy ',
    ]

    function handleNextStep(stepCount) {
        let stepCountNew = stepCount+1;
        setStepCount(stepCountNew);
        console.log(stepCount);

        removeActiveBtn(stepCount);
        activeBtn(stepCountNew);

        setIntroductionText(listInstructionText[stepCount])


        if (stepCount >= 49) {
            document.querySelector('#introductionBox')?.classList.add(styles['hidden']);
            // /instruction/vent
            router.push('/instruction/vent')
        }
    }

    return (
        <section id='ventContainer' className={styles.vent_container}>
            <header className={styles.panel_top}>
                <div className={styles.panel_top_content}>
                    <h2>New Patient Setup</h2>
                    <h3>Vent startup in progress</h3>
                </div>
            </header>
            <main className={styles.main}>
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
                                    <div id='btn3' className={styles.btn_setting_up}>
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
                                    <div id='btn1' className={styles.genderbtn}>
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
                                    <div id='btn2' className={styles.btn_setting_up}>
                                        <div className={styles.btnsLineMid}>50</div>
                                        <div className={styles.btnsLineTop}>kg</div>
                                        <div className={styles.btnsLineBot}>(110)</div>
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
                                                <div id='btn4' className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn5' className={styles.setupbtn}>
                                                    <span>NIV</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn6' className={styles.setupbtn}>
                                                    <span>HFO2T</span>
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
                                                <div id='btn7' className={styles.setupbtn}>
                                                    <span>A/C</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn8' className={styles.setupbtn}>
                                                    <span>SIMV</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn9' className={styles.setupbtn}>
                                                    <span>SPOINT</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn10' className={styles.setupbtn}>
                                                    <span>BiLevel</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn11' className={styles.setupbtn}>
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
                                                <div id='btn12' className={styles.setupbtn}>
                                                    <span>PC</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn13' className={styles.setupbtn}>
                                                    <span>VC</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn14' className={styles.setupbtn}>
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
                                                <div id='btn15' className={styles.setupbtn}>
                                                    <span>PS</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn16' className={styles.setupbtn}>
                                                    <span>TC</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn17' className={styles.setupbtn}>
                                                    <span>VS</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn18' className={styles.setupbtn}>
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
                                                <div id='btn19' className={styles.setupbtn}>
                                                    <span>P-Trig</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn20' className={styles.setupbtn}>
                                                    <span>V-Trig</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn21' className={styles.setupbtn}>
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
                                                <div id='btn22' className={styles.btn_setting}>
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
                                                <div id='btn23' className={styles.btn_setting}>
                                                    <div className={styles.btnsLineTop}>
                                                        P<sub>i</sub>
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
                                                <div id='btn24' className={styles.btn_setting}>
                                                    <div className={styles.btnsLineTop}>
                                                        T<sub>i</sub>
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
                                                <div id='btn25' className={styles.btn_setting}>
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
                                                <div id='btn26' className={styles.btn_setting}>
                                                    <div className={styles.btnsLineTop}>
                                                        V<sub>SENS</sub>
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
                                                <div id='btn27' className={styles.btn_setting}>
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
                                                <div id='btn28' className={styles.btn_setting}>
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
                                                <div id='btn29' className={styles.btn_setting}>
                                                    <div className={styles.btnsLineTop}>
                                                        P<sub>peak</sub>
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
                                                <div className={styles.btn_setting}>
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
                                                <div className={styles.btn_setting}>
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
                                                <div id='btn7' className={styles.btn_setting}>
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
                                                <div className={styles.btn_setting}>
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
                                                <div className={styles.btn_setting}>
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
                                                <div id='btn8' className={styles.btn_setting}>
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
                                                <div className={styles.btn_setting}>
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
                                                <div id='btn30' className={styles.btn_setting}>
                                                    <div className={styles.btnsLineTop}>
                                                        P
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
                                                <div id='btn31' className={styles.btn_setting}>
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
                                                <div id='btn32' className={styles.btn_setting}>
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
                                                <div id='btn33' className={styles.btn_setting}>
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
                                                <div id='btn34' className={styles.btn_setting}>
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
                                                <div id='btn35' className={styles.btn_setting}>
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
                                                <div id='btn36' className={styles.btn_setting}>
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
                                                <div id='btn37' className={styles.btn_setting}>
                                                    <div className={styles.btnsLineTop}>
                                                        R<sub>amp</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        [\]
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div id='btn38' className={styles.btn_setting}>
                                                    <div className={styles.btnsLineTop}>
                                                        R<sub>amp</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        [|]
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn39' className={styles.btn_setting}>
                                                    <div className={styles.btnsLineTop}>
                                                        V<sub>T</sub>
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
                                                <div id='btn40' className={styles.btn_setting}>
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
                                                <div id='btn41' className={styles.btn_setting}>
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
                                                <div id='btn42' className={styles.btn_setting}>
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
                                                <div id='btn43' className={styles.btn_setting}>
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
                                                <div id='btn44' className={styles.btn_setting}>
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
                                                <div id='btn45' className={styles.btn_setting}>
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
                                                <div id='btn46' className={styles.btn_setting}>
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
                                                <div id='btn47' className={styles.btn_setting}>
                                                    <div className={styles.btnsLineTop}>
                                                        I<sub>sync</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        []
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        0
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn48' className={styles.btn_setting}>
                                                    <div className={styles.btnsLineTop}>
                                                        E<sub>sync</sub>
                                                    </div>
                                                    <div className={styles.btnsLineMid}>
                                                        []
                                                    </div>
                                                    <div className={styles.btnsLineBot}>
                                                        0
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div id='btn49' className={styles.btn_setting}>
                                                    <div className={styles.btnsLineTop}>
                                                        V<sub>CONT</sub>
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
                                                <div className={styles.btn_setting}>
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
                                                <div className={styles.btn_setting}>
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
                                                <div className={styles.btn_setting}>
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
                                                <div className={styles.btn_setting}>
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
                                                <div className={styles.btn_setting}>
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
                                                <div className={styles.btn_setting}>
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
                                                <div className={styles.btn_setting}>
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
                                                <div className={styles.btn_setting}>
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
                    <h2>
                        {/* {introductionTitle} */}
                        {introductionText}  
                    </h2>
                    {/* <p>
                        {introductionText}      
                    </p> */}
                    <button id='btnNext' className={styles.btn_next} onClick={() => handleNextStep(stepCount)}>
                        NEXT
                    </button>
                    {/* <button id='btnNext' className={styles.btn_start} onClick={() => handleNextStep(stepCount)}>
                        FINISH
                    </button> */}
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