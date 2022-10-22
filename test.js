const assert = require('assert');
const moment = require('moment');
const { counter, default: counters } = require('./dist/counters');

const FORMAT = 'YYYY-MM-DD';
const today = moment();
const yesterday = today.clone().subtract(1, 'day');
const tomorrow = today.clone().add(1, 'day');
const TODAY_WEEK = today.clone().weekday();
const DAYS_THIS_MONTH = today.clone().endOf('month').get('date');

// counter
// moment
assert.equal(counter(today.clone().format(FORMAT)).diff, 0);
assert.equal(counter(yesterday.clone().format(FORMAT)).diff, -1);
assert.equal(counter(tomorrow.clone().format(FORMAT)).diff, 1);

['day', 'week', 'month', 'year'].map((unit) => {
    for (let i = -100; i <= 100; i += 1) {
        const testDay = today.clone().add(i, unit).format(FORMAT);
        const diff = moment(testDay).diff(today.clone().startOf('day'), 'day');
        assert.equal(counter(testDay).diff, diff);
    }
});

// cron
assert.equal(counter('0 0 * * *').diff, 1);
for (let i = 1; i <= 33; i += 1) {
    assert.equal(counter(`0 0 ${today.clone().add(i, 'day').get('date')} * *`).diff, (i - 1) % DAYS_THIS_MONTH + 1);
};
for (let i = 0; i <= 7; i += 1) {
    assert.equal(counter(`0 0 * * ${i}`).diff, (7 - TODAY_WEEK + i - 1) % 7 + 1);
};


// counters
const TODAY_INPUT = `${today.clone().format(FORMAT)} _ Today`;
const TODAY_OUTPUT = '🎁🎁🎁 Today is Today';
const YESTERDAY_INPUT = `${yesterday.clone().format(FORMAT)} _ Yesterday`;
const YESTERDAY_OUTPT = '🗓 1 day after Yesterday';
const TOMORROW_INPUT = `${tomorrow.clone().format(FORMAT)} _ Tomorrow`;
const TOMORROW_OUTPT = '🗓 1 day before Tomorrow';
assert.equal(counters(TODAY_INPUT), TODAY_OUTPUT);
assert.equal(counters(YESTERDAY_INPUT), YESTERDAY_OUTPT);
assert.equal(counters(TOMORROW_INPUT), TOMORROW_OUTPT);
assert.equal(counters(`${TODAY_INPUT} | ${TODAY_INPUT}`), `${TODAY_OUTPUT}\n${TODAY_OUTPUT}`);
assert.equal(counters(`${TODAY_INPUT} | ${YESTERDAY_INPUT} | ${TOMORROW_INPUT}`), `${TODAY_OUTPUT}\n${YESTERDAY_OUTPT}\n${TOMORROW_OUTPT}`);
assert.equal(counters(`${YESTERDAY_INPUT} | ${TODAY_INPUT} | ${TOMORROW_INPUT}`), `${TODAY_OUTPUT}\n${YESTERDAY_OUTPT}\n${TOMORROW_OUTPT}`);
