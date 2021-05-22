import React, {useCallback, useEffect, useState} from 'react';
import styles from './game-wrapper.module.scss';
import {GameGrid} from "../game-grid/game-grid";
import {GameTopBar} from "../game-stats/game-top-bar";
import {
    useGameIsOver,
    useGameIsStarted,
    useIsPlayerWon,
} from "../../hooks/game-state";
import {useActions} from "../../store/actions";
import {PlayerMessage} from "../player-message/player-message";
import {useGameDifficultyLevel} from "../../hooks/game-configuration";
import {DifficultyLevel} from "../../types/types";

export const GameWrapper = () => {
    const [gameIntervalId, setGameIntervalId] = useState<number | undefined>();
    const difficulty = useGameDifficultyLevel();
    const gameIsStarted = useGameIsStarted();
    const {initGame, incrementElapsedTime, setDifficultyLevel} = useActions();
    const playerWon = useIsPlayerWon();
    const gameIsOver = useGameIsOver();

    const gameEnded = playerWon || gameIsOver;

    const restartGame = useCallback(() => {
        initGame(difficulty);
        const intervalId = setInterval(() => {
            incrementElapsedTime();
        }, 1000)
        setGameIntervalId(intervalId as unknown as number);
    }, [difficulty, incrementElapsedTime, initGame]);

    useEffect(() => {
        if (!gameIsStarted) {
            restartGame();
        }
    }, [gameIsStarted, incrementElapsedTime, initGame, restartGame]);

    useEffect(() => {
        if (gameEnded) {
            clearInterval(gameIntervalId);
        }
    }, [gameEnded, gameIntervalId, gameIsOver, playerWon])

    const onDifficultyChange = (difficulty: DifficultyLevel) => {
        if (gameIntervalId) {
            clearInterval(gameIntervalId);
        }
        setDifficultyLevel(difficulty);
        restartGame();
    }

    return <div className={styles.wrapper}>
        <GameTopBar onDifficultyChange={onDifficultyChange}/>
        <GameGrid disable={gameEnded} />
        {playerWon && <PlayerMessage type='success' onActionClick={restartGame} />}
        {gameIsOver && <PlayerMessage type='failure' onActionClick={restartGame} />}
    </div>
};