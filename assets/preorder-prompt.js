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
  showPrompt({ product, variant, dropInfo, onConfirm }) {
    this.#productData = product;
    this.#variantData = variant;
    this.#dropData = dropInfo;
    this.#originalAddToCartCallback = onConfirm;

    this.#populateModalContent();
    this.#openModal();
  }

  /**
   * Populates the modal with product and drop information
   */
  #populateModalContent() {
    const modal = document.getElementById('preorder-prompt-dialog');
    if (!modal || !this.#productData || !this.#variantData || !this.#dropData) return;

    // Update product image
    const productImage = modal.querySelector('.preorder-prompt-modal__product-image');
    if (productImage && this.#variantData.featured_image) {
      productImage.innerHTML = `
        <img 
          src="${this.#variantData.featured_image.src}" 
          alt="${this.#variantData.featured_image.alt || this.#productData.title}"
          loading="lazy"
        />
      `;
    } else if (productImage && this.#productData.featured_image) {
      productImage.innerHTML = `
        <img 
          src="${this.#productData.featured_image}" 
          alt="${this.#productData.title}"
          loading="lazy"
        />
      `;
    }

    // Update product title
    const productTitle = modal.querySelector('.preorder-prompt-modal__product-title');
    if (productTitle) {
      productTitle.textContent = this.#productData.title;
    }

    // Update variant info
    const productVariant = modal.querySelector('.preorder-prompt-modal__product-variant');
    if (productVariant && this.#variantData.title && this.#variantData.title !== 'Default Title') {
      productVariant.textContent = this.#variantData.title;
    } else if (productVariant) {
      productVariant.style.display = 'none';
    }

    // Update drop info
    const dropInfo = modal.querySelector('.preorder-prompt-modal__drop-info');
    if (dropInfo) {
      dropInfo.textContent = this.#dropData.displayName || this.#dropData.collectionTitle;
    }

    // Update ship date
    const shipDate = modal.querySelector('.preorder-prompt-modal__ship-date');
    if (shipDate) {
      shipDate.textContent = this.#formatDate(this.#dropData.shipByDate);
    }

    // Update delivery date
    const deliveryDate = modal.querySelector('.preorder-prompt-modal__delivery-date');
    if (deliveryDate) {
      deliveryDate.textContent = this.#formatDate(this.#dropData.estimatedDelivery);
    }
  }

  /**
   * Formats a date string for display
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  #formatDate(dateString) {
    if (!dateString) return 'TBD';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric',
        year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
      });
    } catch (error) {
      console.warn('Invalid date format:', dateString);
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
  confirmPreorder = () => {
    if (this.#originalAddToCartCallback) {
      this.#originalAddToCartCallback();
    }
    this.#closeModal();
  };

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
    const hasDropMetafields = metafields.ship_by_date || metafields.drop_type;
    
    if (hasDropMetafields) {
      const shipByDate = metafields.ship_by_date;
      const dropType = metafields.drop_type;
      const orderByDate = metafields.order_by_date;

      // Calculate estimated delivery (ship date + 7 days)
      let estimatedDelivery = null;
      if (shipByDate) {
        try {
          const shipDate = new Date(shipByDate);
          if (!isNaN(shipDate.getTime())) {
            const deliveryDate = new Date(shipDate.getTime() + (7 * 24 * 60 * 60 * 1000));
            estimatedDelivery = deliveryDate.toISOString().split('T')[0];
          }
        } catch (error) {
          console.warn('Invalid ship date:', shipByDate);
        }
      }

      // Format display name
      let displayName = collection.title || collection.name || 'Drop';
      if (dropType) {
        displayName = `${dropType} Drop`;
        if (shipByDate) {
          try {
            const shipDate = new Date(shipByDate);
            if (!isNaN(shipDate.getTime())) {
              const formattedDate = shipDate.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric' 
              });
              displayName += ` - Ships ${formattedDate}`;
            }
          } catch (error) {
            console.warn('Invalid ship date for display:', shipByDate);
          }
        }
      }

      return {
        collectionHandle: collection.handle,
        collectionTitle: collection.title || collection.name,
        displayName,
        shipByDate,
        estimatedDelivery,
        dropType,
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