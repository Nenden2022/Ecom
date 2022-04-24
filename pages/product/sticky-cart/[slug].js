import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

// Import Apollo Server and Query
import withApollo from '../../../server/apollo';
import { GET_PRODUCT } from '../../../server/queries';

// Import Custom Component
import ALink from '../../../components/common/ALink';
import ProductMediaOne from '../../../components/partials/product/media/product-media-one';
import ProductDetailOne from '../../../components/partials/product/details/product-detail-one';
import ProductWidgetContainer from '../../../components/partials/product/widgets/product-widget-container';
import RelatedProducts from '../../../components/partials/product/widgets/related-products';
import SingleTabOne from '../../../components/partials/product/tabs/single-tab-one';

function ProductStickyCart({ data, error, loading }) {
    if (!useRouter().query.slug) return (
        <div className="loading-overlay">
            <div className="bounce-loader">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        </div>
    );

    const product = data && data.product;
    const related = data && data.related;


    if (error) {
        return useRouter().push('/pages/404');
    }
    if (data.error) {
        return <div>{data.error}</div>
    }

    return (
        <main className="main">
            <div className={`container skeleton-body skel-shop-products ${loading ? '' : 'loaded'}`}>
                <nav aria-label="breadcrumb" className="breadcrumb-nav">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><ALink href="/"><i className="icon-home"></i></ALink></li>
                        <li className="breadcrumb-item"><ALink href="/shop">Shop</ALink></li>
                        <li className="breadcrumb-item">
                            {
                                product && product.categories.map((item, index) => (
                                    <React.Fragment key={`category-${index}`}>
                                        <ALink href={{ pathname: "/shop", query: { category: item.slug } }}>{item.name}</ALink>
                                        {index < product.categories.length - 1 ? ',' : ''}
                                    </React.Fragment>
                                ))
                            }
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{product && product.name}</li>
                    </ol>
                </nav>

                <div className={`product-single-container product-single-default`}>
                    <div className="row">
                        <ProductMediaOne product={product} />

                        <ProductDetailOne
                            product={product}
                            prev={product && data.product.prev}
                            isSticky={true}
                            next={product && data.product.next}
                        />
                    </div>
                </div>

                <SingleTabOne product={product} />

                <RelatedProducts products={related} loading={loading} />
            </div>
            <ProductWidgetContainer />
        </main >
    )
}

ProductStickyCart.getInitialProps = async ({ query: { slug } }) => {
    try {
        const res = await fetch(`http://localhost:3000/api/products/${slug}`)
        const { data } = await res.json();
        return { data, loading: false, error: false }
    } catch (error) {
        return { data: error, error: error, loading: true }
    }
}
export default ProductStickyCart;