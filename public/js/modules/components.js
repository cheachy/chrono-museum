// Click Components
AFRAME.registerComponent('info-click', {
  init: function () {
    this.el.addEventListener('click', function () {
      let info = this.getAttribute('data-info');
      let name = this.getAttribute('data-name');
      
      let wallTitle = document.querySelector('#wall-title');
      let wallInfo = document.querySelector('#wall-info');
      
      // Only update if elements exist
      if (wallTitle) wallTitle.setAttribute('value', name);
      if (wallInfo) wallInfo.setAttribute('value', info);
      
      // Visual bounce feedback
      this.object3D.scale.multiplyScalar(1.2);
      setTimeout(() => { this.object3D.scale.multiplyScalar(1/1.2); }, 150);
    });
  }
});