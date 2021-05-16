import React from 'react';
import styles from './game-wrapper.module.scss';
import {GameGrid} from "../game-grid/game-grid";

type GameWrapperProps = {

}

export const GameWrapper = () => {
    return <div className={styles.wrapper}>
        <GameGrid />
    </div>
};