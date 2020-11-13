require('dotenv').config();

const { readFile } = require('fs');
const monk = require('monk');
const db = monk(process.env.MONGODB_URI);
const urls = db.get('urls');
urls.createIndex({ slug: 1 }, { unique: true });

module.exports = async function (context, req) {
    const { id: slug } = req.params;
    try {
      const url = await urls.findOne({ slug });
      if (url) {
        context.res = {
            status: 302, 
            headers: { location: url.url }
            };
      }
      else {
        context.res.status(404);
      }
    } catch (error) {
      context.res.status(404);
    }
}