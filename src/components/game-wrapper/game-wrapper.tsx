import React, {useEffect} from 'react';
import styles from './game-wrapper.module.scss';
import {GameGrid} from "../game-grid/game-grid";
import {GameStats} from "../game-stats/game-stats";
import {useGameIsStarted} from "../../hooks/game-state";
import {useActions} from "../../store/actions";
import {initGameConfiguration, initGameGrid} from "../../hooks/game-creator";

export const GameWrapper = () => {
    const gameConfig = initGameConfiguration();
    const {gameGrid, gridStyle} = initGameGrid(gameConfig);
    const gameIsStarted = useGameIsStarted();
    const {setGameIsStarted, setGrid} = useActions();

    useEffect(() => {
        if (!gameIsStarted) {
            setGrid(gameGrid);
            setGameIsStarted();
            console.log('here');
        }
    }, [gameGrid, gameIsStarted, setGameIsStarted, setGrid]);

    return <div className={styles.wrapper}>
        <GameStats/>
        <GameGrid gridStyle={gridStyle}/>
    </div>
};