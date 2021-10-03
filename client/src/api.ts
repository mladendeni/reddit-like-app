export const getApiUrl = () => {
    let url = 'http://localhost:3001';

    // TODO: change these for production and test environments
    if (process.env.NODE_ENV === 'test') {
        url = 'http://localhost:3001'
    }

    if (process.env.NODE_ENV === 'production') {
        url = 'http://localhost:3001'
    }

    return url;
};