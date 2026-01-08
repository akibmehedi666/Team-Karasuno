import * as Tone from 'tone';

let synth;
let chorus;
let reverb;
let loop;
let isStarted = false;
let currentCoreValue = 'Peace';
let currentIntensity = 20;

// Helper function
const map = (value, inMin, inMax, outMin, outMax) => {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
};

const PRESETS = {
    Peace: {
        oscillator: 'sine',
        harmonicity: 1,
        attack: 0.8,
        release: 2,
        baseNote: 'C3',
        scale: [0, 2, 4, 7, 9], // Major Pentatonic
        tempo: 60
    },
    Hope: {
        oscillator: 'triangle',
        harmonicity: 1.5,
        attack: 0.1,
        release: 1,
        baseNote: 'D3',
        scale: [0, 4, 7, 11, 12, 14], // Lydian-ish
        tempo: 80
    },
    Fear: {
        oscillator: 'sawtooth',
        harmonicity: 0.5,
        attack: 0.05,
        release: 0.5,
        baseNote: 'A2',
        scale: [0, 1, 3, 6, 7, 8], // Locrian/Diminished
        tempo: 100
    },
    Connection: {
        oscillator: 'pulse',
        harmonicity: 2,
        attack: 0.4,
        release: 1.5,
        baseNote: 'F3',
        scale: [0, 4, 7, 9, 11], // Major 7/9
        tempo: 75
    }
};

export const startAudio = async () => {
    if (isStarted) return;
    await Tone.start();

    // Effects Chain
    reverb = new Tone.Reverb({ decay: 5, wet: 0.4 }).toDestination();
    chorus = new Tone.Chorus(2, 2.5, 0.2).connect(reverb);
    // Start chorus immediately (some effects need starting)
    chorus.start();

    // Main Synth
    synth = new Tone.PolySynth(Tone.AMSynth, {
        volume: -12,
        oscillator: { type: 'sine' },
        envelope: { attack: 1, decay: 0.5, sustain: 1, release: 2 }
    }).connect(chorus);

    // Generative Loop
    loop = new Tone.Loop((time) => {
        // Probability of playing a note maps to intensity
        const density = map(currentIntensity, 0, 100, 0.3, 0.9);

        if (Math.random() < density) {
            const preset = PRESETS[currentCoreValue];

            // Pitch mapping: Higher intensity -> Higher Octaves / Pitch Shift
            const intensityPitchShift = Math.floor(map(currentIntensity, 0, 100, 0, 2)) * 12;

            // Select random note from scale
            const degree = preset.scale[Math.floor(Math.random() * preset.scale.length)];
            const freq = Tone.Frequency(preset.baseNote).transpose(degree + intensityPitchShift);

            // Duration maps to intensity (shorter = more intense)
            const duration = map(currentIntensity, 0, 100, 2, 0.1);

            synth.triggerAttackRelease(freq, duration, time);
        }
    }, "8n").start(0);

    Tone.Transport.start();
    isStarted = true;
};

export const updateAudio = (intensity, coreValue) => {
    if (!isStarted || !synth) {
        currentIntensity = intensity;
        currentCoreValue = coreValue;
        return;
    }

    currentIntensity = intensity;
    currentCoreValue = coreValue;

    const preset = PRESETS[coreValue];
    const normalizedIntensity = intensity / 100;

    // Real-time timbre updates
    synth.set({
        oscillator: { type: preset.oscillator },
        harmonicity: preset.harmonicity + (normalizedIntensity),
        detune: normalizedIntensity * 20
    });

    // Effects parameters - Safe update
    try {
        if (chorus.depth && typeof chorus.depth.rampTo === 'function') {
            chorus.depth.rampTo(normalizedIntensity, 0.5);
        } else {
            chorus.set({ depth: normalizedIntensity });
        }

        if (chorus.frequency && typeof chorus.frequency.rampTo === 'function') {
            chorus.frequency.rampTo(normalizedIntensity * 5, 0.5);
        } else {
            chorus.set({ frequency: normalizedIntensity * 5 });
        }
    } catch (e) {
        console.warn("Audio update warning:", e);
    }

    // Update Loop parameters if needed
};

export const triggerNote = (coreValue) => {
    // Optional manual trigger
    if (!synth) return;
    const preset = PRESETS[coreValue];
    synth.triggerAttackRelease(Tone.Frequency(preset.baseNote).transpose(12), "1n");
};
