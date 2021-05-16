import React from 'react';
import styles from './game-over-message.module.scss';

type GameOverMessageProps = {
    onTryAgain: () => void;
}

export const GameOverMessage = ({onTryAgain}: GameOverMessageProps) => {
    return <div className={styles.gameOverWrapper}>
        Game Over
        <button className={styles.tryAgainButton} onClick={onTryAgain}>Try Again</button>
    </div>
};