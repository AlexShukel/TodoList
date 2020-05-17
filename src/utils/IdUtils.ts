import { getIn } from 'formik';

export const getUniqueId = <T>(array: T[], idPath: string) => {
    const uniqueId =
        array.reduce<number>((previousValue: number, currentValue: T) => {
            const id = getIn(currentValue, idPath);
            return id > previousValue ? id : previousValue;
        }, 0) + 1;
    return uniqueId;
};
