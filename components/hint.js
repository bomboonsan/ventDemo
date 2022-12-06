import { useState, useEffect } from 'react';
import styles from './hint.module.scss'
import Image from 'next/image'

export default function Hint() {
    
    return (
        <div className={styles.container_hint}>
            <div className={styles.row_hint}>
                <div className={styles.col_text_box}>
                    <div className={styles.text_box_wrap}>
                        <h2>Instruction </h2>
                        <p>
                            lorem text
                        </p>
                        <p>
                            lorem text
                        </p>
                        <p>
                            lorem text
                        </p>
                        <p>
                            lorem text
                        </p>
                        <p>
                            lorem text
                        </p>
                        <p>
                            lorem text
                        </p>
                        <p>
                            lorem text
                        </p>
                    </div>
                </div>
                <div className={styles.col_image}>
                    <Image
                        src="/images/hin.png"
                        alt="Women"
                        // layout="fill"
                        // objectFit="cover"
                        width={1279}
                        height={1739}
                    />
                </div>
            </div>
        </div>
    )
}