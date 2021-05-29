import React from 'react';
import styles from './game-top-bar.module.scss';
import {Radio} from 'antd';
import {upperFirst} from 'lodash';
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
            <FontAwesomeIcon icon={faBomb} className={styles.icon}/>
            {flaggedCells.length} / {numberOfMines}
        </div>
        <div className={styles.difficultySelector}>
            <Radio.Group value={difficulty} size="small"
                         onChange={({target: {value}}) => handleDifficultySelection(value as DifficultyLevel)}>
                {['easy', 'medium', 'hard']
                    .map(difficulty => <Radio.Button value={difficulty} key={difficulty}
                                                     className={styles.difficultyItem}>
                        {upperFirst(difficulty)}</Radio.Button>)}
            </Radio.Group>
        </div>
        <div className={styles.elapsedTime}>
            <FontAwesomeIcon icon={faClock} className={styles.icon}/>
            {parseSeconds(elapsedTime)}
        </div>
    </div>
};