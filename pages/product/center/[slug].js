import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

// Import Custom Component
import ALink from '../../../components/common/ALink';
import ProductMediaSeven from '../../../components/partials/product/media/product-media-seven';
import ProductDetailFive from '../../../components/partials/product/details/product-detail-five';
import ProductWidgetContainer from '../../../components/partials/product/widgets/product-widget-container';
import RelatedProducts from '../../../components/partials/product/widgets/related-products';
import SingleTabFour from '../../../components/partials/product/tabs/single-tab-four';

function ProductCenter({ data, error, loading }) {
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

                <div className={`product-single-container product-single-default product-center-vertical`}>
                    <div className="row">
                        <ProductDetailFive
                            adClassOne="order-1 order-lg-0"
                            adClassTwo="order-2 order-lg-2"
                            type="1"
                            product={product}
                            prev={product && data.product.prev}
                            next={product && data.product.next}
                        />

                        <ProductMediaSeven
                            adClass="col-lg-6 d-lg-flex order-0 order-lg-0"
                            subClass="col-lg-12"
                            product={product}
                        />
                    </div>
                </div>

                <SingleTabFour product={product} adClass="product-tabs-list pt-3 mb-0 mt-1" />
                <RelatedProducts products={related} loading={loading} />
            </div>
            <ProductWidgetContainer />
        </main>
    )
}

ProductCenter.getInitialProps = async ({ query: { slug } }) => {
    try {
        const res = await fetch(`http://localhost:3000/api/products/${slug}`)
        const { data } = await res.json();
        return { data, loading: false, error: false }
    } catch (error) {
        return { data: error, error: error, loading: true }
    }
}

export default ProductCenter;