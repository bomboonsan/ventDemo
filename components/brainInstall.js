import { useState, useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './brainInstall.module.scss'
import Moveable from "react-moveable"; // preact-moveable
// https://daybrush.com/moveable/storybook/?path=/story/basic--origindraggable
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function BrainInstall() {
    const router = useRouter()
    const size = useWindowSize();
    const handle = useFullScreenHandle();
    let [hin, setHin] = useState(null);
    const [bg, setBg] = useState('/images/imageBrain1.png');
    const [varX, setVarX] = useState();
    const [varY, setVarY] = useState();
    const [varR, setVarR] = useState();
    const [status, setStatus] = useState(null);
    const [target, setTarget] = useState();
    const [frame, setFrame] = useState({
        translate: [0,0],
        rotate: 9.3,
        transformOrigin: "50% 50%",
    });
    useEffect(() => {
        setTarget(document.querySelector("#traget"));
        setHin('ลูกศร ต้องอยู่ ห่างจาก ตา 2 Ince ลูกศร ต้องอยู่ ตรงกับแกนกลางหน้า');
    }, []);

    const makeFullScreen = (el) => {
        if (!document.fullscreenElement) {
          el.requestFullscreen();
          return;
       } 
         document.exitFullscreen();
      
     }

    if ((size.width / varX ) < 3.8 && (size.width / varX ) > 3.0 && (size.height / varY ) < 5.2 && (size.height / varY ) > 4.3 )  {
        if (status==null) {
            setStatus('In Area');
        }
        if (varR > -18 && varR < -10) {
            if (status=='In Area') {
                setStatus('Complete');                
                document.querySelector('#switchIcon').classList.add(styles['show']);
            } 
        } else if (status=='Complete') {
            setStatus('In Area');
            document.querySelector('#switchIcon').classList.remove(styles['show']);
        }
    } else {
        if (status=='Complete') {
            setStatus(null);       
            document.querySelector('#switchIcon').classList.remove(styles['show']);     
        }
        if (status=='In Area') {
            setStatus(null);
            document.querySelector('#switchIcon').classList.remove(styles['show']);
        }
    }

    // Element
    let hinWrong =  
    (
        <div className={styles.hin_area}>
            <h4>ผิด !</h4>
            <p>ลูกศรที่หมายเลข 1 ต้องอยู่ห่างจากสันจมูกระหว่างหัวตาขึ้นไป 2 นิ้ว</p>
            {/* <p>ลูกศร ต้องอยู่ ห่างจาก ตา 2 นิ้ว</p>
            <p>ลูกศร ต้องอยู่ ตรงกับแกนกลางหน้า</p> */}
            <p>หมายเลข 3 ติดอยู่บริเวณขมับให้อยู่ในระดับเดียวกับหางตา</p>
            <p>หมายเลข 2 และเลข 4 เรียงไปตามบริเวณเหนือคิ้ว</p>
        </div>
    )

    let hinCorrect =  
    (
        <div className={styles.hin_area}>
            <h4>ถูกต้อง !</h4>
        </div>
    )
    let hinElement = null
    if (hin===0) {
        hinElement = hinWrong
    } else if (hin===1) {
        hinElement = hinCorrect
    } else {
        hinElement = null
    }

    function handleCheck() {
        if (status == 'Complete') {
            // setHin(1)
            router.push('/brain/sensor')
        } else {
            setHin(0)
        }
    }

    function handleSwitch() {
        if (bg == '/images/imageBrain1.png') {
            setBg('/images/SideView.png');
            document.querySelector('#traget').classList.add(styles['invisible']);
            document.querySelector('#dropArea').classList.add(styles['invisible']);
            document.querySelector('.moveable-control').classList.add(styles['invisible']);

            document.querySelector('#switchIcon').classList.add(styles['rotated']);
        } else {
            setBg('/images/imageBrain1.png');
            document.querySelector('#traget').classList.remove(styles['invisible']);
            document.querySelector('#dropArea').classList.remove(styles['invisible']);
            document.querySelector('.moveable-control').classList.remove(styles['invisible']);

            document.querySelector('#switchIcon').classList.remove(styles['rotated']);
        }
    }
    

    return (
        <div id='brainInstall_container' className={styles.traget_container}>
            <div className={styles.bg_area}>
                <Image
                    className={styles.womanbg}
                    src={bg}
                    alt="Women"
                    // layout="fill"
                    // objectFit="cover"
                    draggable='false'
                    width={3840}
                    height={2160}
                />
            </div>
            <div id="dropArea" className={styles.dropArea}></div>
        <div id="traget" className={styles.traget_item}>
            <Image
                className={styles.bis_item}
                src="/images/bis.png"
                alt="BIS"
                // layout="fill"
                // objectFit="cover"
                width={1905}
                height={605}
            />   
        </div>
        {/* <div className={styles.log_wrapper}>
            <p>
                X : {varX}
            </p>
            <p>
                Y : {varY}
            </p>
            <p>
                R : {varR}
            </p>
            <p>
                S W : {size.width}
            </p>
            <p>
                S H : {size.height}
            </p>
            <p>
                Status : {status}
            </p>
        </div> */}
        {/* <div className={styles.hin_area}>
            {}
        </div> */}

        <div id='switchIcon' className={styles.changeView}>
            <Image
                src="/images/switch.png"
                alt="BIS"
                // layout="fill"
                // objectFit="cover"
                width={1905}
                height={605}
                onClick={handleSwitch}
            />   
        </div>
        {hinElement}
        <div className={styles.btn_group}>
            <button onClick={handleCheck}>
            Confirm
            </button>
        </div>
            <Moveable
                target={target}
                originDraggable={true}
                originRelative={true}
                draggable={true}
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
                    console.log(e.target.style.transform);
                    setVarX(translate[0])
                    setVarY(translate[1])
                    setVarR(rotate)
                }}
            />
        </div>
    )
}


// Hook
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      // only execute all the code below in client side
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      
      // Add event listener
      window.addEventListener("resize", handleResize);
       
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}