<p align="center">
<img width="451" alt="image" src="https://user-images.githubusercontent.com/41723241/197344866-ef27cfd0-afac-4c8c-9502-13cc23350a4c.png">
  <h3 align="center">date-box</h3>
  <p align="center">🗓 Update a pinned gist to contain your anniversaries and countdown days (or hours)</p>
</p>

[![Node.js CI](https://github.com/kf-liu/date-box/actions/workflows/node.yml/badge.svg)](https://github.com/kf-liu/date-box/actions/workflows/node.yml)
[![Update gist with Date](https://github.com/kf-liu/date-box/actions/workflows/schedule.yml/badge.svg)](https://github.com/kf-liu/date-box/actions/workflows/schedule.yml)
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/kf-liu/date-box?display_name=tag&sort=semver)
![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/kf-liu/date-box?display_name=tag&include_prereleases&sort=semver)
![GitHub commits since latest release (by SemVer including pre-releases)](https://img.shields.io/github/commits-since/kf-liu/date-box/latest?include_prereleases&sort=semver)
![GitHub](https://img.shields.io/github/license/kf-liu/date-box)

---

> 📌 This project is inspired by [waka-box](https://github.com/matchai/waka-box) and [lang-box](https://github.com/inokawa/lang-box). 
> 
> 📌 For more pinned-gist projects like this one, check out: https://github.com/matchai/awesome-pinned-gists.

## Setup
### Prep work
1. Create a new public GitHub Gist (https://gist.github.com)
2. Create a token with the `gist` scope and **copy it**. (https://github.com/settings/tokens/new)

### Project setup

1. Fork this repo
1. Edit the [environment variable](https://github.com/kf-liu/date-box/blob/master/.github/workflows/schedule.yml#L18-L20) in `.github/workflows/schedule.yml`:

   - **GIST_ID:** The ID portion from your gist url: `https://gist.github.com/kf-liu/`**`7de2a55824ec5e8a78ebc3c57e4ca82b`**.

1. Go to the repo **Settings > Secrets**
1. Add the following environment variables:
   - **GH_TOKEN:** The GitHub token generated above.
   - **RECORDS:** Your anniversary and countdown days. (The format is below.)

## Records format
```
((cron|moment)( _ (event))? | )|*(cron|moment)( _ (event))?
    |     |     |     |     |
    |     |     |     |     |
    |     |     |     |     +- - - ' | ': record separator
    |     |     |     |
    |     |     |     +- - - - - - (event): what you want to record
    |     |     |
    |     |     +- - - - - - - - - ' _ ': the time and event separator
    |     |
    +- - -+- - - - - - - - - - - - (time): when you want to record
```
### Time format
Currently, two formats are supported: `cron` (for loop event) and `moment` (for single event).

- corn: to schedule a loop event to countdown at specific UTC times using [POSIX cron syntax](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07). 
  - e.g. 
    - `0 0 1 * *`
    - `0 0 * * 0`
- moment: to schedule a single event to countdown using [moment](https://momentjs.com/docs/#/parsing/string/). 
  - e.g. 
    - `2022-10-22`

### One record
One `record` consists of one `time` and one `event`, and thay are connected by ` _ ` (a space, an underscore, and a space). Each record will be displayed as a line in your gist.

e.g.
- `0 0 * * 0,6 _ WEEKEND`
- `0 0 10 * * _ PAYDAY`
- `2022-10-22 _ CREATE THIS REPO`
- `0 0 28 12 * _ MY BIRTHDAY`

Of course, `event` is not required, you can just give the time. (` _ ` is not required as well). 

### Multiple records
This is the final format of records: Connect a series of records with ` | ` (a space, an vertical bar, and a space).

e.g.
`0 0 * * 0,6 _ WEEKEND | 0 0 10 * * _ PAYDAY | 2022-10-22 _ CREATE THIS REPO | 0 0 28 12 * _ MY BIRTHDAY`.

## Ideas to be continue
- [ ] The countdown to the next holiday.

---

You are the ![](https://komarev.com/ghpvc/?username=kf-liu-date-box&label=NO) lucky visitor here! Thank you for your 👀attention and ✨star!
