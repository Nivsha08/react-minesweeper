import React from 'react';
import styles from './game-wrapper.module.scss';
import {GameGrid} from "../game-grid/game-grid";
import {useInitGameConfiguration} from "../../hooks/use-init-game-configuration";

export const GameWrapper = () => {
    const gameConfig = useInitGameConfiguration();

    return <div className={styles.wrapper}>
        <GameGrid configuration={gameConfig} />
    </div>
};