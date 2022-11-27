import * as React from "react";
import Image from 'next/image'
import styles from './brainInstall.module.scss'
import Moveable from "react-moveable"; // preact-moveable
// https://daybrush.com/moveable/storybook/?path=/story/basic--origindraggable
export default function BrainInstall() {
    const [varX, setVarX] = React.useState();
    const [varY, setVarY] = React.useState();
    const [varR, setVarR] = React.useState();
    const [target, setTarget] = React.useState();
    const [frame, setFrame] = React.useState({
        translate: [0,0],
        rotate: 0,
        transformOrigin: "50% 50%",
    });
    React.useEffect(() => {
        setTarget(document.querySelector("#traget"));
    }, []);
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