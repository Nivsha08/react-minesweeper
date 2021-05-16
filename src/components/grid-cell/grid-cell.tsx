import React from 'react';
import styles from './grid-cell.module.scss';
import {Cell} from "../../types/types";

type GridCellProps = {
    cell: Cell
}

export const GridCell = ({cell}: GridCellProps) => {
    return <div className={styles.gridCell}>
        X
    </div>
};