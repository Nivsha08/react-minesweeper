import React from 'react';
import styles from './game-top-bar.module.scss';
import {useElapsedTime, useFlaggedCells} from "../../hooks/game-state";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBomb, faClock} from "@fortawesome/free-solid-svg-icons";
import {parseSeconds} from "../../utils/parse-seconds";
import {useGameConfiguration, useGameDifficultyLevel} from "../../hooks/game-configuration";
import {DifficultyLevel} from "../../types/types";

type GameTopBarProps = {
    onDifficultyChange: (difficulty: DifficultyLevel) => void;
}

export const GameTopBar = ({onDifficultyChange}: GameTopBarProps) => {
    const difficulty = useGameDifficultyLevel();
    const {numberOfMines} = useGameConfiguration();
    const flaggedCells = useFlaggedCells();
    const elapsedTime = useElapsedTime();

    const handleDifficultySelection = (newDifficulty: DifficultyLevel) => {
        onDifficultyChange(newDifficulty);
    };

    return <div className={styles.statsWrapper}>
        <div className={styles.minesStatus}>
            <FontAwesomeIcon icon={faBomb} className={styles.icon} />
            {flaggedCells.length} / {numberOfMines}
        </div>
        <div className={styles.difficultySelector}>
            <select value={difficulty}
                    onChange={({target: {value}}) => handleDifficultySelection(value as DifficultyLevel)}>
                <option value={'easy' as const}>Easy</option>
                <option value={'medium' as const}>Medium</option>
                <option value={'hard' as const}>Hard</option>
            </select>
        </div>
        <div className={styles.elapsedTime}>
            <FontAwesomeIcon icon={faClock} className={styles.icon} />
            {parseSeconds(elapsedTime)}
        </div>
    </div>
};