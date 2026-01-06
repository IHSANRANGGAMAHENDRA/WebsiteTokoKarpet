import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';

export default function Home() {
    return (
        <div className="bg-white">
            <HeroSection />
            <CategorySection />

            {/* Featured Products Placeholder - To be implemented next */}
            <section className="py-20 bg-accent text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif font-bold mb-8">New Arrivals</h2>
                    <p className="text-gray-500">Koleksi terbaru kami akan segera hadir di sini.</p>
                </div>
            </section>
        </div>
    );
}
