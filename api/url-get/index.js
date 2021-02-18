require('dotenv').config();

const monk = require('monk');
const db = monk(process.env.MONGODB_URI);
const urls = db.get('urls');
urls.createIndex({ slug: 1 }, { unique: true });

module.exports = async function (context, req) {
    const { id: slug } = req.params;
    context.db = db;

    try {
      const url = await urls.findOne({ slug });
      if (url) {
        context.res = {
            status: 302, 
            headers: { location: url.url }
            };
      }
      else {
        context.res = {
            status: 302,
            headers: { location: '/notfound'}
        }
      }
    } catch (error) {
        context.res = {
            status: 302,
            headers: { location: '/notfound'}
        }
    }
}