import { Component } from '@theme/component';
import { DialogComponent, DialogCloseEvent } from '@theme/dialog';
import { ThemeEvents } from '@theme/events';

export class PreorderPromptComponent extends Component {
  /** @type {Object | null} */
  #productData = null;
  /** @type {Object | null} */
  #variantData = null;
  /** @type {Object | null} */
  #dropData = null;
  /** @type {Function | null} */
  #originalAddToCartCallback = null;

  /**
   * Shows the preorder prompt modal with product information
   * @param {Object} options - Configuration options
   * @param {Object} options.product - Product data
   * @param {Object} options.variant - Selected variant data
   * @param {Object} options.dropInfo - Drop information
   * @param {Function} options.onConfirm - Callback to execute on confirmation
   */
  async showPrompt({ product, variant, dropInfo, onConfirm }) {
    this.#productData = product;
    this.#variantData = variant;
    this.#dropData = dropInfo;
    this.#originalAddToCartCallback = onConfirm;

    // Always show modal first - preference checking happens on confirm
    this.#populateModalContent();
    this.#openModal();
  }

  /**
   * Populates the modal with product and drop information
   */
  #populateModalContent() {
    const modal = document.getElementById('preorder-prompt-dialog');
    if (!modal || !this.#productData || !this.#variantData || !this.#dropData) return;

    // Update ship date in the shipping confirmation message
    const shipDate = modal.querySelector('.preorder-prompt-modal__ship-date');
    if (shipDate) {
      shipDate.textContent = this.#formatDate(this.#dropData.shipByDate);
    }
  }

  /**
   * Formats a date string for display
   * @param {string} dateString - ISO date string or various date formats
   * @returns {string} Formatted date
   */
  #formatDate(dateString) {
    if (!dateString) return 'TBD';
    
    try {
      // Handle various date formats that might come from Shopify
      let date;
      
      // Try parsing as-is first
      date = new Date(dateString);
      
      // If invalid, try common Shopify date formats
      if (isNaN(date.getTime())) {
        // Try YYYY-MM-DD format
        if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
          date = new Date(dateString + 'T00:00:00');
        }
      }
      
      // If still invalid, return TBD
      if (isNaN(date.getTime())) {
        console.warn('Could not parse date:', dateString);
        return 'TBD';
      }
      
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric',
        year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
      });
    } catch (error) {
      console.warn('Invalid date format:', dateString, error);
      return 'TBD';
    }
  }

  /**
   * Opens the preorder prompt modal
   */
  #openModal() {
    const dialogComponent = document.getElementById('preorder-prompt-dialog');
    if (!(dialogComponent instanceof PreorderPromptDialog)) return;

    dialogComponent.showDialog();
  }

  /**
   * Handles the confirm preorder action
   */
  confirmPreorder = async () => {
    // Note: Checkbox preference is now handled immediately when checkbox is clicked
    // No need to check it here anymore
    
    // Close modal first
    this.#closeModal();
    
    // Small delay to ensure modal is closed, then switch buttons and trigger
    setTimeout(() => {
      this.#switchToAddToCartAndTrigger();
    }, 100);
  };

  /**
   * Switches from preorder button to add-to-cart button and auto-triggers it (public method)
   */
  switchToAddToCartAndTrigger() {
    this.#switchToAddToCartAndTrigger();
  }

  /**
   * Switches from preorder button to add-to-cart button and auto-triggers it (private implementation)
   */
  #switchToAddToCartAndTrigger() {
    // Find the preorder button and hidden cart button
    const preorderButton = document.querySelector('[data-preorder-trigger]');
    const hiddenCartContainer = document.querySelector('.preorder-hidden-cart-button');
    
    if (!preorderButton || !hiddenCartContainer) {
      console.warn('Could not find preorder button or hidden cart button');
      return;
    }

    // Hide the preorder button
    preorderButton.style.display = 'none';
    
    // Show and position the add-to-cart button in the same location
    hiddenCartContainer.style.display = 'block';
    
    // Find the actual add-to-cart button and trigger it
    const addToCartButton = hiddenCartContainer.querySelector('button[type="submit"], button[name="add"]');
    if (addToCartButton) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        addToCartButton.click();
      }, 50);
    } else {
      console.warn('Could not find add-to-cart button to trigger');
    }
  };


  /**
   * Checks if customer has opted to skip preorder confirmations (public method)
   * @returns {Promise<boolean>} True if confirmations should be skipped
   */
  async shouldSkipConfirmation() {
    return this.#shouldSkipConfirmation();
  }

  /**
   * Checks if customer has opted to skip preorder confirmations (private implementation)
   * @returns {Promise<boolean>} True if confirmations should be skipped
   */
  async #shouldSkipConfirmation() {
    // Check localStorage first (works for both logged in and guest users)
    const localStorageValue = localStorage.getItem('skipPreorderConfirmation');
    console.log('Checking skip confirmation - localStorage:', localStorageValue);
    
    if (localStorageValue === 'true') {
      console.log('Skipping confirmation due to localStorage preference');
      return true;
    }

    // If customer is logged in, check their metafield
    if (window.Theme?.customer?.id) {
      try {
        // Check if customer metafield exists (this would be populated from Liquid template)
        const skipConfirmation = window.Theme?.customer?.metafields?.custom?.skip_preorder_confirmation;
        console.log('Checking skip confirmation - customer metafield:', {
          customerId: window.Theme.customer.id,
          metafieldValue: skipConfirmation,
          customerData: window.Theme.customer
        });
        
        if (skipConfirmation === true || skipConfirmation === 'true') {
          console.log('Skipping confirmation due to customer metafield preference');
          return true;
        }
      } catch (error) {
        console.warn('Error checking customer preference:', error);
      }
    }

    console.log('Not skipping confirmation - no preference found');
    return false;
  }

  /**
   * Saves customer preference to skip preorder confirmation (public method)
   */
  async saveCustomerPreference() {
    return this.#saveCustomerPreference();
  }

  /**
   * Saves customer preference to skip preorder confirmation (private implementation)
   */
  async #saveCustomerPreference() {
    console.log('Saving customer preference to skip preorder confirmations');
    
    // Always save to localStorage for immediate effect
    localStorage.setItem('skipPreorderConfirmation', 'true');
    console.log('Saved to localStorage: skipPreorderConfirmation = true');

    // If customer is logged in, also attempt to save to their metafields
    if (window.Theme?.customer?.id) {
      console.log('Customer is logged in, attempting to save metafield');
      try {
        // Use a simpler approach - submit a form to update customer metafield
        // This is more reliable than trying to use Admin API from frontend
        const formData = new FormData();
        formData.append('customer[metafields][custom][skip_preorder_confirmation]', 'true');
        
        // Submit to customer update endpoint (this would need to be handled by theme or app)
        await fetch('/account/update-preferences', {
          method: 'POST',
          body: formData
        }).then(response => {
          if (response.ok) {
            console.log('Successfully saved customer metafield preference');
          } else {
            console.warn('Failed to save customer metafield preference:', response.status);
          }
        }).catch(error => {
          console.warn('Could not save customer metafield preference:', error);
        });
      } catch (error) {
        console.warn('Error saving customer preference:', error);
      }
    } else {
      console.log('Customer not logged in, only localStorage preference saved');
    }
  }

  /**
   * Closes the preorder prompt modal
   */
  #closeModal() {
    const dialogComponent = document.getElementById('preorder-prompt-dialog');
    if (!(dialogComponent instanceof PreorderPromptDialog)) return;

    dialogComponent.closeDialog();
  }

  /**
   * Shows the "How It Works" modal
   */
  showHowItWorks = () => {
    const howItWorksDialog = document.getElementById('how-it-works-dialog');
    if (howItWorksDialog instanceof HowItWorksDialog) {
      howItWorksDialog.showDialog();
    }
  };
}

class PreorderPromptDialog extends DialogComponent {
  #abortController = new AbortController();

  connectedCallback() {
    super.connectedCallback();

    // Set up event listeners
    const howItWorksBtn = this.querySelector('.preorder-prompt-modal__how-it-works-btn');
    if (howItWorksBtn) {
      howItWorksBtn.addEventListener('click', this.#handleHowItWorksClick, {
        signal: this.#abortController.signal
      });
    }

    // Set up checkbox listener to immediately save preference
    const checkbox = this.querySelector('#skip-preorder-confirmation');
    if (checkbox) {
      checkbox.addEventListener('change', this.#handleCheckboxChange, {
        signal: this.#abortController.signal
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#abortController.abort();
  }

  /**
   * Handles the confirm preorder button click
   */
  confirmPreorder = () => {
    const preorderComponent = window.preorderPromptComponent;
    if (preorderComponent) {
      preorderComponent.confirmPreorder();
    }
  };

  /**
   * Handles the "How It Works" button click
   */
  #handleHowItWorksClick = () => {
    const preorderComponent = window.preorderPromptComponent;
    if (preorderComponent) {
      preorderComponent.showHowItWorks();
    }
  };

  /**
   * Handles checkbox change - immediately save preference when checked
   */
  #handleCheckboxChange = (event) => {
    const checkbox = event.target;
    console.log('Checkbox changed:', {
      checked: checkbox.checked,
      id: checkbox.id
    });

    if (checkbox.checked) {
      console.log('Checkbox checked - immediately saving customer preference');
      const preorderComponent = window.preorderPromptComponent;
      if (preorderComponent) {
        // Call the public method to save preference immediately
        preorderComponent.saveCustomerPreference();
      }
    } else {
      console.log('Checkbox unchecked - could clear preference here if needed');
      // Optionally handle unchecking - maybe clear the preference
      // For now, we'll keep the preference once set
    }
  };
}

// Define custom elements
if (!customElements.get('preorder-prompt-component')) {
  customElements.define('preorder-prompt-component', PreorderPromptComponent);
}

if (!customElements.get('preorder-prompt-dialog')) {
  customElements.define('preorder-prompt-dialog', PreorderPromptDialog);
}

class HowItWorksDialog extends DialogComponent {
  // No special logic needed for this modal, just inherit from DialogComponent
}

if (!customElements.get('how-it-works-dialog')) {
  customElements.define('how-it-works-dialog', HowItWorksDialog);
}

// Create a global instance for easy access
window.preorderPromptComponent = new PreorderPromptComponent();

/**
 * Helper function to check if a product is a preorder/drop product
 * Works with both Shopify Liquid product objects and JavaScript product objects
 * @param {Object} product - Product object
 * @returns {Object|null} Drop information if product is a preorder, null otherwise
 */
export function getDropInfo(product) {
  if (!product) return null;

  // Handle collections array (JavaScript object structure)
  let collections = product.collections;
  
  // Handle collections hash (Liquid object structure converted to JS)
  if (!collections && product.collection_handles) {
    // If we have collection handles, we need to get collection data from Theme.collections
    collections = product.collection_handles.map(handle => 
      window.Theme?.collections?.[handle]
    ).filter(Boolean);
  }

  if (!collections || !Array.isArray(collections)) return null;

  for (const collection of collections) {
    if (!collection) continue;

    // Check if collection has drop metafields
    // Handle both nested metafields structure and flat structure
    const metafields = collection.metafields?.custom || collection.metafields || {};
    const hasDropMetafields = metafields.ship_by_date || metafields.drop_location;
    
    if (hasDropMetafields) {
      const shipByDate = metafields.ship_by_date;
      const dropLocation = metafields.drop_location;
      const orderByDate = metafields.order_by_date;

      // Calculate estimated delivery (ship date + 7 days)
      let estimatedDelivery = null;
      if (shipByDate) {
        try {
          let shipDate = new Date(shipByDate);
          
          // Handle YYYY-MM-DD format specifically
          if (isNaN(shipDate.getTime()) && typeof shipByDate === 'string' && shipByDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
            shipDate = new Date(shipByDate + 'T00:00:00');
          }
          
          if (!isNaN(shipDate.getTime())) {
            const deliveryDate = new Date(shipDate.getTime() + (7 * 24 * 60 * 60 * 1000));
            estimatedDelivery = deliveryDate.toISOString().split('T')[0];
          }
        } catch (error) {
          console.warn('Invalid ship date:', shipByDate, error);
        }
      }

      // Format display name
      let displayName = collection.title || collection.name || 'Drop';
      if (dropLocation) {
        displayName = `${dropLocation} Drop`;
        if (shipByDate) {
          try {
            let shipDate = new Date(shipByDate);
            
            // Handle YYYY-MM-DD format specifically
            if (isNaN(shipDate.getTime()) && typeof shipByDate === 'string' && shipByDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
              shipDate = new Date(shipByDate + 'T00:00:00');
            }
            
            if (!isNaN(shipDate.getTime())) {
              const formattedDate = shipDate.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric' 
              });
              displayName += ` - Ships ${formattedDate}`;
            }
          } catch (error) {
            console.warn('Invalid ship date for display:', shipByDate, error);
          }
        }
      }

      return {
        collectionHandle: collection.handle,
        collectionTitle: collection.title || collection.name,
        displayName,
        shipByDate,
        estimatedDelivery,
        dropLocation,
        orderByDate
      };
    }
  }

  return null;
}

/**
 * Helper function to check if a variant is sold out via metafield
 * @param {Object} variant - Variant object
 * @returns {boolean} True if variant is marked as sold out
 */
export function isVariantSoldOut(variant) {
  return variant?.metafields?.custom?.is_sold_out === true;
}