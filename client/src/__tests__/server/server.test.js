import { getApiUrl } from '../../api';

const apiUrl = getApiUrl();
const addPostUrl = `${apiUrl}/add-post`;

const post = {
    author: 'Guest',
    content: 'Test content'
};

it('stores a post to the server', async () => {
    return fetch(addPostUrl, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': apiUrl,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
        .then(async (response) => {
            if (!response.ok) {
                throw new Error('Server error: ' + response.statusText);
            }

            const jsonResp = await response.json();

            expect(jsonResp).toHaveProperty('id');
        }).catch((error) => {
            throw new Error(error);
        });
});

it('fails to store a post to the server because of insufficient params', async () => {
    return fetch(addPostUrl, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': apiUrl,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author: 'Guest'
        })
    })
        .then(async (response) => {
            if (response.status != 500) {
                throw new Error('Server error: ' + response.statusText);
            }
        }).catch((error) => {
            throw new Error(error);
        });
});