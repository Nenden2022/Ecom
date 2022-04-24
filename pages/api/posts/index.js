import data from '../../../mock-data/demo1.json';
import { getMinMaxPrice, isSaleProduct } from '../../../utils/utils';

const handler = async (req, res) => {
  const { method, query: { from = 0, to = 3 } } = req;
  switch (method) {
    case 'GET':
      let posts = demoData.posts;
      // if (args.category) {
      //   posts = posts.filter(post => post.categories.find(cat => cat.slug === args.category));
      // }
      res.status(200).json({
        message: "fetch successfully", data: {
          data: posts.slice(from, to),
          total: posts.length
        }
      })
      break;
    default:
      res.status(405).json({ message: `Method ${method} Not Allowed;` })
      break;
  }
}

export default handler