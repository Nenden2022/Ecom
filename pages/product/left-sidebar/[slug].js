import React from 'react';
import { useRouter } from 'next/router';
// Import Custom Component
import ALink from '../../../components/common/ALink';
import ProductMediaOne from '../../../components/partials/product/media/product-media-one';
import ProductDetailOne from '../../../components/partials/product/details/product-detail-one';
import SingleTabThree from '../../../components/partials/product/tabs/single-tab-three';
import RelatedProducts from '../../../components/partials/product/widgets/related-products';
import ProductWidgetContainer from '../../../components/partials/product/widgets/product-widget-container';
import ProductSidebarOne from '../../../components/partials/product/sidebars/sidebar-one';

function ProductLeftSidebar({ data, shopData, error, loading }) {
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
            <div className="container">
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

                <div className="row">
                    <ProductSidebarOne data={shopData} />

                    <div className={`col-lg-9 main-content pb-2 skeleton-body skel-shop-products ${loading ? '' : 'loaded'}`}>
                        <div className="product-single-container product-single-default product-left-sidebar">
                            <div className="row">
                                <ProductMediaOne product={product} adClass="col-lg-7 col-md-6" />
                                <ProductDetailOne
                                    adClass="col-lg-5 col-md-6"
                                    product={product}
                                    prev={product && data.product.prev}
                                    next={product && data.product.next}
                                />
                            </div>
                        </div>

                        <SingleTabThree product={product} loading={loading} />
                        <RelatedProducts adClass="mb-1" products={related} loading={loading} />
                    </div>
                </div>
            </div>

            <ProductWidgetContainer />
        </main>
    )
}

ProductLeftSidebar.getInitialProps = async ({ query: { slug } }) => {
    try {
        const res = await fetch(`http://localhost:3000/api/products/${slug}`)
        const resp = await fetch('http://localhost:3000/api/shop/shop-data')
        const shop = await resp.json();
        const { data } = await res.json();
        return { data, loading: false, error: false, shopData: shop.data }
    } catch (error) {
        return { data: error, error: error, loading: true }
    }
}

export default ProductLeftSidebar;