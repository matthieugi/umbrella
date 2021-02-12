const httpFunction = require('./index');
const context = require('../testing/defaultContext');

test('Create new short URL', async () => {
    const request = {
        body: { url: 'http://microsoft.com' }
    };

    await httpFunction(context, request);

    expect(context.res.body).toEqual(
        expect.objectContaining({
            slug: expect.any(String)
        })
    );
});

test('Create a new bad short URL', async () => {
    const request = {
        body: { url: 'http://cdg.sh/toto' }
    };

    await httpFunction(context, request);
    expect(context.res.status).toEqual(500);

    context.db.close();
});