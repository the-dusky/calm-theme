document.addEventListener('DOMContentLoaded', function() {
  // Initialize shipping tracker functionality
  initShippingTracker();
});

function initShippingTracker() {
  // Handle expand/collapse functionality
  window.toggleShipment = function(shipmentId) {
    const shipmentItem = document.querySelector(`[data-shipment-id="${shipmentId}"]`);
    const expandedContent = document.getElementById(`expanded-${shipmentId}`);
    
    if (!shipmentItem || !expandedContent) {
      console.warn(`Shipment ${shipmentId} not found`);
      return;
    }
    
    const isExpanded = shipmentItem.classList.contains('expanded');
    
    // Close all other expanded shipments
    closeAllShipments();
    
    if (!isExpanded) {
      // Expand this shipment
      shipmentItem.classList.add('expanded');
      expandedContent.style.display = 'block';
      
      // Smooth scroll to expanded content after a short delay
      setTimeout(() => {
        scrollToExpandedContent(shipmentItem);
      }, 100);
    }
  };
  
  // Initialize click handlers for shipment cards
  initializeCardClickHandlers();
  
  // Initialize progress animations
  initializeProgressAnimations();
}

function closeAllShipments() {
  const allShipmentItems = document.querySelectorAll('.shipment-item');
  const allExpandedContent = document.querySelectorAll('.shipment-expanded-content');
  
  allShipmentItems.forEach(item => {
    item.classList.remove('expanded');
  });
  
  allExpandedContent.forEach(content => {
    content.style.display = 'none';
  });
}

function initializeCardClickHandlers() {
  const shipmentCards = document.querySelectorAll('.shipment-card');
  
  shipmentCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Prevent double execution if clicking on nested interactive elements
      if (e.target.closest('.expand-btn') || e.target.closest('.view-products-btn')) {
        return;
      }
      
      const shipmentItem = e.currentTarget.closest('.shipment-item');
      const shipmentId = shipmentItem.getAttribute('data-shipment-id');
      
      if (shipmentId) {
        toggleShipment(shipmentId);
      }
    });
  });
}

function scrollToExpandedContent(shipmentItem) {
  const expandedContent = shipmentItem.querySelector('.shipment-expanded-content');
  
  if (expandedContent) {
    // Calculate offset to account for any fixed headers
    const headerOffset = 100; // Adjust based on your theme's header height
    const elementPosition = expandedContent.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

function initializeProgressAnimations() {
  // Animate progress bars when they become visible
  const progressBars = document.querySelectorAll('.progress-fill');
  
  if ('IntersectionObserver' in window) {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const targetWidth = progressBar.style.width;
          
          // Reset and animate
          progressBar.style.width = '0%';
          setTimeout(() => {
            progressBar.style.width = targetWidth;
          }, 100);
          
          // Stop observing this element
          progressObserver.unobserve(progressBar);
        }
      });
    }, {
      threshold: 0.5
    });
    
    progressBars.forEach(bar => {
      progressObserver.observe(bar);
    });
  }
}

// Utility function to handle keyboard navigation
function initializeKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    // ESC key to close all expanded shipments
    if (e.key === 'Escape') {
      closeAllShipments();
    }
    
    // Arrow keys for navigation between shipments
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const expandedShipment = document.querySelector('.shipment-item.expanded');
      if (expandedShipment) {
        e.preventDefault();
        
        const allShipments = Array.from(document.querySelectorAll('.shipment-item'));
        const currentIndex = allShipments.indexOf(expandedShipment);
        
        let nextIndex;
        if (e.key === 'ArrowDown') {
          nextIndex = currentIndex < allShipments.length - 1 ? currentIndex + 1 : 0;
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : allShipments.length - 1;
        }
        
        const nextShipment = allShipments[nextIndex];
        const nextShipmentId = nextShipment.getAttribute('data-shipment-id');
        
        if (nextShipmentId) {
          toggleShipment(nextShipmentId);
        }
      }
    }
  });
}

// Initialize keyboard navigation
initializeKeyboardNavigation();

// Handle window resize events
window.addEventListener('resize', function() {
  // Close all expanded shipments on resize to prevent layout issues
  const expandedShipments = document.querySelectorAll('.shipment-item.expanded');
  if (expandedShipments.length > 0) {
    setTimeout(() => {
      // Re-calculate positions after resize
      expandedShipments.forEach(shipment => {
        const shipmentId = shipment.getAttribute('data-shipment-id');
        const expandedContent = document.getElementById(`expanded-${shipmentId}`);
        if (expandedContent && expandedContent.style.display !== 'none') {
          scrollToExpandedContent(shipment);
        }
      });
    }, 100);
  }
});

// Accessibility improvements
function improveAccessibility() {
  const shipmentCards = document.querySelectorAll('.shipment-card');
  const expandButtons = document.querySelectorAll('.expand-btn, .view-products-btn');
  
  // Add ARIA labels and roles
  shipmentCards.forEach((card, index) => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-expanded', 'false');
    
    const title = card.querySelector('.shipment-title');
    if (title) {
      const titleText = title.textContent.trim();
      card.setAttribute('aria-label', `Expand ${titleText} shipment details`);
    }
  });
  
  expandButtons.forEach(button => {
    if (!button.getAttribute('aria-label')) {
      button.setAttribute('aria-label', 'Toggle shipment details');
    }
  });
  
  // Handle Enter and Space key presses on shipment cards
  shipmentCards.forEach(card => {
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
  
  // Update ARIA states when expanding/collapsing
  const originalToggleShipment = window.toggleShipment;
  window.toggleShipment = function(shipmentId) {
    originalToggleShipment(shipmentId);
    
    // Update ARIA states
    const shipmentItem = document.querySelector(`[data-shipment-id="${shipmentId}"]`);
    const shipmentCard = shipmentItem?.querySelector('.shipment-card');
    
    if (shipmentCard) {
      const isExpanded = shipmentItem.classList.contains('expanded');
      shipmentCard.setAttribute('aria-expanded', isExpanded.toString());
    }
  };
}

// Initialize accessibility improvements
improveAccessibility();

// Initialize add to cart functionality
initializeAddToCart();

// Add to cart functionality
function initializeAddToCart() {
  const addToCartForms = document.querySelectorAll('.add-to-cart-form');
  
  addToCartForms.forEach(form => {
    form.addEventListener('submit', handleAddToCart);
  });
}

function handleAddToCart(event) {
  event.preventDefault();
  
  const form = event.target;
  const button = form.querySelector('.btn-add-to-cart');
  const variantId = form.querySelector('input[name="id"]').value;
  
  // Store original button content
  const originalContent = button.innerHTML;
  
  // Show loading state
  button.disabled = true;
  button.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 6v6l4 2"></path>
    </svg>
    Adding...
  `;
  
  // Prepare form data
  const formData = new FormData();
  formData.append('id', variantId);
  formData.append('quantity', 1);
  
  // Make the request
  fetch('/cart/add.js', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Success feedback
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20,6 9,17 4,12"></polyline>
      </svg>
      Added!
    `;
    
    // Update cart count if cart drawer exists
    updateCartCount();
    
    // Show success notification
    showNotification('Product added to cart!', 'success');
    
    // Reset button after delay
    setTimeout(() => {
      button.disabled = false;
      button.innerHTML = originalContent;
    }, 2000);
  })
  .catch(error => {
    console.error('Error adding to cart:', error);
    
    // Error feedback
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
      Error
    `;
    
    // Show error notification
    showNotification('Error adding to cart. Please try again.', 'error');
    
    // Reset button after delay
    setTimeout(() => {
      button.disabled = false;
      button.innerHTML = originalContent;
    }, 2000);
  });
}

function updateCartCount() {
  // Update cart count in header if it exists
  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      const cartCountElements = document.querySelectorAll('[data-cart-count]');
      cartCountElements.forEach(element => {
        element.textContent = cart.item_count;
      });
      
      // Trigger cart updated event for other scripts
      document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
    })
    .catch(error => {
      console.error('Error updating cart count:', error);
    });
}

function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.shipping-tracker-notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `shipping-tracker-notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
  `;
  
  // Set notification type styles
  if (type === 'success') {
    notification.style.backgroundColor = '#10b981';
    notification.style.color = 'white';
  } else if (type === 'error') {
    notification.style.backgroundColor = '#ef4444';
    notification.style.color = 'white';
  } else {
    notification.style.backgroundColor = 'rgb(var(--color-background))';
    notification.style.color = 'rgb(var(--color-foreground))';
    notification.style.border = '1px solid rgb(var(--color-border))';
  }
  
  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

// Add CSS for spinner animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  .notification-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  .notification-close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: inherit;
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }
  .notification-close:hover {
    opacity: 1;
  }
`;
document.head.appendChild(style);