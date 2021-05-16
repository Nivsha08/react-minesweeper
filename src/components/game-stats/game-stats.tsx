import React from 'react';
import styles from './game-stats.module.scss';
import {useElapsedTime, useGameConfiguration} from "../../hooks/game-state";

export const GameStats = () => {
    const {numberOfMines} = useGameConfiguration();
    const elapsedTime = useElapsedTime();

    return <div className={styles.statsWrapper}>
        <div className={styles.minesStatus}>0 / {numberOfMines}</div>
        <div className={styles.elapsedTime}>{elapsedTime}</div>
    </div>
};