import { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from './brainInstall.module.scss'
import Moveable from "react-moveable"; // preact-moveable
// https://daybrush.com/moveable/storybook/?path=/story/basic--origindraggable
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function BrainInstall() {
    const size = useWindowSize();
    const handle = useFullScreenHandle();
    let [hin, setHin] = useState(null);
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

    if ((size.width / varX ) < 3.8 && (size.width / varX ) > 3.0 && (size.height / varY ) < 5.0 && (size.height / varY ) > 4.0 )  {
        if (status==null) {
            setStatus('In Area');
        }
        if (varR > -12 && varR < -3) {
            if (status=='In Area') {
                setStatus('Complete');
            } 
        } else if (status=='Complete') {
            setStatus('In Area');
        }
    } else {
        if (status=='Complete') {
            setStatus(null);
        }
        if (status=='In Area') {
            setStatus(null);
        }
    }

    // Element
    let hinWrong =  
    (
        <div className={styles.hin_area}>
            <h4>ผิด !</h4>
            <p>ลูกศร ต้องอยู่ ห่างจาก ตา 2 Ince</p>
            <p>ลูกศร ต้องอยู่ ตรงกับแกนกลางหน้า</p>
            <p>หมายเลขสาม อยู่ระหว่าง ผม และ หางตา บริเวณขยับ</p>
            <p>เลข2และเลขสี เรียงไปตามหัวคิ้ว</p>
        </div>
    )

    let hinCorrect =  
    (
        <div className={styles.hin_area}>
            <h4>ถูกต้อง !</h4>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi
            </p>
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
            setHin(1)
        } else {
            setHin(0)
        }
    }
    

    return (
        <div className={styles.traget_container}>
            <div className={styles.bg_area}>
                <Image
                    className={styles.womanbg}
                    src="/images/imageBrain1.png"
                    alt="Women"
                    // layout="fill"
                    // objectFit="cover"
                    draggable='false'
                    width={3840}
                    height={2160}
                />
            </div>
            <div className={styles.dropArea}></div>
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
        <div className={styles.log_wrapper}>
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
        </div>
        {/* <div className={styles.hin_area}>
            {}
        </div> */}
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