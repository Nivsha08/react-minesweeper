import React, {useEffect} from 'react';
import styles from './game-wrapper.module.scss';
import {GameGrid} from "../game-grid/game-grid";
import {GameStats} from "../game-stats/game-stats";
import {useGameIsStarted} from "../../hooks/game-state";
import {useActions} from "../../store/actions";

export const GameWrapper = () => {
    const gameIsStarted = useGameIsStarted();
    const {initGame} = useActions();

    useEffect(() => {
        if (!gameIsStarted) {
            initGame();
        }
    }, [gameIsStarted, initGame]);

    return <div className={styles.wrapper}>
        <GameStats/>
        <GameGrid />
    </div>
};