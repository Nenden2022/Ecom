import data from '../../../mock-data/demo12.json';
import { getCategoryTree, getMinMaxPrice } from '../../../utils/utils';
const handler = async (req, res) => {
  const { query: { slug }, method, } = req;
  // const method = req.method;
  switch (method) {
    case 'GET':
      const products = data.products.map(product => {
        return { ...product, price: getMinMaxPrice(product) }
      });
      const product = products.find(product => product.slug === slug);
      if (product) {
        const categoryTree = getCategoryTree(data.productCategories, product.categories);
        const relatedProducts = products.filter(item => {
          return item.categories.find(cat => categoryTree.find(findCat => findCat.slug === cat.slug))
        });
        const index = relatedProducts.findIndex(item => item.slug === product.slug);
        return res.status(200).json({
          message: "fetch successfully", data: {
            product: product,
            prev: index > 0 ? relatedProducts[index - 1] : null,
            next: index < relatedProducts.length - 1 ? relatedProducts[index + 1] : null,
            related: relatedProducts.filter(item => item.slug !== product.slug).slice(0, 3)
          }
        });
      }
      res.status(200).json({
        message: "fetch successfully", data: { error: "data not found" }
      });
      break;
    default:
      res.status(405).json({ message: `Method ${method} Not Allowed;` })
      break;
  }
  // function getMinMaxPrice(product) {
  //   return product.variants.reduce((acc, cur) => {
  //     acc[0] = cur.sale_price ? Math.min(cur.sale_price, acc[0]) : cur.price ? Math.min(cur.price, acc[0]) : acc[0];
  //     acc[1] = cur.price ? Math.max(acc[1], cur.price) : acc[1];
  //     return acc;
  //   }, [product.sale_price ? product.sale_price : product.price ? product.price : Infinity, product.price ? product.price : 0]);
  // }

}

export default handler