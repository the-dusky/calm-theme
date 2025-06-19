/**
 * Drop Selector Component
 * Handles drop selection UI and session storage for preorder system
 */

class DropSelector {
  constructor() {
    this.sessionKey = 'selectedDrop';
    this.selectors = {
      dropSelect: '[data-drop-selector]',
      shipDateDisplay: '[data-ship-date-display]',
      cutoffDateDisplay: '[data-cutoff-date-display]',
      cutoffInfo: '[data-cutoff-info]',
      dropInfo: '.drop-selector__info'
    };
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadSavedSelection();
  }

  bindEvents() {
    // Handle drop selection changes
    document.addEventListener('change', (event) => {
      if (event.target.matches(this.selectors.dropSelect)) {
        this.handleDropSelection(event.target);
      }
    });

    // Handle page load
    document.addEventListener('DOMContentLoaded', () => {
      this.loadSavedSelection();
    });
  }

  handleDropSelection(selectElement) {
    const selectedOption = selectElement.selectedOptions[0];
    
    if (!selectedOption || !selectedOption.value) {
      this.clearDropSelection();
      return;
    }

    const dropData = {
      handle: selectedOption.value,
      shipDate: selectedOption.dataset.shipDate,
      dropType: selectedOption.dataset.dropType,
      cutoffDate: selectedOption.dataset.cutoffDate,
      collectionId: selectedOption.dataset.collectionId
    };

    // Save to session storage
    this.saveDropSelection(dropData);
    
    // Update UI
    this.updateDropInfo(selectElement, dropData);
    
    // Trigger custom event for other components
    this.dispatchDropChangeEvent(dropData);
    
    console.log('Drop selected:', dropData);
  }

  saveDropSelection(dropData) {
    try {
      sessionStorage.setItem(this.sessionKey, JSON.stringify(dropData));
    } catch (error) {
      console.warn('Could not save drop selection to session storage:', error);
    }
  }

  loadSavedSelection() {
    try {
      const savedData = sessionStorage.getItem(this.sessionKey);
      if (!savedData) return;

      const dropData = JSON.parse(savedData);
      
      // Find and update all drop selectors on the page
      document.querySelectorAll(this.selectors.dropSelect).forEach(selector => {
        const option = selector.querySelector(`option[value="${dropData.handle}"]`);
        if (option) {
          selector.value = dropData.handle;
          this.updateDropInfo(selector, dropData);
        }
      });
      
    } catch (error) {
      console.warn('Could not load saved drop selection:', error);
    }
  }

  updateDropInfo(selectElement, dropData) {
    const container = selectElement.closest('.drop-selector');
    if (!container) return;

    const infoSection = container.querySelector(this.selectors.dropInfo);
    const shipDateDisplay = container.querySelector(this.selectors.shipDateDisplay);
    const cutoffDateDisplay = container.querySelector(this.selectors.cutoffDateDisplay);
    const cutoffInfo = container.querySelector(this.selectors.cutoffInfo);

    if (infoSection) {
      infoSection.style.display = 'block';
    }

    if (shipDateDisplay && dropData.shipDate) {
      const formattedDate = this.formatDate(dropData.shipDate);
      shipDateDisplay.textContent = formattedDate;
    }

    if (cutoffDateDisplay && cutoffInfo && dropData.cutoffDate) {
      const formattedCutoff = this.formatDate(dropData.cutoffDate);
      cutoffDateDisplay.textContent = formattedCutoff;
      cutoffInfo.style.display = 'block';
    } else if (cutoffInfo) {
      cutoffInfo.style.display = 'none';
    }
  }

  clearDropSelection() {
    try {
      sessionStorage.removeItem(this.sessionKey);
    } catch (error) {
      console.warn('Could not clear drop selection:', error);
    }

    // Hide all drop info sections
    document.querySelectorAll(this.selectors.dropInfo).forEach(info => {
      info.style.display = 'none';
    });

    // Dispatch clear event
    this.dispatchDropChangeEvent(null);
  }

  getCurrentSelection() {
    try {
      const savedData = sessionStorage.getItem(this.sessionKey);
      return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
      console.warn('Could not get current drop selection:', error);
      return null;
    }
  }

  dispatchDropChangeEvent(dropData) {
    const event = new CustomEvent('dropSelectionChanged', {
      detail: dropData,
      bubbles: true
    });
    document.dispatchEvent(event);

    // Update preorder context for buy buttons
    this.updatePreorderContext(dropData);
  }

  updatePreorderContext(dropData) {
    // Update any existing preorder info displays
    const preorderInfoCards = document.querySelectorAll('.preorder-info-card');
    preorderInfoCards.forEach(card => {
      if (dropData) {
        const shipDateElement = card.querySelector('[data-ship-date]');
        if (shipDateElement && dropData.shipDate) {
          shipDateElement.textContent = this.formatDate(dropData.shipDate);
        }
      }
    });

    // Update hidden form inputs for cart properties
    const dropCollectionInputs = document.querySelectorAll('[data-drop-collection-input]');
    const shipDateInputs = document.querySelectorAll('[data-ship-date-input]');
    
    dropCollectionInputs.forEach(input => {
      if (dropData) {
        input.value = dropData.handle;
      }
    });
    
    shipDateInputs.forEach(input => {
      if (dropData) {
        input.value = dropData.shipDate;
      }
    });

    // Expose drop data globally for preorder system
    if (typeof window.Theme === 'undefined') {
      window.Theme = {};
    }
    window.Theme.selectedDrop = dropData;
  }

  formatDate(dateString) {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  }

  // Public API methods
  static getInstance() {
    if (!window.dropSelector) {
      window.dropSelector = new DropSelector();
    }
    return window.dropSelector;
  }

  static getSelectedDrop() {
    return DropSelector.getInstance().getCurrentSelection();
  }

  static setSelectedDrop(dropData) {
    const instance = DropSelector.getInstance();
    instance.saveDropSelection(dropData);
    instance.loadSavedSelection();
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    DropSelector.getInstance();
  });
} else {
  DropSelector.getInstance();
}

// Expose to global scope for other scripts
window.DropSelector = DropSelector;