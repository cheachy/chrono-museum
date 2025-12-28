const App = {
  isWarping: false,

  init: function() {
    // 1. Listen for the 'M' key to open the menu
    window.addEventListener('keydown', (e) => {
      if(e.key.toLowerCase() === 'm') this.toggleMenu();
    });
    
    // 2. Load the first era immediately
    this.startWarp('prehistory');
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
    // Safety check: Ensure environment exists before setting it
    const envEl = document.querySelector('#env');
    if(envEl) envEl.setAttribute('environment', data.env);

    document.querySelector('#wall-title').setAttribute('value', "ERA: " + eraKey.toUpperCase());
    document.querySelector('#wall-info').setAttribute('value', "Select an artifact to learn more.");
    
    this.buildScenery(eraKey);
    
    for (let i = 0; i < 5; i++) {
        let label = document.querySelector('#label' + (i+1));
        let itemEntity = document.querySelector('#item' + (i+1));
        
        // Only update if the item exists in the database
        if(data.items && data.items[i]) {
            label.setAttribute('value', data.items[i].name);
            itemEntity.setAttribute('data-name', data.items[i].name);
            itemEntity.setAttribute('data-info', data.items[i].info);
        }
    }
  },

  buildScenery: function(era) {
    const container = document.getElementById('custom-scenery');
    if(!container) return; // Safety check
    container.innerHTML = ''; 

    if(era === 'prehistory') {
      this.spawnProps(container, 'cylinder', '#3d2e1e', 10, {h:8, r:0.6}, true); 
    } else if (era === 'classical') {
      this.spawnPillars(container);
    } else if (era === 'middleages') {
      this.spawnGuards(container);
    } else if (era === 'earlymodern') {
      this.spawnHouse(container);
    } else if (era === 'contemporary') {
       this.spawnProps(container, 'box', '#111', 15, {h:15, r:2}, false, true);
    }
  },

  spawnProps: function(container, shape, color, count, size, isTree, isNeon) {
    for(let i=0; i<count; i++) {
      let el = document.createElement('a-' + shape);
      let x = (Math.random() * 30) - 15;
      let z = (Math.random() * 30) - 15;
      if(Math.abs(x) < 3 && Math.abs(z) < 3) continue; 

      el.setAttribute('position', `${x} ${size.h/2} ${z}`);
      el.setAttribute('color', color);
      el.setAttribute('height', size.h);
      el.setAttribute('radius', size.r); 
      el.setAttribute('width', size.r); 
      el.setAttribute('depth', size.r); 
      
      if(isNeon) el.setAttribute('material', 'emissive: #00FFFF; emissiveIntensity: 0.2');
      container.appendChild(el);
    }
  },

  spawnPillars: function(container) {
    for(let i=-4; i<=4; i+=2) {
      if(i==0) continue;
      let el = document.createElement('a-cylinder');
      el.setAttribute('position', `${i*2} 3 -8`);
      el.setAttribute('height', '6');
      el.setAttribute('radius', '0.5');
      el.setAttribute('color', '#EEE');
      container.appendChild(el);
    }
  },

  spawnGuards: function(container) {
    let g1 = document.createElement('a-box');
    g1.setAttribute('position', '-4 1.5 -2');
    g1.setAttribute('scale', '1 3 1');
    g1.setAttribute('color', '#555');
    container.appendChild(g1);
    let g2 = g1.cloneNode(true);
    g2.setAttribute('position', '4 1.5 -2');
    container.appendChild(g2);
  },
  
  spawnHouse: function(container) {
     let floor = document.createElement('a-circle');
     floor.setAttribute('radius', '10');
     floor.setAttribute('rotation', '-90 0 0');
     floor.setAttribute('color', '#6d5638');
     floor.setAttribute('position', '0 0.1 0');
     container.appendChild(floor);
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
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
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