// Scene Manager - Handles loading eras, scenery, and 3D models into the scene
const SceneManager = {
  // Load era data into the scene
  loadEraToScene: function(eraKey, data) {
    // 1. Remove previous background models
    this.removeBackgroundModels();
    
    // 2. Set Environment safely
    const env = document.querySelector('#env');
    if(env) env.setAttribute('environment', data.env);

    // 3. Set Wall Text safely
    const title = document.querySelector('#wall-title');
    const info = document.querySelector('#wall-info');
    if(title) title.setAttribute('value', "ERA: " + eraKey.toUpperCase());
    if(info) info.setAttribute('value', "Select an artifact to learn more.");
    
    // 4. Build Scenery
    this.buildScenery(eraKey);
    
    // 5. Load Background Models (if any)
    if(data.backgroundModels && data.backgroundModels.length > 0) {
      this.loadBackgroundModels(data.backgroundModels);
    }
    
    // 6. Update Items
    this.updateItems(data.items);
  },

  // Update all 5 item pedestals with era data
  updateItems: function(items) {
    for (let i = 0; i < 5; i++) {
        let label = document.querySelector('#label' + (i+1));
        let itemEntity = document.querySelector('#item' + (i+1));
        let fallback = document.querySelector('#fallback-item' + (i+1));
        
        if(label && itemEntity && items && items[i]) {
            let itemData = items[i];

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

  // Build era-specific scenery
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

  // Spawn props (trees, pillars, etc.) avoiding collision zones
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

  // Load background models for an era
  loadBackgroundModels: function(backgroundModels) {
    const container = document.getElementById('background-models');
    if(!container) {
      console.warn("⚠️ Background models container not found");
      return;
    }

    backgroundModels.forEach(modelData => {
      const entity = document.createElement('a-entity');
      entity.setAttribute('id', 'bg-' + modelData.id);
      entity.setAttribute('gltf-model', modelData.model);
      entity.setAttribute('position', modelData.position);
      entity.setAttribute('scale', modelData.scale);
      if(modelData.rotation) {
        entity.setAttribute('rotation', modelData.rotation);
      }
      container.appendChild(entity);
      console.log("✅ Loaded background model:", modelData.id);
    });
  },

  // Remove all background models
  removeBackgroundModels: function() {
    const container = document.getElementById('background-models');
    if(!container) return;
    
    // Remove all child elements
    while(container.firstChild) {
      container.removeChild(container.firstChild);
    }
    console.log("🗑️ Removed background models");
  }
};

