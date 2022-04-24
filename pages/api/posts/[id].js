import data from '../../../mock-data/demo1.json';
import { getCategoryTree, getMinMaxPrice } from '../../../utils/utils';
const handler = async (req, res) => {
  const { query: { id }, method, } = req;
  switch (method) {
    case 'GET':
      let post = data.posts.find(post => post.slug === args.slug);
      let related = data.posts.filter(
        item => item.slug !== post.slug && item.categories.find(cat => post.categories.find(findCat => findCat.slug === cat.slug))
      );
      res.status(200).json({
        message: "fetch successfully", data: {
          data: post,
          related: related.slice(0, 4)
        }
      });
      break;
    default:
      res.status(405).json({ message: `Method ${method} Not Allowed;` })
      break;
  }
}

export default handler