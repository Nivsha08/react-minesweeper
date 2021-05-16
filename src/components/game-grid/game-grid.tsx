import React, {CSSProperties} from 'react';
import styles from './game-grid.module.scss';
import {GridCell} from "../grid-cell/grid-cell";
import {useGameGrid} from "../../hooks/game-state";

type GameGridProps = {
    gridStyle: CSSProperties;
}

export const GameGrid = ({gridStyle}: GameGridProps) => {
    const gameGrid = useGameGrid();

    return <div className={styles.gameGrid} style={gridStyle}>
        {gameGrid.map((gridRow, i) =>
            gridRow.map((cell, j) =>
                <GridCell cell={cell} key={`(${i},${j})`}/>))
        }
    </div>
};