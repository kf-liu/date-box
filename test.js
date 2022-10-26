const assert = require('assert');
const moment = require('moment');
const { counter } = require('./lib/counters');
const { default: contents, ENDING } = require('./lib/contents')

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


// contents
const ending = ENDING;
const TODAY_INPUT = `${today.clone().format(FORMAT)} _ TODAY`;
const TODAY_OUTPUT = '🎁🎁🎁 Today is TODAY\n';
const YESTERDAY_INPUT = `${yesterday.clone().format(FORMAT)} _ YESTERDAY`;
const YESTERDAY_OUTPUT = '🗓 1 day  after  YESTERDAY\n';
const YESTERDAY_OUTPUT_S = '🗓 1  day  after  YESTERDAY\n';
const TOMORROW_INPUT = `${tomorrow.clone().format(FORMAT)} _ TOMORROW`;
const TOMORROW_OUTPUT = '🗓 1 day  before TOMORROW\n';
const TOMORROW_OUTPUT_S = '🗓 1  day  before TOMORROW\n';
assert.equal(contents(TODAY_INPUT), TODAY_OUTPUT + ending);
assert.equal(contents(YESTERDAY_INPUT), YESTERDAY_OUTPUT + ending);
assert.equal(contents(TOMORROW_INPUT), TOMORROW_OUTPUT + ending);
assert.equal(contents(`${TODAY_INPUT} | ${TODAY_INPUT}`), `${TODAY_OUTPUT}${TODAY_OUTPUT}` + ending);
assert.equal(contents(`${TODAY_INPUT} | ${YESTERDAY_INPUT} | ${TOMORROW_INPUT}`), `${TODAY_OUTPUT}${YESTERDAY_OUTPUT}${TOMORROW_OUTPUT}` + ending);
assert.equal(contents(`${YESTERDAY_INPUT} | ${TODAY_INPUT} | ${TOMORROW_INPUT}`), `${TODAY_OUTPUT}${YESTERDAY_OUTPUT}${TOMORROW_OUTPUT}` + ending);

const TEN_DAYS_AFTER_INPUT = `${today.clone().subtract(10, 'day').format(FORMAT)} _ TEN_DAYS_AFTER`;
const TEN_DAYS_AFTER_OUTPUT = `🗓 10 days after  TEN_DAYS_AFTER\n`;
const TEN_DAYS_BEFORE_INPUT = `${today.clone().add(10, 'day').format(FORMAT)} _ TEN_DAYS_BEFORE`;
const TEN_DAYS_BEFORE_OUTPUT = `🗓 10 days before TEN_DAYS_BEFORE\n`;

const input = `${TEN_DAYS_AFTER_INPUT} | ${TODAY_INPUT} | ${YESTERDAY_INPUT} | 0 0 * * * _ TOMORROW | 0 * * * * _ TODAY | ${TEN_DAYS_BEFORE_INPUT} | ${TOMORROW_INPUT}`;
const output = TODAY_OUTPUT + TODAY_OUTPUT + YESTERDAY_OUTPUT_S + TOMORROW_OUTPUT_S + TOMORROW_OUTPUT_S + TEN_DAYS_AFTER_OUTPUT + TEN_DAYS_BEFORE_OUTPUT + ending;
assert.equal(contents(input), output);
