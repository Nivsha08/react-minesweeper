import React, {useEffect} from 'react';
import styles from './game-wrapper.module.scss';
import {GameGrid} from "../game-grid/game-grid";
import {GameStats} from "../game-stats/game-stats";
import {useGameIsOver, useGameIsStarted} from "../../hooks/game-state";
import {useActions} from "../../store/actions";
import {GameOverMessage} from "../game-over-message/game-over-message";

export const GameWrapper = () => {
    const gameIsStarted = useGameIsStarted();
    const {initGame} = useActions();
    const gameIsOver = useGameIsOver()

    useEffect(() => {
        if (!gameIsStarted) {
            initGame();

        }
    }, [gameIsStarted, initGame]);

    const onTryAgain = () => {
        initGame();
    };

    return <div className={styles.wrapper}>
        <GameStats/>
        <GameGrid />
        {gameIsOver && <GameOverMessage onTryAgain={onTryAgain} />}
    </div>
};