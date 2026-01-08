"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Canvas from './Canvas';
import ControlTray from './ControlTray';
import { startAudio, updateAudio, triggerNote } from '@/lib/audio';

export default function Experience() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [intensity, setIntensity] = useState(20);
    const [coreValue, setCoreValue] = useState('Peace');

    // Sync local state with URL param
    const hasStarted = searchParams.get('play') === 'true';

    useEffect(() => {
        updateAudio(intensity, coreValue);
    }, [intensity, coreValue]);

    const handleStart = async () => {
        await startAudio();
        triggerNote(coreValue);
        // Push state to URL so back button works (returns to overlay)
        router.push('/?play=true');
    };

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
            {!hasStarted && (
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 100,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)'
                }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '2rem', letterSpacing: '0.2em' }}>Echoes Without Words</h1>
                    <button
                        onClick={handleStart}
                        style={{
                            padding: '15px 40px', fontSize: '1.2rem', background: 'white', color: 'black', border: 'none',
                            cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.1em'
                        }}
                    >
                        ENTER
                    </button>

                    <Link href="/login" style={{
                        position: 'absolute',
                        top: '2rem',
                        right: '2rem',
                        color: 'white',
                        opacity: 0.7,
                        transition: 'opacity 0.3s'
                    }}
                        onMouseEnter={(e) => e.target.style.opacity = '1'}
                        onMouseLeave={(e) => e.target.style.opacity = '0.7'}
                    >
                        <User size={24} />
                    </Link>
                </div>
            )}

            <Canvas intensity={intensity} coreValue={coreValue} />

            {hasStarted && (
                <ControlTray
                    intensity={intensity}
                    setIntensity={setIntensity}
                    coreValue={coreValue}
                    setCoreValue={setCoreValue}
                />
            )}
        </div>
    );
}
