import { timeDifference } from '../Helpers/helper';

beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1633274348313)); // Sun Oct 03 2021 18:19:08 GMT+0300 (Eastern European Summer Time)
});

afterAll(() => {
    jest.useRealTimers();
});

it('returns correct time difference', () => {
    const time = timeDifference(1633274347313);

    expect(time).toBe('1 seconds ago');
});

it('returns correct time difference', () => {
    const time = timeDifference(1633273448313);

    expect(time).toBe('15 minutes ago');
});

it('returns correct time difference', () => {
    const time = timeDifference(1632755948313);

    expect(time).toBe('6 days ago');
});

it('returns correct time difference in short format', () => {
    const time = timeDifference(1633259948313, true);

    expect(time).toBe('4h');
});

it('returns correct time difference in short format', () => {
    const time = timeDifference('asd');

    expect(time).toBe('NaN years ago');
});