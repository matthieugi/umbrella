const yup = require('yup');
const { nanoid } = require('nanoid');

const schema = yup.object().shape({
    slug: yup.string().trim().matches(/^[\w\-]+$/i),
    url: yup.string().trim().url().required(),
  });

require('dotenv').config();
const monk = require('monk');
const db = monk(process.env.MONGODB_URI);

module.exports =  async function (context, req) {

    const urls = db.get('urls');
    context.db = db;

    let { slug, url } = req.body;
    try {
        await schema.validate({
            slug,
            url,
        });
        if (url.includes('cdg.sh')) {
            throw new Error('Stop it. 🛑');
        }
        if (!slug) {
            slug = nanoid(5);
        } else {
            const existing = await urls.findOne({ slug });
            if (existing) {
                throw new Error('Slug in use. 🍔');
            }
        }
        slug = slug.toLowerCase();
        const newUrl = {
            url,
            slug,
        };
        const created = await urls.insert(newUrl);

        context.res.body = created;
    } catch (error) {
        context.log(error);
        context.res.status = 500;
    }
}