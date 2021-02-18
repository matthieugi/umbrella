const httpFunction = require('./index');
const context = require('../testing/defaultContext');

test('Pass wrong Id', async () => {
    const request = {
        params: { id: 'wrongId' }
    };

    await httpFunction(context, request);
    expect(context.res.headers.location).toEqual('/notfound');

    context.db.close();
});