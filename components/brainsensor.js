import { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from './brainsensor.module.scss'
import Moveable from "react-moveable"; // preact-moveable
// https://daybrush.com/moveable/storybook/?path=/story/basic--origindraggable
import { useRouter } from 'next/router'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ReactPlayer from 'react-player'

// แก้ดีไซน์ พวกกล่องข้อความ ให่้ bg:white border:pink color:blue เหมือนกันทั้งโปรเจ็ค
// ปุ่ม rotate เอาออก

// https://www.freepik.com/premium-vector/hand-cursor_2006824.htm#query=finger%20icon&position=22&from_view=search&track=sph
// ปกติ 3
// Hover เป็น 1
// เวลากดที่ 2,4 แล้วให้มีสีฉาบเป็นสีเหลือง

// ไม่ต้องแสดงในหน้าจอ monitor แบบเรลไทม์แล้ว
// กด ปุ่ม 1 , 2 , 4 แล้วค่อยหมุนไปด้านข้างเพื่อกดเลข 3
// กรณีที่ผู้เล่นกดโดนตัวเลขกด ให้มีข่้อความขึ้นมาแสดงเตือน เพื่อไม่ให้กด        
// เมื่อกดรอบ 1 , 2 , 3 , 4 แล้วให้หน้าจอมาแสดง เขียวที่ 1 , 3 และสีแดงที่ 2 ,4 เพื่อให้ผู้เล่นกดที่ตัวเลข 2 ,4 ให้แน่นแล้วปุ่ม 2 ,4 ในหน้าจอจะเปลี่ยนเป็นสีเขียว
//  Compele


export default function BrainSensor() {    
    const router = useRouter()
    // Confirm
    const [alertText, setAlertText] = useState(null);
    const [btnName, setBtnName] = useState(null);

    // video 
    // const videoInstall = '../video/brainVideo.mp4'
    const videoInstall = 'https://wish-integrate.com/vent-video/bismonitor_Trim2.mp4'
    const [playing, setPlaying] = useState(false);
    const [urlVideo, setUrlVideo] = useState(videoInstall);

    useEffect(() => {
        if (btnName == null) {
            // btnGroup
            document.querySelector('#btnGroup').classList.add(styles['hidden']);
        } else {
            document.querySelector('#btnGroup').classList.remove(styles['hidden']);
        }
    }, [btnName]);


    const [bg, setBg] = useState('/images/imageBrain6.png');


    const [statusCheck, setStatusCheck] = useState([]);



    const [status1, setStatus1] = useState('/images/BrainMonitoring-item-blank.png');
    const [status2, setStatus2] = useState('/images/BrainMonitoring-item-blank.png');
    const [status3, setStatus3] = useState('/images/BrainMonitoring-item-blank.png');
    const [status4, setStatus4] = useState('/images/BrainMonitoring-item-blank.png');


    const [varImage, setVarImage] = useState('/images/BrainMonitoring-item1.png');
    const showFinish = () => {
        setVarImage('/images/BrainMonitoring-item2.png')
    }

    function popUpStart() {
        document.querySelector('#popupContent').classList.add(styles['hidden']);
        // document.documentElement.requestFullscreen();
    }

    const replace = () => {
        setStatus1('/images/BrainMonitoring-item-blank.png')
        setStatus2('/images/BrainMonitoring-item-blank.png')
        setStatus3('/images/BrainMonitoring-item-blank.png')
        setStatus4('/images/BrainMonitoring-item-blank.png')
    }

    const number1Fail = () => {
        // setStatus1('/images/BrainMonitoring-item-1red.png')
        if (status1 == '/images/BrainMonitoring-item-1red.png') {
            setStatus2('/images/BrainMonitoring-item-1green.png')
        } else if (status1 == '/images/BrainMonitoring-item-1green.png') {
            showAler3()
        } else {
            setAlertText('ระวัง! การติดเซนเซอร์ควรเริ่มจากกดบริเวณโดยรอบของอิเล็กโทรดเท่านั้นเพื่อให้กาวของเซนเซอร์ยึดติดกับผิวของคนไข้ การกดบริเวณอิเล็กโทรดโดยตรงตั้งแต่เริ่มต้นจะทำให้เจลนำสัญญากระจายออกมาที่บริเวณกาว ทำให้เซนเซอร์ลื่นและไม่ยึดติดกับผิวของคนไข้ทำให้การรับสัญญาณไม่มีประสิทธิภาพ')
            showALert()
        }
    }
    const number2Fail = (event) => {
        // setStatus2('/images/BrainMonitoring-item-2red.png')
        if (status2 == '/images/BrainMonitoring-item-2red.png') {
            setStatus2('/images/BrainMonitoring-item-2green.png')
            // onPulse
            document.querySelector('#noTouchArea_2')?.classList.add(styles['onPulse']);
        } else {
            // setStatus4('/images/BrainMonitoring-item-4red.png')
            setAlertText('ระวัง! การติดเซนเซอร์ควรเริ่มจากกดบริเวณโดยรอบของอิเล็กโทรดเท่านั้นเพื่อให้กาวของเซนเซอร์ยึดติดกับผิวของคนไข้ การกดบริเวณอิเล็กโทรดโดยตรงตั้งแต่เริ่มต้นจะทำให้เจลนำสัญญากระจายออกมาที่บริเวณกาว ทำให้เซนเซอร์ลื่นและไม่ยึดติดกับผิวของคนไข้ทำให้การรับสัญญาณไม่มีประสิทธิภาพ')
            showALert()
        }
    }
    const number3Fail = () => {
        // setStatus3('/images/BrainMonitoring-item-3red.png')
        if (status3 == '/images/BrainMonitoring-item-3red.png') {
            setStatus2('/images/BrainMonitoring-item-3green.png')
        } else if (status3 == '/images/BrainMonitoring-item-3green.png') {            
            showAler3()
        } else {
            if (statusCheck.includes('1_1') && statusCheck.includes('1_2') && statusCheck.includes('1_3') && statusCheck.includes('1_4') && statusCheck.includes('2_1') && statusCheck.includes('2_2') && statusCheck.includes('4_1') && statusCheck.includes('4_2') && statusCheck.includes('4_3') && statusCheck.includes('4_4')) {
                setAlertText('ระวัง! การติดเซนเซอร์ควรเริ่มจากกดบริเวณโดยรอบของอิเล็กโทรดเท่านั้นเพื่อให้กาวของเซนเซอร์ยึดติดกับผิวของคนไข้ การกดบริเวณอิเล็กโทรดโดยตรงตั้งแต่เริ่มต้นจะทำให้เจลนำสัญญากระจายออกมาที่บริเวณกาว ทำให้เซนเซอร์ลื่นและไม่ยึดติดกับผิวของคนไข้ทำให้การรับสัญญาณไม่มีประสิทธิภาพ')
                showAlertsideview()
            } else {
                setAlertText('ระวัง! การติดเซนเซอร์ควรเริ่มจากกดบริเวณโดยรอบของอิเล็กโทรดเท่านั้นเพื่อให้กาวของเซนเซอร์ยึดติดกับผิวของคนไข้ การกดบริเวณอิเล็กโทรดโดยตรงตั้งแต่เริ่มต้นจะทำให้เจลนำสัญญากระจายออกมาที่บริเวณกาว ทำให้เซนเซอร์ลื่นและไม่ยึดติดกับผิวของคนไข้ทำให้การรับสัญญาณไม่มีประสิทธิภาพ')
                showALert()
            }            
        }
    }
    const number4Fail = () => {
        if (status4 == '/images/BrainMonitoring-item-4red.png') {
            setStatus4('/images/BrainMonitoring-item-4green.png')
            document.querySelector('#noTouchArea_4')?.classList.add(styles['onPulse']);
        } else {
            // setStatus4('/images/BrainMonitoring-item-4red.png')            
            setAlertText('ระวัง! การติดเซนเซอร์ควรเริ่มจากกดบริเวณโดยรอบของอิเล็กโทรดเท่านั้นเพื่อให้กาวของเซนเซอร์ยึดติดกับผิวของคนไข้ การกดบริเวณอิเล็กโทรดโดยตรงตั้งแต่เริ่มต้นจะทำให้เจลนำสัญญากระจายออกมาที่บริเวณกาว ทำให้เซนเซอร์ลื่นและไม่ยึดติดกับผิวของคนไข้ทำให้การรับสัญญาณไม่มีประสิทธิภาพ')
            showALert()
        }        
    }

    const numberHover = (event) => {
        const touchID = event.currentTarget.getAttribute('data-touchID');
        console.log(touchID)

        document.querySelector('#line'+touchID)?.classList.add(styles['showSensorTouch']);
    }
    const numberHoverOut = (event) => {
        const touchID = event.currentTarget.getAttribute('data-touchID');
        console.log(touchID)

        document.querySelector('#line'+touchID)?.classList.remove(styles['showSensorTouch']);
    }
    const numberTouch = (event) => {
        // if (status1 == '/images/BrainMonitoring-item-1red.png') {
            
        // } else {
        //     setStatus1('/images/BrainMonitoring-item-1green.png')
        // }
        const touchID = event.currentTarget.getAttribute('data-touchID');
        const newArr = statusCheck;
        newArr.push(touchID)
        setStatusCheck(newArr)
        // event.currentTarget.classList.add(styles['touched']);
        document.querySelector('#line'+touchID)?.classList.add(styles['showSensorTouched']);
        checkSwitchStatus()       
    }
    

    const number1Touch = (event) => {
        // if (status1 == '/images/BrainMonitoring-item-1red.png') {
            
        // } else {
        //     setStatus1('/images/BrainMonitoring-item-1green.png')
        // }
        const touchID = event.currentTarget.getAttribute('data-touchID');
        const newArr = statusCheck;
        newArr.push(touchID)
        setStatusCheck(newArr)
        event.currentTarget.classList.add(styles['touched']);
        checkSwitchStatus()       
    }
    const number2Touch = (event) => {
        // if (status2 == '/images/BrainMonitoring-item-2red.png') {
            
        // } else {
        //     setStatus2('/images/BrainMonitoring-item-2green.png')
        // }
        const touchID = event.currentTarget.getAttribute('data-touchID');
        const newArr = statusCheck;
        newArr.push(touchID)
        setStatusCheck(newArr)
        event.currentTarget.classList.add(styles['touched']);
        checkSwitchStatus()       
    }
    const number3Touch = (event) => {
        // if (status3 == '/images/BrainMonitoring-item-3red.png') {
            
        // } else {
        //     setStatus3('/images/BrainMonitoring-item-3green.png')
        // }
        const touchID = event.currentTarget.getAttribute('data-touchID');
        const newArr = statusCheck;
        newArr.push(touchID)
        setStatusCheck(newArr)
        event.currentTarget.classList.add(styles['touched']);
        console.log(touchID)
        checkSwitchStatus()
        

        
    }
    const number4Touch = (event) => {
        // if (status4 == '/images/BrainMonitoring-item-4red.png') {
            
        // } else {
        //     setStatus4('/images/BrainMonitoring-item-4green.png')
        // }
        const touchID = event.currentTarget.getAttribute('data-touchID');
        const newArr = statusCheck;
        newArr.push(touchID)
        setStatusCheck(newArr)
        event.currentTarget.classList.add(styles['touched']); 
        checkSwitchStatus()       
    }

    const confirm = () => {
        if (status1 == '/images/BrainMonitoring-item-1green.png' && status2 == '/images/BrainMonitoring-item-2green.png' && status3 == '/images/BrainMonitoring-item-3green.png' && status4 == '/images/BrainMonitoring-item-4green.png' ) {
            // router.push('/brain/result/sensor')
            document.querySelector('#panel_99').classList.add(styles['showPanel']);
            setBtnName('Next');

            setAlertText('ควรติดเซนเซอร์ให้เรียบร้อยก่อน ให้ยาระงับความรู้สึกกับคนไข้')
            showALert()

            document.querySelector('#touchArea_1_1').classList.add(styles['hidden']);
            document.querySelector('#touchArea_1_2').classList.add(styles['hidden']);
            document.querySelector('#touchArea_1_3').classList.add(styles['hidden']);
            document.querySelector('#touchArea_1_4').classList.add(styles['hidden']);
            document.querySelector('#touchArea_2_1').classList.add(styles['hidden']);
            document.querySelector('#touchArea_2_2').classList.add(styles['hidden']);
            // document.querySelector('#touchArea_2_3').classList.add(styles['hidden']);
            // document.querySelector('#touchArea_2_4').classList.add(styles['hidden']);
            document.querySelector('#touchArea_3_1').classList.add(styles['hidden']);
            document.querySelector('#touchArea_3_2').classList.add(styles['hidden']);
            document.querySelector('#touchArea_4_1').classList.add(styles['hidden']);
            document.querySelector('#touchArea_4_2').classList.add(styles['hidden']);
            document.querySelector('#touchArea_4_3').classList.add(styles['hidden']);
            document.querySelector('#touchArea_4_4').classList.add(styles['hidden']);

            document.querySelector('#noTouchArea_1').classList.add(styles['hidden']);
            document.querySelector('#noTouchArea_2').classList.add(styles['hidden']);
            document.querySelector('#noTouchArea_3').classList.add(styles['hidden']);
            document.querySelector('#noTouchArea_4').classList.add(styles['hidden']);
            
        } 
        if (btnName == 'Next') {
            // router.push('/brain/result/sensor')
            router.push('/mainmenu')
        }
        if (btnName == 'Sensor Check') {
            showVideo()
            // setBg('/images/imageBrain3.png');
            // document.querySelector('#monitorArea').classList.remove(styles['hidden']);
            // document.querySelector('#touchArea_1_1').classList.remove(styles['hidden']);
            // document.querySelector('#touchArea_1_2').classList.remove(styles['hidden']);
            // document.querySelector('#touchArea_1_3').classList.remove(styles['hidden']);
            // document.querySelector('#touchArea_1_4').classList.remove(styles['hidden']);
            // document.querySelector('#touchArea_2_1').classList.remove(styles['hidden']);
            // document.querySelector('#touchArea_2_2').classList.remove(styles['hidden']);
            // document.querySelector('#touchArea_2_3').classList.remove(styles['hidden']);
            // document.querySelector('#touchArea_2_4').classList.remove(styles['hidden']);
            // document.querySelector('#touchArea_3_1').classList.remove(styles['hidden']);
            // document.querySelector('#touchArea_3_2').classList.remove(styles['hidden']);
            // document.querySelector('#touchArea_4_1').classList.remove(styles['hidden']);
            // document.querySelector('#touchArea_4_2').classList.remove(styles['hidden']);
            // document.querySelector('#touchArea_4_3').classList.remove(styles['hidden']);
            // document.querySelector('#touchArea_4_4').classList.remove(styles['hidden']);

            // document.querySelector('#noTouchArea_1').classList.remove(styles['hidden']);
            // document.querySelector('#noTouchArea_2').classList.remove(styles['hidden']);
            // document.querySelector('#noTouchArea_3').classList.remove(styles['hidden']);
            // document.querySelector('#noTouchArea_4').classList.remove(styles['hidden']);

            // document.querySelector('#touchArea_3_1_side').classList.remove(styles['show']);
            // document.querySelector('#touchArea_3_2_side').classList.remove(styles['show']);
            // document.querySelector('#touchArea_3_3_side').classList.remove(styles['show']);
            // document.querySelector('#touchArea_3_4_side').classList.remove(styles['show']);

            // document.querySelector('#noTouchArea_3_side').classList.remove(styles['show']);

            // setStatus1('/images/BrainMonitoring-item-1green.png')
            // setStatus2('/images/BrainMonitoring-item-2red.png')
            // setStatus3('/images/BrainMonitoring-item-3green.png')
            // setStatus4('/images/BrainMonitoring-item-4red.png')
        }
    }

    function checkSwitchStatus() {
        if (statusCheck.includes('1_1') && statusCheck.includes('1_2') && statusCheck.includes('1_3') && statusCheck.includes('1_4') && statusCheck.includes('2_1') && statusCheck.includes('2_2') && statusCheck.includes('3_1') && statusCheck.includes('3_2') && statusCheck.includes('3_3') && statusCheck.includes('3_4') && statusCheck.includes('4_1') && statusCheck.includes('4_2') && statusCheck.includes('4_3') && statusCheck.includes('4_4')) {
            // switchTopViewStepTwo()
            // showAler2()

            switchTopViewStepTwo()

            // setBtnName('Sensor Check')

        } else if (statusCheck.includes('1_1') && statusCheck.includes('1_2') && statusCheck.includes('1_3') && statusCheck.includes('1_4') && statusCheck.includes('2_1') && statusCheck.includes('2_2') && statusCheck.includes('4_1') && statusCheck.includes('4_2') && statusCheck.includes('4_3') && statusCheck.includes('4_4') ) {
            // switchRideView()
            setTimeout(() => { 
                switchRideView()
            }, 3000)


        } else {
            switchTopView()
        }
    }

    function switchRideView() {
        setBg('/images/SideView.jpg');
        document.querySelector('#monitorArea').classList.add(styles['hidden']);
        document.querySelector('#touchArea_1_1').classList.add(styles['hidden']);
        document.querySelector('#touchArea_1_2').classList.add(styles['hidden']);
        document.querySelector('#touchArea_1_3').classList.add(styles['hidden']);
        document.querySelector('#touchArea_1_4').classList.add(styles['hidden']);
        document.querySelector('#touchArea_2_1').classList.add(styles['hidden']);
        document.querySelector('#touchArea_2_2').classList.add(styles['hidden']);
        // document.querySelector('#touchArea_2_3').classList.add(styles['hidden']);
        // document.querySelector('#touchArea_2_4').classList.add(styles['hidden']);
        document.querySelector('#touchArea_3_1').classList.add(styles['hidden']);
        document.querySelector('#touchArea_3_2').classList.add(styles['hidden']);
        document.querySelector('#touchArea_4_1').classList.add(styles['hidden']);
        document.querySelector('#touchArea_4_2').classList.add(styles['hidden']);
        document.querySelector('#touchArea_4_3').classList.add(styles['hidden']);
        document.querySelector('#touchArea_4_4').classList.add(styles['hidden']);

        document.querySelector('#line1_1').classList.add(styles['fhidden']);
        document.querySelector('#line1_2').classList.add(styles['fhidden']);
        document.querySelector('#line1_3').classList.add(styles['fhidden']);
        document.querySelector('#line1_4').classList.add(styles['fhidden']);
        document.querySelector('#line2_1').classList.add(styles['fhidden']);
        document.querySelector('#line2_2').classList.add(styles['fhidden']);
        document.querySelector('#line4_1').classList.add(styles['fhidden']);
        document.querySelector('#line4_2').classList.add(styles['fhidden']);
        document.querySelector('#line4_3').classList.add(styles['fhidden']);
        document.querySelector('#line4_4').classList.add(styles['fhidden']);

        document.querySelector('#line3_1').classList.remove(styles['fhidden']);
        document.querySelector('#line3_2').classList.remove(styles['fhidden']);
        document.querySelector('#line3_3').classList.remove(styles['fhidden']);
        document.querySelector('#line3_4').classList.remove(styles['fhidden']);

        document.querySelector('#noTouchArea_1').classList.add(styles['hidden']);
        document.querySelector('#noTouchArea_2').classList.add(styles['hidden']);
        document.querySelector('#noTouchArea_3').classList.add(styles['hidden']);
        document.querySelector('#noTouchArea_4').classList.add(styles['hidden']);

        document.querySelector('#touchArea_3_1_side').classList.add(styles['show']);
        document.querySelector('#touchArea_3_2_side').classList.add(styles['show']);
        document.querySelector('#touchArea_3_3_side').classList.add(styles['show']);
        document.querySelector('#touchArea_3_4_side').classList.add(styles['show']);

        document.querySelector('#noTouchArea_3_side').classList.add(styles['show']);
        
        // document.querySelector('#dropArea').classList.add(styles['invisible']);
        // document.querySelector('.moveable-control').classList.add(styles['invisible']);

        // document.querySelector('#switchIcon').classList.add(styles['rotated']);
    }
    function switchTopView() {
        setBg('/images/imageBrain6.png');
        document.querySelector('#monitorArea').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_1_1').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_1_2').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_1_3').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_1_4').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_2_1').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_2_2').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_2_3').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_2_4').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_3_1').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_3_2').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_4_1').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_4_2').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_4_3').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_4_4').classList.remove(styles['hidden']);

        document.querySelector('#line1_1').classList.remove(styles['fhidden']);
        document.querySelector('#line1_2').classList.remove(styles['fhidden']);
        document.querySelector('#line1_3').classList.remove(styles['fhidden']);
        document.querySelector('#line1_4').classList.remove(styles['fhidden']);
        document.querySelector('#line2_1').classList.remove(styles['fhidden']);
        document.querySelector('#line2_2').classList.remove(styles['fhidden']);
        document.querySelector('#line4_1').classList.remove(styles['fhidden']);
        document.querySelector('#line4_2').classList.remove(styles['fhidden']);
        document.querySelector('#line4_3').classList.remove(styles['fhidden']);
        document.querySelector('#line4_4').classList.remove(styles['fhidden']);

        document.querySelector('#line3_1').classList.add(styles['fhidden']);
        document.querySelector('#line3_2').classList.add(styles['fhidden']);
        document.querySelector('#line3_3').classList.add(styles['fhidden']);
        document.querySelector('#line3_4').classList.add(styles['fhidden']);

        document.querySelector('#noTouchArea_1').classList.remove(styles['hidden']);
        document.querySelector('#noTouchArea_2').classList.remove(styles['hidden']);
        document.querySelector('#noTouchArea_3').classList.remove(styles['hidden']);
        document.querySelector('#noTouchArea_4').classList.remove(styles['hidden']);

        document.querySelector('#touchArea_3_1_side').classList.remove(styles['show']);
        document.querySelector('#touchArea_3_2_side').classList.remove(styles['show']);
        document.querySelector('#touchArea_3_3_side').classList.remove(styles['show']);
        document.querySelector('#touchArea_3_4_side').classList.remove(styles['show']);

        document.querySelector('#noTouchArea_3_side').classList.remove(styles['show']);
    }

    function switchTopViewStepTwo () {
        setBtnName('Sensor Check');

        // setBg('/images/imageBrain3.png');
        // document.querySelector('#monitorArea').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_1_1').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_1_2').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_1_3').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_1_4').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_2_1').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_2_2').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_2_3').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_2_4').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_3_1').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_3_2').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_4_1').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_4_2').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_4_3').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_4_4').classList.remove(styles['hidden']);

        // document.querySelector('#noTouchArea_1').classList.remove(styles['hidden']);
        // document.querySelector('#noTouchArea_2').classList.remove(styles['hidden']);
        // document.querySelector('#noTouchArea_3').classList.remove(styles['hidden']);
        // document.querySelector('#noTouchArea_4').classList.remove(styles['hidden']);

        // document.querySelector('#touchArea_3_1_side').classList.remove(styles['show']);
        // document.querySelector('#touchArea_3_2_side').classList.remove(styles['show']);
        // document.querySelector('#touchArea_3_3_side').classList.remove(styles['show']);
        // document.querySelector('#touchArea_3_4_side').classList.remove(styles['show']);

        // document.querySelector('#noTouchArea_3_side').classList.remove(styles['show']);

        // setStatus1('/images/BrainMonitoring-item-1green.png')
        // setStatus2('/images/BrainMonitoring-item-2red.png')
        // setStatus3('/images/BrainMonitoring-item-3green.png')
        // setStatus4('/images/BrainMonitoring-item-4red.png')


    }

    function handleSwitch() {
        if (bg == '/images/imageBrain6.png') {
            // setBtnName('Sensor Check')

            setBg('/images/SideView.png');

            document.querySelector('#monitorArea').classList.add(styles['hidden']);
            document.querySelector('#touchArea_1_1').classList.add(styles['hidden']);
            document.querySelector('#touchArea_1_2').classList.add(styles['hidden']);
            document.querySelector('#touchArea_1_3').classList.add(styles['hidden']);
            document.querySelector('#touchArea_1_4').classList.add(styles['hidden']);
            document.querySelector('#touchArea_2_1').classList.add(styles['hidden']);
            document.querySelector('#touchArea_2_2').classList.add(styles['hidden']);
            // document.querySelector('#touchArea_2_3').classList.add(styles['hidden']);
            // document.querySelector('#touchArea_2_4').classList.add(styles['hidden']);
            document.querySelector('#touchArea_3_1').classList.add(styles['hidden']);
            document.querySelector('#touchArea_3_2').classList.add(styles['hidden']);
            document.querySelector('#touchArea_4_1').classList.add(styles['hidden']);
            document.querySelector('#touchArea_4_2').classList.add(styles['hidden']);
            document.querySelector('#touchArea_4_3').classList.add(styles['hidden']);
            document.querySelector('#touchArea_4_4').classList.add(styles['hidden']);

            document.querySelector('#line1_1').classList.add(styles['fhidden']);
            document.querySelector('#line1_2').classList.add(styles['fhidden']);
            document.querySelector('#line1_3').classList.add(styles['fhidden']);
            document.querySelector('#line1_4').classList.add(styles['fhidden']);
            document.querySelector('#line2_1').classList.add(styles['fhidden']);
            document.querySelector('#line2_2').classList.add(styles['fhidden']);
            document.querySelector('#line4_1').classList.add(styles['fhidden']);
            document.querySelector('#line4_2').classList.add(styles['fhidden']);
            document.querySelector('#line4_3').classList.add(styles['fhidden']);
            document.querySelector('#line4_4').classList.add(styles['fhidden']);

            document.querySelector('#line3_1').classList.remove(styles['fhidden']);
            document.querySelector('#line3_2').classList.remove(styles['fhidden']);
            document.querySelector('#line3_3').classList.remove(styles['fhidden']);
            document.querySelector('#line3_4').classList.remove(styles['fhidden']);

            document.querySelector('#noTouchArea_1').classList.add(styles['hidden']);
            document.querySelector('#noTouchArea_2').classList.add(styles['hidden']);
            document.querySelector('#noTouchArea_3').classList.add(styles['hidden']);
            document.querySelector('#noTouchArea_4').classList.add(styles['hidden']);

    

            document.querySelector('#touchArea_3_1_side').classList.add(styles['show']);
            document.querySelector('#touchArea_3_2_side').classList.add(styles['show']);
            document.querySelector('#touchArea_3_3_side').classList.add(styles['show']);
            document.querySelector('#touchArea_3_4_side').classList.add(styles['show']);

            document.querySelector('#noTouchArea_3_side').classList.add(styles['show']);
            
            // document.querySelector('#dropArea').classList.add(styles['invisible']);
            // document.querySelector('.moveable-control').classList.add(styles['invisible']);

            document.querySelector('#switchIcon').classList.add(styles['rotated']);
        } else {
            setBg('/images/imageBrain6.png');
            document.querySelector('#monitorArea').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_1_1').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_1_2').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_1_3').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_1_4').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_2_1').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_2_2').classList.remove(styles['hidden']);
            // document.querySelector('#touchArea_2_3').classList.remove(styles['hidden']);
            // document.querySelector('#touchArea_2_4').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_3_1').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_3_2').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_4_1').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_4_2').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_4_3').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_4_4').classList.remove(styles['hidden']);

            document.querySelector('#line1_1').classList.remove(styles['fhidden']);
            document.querySelector('#line1_2').classList.remove(styles['fhidden']);
            document.querySelector('#line1_3').classList.remove(styles['fhidden']);
            document.querySelector('#line1_4').classList.remove(styles['fhidden']);
            document.querySelector('#line2_1').classList.remove(styles['fhidden']);
            document.querySelector('#line2_2').classList.remove(styles['fhidden']);
            document.querySelector('#line4_1').classList.remove(styles['fhidden']);
            document.querySelector('#line4_2').classList.remove(styles['fhidden']);
            document.querySelector('#line4_3').classList.remove(styles['fhidden']);
            document.querySelector('#line4_4').classList.remove(styles['fhidden']);

            document.querySelector('#line3_1').classList.add(styles['fhidden']);
            document.querySelector('#line3_2').classList.add(styles['fhidden']);
            document.querySelector('#line3_3').classList.add(styles['fhidden']);
            document.querySelector('#line3_4').classList.add(styles['fhidden']);

            document.querySelector('#noTouchArea_1').classList.remove(styles['hidden']);
            document.querySelector('#noTouchArea_2').classList.remove(styles['hidden']);
            document.querySelector('#noTouchArea_3').classList.remove(styles['hidden']);
            document.querySelector('#noTouchArea_4').classList.remove(styles['hidden']);

            document.querySelector('#touchArea_3_1_side').classList.remove(styles['show']);
            document.querySelector('#touchArea_3_2_side').classList.remove(styles['show']);
            document.querySelector('#touchArea_3_3_side').classList.remove(styles['show']);
            document.querySelector('#touchArea_3_4_side').classList.remove(styles['show']);

            document.querySelector('#noTouchArea_3_side').classList.remove(styles['show']);
            // document.querySelector('#traget').classList.remove(styles['invisible']);
            // document.querySelector('#dropArea').classList.remove(styles['invisible']);
            // document.querySelector('.moveable-control').classList.remove(styles['invisible']);

            document.querySelector('#switchIcon').classList.remove(styles['rotated']);
        }
    }


    // Video
    function showVideo() {
        setPlaying(true);        
        document.querySelector('#videoWrap').classList.add(styles['showVideo']);

        // ป้องกันการหน่วงเวลาโหลด
        setBg('/images/imageBrain3.png');
        document.querySelector('#monitorArea').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_1_1').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_1_2').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_1_3').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_1_4').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_2_1').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_2_2').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_2_3').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_2_4').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_3_1').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_3_2').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_4_1').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_4_2').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_4_3').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_4_4').classList.remove(styles['hidden']);

        document.querySelector('#line1_1').classList.remove(styles['fhidden']);
        document.querySelector('#line1_2').classList.remove(styles['fhidden']);
        document.querySelector('#line1_3').classList.remove(styles['fhidden']);
        document.querySelector('#line1_4').classList.remove(styles['fhidden']);
        document.querySelector('#line2_1').classList.remove(styles['fhidden']);
        document.querySelector('#line2_2').classList.remove(styles['fhidden']);
        document.querySelector('#line4_1').classList.remove(styles['fhidden']);
        document.querySelector('#line4_2').classList.remove(styles['fhidden']);
        document.querySelector('#line4_3').classList.remove(styles['fhidden']);
        document.querySelector('#line4_4').classList.remove(styles['fhidden']);

        document.querySelector('#line3_1').classList.add(styles['fhidden']);
        document.querySelector('#line3_2').classList.add(styles['fhidden']);
        document.querySelector('#line3_3').classList.add(styles['fhidden']);
        document.querySelector('#line3_4').classList.add(styles['fhidden']);

        document.querySelector('#noTouchArea_1').classList.remove(styles['hidden']);
        document.querySelector('#noTouchArea_2').classList.remove(styles['hidden']);
        document.querySelector('#noTouchArea_3').classList.remove(styles['hidden']);
        document.querySelector('#noTouchArea_4').classList.remove(styles['hidden']);

        document.querySelector('#touchArea_3_1_side').classList.remove(styles['show']);
        document.querySelector('#touchArea_3_2_side').classList.remove(styles['show']);
        document.querySelector('#touchArea_3_3_side').classList.remove(styles['show']);
        document.querySelector('#touchArea_3_4_side').classList.remove(styles['show']);

        document.querySelector('#noTouchArea_3_side').classList.remove(styles['show']);

        setStatus1('/images/BrainMonitoring-item-1green.png')
        setStatus2('/images/BrainMonitoring-item-2red.png')
        setStatus3('/images/BrainMonitoring-item-3green.png')
        setStatus4('/images/BrainMonitoring-item-4red.png')
    }

    function reset() {       

        setBg('/images/imageBrain3.png');
        document.querySelector('#monitorArea').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_1_1').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_1_2').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_1_3').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_1_4').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_2_1').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_2_2').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_2_3').classList.remove(styles['hidden']);
        // document.querySelector('#touchArea_2_4').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_3_1').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_3_2').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_4_1').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_4_2').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_4_3').classList.remove(styles['hidden']);
        document.querySelector('#touchArea_4_4').classList.remove(styles['hidden']);

        document.querySelector('#line1_1').classList.remove(styles['fhidden']);
        document.querySelector('#line1_2').classList.remove(styles['fhidden']);
        document.querySelector('#line1_3').classList.remove(styles['fhidden']);
        document.querySelector('#line1_4').classList.remove(styles['fhidden']);
        document.querySelector('#line2_1').classList.remove(styles['fhidden']);
        document.querySelector('#line2_2').classList.remove(styles['fhidden']);
        document.querySelector('#line4_1').classList.remove(styles['fhidden']);
        document.querySelector('#line4_2').classList.remove(styles['fhidden']);
        document.querySelector('#line4_3').classList.remove(styles['fhidden']);
        document.querySelector('#line4_4').classList.remove(styles['fhidden']);

        document.querySelector('#line3_1').classList.add(styles['fhidden']);
        document.querySelector('#line3_2').classList.add(styles['fhidden']);
        document.querySelector('#line3_3').classList.add(styles['fhidden']);
        document.querySelector('#line3_4').classList.add(styles['fhidden']);

        document.querySelector('#noTouchArea_1').classList.remove(styles['hidden']);
        document.querySelector('#noTouchArea_2').classList.remove(styles['hidden']);
        document.querySelector('#noTouchArea_3').classList.remove(styles['hidden']);
        document.querySelector('#noTouchArea_4').classList.remove(styles['hidden']);

        document.querySelector('#touchArea_3_1_side').classList.remove(styles['show']);
        document.querySelector('#touchArea_3_2_side').classList.remove(styles['show']);
        document.querySelector('#touchArea_3_3_side').classList.remove(styles['show']);
        document.querySelector('#touchArea_3_4_side').classList.remove(styles['show']);

        document.querySelector('#noTouchArea_3_side').classList.remove(styles['show']);

        setStatus1('/images/BrainMonitoring-item-1green.png')
        setStatus2('/images/BrainMonitoring-item-2red.png')
        setStatus3('/images/BrainMonitoring-item-3green.png')
        setStatus4('/images/BrainMonitoring-item-4red.png')


        document.querySelector('#videoWrap').classList.remove(styles['showVideo']);
        setBtnName('Confirm');
        showAler2()
    }

    // Alert

    function showALert() {
        // ปิด popup เริ่มต้น
        popUpStart()
        // if (alertText == null) {
        //     document.querySelector('#alertPopup').classList.remove(styles['showPopUp']);
        // } else {
        //     document.querySelector('#alertPopup').classList.add(styles['showPopUp']);
        // }
        document.querySelector('#alertPopup').classList.add(styles['showPopUp']);
    }
    function closeAlert() {
        document.querySelector('#alertPopup').classList.remove(styles['showPopUp']);
        // setAlertText(null);        
    }
    function showAler2() {
        document.querySelector('#alertPopup2').classList.add(styles['showPopUp']);
        // setBtnName('Sensor Check')
    }
    function closeAlert2() {
        document.querySelector('#alertPopup2').classList.remove(styles['showPopUp']);
    }
    function showAler3() {
        document.querySelector('#alertPopup3').classList.add(styles['showPopUp']);
        // setBtnName('Sensor Check')
    }
    function closeAlert3() {
        document.querySelector('#alertPopup3').classList.remove(styles['showPopUp']);
    }
    function showAlertsideview() {
        document.querySelector('#alertPopupsideview').classList.add(styles['showPopUpSideview']);
        // setBtnName('Sensor Check')
    }
    function closeAlertsidview() {
        document.querySelector('#alertPopupsideview').classList.remove(styles['showPopUpSideview']);
    }

    return (
        <div className={styles.traget_container}>
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
                <div className={styles.sensorHoverContainer}>
                    {/* <div id='line1_1' className={styles.sensorHoverImage}>
                    <Image
                        src='/images/sensor/line1-1.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={3840}
                        height={2160}
                    />
                    </div> */}
                    <Image
                        id='line1_1'
                        className={styles.sensorHoverImage}
                        src='/images/sensor/line1-1.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={3840}
                        height={2160}
                    />
                    <Image
                        id='line1_2'
                        className={styles.sensorHoverImage}
                        src='/images/sensor/line1-2.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={3840}
                        height={2160}
                    />
                    <Image
                        id='line1_3'
                        className={styles.sensorHoverImage}
                        src='/images/sensor/line1-3.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={3840}
                        height={2160}
                    />
                    <Image
                        id='line1_4'
                        className={styles.sensorHoverImage}
                        src='/images/sensor/line1-4.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={3840}
                        height={2160}
                    />
                    <Image
                        id='line2_1'
                        className={styles.sensorHoverImage}
                        src='/images/sensor/line2-1.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={3840}
                        height={2160}
                    />
                    <Image
                        id='line2_2'
                        className={styles.sensorHoverImage}
                        src='/images/sensor/line2-2.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={3840}
                        height={2160}
                    />
                    <Image
                        id='line3_1'
                        className={styles.sensorHoverImage}
                        src='/images/sensor/line3-1.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={3840}
                        height={2160}
                    />
                    <Image
                        id='line3_2'
                        className={styles.sensorHoverImage}
                        src='/images/sensor/line3-2.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={3840}
                        height={2160}
                    />
                    <Image
                        id='line3_3'
                        className={styles.sensorHoverImage}
                        src='/images/sensor/line3-3.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={3840}
                        height={2160}
                    />
                    <Image
                        id='line3_4'
                        className={styles.sensorHoverImage}
                        src='/images/sensor/line3-4.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={3840}
                        height={2160}
                    />
                    <Image
                        id='line4_1'
                        className={styles.sensorHoverImage}
                        src='/images/sensor/line4-1.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={3840}
                        height={2160}
                    />
                    <Image
                        id='line4_2'
                        className={styles.sensorHoverImage}
                        src='/images/sensor/line4-2.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={3840}
                        height={2160}
                    />
                    <Image
                        id='line4_3'
                        className={styles.sensorHoverImage}
                        src='/images/sensor/line4-3.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={3840}
                        height={2160}
                    />
                    <Image
                        id='line4_4'
                        className={styles.sensorHoverImage}
                        src='/images/sensor/line4-4.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={3840}
                        height={2160}
                    />
                </div>
            </div>
            <div id='monitorArea' className={styles.monitorArea}>
                <Image
                    src='/images/BrainMonitoring-item1.png'
                    alt="BIS"
                    // layout="fill"
                    // objectFit="cover"
                    width={1905}
                    height={605}
                />
                <div className={styles.statusImage_area}>
                    <div className={styles.statusImage}>
                        <Image
                            src={status1}
                            alt="BIS"
                            width={1905}
                            height={605}
                        />
                    </div>
                    <div className={styles.statusImage}>
                        <Image
                            src={status2}
                            alt="BIS"
                            width={1905}
                            height={605}
                        />
                    </div>
                    <div className={styles.statusImage}>
                        <Image
                            src={status3}
                            alt="BIS"
                            width={1905}
                            height={605}
                        />
                    </div>
                    <div className={styles.statusImage}>
                        <Image
                            src={status4}
                            alt="BIS"
                            width={1905}
                            height={605}
                        />
                    </div>
                    <div id='panel_99' className={styles.statusImage_panel99}>
                        <Image
                            src='/images/brainMonitor99-panel2.png'
                            alt="BIS"
                            width={1905}
                            height={605}
                        />
                    </div>
                </div>
            </div>


            <div id='touchArea_1_1' data-touchID='1_1' className={styles.touchArea_1_1} onClick={numberTouch} onMouseOver={numberHover} onMouseOut={numberHoverOut}></div>
            <div id='touchArea_1_2' data-touchID='1_2' className={styles.touchArea_1_2} onClick={numberTouch} onMouseOver={numberHover} onMouseOut={numberHoverOut}></div>
            <div id='touchArea_1_3' data-touchID='1_3' className={styles.touchArea_1_3} onClick={numberTouch} onMouseOver={numberHover} onMouseOut={numberHoverOut}></div>
            <div id='touchArea_1_4' data-touchID='1_4' className={styles.touchArea_1_4} onClick={numberTouch} onMouseOver={numberHover} onMouseOut={numberHoverOut}></div>
            <div id='touchArea_2_1' data-touchID='2_1' className={styles.touchArea_2_1} onClick={numberTouch} onMouseOver={numberHover} onMouseOut={numberHoverOut}></div>
            <div id='touchArea_2_2' data-touchID='2_2' className={styles.touchArea_2_2} onClick={numberTouch} onMouseOver={numberHover} onMouseOut={numberHoverOut}></div>
            {/* <div id='touchArea_2_3' data-touchID='2_3' className={styles.touchArea_2_3} onClick={number2Touch}></div>
            <div id='touchArea_2_4' data-touchID='2_4' className={styles.touchArea_2_4} onClick={number2Touch}></div> */}
            <div id='touchArea_3_1' data-touchID='3_1' className={styles.touchArea_3_1} onClick={number3Touch}></div>
            <div id='touchArea_3_2' data-touchID='3_2' className={styles.touchArea_3_2} onClick={number3Touch}></div>
            <div id='touchArea_4_1' data-touchID='4_1' className={styles.touchArea_4_1} onClick={numberTouch} onMouseOver={numberHover} onMouseOut={numberHoverOut}></div>
            <div id='touchArea_4_2' data-touchID='4_2' className={styles.touchArea_4_2} onClick={numberTouch} onMouseOver={numberHover} onMouseOut={numberHoverOut}></div>
            <div id='touchArea_4_3' data-touchID='4_3' className={styles.touchArea_4_3} onClick={numberTouch} onMouseOver={numberHover} onMouseOut={numberHoverOut}></div>
            <div id='touchArea_4_4' data-touchID='4_4' className={styles.touchArea_4_4} onClick={numberTouch} onMouseOver={numberHover} onMouseOut={numberHoverOut}></div>

            <div id='touchArea_3_1_side' data-touchID='3_1' className={styles.touchArea_3_1_side} onClick={numberTouch} onMouseOver={numberHover} onMouseOut={numberHoverOut}></div>
            <div id='touchArea_3_2_side' data-touchID='3_2' className={styles.touchArea_3_2_side} onClick={numberTouch} onMouseOver={numberHover} onMouseOut={numberHoverOut}></div>
            <div id='touchArea_3_3_side' data-touchID='3_3' className={styles.touchArea_3_3_side} onClick={numberTouch} onMouseOver={numberHover} onMouseOut={numberHoverOut}></div>
            <div id='touchArea_3_4_side' data-touchID='3_4' className={styles.touchArea_3_4_side} onClick={numberTouch} onMouseOver={numberHover} onMouseOut={numberHoverOut}></div>


            <div id='noTouchArea_1' className={styles.noTouchArea_1} onClick={number1Fail}></div>
            <div id='noTouchArea_2' className={styles.noTouchArea_2} onClick={number2Fail}></div>
            <div id='noTouchArea_3' className={styles.noTouchArea_3} onClick={number3Fail}></div>            
            <div id='noTouchArea_4' className={styles.noTouchArea_4} onClick={number4Fail}></div>

            <div id='noTouchArea_3_side' className={styles.noTouchArea_3_side} onClick={number3Fail}></div>
            
           
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

            <div id='popupContent' className={styles.popupArea}>
                <div className={styles.popup_wrap}>
                    <p>
                        หลังจากวางตำแหน่งของเซนเซอร์เรียบร้อยแล้วเราจะต้องทำการติดอิเล็กโทรดกับคนไข้ <br/> โดยให้ท่านทำการกดตำแหน่งที่จะช่วยให้เซนเซอร์ติดกับคนไข้และนำส่งสัญญาณได้ดี
                    </p>
                    <div className={styles.popUpbtnStart}>
                        <button onClick={popUpStart}>
                            เริ่ม
                        </button>
                    </div>
                </div>
            </div>
            <div id='alertPopup' className={styles.alertPopup}>
                <div className={styles.popup_wrap}>
                    <p>
                        {alertText}
                    </p>
                    <div className={styles.popUpbtnStart}>
                        <button onClick={closeAlert}>
                            Got it
                        </button>
                    </div>
                </div>
            </div>

            <div id='alertPopup2' className={styles.alertPopup}>
                <div className={styles.popup_wrap}>
                    <p>
                    เมื่อติดกาวรอบเซนเซอร์แน่นแล้วให้ใช้นิ้วกดไปที่หมายเลขโดยตรงและค้างไว้ประมาณ 5 วินาที ให้ครบทั้ง 4 อิเล็กโทรดเพื่อย้ำให้อิเล็กโทรดแนบสนิทกับผิวของคนไข้
                    </p>
                    <p>
                    ขณะนี้หน้าจอแสดงผลว่า อิเล็กโทรด 2 และ 4 ยังไม่สามารถรับสัญญาณได้เหมาะสม ลองกดย้ำลงบนหมายเลข 2 และ 4 เพื่อให้อิเล็กโทรดและเจลติดแน่นกับผิวของคนไข้และรับสัญญาณได้อย่างมีประสิทธิภาพ
                    </p>
                    <div className={styles.popUpbtnStart}>
                        <button onClick={closeAlert2}>
                            Got it
                        </button>
                    </div>
                </div>
            </div>
            <div id='alertPopupsideview' className={styles.alertPopupSideview}>
                <div className={styles.popup_wrap}>
                    <p>
                    {alertText}
                    </p>
                    <div className={styles.popUpbtnStart}>
                        <button onClick={closeAlertsidview}>
                            Got it
                        </button>
                    </div>
                </div>
            </div>
            <div id='alertPopup3' className={styles.alertPopup}>
                <div className={styles.popup_wrap}>
                    <p>
                    เซนเซอร์ตัวนี้ สามารถรับสัญญาณได้อย่างมีประสิทธิภาพแล้ว กรุณาตรวจสอบเซนเซอร์ตัวอื่น
                    </p>
                    <div className={styles.popUpbtnStart}>
                        <button onClick={closeAlert3}>
                            Got it
                        </button>
                    </div>
                </div>
            </div>

            <div id='btnGroup' className={styles.btn_group}>
                {/* <button onClick={replace}>
                Try again
                </button> */}
                <button onClick={confirm}>                
                    {btnName}
                </button>
            </div>

            <div id='videoWrap' className={styles.video_wrap} >
                <ReactPlayer 
                className={styles.video_item} 
                url={urlVideo}  
                playing={playing} 
                onEnded={reset}
                width='100%'
                height='100%'
                />
            </div>
        </div>
    )
}

