import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const yup = require('yup');
const { nanoid } = require('nanoid');

const schema = yup.object().shape({
    slug: yup.string().trim().matches(/^[\w\-]+$/i),
    url: yup.string().trim().url().required(),
  });

require('dotenv').config();
const monk = require('monk');
const db = monk(process.env.MONGODB_URI);
const urls = db.get('urls');

const httpTrigger: AzureFunction = async function ({ res, req, log }: Context, request: HttpRequest): Promise<void> {
    log("entered");

    const urls = db.get('urls');

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
        res.json(created);
    } catch (error) {
        log(error);
    }
};

export default httpTrigger;