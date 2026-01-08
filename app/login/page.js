"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsTransitioning(true);
        // Fade to black, then navigate
        setTimeout(() => {
            router.replace("/");
        }, 800);
    };

    // Prevent hydration mismatch by only rendering after mount
    if (!isMounted) {
        return null;
    }

    return (
        <div suppressHydrationWarning>
            {/* Gradient Background with Smoke Texture */}
            <div className="fixed inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#000000]">
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.03) 0%, transparent 50%),
                                         radial-gradient(circle at 80% 80%, rgba(255,255,255,0.02) 0%, transparent 50%),
                                         radial-gradient(circle at 40% 20%, rgba(255,255,255,0.015) 0%, transparent 50%)`,
                    }}
                />
            </div>

            {/* Transition Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isTransitioning ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="fixed inset-0 bg-black z-50 pointer-events-none"
            />

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen w-full px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md"
                >
                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, letterSpacing: "0.1em" }}
                        animate={{ opacity: 0.9, letterSpacing: "0.3em" }}
                        transition={{ duration: 1.5, delay: 0.4 }}
                        className="text-4xl font-extralight mb-16 text-center"
                        style={{ fontFamily: 'var(--font-montserrat)' }}
                    >
                        ENTER
                    </motion.h1>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-10">
                        {/* Email Input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="group relative"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full bg-transparent border-b border-white/10 py-4 text-base font-light tracking-wide
                                         focus:outline-none focus:border-white/80
                                         transition-all duration-500
                                         placeholder:text-white/30 placeholder:tracking-widest
                                         focus:shadow-[0_1px_8px_rgba(255,255,255,0.15)]"
                                style={{ fontFamily: 'var(--font-montserrat)' }}
                                required
                            />
                        </motion.div>

                        {/* Password Input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.75 }}
                            className="group relative"
                        >
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full bg-transparent border-b border-white/10 py-4 text-base font-light tracking-wide
                                         focus:outline-none focus:border-white/80
                                         transition-all duration-500
                                         placeholder:text-white/30 placeholder:tracking-widest
                                         focus:shadow-[0_1px_8px_rgba(255,255,255,0.15)]"
                                style={{ fontFamily: 'var(--font-montserrat)' }}
                                required
                            />
                        </motion.div>

                        {/* Ghost Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            className="w-full mt-12 py-5 bg-transparent border border-white/20
                                     hover:border-white/60 hover:bg-white/5
                                     transition-all duration-500 group
                                     flex items-center justify-center gap-3"
                        >
                            <span
                                className="tracking-[0.3em] text-xs uppercase font-light opacity-70
                                         group-hover:opacity-100 transition-opacity duration-500"
                                style={{ fontFamily: 'var(--font-montserrat)' }}
                            >
                                Begin
                            </span>
                            {/* Sleek Arrow SVG */}
                            <svg
                                className="w-5 h-5 opacity-50 group-hover:opacity-100
                                         group-hover:translate-x-2 transition-all duration-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
