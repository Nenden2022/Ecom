export function getMinMaxPrice(product) {
  return product.variants.reduce((acc, cur) => {
    acc[0] = cur.sale_price ? Math.min(cur.sale_price, acc[0]) : cur.price ? Math.min(cur.price, acc[0]) : acc[0];
    acc[1] = cur.price ? Math.max(acc[1], cur.price) : acc[1];
    return acc;
  }, [product.sale_price ? product.sale_price : product.price ? product.price : Infinity, product.price ? product.price : 0]);
}

export function isSaleProduct(product) {
  return product.price[0] !== product.price[1] && product.variants.length === 0 ? true : product.variants.find(variant => variant.sale_price) ? true : false;
}

export function getCategoryTree(categories, root) {
  let stack = [...root];
  let results = [];
  let temp, children;

  while (stack.length) {
    temp = stack[stack.length - 1];
    stack.pop();
    if (!results.find(cat => cat.slug === temp.slug)) {
      results.push(temp);
      children = categories.filter(cat => cat.parent === temp.name);
      stack = stack.concat(children);
    }
  }

  return results;
}