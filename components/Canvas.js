"use client";

import { useEffect, useRef } from 'react';

export default function Canvas({ intensity, coreValue }) {
    const containerRef = useRef(null);
    const p5Instance = useRef(null);

    useEffect(() => {
        let myP5;
        // Dynamic import to avoid SSR issues
        const loadP5 = async () => {
            const p5Module = await import('p5');
            const p5 = p5Module.default;
            const sketch = require('@/lib/sketch').default;
            myP5 = new p5(sketch, containerRef.current);
            p5Instance.current = myP5;

            // Initial update
            if (myP5.updateWithProps) {
                myP5.updateWithProps({ intensity, coreValue });
            }
        };
        loadP5();

        return () => {
            if (myP5) myP5.remove();
        };
    }, []);

    useEffect(() => {
        if (p5Instance.current && p5Instance.current.updateWithProps) {
            p5Instance.current.updateWithProps({ intensity, coreValue });
        }
    }, [intensity, coreValue]);

    return (
        <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: '#050505' }} />
    );
}
