import moment from 'moment';

export const dateToYearMonthDay = (date: Date) => {
    return moment(date).format('YYYY-MM-DD HH:mm');
};
