export default function Footer() {
    return (
        <footer className="bg-primary text-white py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-2xl font-serif font-bold mb-4">LuxeCarpet</h3>
                    <p className="text-gray-400 text-sm">
                        Menghadirkan kehangatan dan kemewahan di setiap langkah Anda. Koleksi karpet premium terbaik untuk hunian impian.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Shop</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-secondary">New Arrivals</a></li>
                        <li><a href="#" className="hover:text-secondary">Best Sellers</a></li>
                        <li><a href="#" className="hover:text-secondary">On Sale</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Support</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-secondary">FAQ</a></li>
                        <li><a href="#" className="hover:text-secondary">Shipping & Returns</a></li>
                        <li><a href="#" className="hover:text-secondary">Care Guide</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Stay Connected</h4>
                    <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive offers.</p>
                    <input type="email" placeholder="Your Email" className="w-full px-4 py-2 rounded bg-gray-800 border-none text-white focus:ring-1 focus:ring-secondary" />
                </div>
            </div>
            <div className="text-center text-gray-600 text-xs mt-12 border-t border-gray-800 pt-8">
                &copy; {new Date().getFullYear()} LuxeCarpet. All rights reserved.
            </div>
        </footer >
    );
}
