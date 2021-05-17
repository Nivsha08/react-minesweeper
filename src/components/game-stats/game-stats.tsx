import React from 'react';
import styles from './game-stats.module.scss';
import {useElapsedTime, useFlaggedCells, useGameConfiguration} from "../../hooks/game-state";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBomb, faClock} from "@fortawesome/free-solid-svg-icons";
import {parseSeconds} from "../../utils/parse-seconds";

export const GameStats = () => {
    const {numberOfMines} = useGameConfiguration();
    const flaggedCells = useFlaggedCells();
    const elapsedTime = useElapsedTime();

    return <div className={styles.statsWrapper}>
        <div className={styles.minesStatus}>
            <FontAwesomeIcon icon={faBomb} className={styles.icon} />
            {flaggedCells.length} / {numberOfMines}
        </div>
        <div className={styles.elapsedTime}>
            <FontAwesomeIcon icon={faClock} className={styles.icon} />
            {parseSeconds(elapsedTime)}
        </div>
    </div>
};