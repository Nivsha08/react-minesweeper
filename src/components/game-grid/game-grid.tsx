import React from 'react';
import styles from './game-grid.module.scss';
import {GameConfiguration} from "../../types/types";
import {GridCell} from "../grid-cell/grid-cell";
import {useGameGrid} from "../../hooks/use-game-grid";

type GameGridProps = {
    configuration: GameConfiguration;
}

export const GameGrid = ({configuration}: GameGridProps) => {
    const {gameGrid, setGameGrid, gridStyle} = useGameGrid(configuration);

    return <div className={styles.gameGrid} style={gridStyle}>
        {gameGrid.map((gridRow, i) =>
            gridRow.map((cell, j) =>
                <GridCell cell={cell} key={`(${i},${j})`}/>))
        }
    </div>
};