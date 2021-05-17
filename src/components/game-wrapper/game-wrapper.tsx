import React, {useCallback, useEffect, useState} from 'react';
import styles from './game-wrapper.module.scss';
import {GameGrid} from "../game-grid/game-grid";
import {GameStats} from "../game-stats/game-stats";
import {useGameIsOver, useGameIsStarted} from "../../hooks/game-state";
import {useActions} from "../../store/actions";
import {GameOverMessage} from "../game-over-message/game-over-message";

export const GameWrapper = () => {
    const [gameIntervalId, setGameIntervalId] = useState<number | undefined>();
    const gameIsStarted = useGameIsStarted();
    const {initGame, incrementElapsedTime} = useActions();
    const gameIsOver = useGameIsOver();

    const restartGame = useCallback(() => {
        initGame();
        const intervalId = setInterval(() => {
            incrementElapsedTime();
        }, 1000)
        setGameIntervalId(intervalId as unknown as number);
    }, [incrementElapsedTime, initGame]);

    useEffect(() => {
        if (!gameIsStarted) {
            restartGame();
        }
    }, [gameIsStarted, incrementElapsedTime, initGame, restartGame]);

    useEffect(() => {
        if (gameIsOver) {
            clearInterval(gameIntervalId);
        }
    }, [gameIntervalId, gameIsOver])

    const onTryAgain = () => {
        restartGame();
    };

    return <div className={styles.wrapper}>
        <GameStats/>
        <GameGrid />
        {gameIsOver && <GameOverMessage onTryAgain={onTryAgain} />}
    </div>
};