import React, { useEffect, useState } from 'react';
import Reveal from 'react-awesome-reveal';

// Import Custom Component
import ProductThree from '../../../features/products/product-three';

// Import Keyframes
import { fadeInLeftShorter } from '../../../../utils/data/keyframes'

function ProductWidgetContainer() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch("http://localhost:3000/api/products")
            .then(response => response.json())
            .then(data => { setData(data.data); setLoading(false) }).catch(err => setError(err))
    }, []);
    if (loading) return <div></div>;
    const adClass = ""


    if (error) {
        return <div>{error.message}</div>
    }

    return (
        <section className={`product-widgets-container pb-2 skeleton-body skel-shop-products ${loading ? '' : 'loaded'} ${adClass}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-sm-6 pb-5 pb-lg-0">
                        {
                            loading ?
                                [0, 1, 2].map((item, index) =>
                                    <div className="skel-product-col skel-pro mb-2" key={"ProductThree" + index}></div>
                                )
                                :
                                <>
                                    <h4 className="section-sub-title">Featured Products</h4>
                                    {
                                        data.featured.slice(0, 3).map((product, index) => (
                                            <ProductThree product={product} key={`ProductThree`, index} />
                                        ))
                                    }
                                </>

                        }
                    </div>

                    <div className="col-lg-3 col-sm-6 pb-5 pb-lg-0">
                        {
                            loading ?
                                [0, 1, 2].map((item, index) =>
                                    <div className="skel-product-col skel-pro mb-2" key={"ProductThree" + index}></div>
                                )
                                :

                                <>
                                    <h4 className="section-sub-title">Best Selling Products</h4>
                                    {
                                        data.bestSelling.slice(0, 3).map((product, index) => (
                                            <ProductThree product={product} key={`ProductThree`, index} />
                                        ))
                                    }
                                </>

                        }
                    </div>

                    <div className="col-lg-3 col-sm-6 pb-5 pb-sm-0">
                        {
                            loading ?
                                [0, 1, 2].map((item, index) =>
                                    <div className="skel-product-col skel-pro mb-2" key={"ProductThree" + index}></div>
                                )
                                :

                                <>
                                    <h4 className="section-sub-title">Latest Products</h4>

                                    {
                                        data.latest.slice(0, 3).map((product, index) => (
                                            <ProductThree product={product} key={`ProductThree`, index} />
                                        ))
                                    }
                                </>
                        }
                    </div>

                    <div className="col-lg-3 col-sm-6 pb-0">
                        {
                            loading ?
                                [0, 1, 2].map((item, index) =>
                                    <div className="skel-product-col skel-pro mb-2" key={"ProductThree" + index}></div>
                                )
                                :

                                <>
                                    <h4 className="section-sub-title">Top Rated Products</h4>

                                    {
                                        data.topRated.slice(0, 3).map((product, index) => (
                                            <ProductThree product={product} key={`ProductThree`, index} />
                                        ))
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductWidgetContainer;