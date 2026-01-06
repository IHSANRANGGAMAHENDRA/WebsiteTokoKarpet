import { Link } from 'react-router-dom';

const categories = [
    {
        id: 1,
        title: 'Modern Minimalist',
        image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=2070&auto=format&fit=crop',
        link: '/shop?category=Modern'
    },
    {
        id: 2,
        title: 'Bohemian Vibe',
        image: 'https://images.unsplash.com/photo-1505693314120-7a4637fbac48?q=80&w=2031&auto=format&fit=crop',
        link: '/shop?category=Bohemian'
    },
    {
        id: 3,
        title: 'Classic Luxury',
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1974&auto=format&fit=crop',
        link: '/shop?category=Luxury'
    }
];

export default function CategorySection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-primary">Shop by Vibe</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Temukan karpet yang sesuai dengan kepribadian ruang Anda.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat) => (
                        <Link key={cat.id} to={cat.link} className="group relative overflow-hidden rounded-lg aspect-[4/5] cursor-pointer block">
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <h3 className="text-2xl font-serif font-bold text-white mb-2 translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                                    {cat.title}
                                </h3>
                                <span className="text-white/80 text-sm font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 block">
                                    Explore Collection
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
