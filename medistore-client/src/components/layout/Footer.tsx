import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Facebook,
    Twitter,
    Instagram,
    Mail,
    Phone,
    MapPin,
    PlusSquare,
    ArrowRight
} from "lucide-react";

const Footer = () => {
    return (
       
        <footer className="bg-[#0a0a0a] text-gray-300 border-t border-white/5 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                  
                    <div className="md:col-span-5 space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="bg-primary p-1.5 rounded-lg">
                                <PlusSquare className="h-7 w-7 text-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">
                                Care<span className="text-primary text-3xl">.</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                            We are always vigilant for your good health. We deliver your necessary medicines and healthcare equipment to your doorstep with care.
                        </p>
                        <div className="flex gap-3">
                            {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                                <Button 
                                    key={social}
                                    variant="outline" 
                                    size="icon" 
                                    className="bg-white/5 border-white/10 hover:bg-primary hover:text-white rounded-xl transition-all duration-300"
                                >
                                    {social === 'Facebook' && <Facebook className="h-4 w-4" />}
                                    {social === 'Twitter' && <Twitter className="h-4 w-4" />}
                                    {social === 'Instagram' && <Instagram className="h-4 w-4" />}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "All Medicines", href: "/all-medicines" },
                                { name: "Upload Prescription", href: "/prescriptions" },
                                { name: "Health Tips", href: "/health-tips" },
                                { name: "Contact Us", href: "/contact" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        href={link.href} 
                                        className="text-sm hover:text-primary transition-colors flex items-center group"
                                    >
                                        <ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <h4 className="text-white font-semibold text-lg mb-6">Get in Touch</h4>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4 group">
                                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <MapPin className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-sm mt-1">House 12, Road 5, Dhanmondi, Dhaka-1209</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <Phone className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-sm">+880 1234-567890</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-sm">support@carepharmacy.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:row justify-between items-center gap-6">
                    <p className="text-[13px] text-gray-500">
                        © 2026 <span className="text-white font-medium">CarePharmacy</span>. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-[13px]">
                        <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
