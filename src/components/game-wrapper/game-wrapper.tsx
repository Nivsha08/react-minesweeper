import React, {useCallback, useEffect, useState} from 'react';
import styles from './game-wrapper.module.scss';
import {GameGrid} from "../game-grid/game-grid";
import {GameStats} from "../game-stats/game-stats";
import {
    useGameIsOver,
    useGameIsStarted,
    useIsPlayerWon,
} from "../../hooks/game-state";
import {useActions} from "../../store/actions";
import {PlayerMessage} from "../player-message/player-message";

export const GameWrapper = () => {
    const [gameIntervalId, setGameIntervalId] = useState<number | undefined>();
    const gameIsStarted = useGameIsStarted();
    const {initGame, incrementElapsedTime} = useActions();
    const playerWon = useIsPlayerWon();
    const gameIsOver = useGameIsOver();

    const gameEnded = playerWon || gameIsOver;

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
        if (gameEnded) {
            clearInterval(gameIntervalId);
        }
    }, [gameIntervalId, gameIsOver, playerWon])

    return <div className={styles.wrapper}>
        <GameStats/>
        <GameGrid disable={gameEnded} />
        {playerWon && <PlayerMessage type='success' onActionClick={restartGame} />}
        {gameIsOver && <PlayerMessage type='failure' onActionClick={restartGame} />}
    </div>
};