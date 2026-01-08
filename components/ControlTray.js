"use client";

import { motion } from 'framer-motion';
import { Heart, Zap, Anchor, Sparkles } from 'lucide-react';

const VALUES = [
    { id: 'Peace', icon: Anchor, color: '#4DD0E1' },
    { id: 'Hope', icon: Sparkles, color: '#FFEE58' },
    { id: 'Fear', icon: Zap, color: '#EF5350' },
    { id: 'Connection', icon: Heart, color: '#BA68C8' }
];

export default function ControlTray({ intensity, setIntensity, coreValue, setCoreValue }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '40px',
                zIndex: 50
            }}
        >
            <motion.div
                initial={{ opacity: 0.2 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    background: 'rgba(10, 10, 10, 0.6)',
                    backdropFilter: 'blur(10px)',
                    padding: '30px 50px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                {/* Intensity Slider */}
                <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        <span>Flow</span>
                        <span>Intensity: {intensity}</span>
                        <span>Chaos</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={intensity}
                        onChange={(e) => setIntensity(parseInt(e.target.value))}
                        style={{
                            width: '100%',
                            accentColor: 'white',
                            cursor: 'pointer'
                        }}
                    />
                </div>

                {/* Divider */}
                <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

                {/* Core Values */}
                <div style={{ display: 'flex', gap: '40px' }}>
                    {VALUES.map((val) => {
                        const Icon = val.icon;
                        const isActive = coreValue === val.id;

                        return (
                            <motion.button
                                key={val.id}
                                onClick={() => setCoreValue(val.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: isActive ? val.color : 'rgba(255,255,255,0.4)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'color 0.3s'
                                }}
                            >
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
                                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    {val.id}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
}
