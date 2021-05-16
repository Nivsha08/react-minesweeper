import {GameConfiguration} from "../types/types";

export const useInitGameConfiguration = (): GameConfiguration => ({
    rows: 10,
    columns: 15,
    numberOfMines: 20
});