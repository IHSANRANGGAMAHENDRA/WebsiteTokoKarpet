import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would integrate with a backend email service
        alert(`Thank you, ${formData.name}! We have received your message.`);
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-serif font-bold mb-4">Get in Touch</h1>
                <p className="text-gray-600 max-w-xl mx-auto">We'd love to hear from you. Visits to our showroom are available by appointment.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Phone</h3>
                            <p className="text-gray-600">+62 812 3456 7890</p>
                            <p className="text-sm text-gray-500 mt-1">Mon-Fri from 9am to 6pm</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Email</h3>
                            <p className="text-gray-600">hello@luxecarpet.com</p>
                            <p className="text-sm text-gray-500 mt-1">We'll get back to you within 24 hours.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Showroom</h3>
                            <p className="text-gray-600">Jl. Jenderal Sudirman No. 1</p>
                            <p className="text-gray-600">Jakarta Selatan, DKI Jakarta 10220</p>
                        </div>
                    </div>

                    {/* Google Map Embed Placeholder */}
                    <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24097831454!2d106.75990520626354!3d-6.229746487849929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Special%20Capital%20Region%20of%20Jakarta!5e0!3m2!1sen!2sid!4v1652718974533!5m2!1sen!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2"
                        >
                            <Send size={18} /> Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
