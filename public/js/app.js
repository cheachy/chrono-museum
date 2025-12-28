const AudioEngine = {
  ctx: null,
  osc: null,
  gain: null,

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

const App = {
  isWarping: false,

  init: function() {
    window.addEventListener('keydown', (e) => {
      if(e.key.toLowerCase() === 'm') this.toggleMenu();
    });
  },

  // --- SERVER API CALL ---
  fetchEraData: async function(eraKey) {
    try {
      // Calls http://localhost:3000/api/eras/prehistory
      const response = await fetch(`/api/eras/${eraKey}`);
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Server Error:", error);
      return null;
    }
  },

  startWarp: async function(eraKey) {
    if(this.isWarping) return;
    this.isWarping = true;
    
    // UI Feedback
    document.getElementById('ui-layer').classList.remove('visible');
    const tunnel = document.getElementById('warp-tunnel');
    const flash = document.getElementById('warp-flash');
    const wallTitle = document.querySelector('#wall-title');

    // Show effects
    tunnel.setAttribute('visible', 'true');
    flash.setAttribute('visible', 'true');
    flash.setAttribute('animation', 'property: material.opacity; from: 0; to: 1; dur: 1500; easing: easeInQuad');
    wallTitle.setAttribute('value', "CONNECTING TO SERVER...");

    // Fetch data from Node.js Server
    const eraData = await this.fetchEraData(eraKey);

    setTimeout(() => {
      if(eraData) {
        // If we got data, load it!
        this.loadEraToScene(eraData.id, eraData);
      } else {
        // Fallback if database is empty/offline
        wallTitle.setAttribute('value', "DATABASE ERROR");
      }
      
      // Fade Out
      flash.setAttribute('animation', 'property: material.opacity; from: 1; to: 0; dur: 1500; easing: easeOutQuad');
      
      setTimeout(() => {
        tunnel.setAttribute('visible', 'false');
        flash.setAttribute('visible', 'false'); 
        this.isWarping = false;
      }, 1500);

    }, 1500);
  },

  loadEraToScene: function(eraKey, data) {
    // 1. Set Environment safely
    const env = document.querySelector('#env');
    if(env) env.setAttribute('environment', data.env);

    // 2. Set Wall Text safely
    const title = document.querySelector('#wall-title');
    const info = document.querySelector('#wall-info');
    if(title) title.setAttribute('value', "ERA: " + eraKey.toUpperCase());
    if(info) info.setAttribute('value', "Select an artifact to learn more.");
    
    // 3. Build Scenery
    this.buildScenery(eraKey);
    
    // 4. Update Items
    // UPDATE ITEMS
    for (let i = 0; i < 5; i++) {
        let label = document.querySelector('#label' + (i+1));
        let itemEntity = document.querySelector('#item' + (i+1));
        let fallback = document.querySelector('#fallback-item' + (i+1));
        
        if(label && itemEntity && data.items && data.items[i]) {
            let itemData = data.items[i];

            // 1. Update Text
            label.setAttribute('value', itemData.name);
            itemEntity.setAttribute('data-name', itemData.name);
            itemEntity.setAttribute('data-info', itemData.info);

            // 2. CHECK FOR 3D MODEL
            if (itemData.model) {
                // Load the GLB
                itemEntity.setAttribute('gltf-model', itemData.model);
                
                // Apply Scale from DB (or default to 1)
                let scale = itemData.scale || "1 1 1";
                itemEntity.setAttribute('scale', scale);
                
                // Hide the ugly gray box
                if(fallback) fallback.setAttribute('visible', 'false');
            } else {
                // No model? Remove GLB attribute and show the box
                itemEntity.removeAttribute('gltf-model');
                itemEntity.setAttribute('scale', '1 1 1'); 
                if(fallback) fallback.setAttribute('visible', 'true');
            }

        }
    }
  },

  buildScenery: function(era) {
    const container = document.getElementById('custom-scenery');
    if(!container) return;
    container.innerHTML = ''; 

    // DEFINITION: Shape, Color, Count, Size(h,r), Emission?
    if(era === 'prehistory') {
      this.spawnSafeProps(container, 'cylinder', '#3d2e1e', 15, {h:8, r:0.6}, false); // Trees
    } else if (era === 'classical') {
      this.spawnSafeProps(container, 'cylinder', '#EEE', 8, {h:6, r:0.5}, false); // Pillars
    } else if (era === 'middleages') {
      this.spawnSafeProps(container, 'box', '#555', 10, {h:3, r:0.5}, false); // Monoliths/Walls
    } else if (era === 'earlymodern') {
      // For this era, let's spawn a floor circle + some wooden barrels/crates
      let floor = document.createElement('a-circle');
      floor.setAttribute('radius', '12');
      floor.setAttribute('rotation', '-90 0 0');
      floor.setAttribute('color', '#6d5638');
      floor.setAttribute('position', '0 0.05 0');
      container.appendChild(floor);
      this.spawnSafeProps(container, 'cylinder', '#463016', 8, {h:1, r:0.4}, false); // Barrels
    } else if (era === 'contemporary') {
       this.spawnSafeProps(container, 'box', '#111', 20, {h:15, r:1}, true); // Skyscrapers
    }
  },

  spawnSafeProps: function(container, shape, color, count, size, isNeon) {
    // 1. Define "Forbidden Zones" (Where your artifacts/player are)
    // [x, z, radius]
    const noGoZones = [
      {x: 0, z: 0, r: 4},    // Player Start Area
      {x: -4, z: -3, r: 2},  // Item 1
      {x: -2, z: -2.5, r: 2},// Item 2
      {x: 0, z: -2, r: 2},   // Item 3
      {x: 2, z: -2.5, r: 2}, // Item 4
      {x: 4, z: -3, r: 2}    // Item 5
    ];

    let spawned = 0;
    let attempts = 0;

    // Try to spawn 'count' items, but don't loop forever if no space
    while(spawned < count && attempts < 100) {
      attempts++;

      // Random position range: -15 to 15
      let x = (Math.random() * 30) - 15;
      let z = (Math.random() * 30) - 15;

      // Check collision
      let safe = true;
      for(let zone of noGoZones) {
        // Distance formula
        let dist = Math.sqrt(Math.pow(x - zone.x, 2) + Math.pow(z - zone.z, 2));
        if(dist < zone.r) {
          safe = false;
          break;
        }
      }

      if(safe) {
        let el = document.createElement('a-' + shape);
        el.setAttribute('position', `${x} ${size.h/2} ${z}`);
        el.setAttribute('color', color);
        el.setAttribute('height', size.h);
        
        // Handle Box vs Cylinder radius/width differences
        if(shape === 'box') {
            el.setAttribute('width', size.r * 2);
            el.setAttribute('depth', size.r * 2);
        } else {
            el.setAttribute('radius', size.r);
        }

        if(isNeon) {
            el.setAttribute('material', 'emissive: #00FFFF; emissiveIntensity: 0.4');
        }
        
        container.appendChild(el);
        spawned++;
      }
    }
  },

  toggleMenu: function() {
    const scene = document.querySelector('a-scene');
    const uiLayer = document.getElementById('ui-layer');
    const instructions3D = document.querySelector('#instruction-text-3d');

    if (scene.is('vr-mode')) scene.exitVR();
    uiLayer.classList.toggle('visible');
    if(instructions3D) instructions3D.setAttribute('visible', 'false');
  },
  
  toggleCredits: function() {
    const modal = document.getElementById('credits-modal');
    const uiLayer = document.getElementById('ui-layer');
    uiLayer.classList.toggle('hidden-ui');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
  },

  // Add this new function
  enterExperience: function() {
    // 1. Fade out the start screen
    const screen = document.getElementById('start-screen');
    screen.classList.add('hidden');
    
    // 2. Remove Start Screen from DOM
    setTimeout(() => {
      screen.style.display = 'none';
      
      // --- NEW CODE: REVEAL THE UI ---
      // Show the instructions and fullscreen button
      document.querySelector('.instructions').classList.remove('hidden-ui');
      document.getElementById('fullscreen-btn').classList.remove('hidden-ui');
      document.getElementById('ui-layer').classList.remove('hidden-ui');
      
    }, 1000);

    AudioEngine.init();

    // 3. Start the first Warp
    this.startWarp('prehistory');
  },

  toggleFullscreen: function() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }
};

// Make App available globally (for HTML buttons)
window.App = App;

// Start the app when the page is ready
window.onload = function() {
    App.init();
};