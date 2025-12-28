// UI Controller - Handles menu, credits, fullscreen, and UI interactions
const UIController = {
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

  toggleFullscreen: function() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  },

  showStartScreen: function() {
    const screen = document.getElementById('start-screen');
    screen.classList.add('hidden');
    
    setTimeout(() => {
      screen.style.display = 'none';
      
      // Reveal the UI
      document.querySelector('.instructions').classList.remove('hidden-ui');
      document.getElementById('fullscreen-btn').classList.remove('hidden-ui');
      document.getElementById('ui-layer').classList.remove('hidden-ui');
    }, 1000);
  }
};

