import moment from "moment";

export const parseSeconds = (seconds: number): string => {
    return moment().startOf('day')
        .seconds(seconds)
        .format('mm:ss');
};