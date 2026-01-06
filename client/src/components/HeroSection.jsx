import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=2187&auto=format&fit=crop"
                    alt="Luxury Carpet Background"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight animate-fade-in-up">
                    Sentuhan Kemewahan <br /> Untuk Hunian Anda
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-200 font-light tracking-wide max-w-2xl mx-auto">
                    Koleksi karpet premium yang dikurasi khusus untuk menghadirkan kenyamanan dan elegan di setiap ruangan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/shop"
                        className="group bg-white text-primary px-8 py-3 rounded-full font-medium hover:bg-secondary hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        Lihat Koleksi
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/about"
                        className="px-8 py-3 rounded-full font-medium border border-white text-white hover:bg-white/10 transition-all duration-300"
                    >
                        Tentang Kami
                    </Link>
                </div>
            </div>
        </div>
    );
}
