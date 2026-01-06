import { ShieldCheck, Truck, Award } from 'lucide-react';

export default function About() {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white py-24">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=2000&auto=format&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>
                <div className="relative container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-serif font-bold mb-4">The Art of Weaving</h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-200">
                        Bridging centuries of tradition with modern elegance.
                    </p>
                </div>
            </div>

            {/* Our Story */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Our Story</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Founded in 2024, LuxeCarpet began with a simple mission: to bring the world's finest hand-knotted rugs to discerning homes. We travel to remote villages in Turkey, Iran, and India to source pieces that are not just floor coverings, but works of art.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Every rug in our collection tells a story—of the weaver's heritage, the landscape that inspired the patterns, and the months of dedication poured into every knot. We believe in fair trade and sustaining these ancient crafts for future generations.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img className="rounded-lg shadow-md mt-8" src="https://images.unsplash.com/photo-1596238612148-52ed20150d03?q=80&w=400&auto=format&fit=crop" alt="Carpets stack" />
                        <img className="rounded-lg shadow-md" src="https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=400&auto=format&fit=crop" alt="Room detailed" />
                    </div>
                </div>
            </div>

            {/* Values / Features */}
            <div className="bg-gray-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-secondary">
                                <Award size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Authenticity</h3>
                            <p className="text-gray-600">Every piece comes with a certificate of origin and craftsmanship guarantee.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-secondary">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Durability</h3>
                            <p className="text-gray-600">Made from premium wool and silk, designed to last for generations.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-secondary">
                                <Truck size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">World-Class Delivery</h3>
                            <p className="text-gray-600">Secure packaging and insured shipping to ensuring your art arrives safely.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
