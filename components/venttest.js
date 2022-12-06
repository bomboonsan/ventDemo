import { useState, useEffect } from 'react';
import styles from './venttest.module.scss'
import Image from 'next/image'
import Link from "next/link";
import Moveable from "react-moveable"; // preact-moveable

export default function VentTest() {
    const [stepCount, setStepCount] = useState(1);
    const [isSetWeight, setIsSetWeight] = useState(0);
    const [isSetHeight, setIsSetHeight] = useState(0);
    const [target, setTarget] = useState();
    const [varX, setVarX] = useState();
    const [varY, setVarY] = useState();
    const [varR, setVarR] = useState(0);    
    const [status, setStatus] = useState(null);
    const [frame, setFrame] = useState({
        translate: [0,0],
        rotate: 1,
        transformOrigin: "50% 50%",
    });

    // Var Control
    const [weight, setWeight] = useState(50);
    const [height, setHeight] = useState(152);

    useEffect(() => {
        // let btn1 = document.querySelector('#btn1');
        setTarget(document.querySelector("#traget"));
    }, []);

    useEffect(() => {
        // let btn1 = document.querySelector('#btn1');
        if(isSetWeight == 1) {
            if (varR == 0) {
                console.log('varR=0');
            } else {
                let newWeight = Number(weight)+(varR/360);
                console.log(newWeight);
                setWeight(newWeight.toFixed(1));


            }
    
            // setWeight(Number(weight)+(Number(weight)*(varR/360)));
        }
        if(isSetHeight == 1) {
            if (varR == 0) {
                console.log('varR=0');
            } else {
                let newHeight = Number(height)+(varR/360);
                console.log(newHeight);
                setHeight(newHeight.toFixed(1));


            }
    
            // setWeight(Number(weight)+(Number(weight)*(varR/360)));
        }
    }, [varR]);

    // FN Setup
    const handleClick = (event) => {
        event.currentTarget.classList.add(styles['btn_setting_up_active']);
        console.log(event.currentTarget);
    };

    const handleSetWeight = (event) => {
        event.currentTarget.classList.add(styles['btn_setting_up_active']);
        setIsSetWeight(1)
        resetRotate()
    };
    const handleSetHeight = (event) => {
        event.currentTarget.classList.add(styles['btn_setting_up_active']);
        setIsSetHeight(1)
        resetRotate()
    };


    const resetRotate = () => {
        console.log('reset');
        setVarR(0);
        setFrame(
            {
                translate: [0,0],
                rotate: 1,
            }
        )
    }
    // if(isSetWeight == 1) {
    //     let newWeight = Number(weight)+1;
    //     console.log(newWeight);
    //     // setWeight(newWeight);

    //     // setWeight(weight+(weight*(varR/360)));
    // }

    return (
        <section className={styles.vent_container}>
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
                                    <div id='btn1' className={styles.btn_setting_up} onClick={event => handleSetWeight(event)}>
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
                                    <div className={styles.btn_setting_up} onClick={event => handleSetHeight(event)}>
                                        <div className={styles.btnsLineMid}>{height}</div>
                                        <div className={styles.btnsLineTop}>cm</div>
                                        <div className={styles.btnsLineBot}>(110)</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rightCol}>
                                <table className={styles.table_btngroup} width="100%" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td className={styles.td_title}>
                                                <div className={styles.setupCaption}>
                                                    <span>Ventilation Type</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
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
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.td_title}>
                                                <div className={styles.setupCaption}>
                                                    <span>Ventilation Type</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
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
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
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
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.setupbtn}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className={styles.table_btnsetting} width="100%" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                    <tr>
                                            <td>
                                                <div className={styles.btn_setting}>
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
                                                <div className={styles.btn_setting}>
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
                                                <div className={styles.btn_setting}>
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
                                            </td>
                                        </tr>
                                        
                                        <tr>
                                            <td>
                                                <div id='btn2' className={styles.btn_setting}>
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
                                                <div id='btn3' className={styles.btn_setting}>
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
                                        </tr>

                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <div className={styles.statBar}>
                {/* <div className={styles.log_box}>
                    {varR} degree
                </div> */}
            </div>
            <div className={styles.footer}>
                {/* <div id='introductionBox' className={styles.introduction_box}>
                    <button id='btnNext' className={styles.btn_start}>
                        FINISH
                    </button>
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
    )
}