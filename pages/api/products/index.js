import data from '../../../mock-data/demo12.json';
import { getMinMaxPrice, isSaleProduct } from '../../../utils/utils';

const handler = async (req, res) => {
  const method = req.method;
  switch (method) {
    case 'GET':
      let products = data.products.map(product => {
        return { ...product, price: getMinMaxPrice(product) }
      });
      const featured = products.filter(item => item.is_hot)
      const onSale = products.filter(item => isSaleProduct(item));
      const bestSelling = products.sort((itemA, itemB) => itemB.sale_count - itemA.sale_count);
      const topRated = products.sort((itemA, itemB) => itemA.ratings > itemB.ratings);
      const latest = products.filter(item => item.is_new);
      res.status(200).json({ message: "fetch successfully", data: { products, featured, bestSelling, onSale, latest, topRated } })
      break;
    default:
      res.status(405).json({ message: `Method ${method} Not Allowed;` })
      break;
  }
}

export default handler