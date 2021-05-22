import {useSelectors} from "../store/selectors";
import {useSelector} from "react-redux";

export const useGameDifficultyLevel = () => {
    const {selectDifficultyLevel} = useSelectors();
    return useSelector(selectDifficultyLevel);
};

export const useGameConfiguration = () => {
    const {selectGameConfiguration} = useSelectors();
    return useSelector(selectGameConfiguration);
};