import React, {CSSProperties} from 'react';
import styles from './game-grid.module.scss';
import {GameConfiguration} from "../../types/types";
import {CELL_SIZE_PX} from "../../constants";

type GameGridProps = {
    configuration: GameConfiguration;
}

const getGridStyle = (rows: number, columns: number): CSSProperties => ({
    gridTemplateRows: `${CELL_SIZE_PX}px `.repeat(rows),
    gridTemplateColumns: `${CELL_SIZE_PX}px `.repeat(columns),
});

export const GameGrid = ({configuration}: GameGridProps) => {
    const {rows, columns} = configuration;

    return <div className={styles.gameGrid} style={getGridStyle(rows, columns)}>
        {Array(rows).fill(null).map((e) => Array(columns).fill(null)
            .map((k, i) => <div className={styles.cell}
                                key={i}>X</div>))}
    </div>
};