/**
 * Global Drop Manager
 * Manages site-wide drop selection using localStorage
 * Provides filtering and state management across all pages
 */

class GlobalDropManager {
  constructor() {
    this.storageKey = 'selectedGlobalDrop';
    this.selectors = {
      globalSelector: '[data-global-drop-selector]',
      selectedFlag: '[data-selected-flag]',
      selectedText: '[data-selected-text]',
      dropInfo: '#global-drop-info',
      dropProducts: '[data-drop-product]',
      dropSections: '[data-drop-section]',
      switchDropButtons: '[data-switch-drop]'
    };
    
    this.currentDrop = null;
    this.availableDrops = [];
    
    this.init();
  }

  init() {
    this.loadAvailableDrops();
    this.bindEvents();
    this.loadSavedSelection();
    this.initializePage();
  }

  loadAvailableDrops() {
    const selector = document.querySelector(this.selectors.globalSelector);
    if (!selector) return;
    
    this.availableDrops = Array.from(selector.options).map(option => {
      if (!option.value) return null;
      
      return {
        handle: option.value,
        shipDate: option.dataset.shipDate,
        dropType: option.dataset.dropType,
        cutoffDate: option.dataset.cutoffDate,
        collectionId: option.dataset.collectionId,
        flag: option.dataset.flag,
        isAvailable: !option.disabled,
        displayText: option.textContent.trim(),
        isShowAll: option.value === 'all'
      };
    }).filter(Boolean);
  }

  bindEvents() {
    // Global selector change
    document.addEventListener('change', (event) => {
      if (event.target.matches(this.selectors.globalSelector)) {
        this.handleGlobalDropChange(event.target);
      }
    });

    // Switch drop buttons
    document.addEventListener('click', (event) => {
      if (event.target.matches(this.selectors.switchDropButtons)) {
        event.preventDefault();
        this.switchToDrop(event.target.dataset.switchDrop);
      }
    });

    // Listen for storage changes from other tabs
    window.addEventListener('storage', (event) => {
      if (event.key === this.storageKey) {
        this.loadSavedSelection();
        this.updatePageContent();
      }
    });

    // Page visibility change - refresh content when tab becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.loadSavedSelection();
        this.updatePageContent();
      }
    });
  }

  handleGlobalDropChange(selectElement) {
    const selectedOption = selectElement.selectedOptions[0];
    
    if (!selectedOption || !selectedOption.value) {
      this.clearSelection();
      return;
    }

    const dropData = this.availableDrops.find(drop => drop.handle === selectedOption.value);
    if (!dropData) return;

    if (dropData.isShowAll) {
      this.setShowAllMode();
    } else {
      this.setSelectedDrop(dropData);
    }
    
    this.updatePageContent();
    this.dispatchDropChangeEvent(dropData);
  }

  setSelectedDrop(dropData) {
    this.currentDrop = dropData;
    this.saveToStorage(dropData);
    this.updateGlobalSelector();
    this.updateHeaderDisplay();
  }

  setShowAllMode() {
    this.currentDrop = { handle: 'all', isShowAll: true };
    this.saveToStorage(this.currentDrop);
    this.updateGlobalSelector();
    this.updateHeaderDisplay();
  }

  switchToDrop(dropHandle) {
    const dropData = this.availableDrops.find(drop => drop.handle === dropHandle);
    if (!dropData) return;

    this.setSelectedDrop(dropData);
    this.updatePageContent();
    this.dispatchDropChangeEvent(dropData);
    
    // Optionally scroll to top or show feedback
    this.showSwitchFeedback(dropData);
  }

  loadSavedSelection() {
    try {
      const savedData = localStorage.getItem(this.storageKey);
      if (!savedData) {
        this.setDefaultDrop();
        return;
      }

      const dropData = JSON.parse(savedData);
      
      // Validate the saved drop still exists and is available
      const validDrop = this.availableDrops.find(drop => 
        drop.handle === dropData.handle && drop.isAvailable
      );
      
      if (validDrop) {
        this.currentDrop = validDrop;
        this.updateGlobalSelector();
        this.updateHeaderDisplay();
      } else {
        this.setDefaultDrop();
      }
    } catch (error) {
      console.warn('Could not load saved drop selection:', error);
      this.setDefaultDrop();
    }
  }

  setDefaultDrop() {
    // Default to "Show All" mode
    this.setShowAllMode();
  }

  saveToStorage(dropData) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(dropData));
    } catch (error) {
      console.warn('Could not save drop selection:', error);
    }
  }

  updateGlobalSelector() {
    const selector = document.querySelector(this.selectors.globalSelector);
    if (!selector || !this.currentDrop) return;

    selector.value = this.currentDrop.handle;
  }

  updateHeaderDisplay() {
    const flagElement = document.querySelector(this.selectors.selectedFlag);
    const textElement = document.querySelector(this.selectors.selectedText);
    const infoElement = document.querySelector(this.selectors.dropInfo);

    if (!this.currentDrop) {
      if (infoElement) infoElement.style.display = 'none';
      return;
    }

    if (this.currentDrop.isShowAll) {
      if (flagElement) {
        flagElement.textContent = '🌍';
      }
      if (textElement) {
        textElement.textContent = 'Show All Products';
      }
    } else {
      if (flagElement) {
        flagElement.textContent = this.currentDrop.flag;
      }
      if (textElement) {
        textElement.textContent = `${this.currentDrop.dropType} Drop`;
      }
    }

    if (infoElement) {
      infoElement.style.display = 'flex';
    }
  }

  updatePageContent() {
    if (!this.currentDrop) return;

    this.filterProducts();
    this.updateDropSections();
    this.updateSwitchButtons();
    this.updatePreorderContext();
  }

  filterProducts() {
    const products = document.querySelectorAll(this.selectors.dropProducts);
    
    products.forEach(product => {
      const productDrops = (product.dataset.dropProduct || '').split(',');
      
      // If in "show all" mode, show all products
      if (this.currentDrop && this.currentDrop.isShowAll) {
        product.classList.add('drop-available');
        product.classList.remove('drop-unavailable');
        
        // Update indicator for show all mode
        const dropIndicator = product.querySelector('.product-drop-indicator');
        if (dropIndicator) {
          dropIndicator.innerHTML = '🌍 Multiple Drops Available';
          dropIndicator.className = 'product-drop-indicator show-all';
        }
        return;
      }
      
      const isAvailable = productDrops.includes(this.currentDrop.handle);
      
      // Add classes for styling
      product.classList.toggle('drop-available', isAvailable);
      product.classList.toggle('drop-unavailable', !isAvailable);
      
      // Update product drop indicators
      const dropIndicator = product.querySelector('.product-drop-indicator');
      if (dropIndicator) {
        if (isAvailable) {
          dropIndicator.innerHTML = `${this.currentDrop.flag} Available`;
          dropIndicator.className = 'product-drop-indicator available';
        } else {
          const otherDrops = this.availableDrops.filter(drop => 
            productDrops.includes(drop.handle) && drop.handle !== this.currentDrop.handle
          );
          
          if (otherDrops.length > 0) {
            const nextDrop = otherDrops[0];
            dropIndicator.innerHTML = `${nextDrop.flag} Switch to ${nextDrop.dropType}`;
            dropIndicator.className = 'product-drop-indicator switch-available';
            dropIndicator.dataset.switchDrop = nextDrop.handle;
          } else {
            dropIndicator.innerHTML = 'Not available';
            dropIndicator.className = 'product-drop-indicator unavailable';
          }
        }
      }
    });
  }

  updateDropSections() {
    const sections = document.querySelectorAll(this.selectors.dropSections);
    
    sections.forEach(section => {
      const sectionType = section.dataset.dropSection;
      
      if (sectionType === 'current-drop') {
        // Update current drop section title and content
        const title = section.querySelector('.drop-section-title');
        if (title) {
          title.innerHTML = `${this.currentDrop.flag} Available This Drop`;
        }
      } else if (sectionType === 'future-drops') {
        // Update future drops section
        const title = section.querySelector('.drop-section-title');
        if (title) {
          title.innerHTML = `🔮 Products Coming in Future Drops`;
        }
      }
    });
  }

  updateSwitchButtons() {
    const buttons = document.querySelectorAll(this.selectors.switchDropButtons);
    
    buttons.forEach(button => {
      const targetDrop = this.availableDrops.find(drop => drop.handle === button.dataset.switchDrop);
      if (targetDrop) {
        button.innerHTML = `${targetDrop.flag} Switch to ${targetDrop.dropType} Drop`;
        button.classList.toggle('current-drop', targetDrop.handle === this.currentDrop.handle);
      }
    });
  }

  updatePreorderContext() {
    // Update any existing preorder components with current drop data
    if (typeof window.DropSelector !== 'undefined' && window.DropSelector.setSelectedDrop) {
      window.DropSelector.setSelectedDrop(this.currentDrop);
    }
  }

  showSwitchFeedback(dropData) {
    // Create temporary feedback message
    const feedback = document.createElement('div');
    feedback.className = 'drop-switch-feedback';
    feedback.innerHTML = `
      <div class="drop-switch-feedback__content">
        ${dropData.flag} Switched to ${dropData.dropType} Drop
        <button class="drop-switch-feedback__close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    
    // Add styles
    feedback.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      background: #10b981;
      color: white;
      border-radius: 8px;
      padding: 12px 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      if (feedback.parentElement) {
        feedback.remove();
      }
    }, 3000);
  }

  clearSelection() {
    this.currentDrop = null;
    localStorage.removeItem(this.storageKey);
    this.updateHeaderDisplay();
    this.updatePageContent();
  }

  initializePage() {
    // Initialize page content based on current selection
    this.updatePageContent();
    
    // Add CSS animations
    this.addGlobalStyles();
  }

  addGlobalStyles() {
    if (document.getElementById('global-drop-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'global-drop-styles';
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      .drop-available {
        opacity: 1;
        transition: opacity 0.3s ease;
      }
      
      .drop-unavailable {
        opacity: 0.6;
        transition: opacity 0.3s ease;
      }
      
      .product-drop-indicator {
        font-size: 0.75rem;
        padding: 4px 8px;
        border-radius: 4px;
        margin-top: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .product-drop-indicator.available {
        background: #d1fae5;
        color: #059669;
      }
      
      .product-drop-indicator.switch-available {
        background: #fef3c7;
        color: #d97706;
      }
      
      .product-drop-indicator.switch-available:hover {
        background: #fcd34d;
        transform: translateY(-1px);
      }
      
      .product-drop-indicator.unavailable {
        background: #fee2e2;
        color: #dc2626;
        cursor: default;
      }
    `;
    
    document.head.appendChild(style);
  }

  dispatchDropChangeEvent(dropData) {
    const event = new CustomEvent('globalDropChanged', {
      detail: dropData,
      bubbles: true
    });
    document.dispatchEvent(event);
  }

  // Public API
  getCurrentDrop() {
    return this.currentDrop;
  }

  getAvailableDrops() {
    return this.availableDrops;
  }

  switchDrop(dropHandle) {
    this.switchToDrop(dropHandle);
  }

  // Static methods for global access
  static getInstance() {
    if (!window.globalDropManager) {
      window.globalDropManager = new GlobalDropManager();
    }
    return window.globalDropManager;
  }

  static getCurrentDrop() {
    return GlobalDropManager.getInstance().getCurrentDrop();
  }

  static switchToDrop(dropHandle) {
    GlobalDropManager.getInstance().switchDrop(dropHandle);
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    GlobalDropManager.getInstance();
  });
} else {
  GlobalDropManager.getInstance();
}

// Expose to global scope
window.GlobalDropManager = GlobalDropManager;