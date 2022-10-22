import moment from 'moment';
import cronParser from 'cron-parser';

const RECORD_SEPARATOR = ' _ ';
const RECORDS_SEPARATOR = ' | ';

const parseRecord = (record) => {
    const [time, event] = record?.split(RECORD_SEPARATOR) || [];
    if (!time) return [];
    let nextMoment;
    try {
        nextMoment = moment(cronParser.parseExpression(time).next().toString());
    } catch (error) {
        nextMoment = moment(time);
    }
    const diff = nextMoment.diff(moment().startOf('day'), 'day');
    return [diff, event];
};

export const counter = (record) => {
    const [diff, event] = parseRecord(record);
    if (diff === 0) {
        return {
            diff: diff,
            absDiff: diff,
            negative: false,
            content: `🎁🎁🎁 Today is ${event}`,
        };
    }
    if (!diff) return false;
    const absDiff = Math.abs(diff);
    const negative = Boolean(diff < 0);
    return {
        diff: diff,
        absDiff,
        negative,
        content: `🗓 ${Math.abs(diff)} ${absDiff === 1 ? 'day' : 'days'} ${negative ? 'after' : 'before'} ${event}`,
    };
};

export default (records) => {
    const recordsArr = records?.split(RECORDS_SEPARATOR);
    if (!recordsArr?.length) return '';
    const contents = recordsArr
        ?.map((record) => counter(record))
        ?.filter(Boolean)
        ?.sort((a, b) => a.absDiff - b.absDiff)
        ?.map((record) => record.content || '🎁')
        ?.join('\n');
    return contents;
};
