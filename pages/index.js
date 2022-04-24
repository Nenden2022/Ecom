
// Import Custom Component
import NewsletterModal from "../components/features/modals/newsletter-modal";
import HomeSection from "../components/partials/home/home-section";
import BannerSection from "../components/partials/home/banner-section";
import BrandSection from "../components/partials/home/brand-section";
import FeaturedCollection from "../components/partials/home/featured-collection";
import ProductWidgetContainer from "../components/partials/home/product-widget-container";

function Home({ data, loading, error }) {
    // if (!data) { const loading = false; }
    const featured = data && data.featured;
    const bestSelling = data && data.bestSelling;
    const latest = data && data.latest;
    const topRated = data && data.topRated;
    const onSale = data && data.onSale;
    const product = data && data.products;

    if (error) {
        return <div>{error.message}</div>
    }

    return (
        <>
            <main className={`home skeleton-body skel-shop-products ${loading ? '' : 'loaded'}`} >
                <HomeSection />

                <BannerSection />

                <BrandSection />

                <FeaturedCollection product={product} loading={loading} />

                <FeaturedCollection product={onSale} loading={loading} sale={true} />

                <ProductWidgetContainer featured={featured} latest={latest} bestSelling={bestSelling} topRated={topRated} loading={loading} />

            </main>

            <NewsletterModal />
        </>
    )
}

Home.getInitialProps = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/products');
        const { data } = await res.json();
        return {
            data,
            error: false,
            loading: false
        }
    } catch (err) {
        return {
            error: err,
            loading: true
        }
    }
}


export default Home;