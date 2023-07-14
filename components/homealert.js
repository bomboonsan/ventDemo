import styles from './homealert.module.scss'

export default function HomeAlert() {
    return (
        <div className={styles.alert_box}>
            <p>Password incorrect</p>
        </div>        
    )
}