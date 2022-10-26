import counters from './counters';

export const ENDING = '🤖 by [date-box](https://github.com/kf-liu/date-box)';

const formatDiffDay = (absDiff, maxLength) => {
    let diffStr = absDiff.toString();
    while (diffStr.length < maxLength) diffStr = diffStr + ' ';
    return diffStr;
};

const getContent = ({ absDiff, negative, event = '' }, { maxLength }) =>
    absDiff === 0
        ? `🎁🎁🎁 Today is ${event}`
        : `🗓 ${formatDiffDay(absDiff, maxLength)} ${absDiff === 1 ? 'day ' : 'days'} ${negative ? 'after ' : 'before'} ${event}`;

export default (records) => {
    const newContents = counters(records);
    if (!newContents?.length) return '';
    const maxLength = newContents[newContents?.length - 1]?.absDiff?.toString()?.length || 0;
    return newContents
        ?.map((record) => getContent(record, { maxLength }))
        ?.join('\n')
        + '\n'
        + ENDING;
};
