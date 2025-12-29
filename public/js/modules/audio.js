//Handles background music and era-specific sound effects
const AudioEngine = {
  ctx: null,
  osc: null,
  gain: null,
  warpOsc: null,
  warpGain: null,

  init: function() {
    // Only start audio after user interaction (browser policy)
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();
    
    this.osc = this.ctx.createOscillator();
    this.gain = this.ctx.createGain();
    
    this.osc.connect(this.gain);
    this.gain.connect(this.ctx.destination);
    
    this.osc.type = 'sine';
    this.osc.frequency.value = 100; // Deep drone
    this.gain.gain.value = 0.15; // Very quiet
    
    this.osc.start();
  },

  // Start warping sound effect
  startWarp: function() {
    if(!this.ctx) return;
    
    const now = this.ctx.currentTime;
    
    // Create warp oscillator (separate from background music)
    this.warpOsc = this.ctx.createOscillator();
    this.warpGain = this.ctx.createGain();
    
    this.warpOsc.connect(this.warpGain);
    this.warpGain.connect(this.ctx.destination);
    
    // Warp sound: rising pitch with sci-fi feel
    this.warpOsc.type = 'sawtooth'; // More aggressive sound
    this.warpOsc.frequency.setValueAtTime(150, now); // Start low
    this.warpOsc.frequency.linearRampToValueAtTime(800, now + 1.5); // Rise to high pitch
    
    // Volume: start quiet, peak in middle, fade out
    this.warpGain.gain.setValueAtTime(0, now);
    this.warpGain.gain.linearRampToValueAtTime(0.3, now + 0.5); // Fade in
    this.warpGain.gain.setValueAtTime(0.3, now + 1.5); // Hold peak
    this.warpGain.gain.linearRampToValueAtTime(0, now + 3); // Fade out
    
    this.warpOsc.start(now);
    this.warpOsc.stop(now + 3); // Stop after 3 seconds
  },

  // Stop warping sound
  stopWarp: function() {
    if(this.warpOsc) {
      try {
        const now = this.ctx.currentTime;
        this.warpGain.gain.linearRampToValueAtTime(0, now + 0.2); // Quick fade
        this.warpOsc.stop(now + 0.2);
        this.warpOsc = null;
        this.warpGain = null;
      } catch (error) {
        // Oscillator might already be stopped
        this.warpOsc = null;
        this.warpGain = null;
      }
    }
  },

  setEra: function(era) {
    if(!this.ctx) return;
    
    // Change sound based on Era
    const now = this.ctx.currentTime;
    
    if(era === 'prehistory') {
        this.osc.frequency.linearRampToValueAtTime(60, now + 2); // Deep, primitive
        this.osc.type = 'triangle';
    } else if (era === 'contemporary') {
        this.osc.frequency.linearRampToValueAtTime(200, now + 2); // High, digital
        this.osc.type = 'sine';
    } else {
        this.osc.frequency.linearRampToValueAtTime(100, now + 2); // Neutral
        this.osc.type = 'sine';
    }
  }
};

