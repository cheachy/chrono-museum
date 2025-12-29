//Orchestrates the application and handles time travel/warp effects
const App = {
  isWarping: false,

  init: function() {
    window.addEventListener('keydown', (e) => {
      if(e.key.toLowerCase() === 'm') UIController.toggleMenu();
    });
  },

  // Start time travel to a specific era
  startWarp: async function(eraKey) {
    if(this.isWarping) return;
    this.isWarping = true;
    
    // Start warping sound effect
    AudioEngine.startWarp();
    
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

    // Fetch data
    const eraData = await DataService.fetchEraData(eraKey);

    setTimeout(() => {
      if(eraData) {
        // If we got data, load it!
        SceneManager.loadEraToScene(eraData.id, eraData);
        AudioEngine.setEra(eraData.id);
      } else {
        // Fallback if database is empty/offline
        wallTitle.setAttribute('value', "DATABASE ERROR");
      }
      
      // Fade Out
      flash.setAttribute('animation', 'property: material.opacity; from: 1; to: 0; dur: 1500; easing: easeOutQuad');
      
      setTimeout(() => {
        tunnel.setAttribute('visible', 'false');
        flash.setAttribute('visible', 'false');
        AudioEngine.stopWarp(); // Clean up warp sound
        this.isWarping = false;
      }, 1500);

    }, 1500);
  },

  // Enter the experience
  enterExperience: function() {
    UIController.showStartScreen();
    AudioEngine.init();
    // Start the first Warp
    this.startWarp('prehistory');
  }
};

// Make App available globally
window.App = App;

// Expose DataService
window.DataService = DataService;

// Start the app when the page is ready
window.onload = function() {
    App.init();
};
