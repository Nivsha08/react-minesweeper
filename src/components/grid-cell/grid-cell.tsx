import React from 'react';
import styles from './grid-cell.module.scss';
import {Cell} from "../../types/types";
import classnames from 'classnames';

type GridCellProps = {
    cell: Cell
}

export const GridCell = ({cell}: GridCellProps) => {
    return <div className={classnames(styles.gridCell, {
        [styles.mine]: cell.isMine
    })} />
};