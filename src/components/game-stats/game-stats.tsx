import React from 'react';
import styles from './game-stats.module.scss';
import {useElapsedTime, useFlaggedCells, useGameConfiguration} from "../../hooks/game-state";

export const GameStats = () => {
    const {numberOfMines} = useGameConfiguration();
    const flaggedCells = useFlaggedCells();
    const elapsedTime = useElapsedTime();

    return <div className={styles.statsWrapper}>
        <div className={styles.minesStatus}>{flaggedCells.length} / {numberOfMines}</div>
        <div className={styles.elapsedTime}>{elapsedTime}</div>
    </div>
};