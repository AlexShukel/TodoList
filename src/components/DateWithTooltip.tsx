import React from 'react';
import { dateToYearMonthDay } from '../utils/DateUtils';
import { useI18n } from './I18nContext';
import { Tooltip, Typography } from '@material-ui/core';
import moment from 'moment';

const defaultI18n = {
    dateWasntDefined: `Date wasn't defined`,
    timeIsUp: 'Time is up',
    timeWillExpire: 'Time will expire',
};

interface Props {
    date: Date;
}

const DateWithTooltip = ({ date }: Props) => {
    const i18n = useI18n(defaultI18n, 'DateWithTooltip');
    const currentDate = new Date();
    return (
        <Tooltip
            title={
                date ? (
                    <Typography>
                        {`${
                            date.getTime() < currentDate.getTime()
                                ? i18n.timeIsUp
                                : i18n.timeWillExpire
                        } ${moment(date).fromNow()}`}
                    </Typography>
                ) : (
                    ''
                )
            }
            placement="bottom-start"
        >
            <div
                style={
                    date
                        ? date.getTime() > currentDate.getTime()
                            ? { color: 'green' }
                            : { color: 'red' }
                        : undefined
                }
            >
                {date ? dateToYearMonthDay(date) : i18n.dateWasntDefined}
            </div>
        </Tooltip>
    );
};

export default DateWithTooltip;
