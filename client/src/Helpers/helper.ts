// https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time
export const timeDifference = (previous: number, short?: boolean) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerWeek = msPerDay * 7;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = Date.now() - previous;
    
    const secondsText = short ? 's' : ' seconds ago';
    const minutesText = short ? 'm' : ' minutes ago';
    const hoursText = short ? 'h' : ' hours ago';
    const daysText = short ? 'd' : ' days ago';
    const monthsText = short ? 'w' : ' months ago';
    const yearsText = short ? 'y' : ' years ago';

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + secondsText;
    }
    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + minutesText;
    }
    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + hoursText;
    }
    else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + daysText;
    }
    else if (elapsed < msPerYear) {
        if (short) {
            return Math.round(elapsed / msPerWeek) + monthsText;
        }

        return Math.round(elapsed / msPerMonth) + monthsText;
    }
    else {
        return Math.round(elapsed / msPerYear) + yearsText;
    }
};