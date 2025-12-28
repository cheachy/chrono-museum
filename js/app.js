const App = {
  isWarping: false,

  init: function() {
    window.addEventListener('keydown', (e) => {
      if(e.key.toLowerCase() === 'm') this.toggleMenu();
    });
    // Start in Prehistory
    this.loadEra('prehistory');
  },

  toggleFullscreen: function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
        document.exitFullscreen();
        }
    }
    },

  toggleMenu: function() {
    document.getElementById('ui-layer').classList.toggle('visible');
    const instructions3D = document.querySelector('#instruction-text-3d');
    if(instructions3D) instructions3D.setAttribute('visible', 'false');
  },

  toggleCredits: function() {
    const modal = document.getElementById('credits-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
  },

  startWarp: function(eraKey) {
    if(this.isWarping) return;
    this.isWarping = true;
    
    document.getElementById('ui-layer').classList.remove('visible');

    const tunnel = document.getElementById('warp-tunnel');
    const flash = document.getElementById('warp-flash');
    
    // 1. Show effects
    tunnel.setAttribute('visible', 'true');
    flash.setAttribute('visible', 'true');
    
    // 2. Animate to white
    flash.setAttribute('animation', 'property: material.opacity; from: 0; to: 1; dur: 1500; easing: easeInQuad');
    
    // 3. Wait, then swap
    setTimeout(() => {
      this.loadEra(eraKey); 
      
      // 4. Fade Out
      flash.setAttribute('animation', 'property: material.opacity; from: 1; to: 0; dur: 1500; easing: easeOutQuad');
      
      // 5. Hide effects and unlock clicks
      setTimeout(() => {
        tunnel.setAttribute('visible', 'false');
        flash.setAttribute('visible', 'false'); 
        this.isWarping = false;
      }, 1500);

    }, 1500);
  },

  loadEra: function(eraKey) {
    const data = DB[eraKey];
    
    document.querySelector('#env').setAttribute('environment', data.env);
    this.buildScenery(eraKey);
    document.querySelector('#wall-title').setAttribute('value', "ERA: " + eraKey.toUpperCase());
    
    for (let i = 0; i < 5; i++) {
      let label = document.querySelector('#label' + (i+1));
      let itemEntity = document.querySelector('#item' + (i+1));
      
      label.setAttribute('value', data.items[i].name);
      itemEntity.setAttribute('data-name', data.items[i].name);
      itemEntity.setAttribute('data-info', data.items[i].info);
    }
  },

  buildScenery: function(era) {
    const container = document.getElementById('custom-scenery');
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
  }
};

// Initialize App once DOM is ready
window.onload = function() { App.init(); };