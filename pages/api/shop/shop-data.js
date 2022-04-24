import data from '../../../mock-data/demo1.json';
import { getCategoryTree, getMinMaxPrice, isSaleProduct } from '../../../utils/utils';

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      let results = {};
      const categories = data.productCategories.sort((a, b) => a.name < b.name ? -1 : 1);
      const products = data.products.map(product => {
        return { ...product, price: getMinMaxPrice(product) }
      });
      results.categories = categories.map(category => {
        let tree = getCategoryTree(categories, [category]);
        return {
          ...category,
          count: products.filter(
            product => product.categories.find(findCat => tree.find(cat => cat.slug === findCat.slug))
          ).length
        }
      });
      const feature = results.featured = products.filter(item => item.is_hot).slice(0, 3);
      res.status(200).json({ message: "fetch successfully", data: { shopSidebarData: results, feature } })
      break;
    default:
      res.status(405).json({ message: `Method ${method} Not Allowed;` })
      break;
  }
}

export default handler