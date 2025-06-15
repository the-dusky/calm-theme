class HowItWorksSection {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    const toggleButtons = document.querySelectorAll('.transparency-toggle');
    
    toggleButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTransparencyContent(button);
      });
    });
  }

  toggleTransparencyContent(button) {
    const targetId = button.getAttribute('data-toggle');
    const content = document.getElementById(targetId);
    
    if (!content) return;

    const isExpanded = content.style.display !== 'none';
    
    if (isExpanded) {
      content.style.display = 'none';
      button.classList.remove('expanded');
    } else {
      content.style.display = 'block';
      button.classList.add('expanded');
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new HowItWorksSection();
});

// Also initialize if section is dynamically loaded (theme editor)
document.addEventListener('shopify:section:load', (event) => {
  if (event.detail.sectionId.includes('how-it-works')) {
    new HowItWorksSection();
  }
});