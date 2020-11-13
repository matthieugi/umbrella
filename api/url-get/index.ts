import { AzureFunction, Context, HttpRequest } from "@azure/functions"

require('dotenv').config();

const monk = require('monk');
const db = monk(process.env.MONGODB_URI);
const urls = db.get('urls');
urls.createIndex({ slug: 1 }, { unique: true });

const notFoundPath = '../../public/404.html';

const httpTrigger: AzureFunction = async function ({req, res}: Context): Promise<void> {
    const { id: slug } = req.params;
    try {
      const url = await urls.findOne({ slug });
      if (url) {
        res = {status: 302, headers:{location: url.url}};
        return;
      }
      return res.status(404);
    } catch (error) {
      return res.status(404);
    }
};

export default httpTrigger;