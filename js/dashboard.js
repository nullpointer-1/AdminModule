/**
 * Admin Dashboard JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize dashboard components
  initializeModals();
  initializeShopCards();
  initializeCredentialGeneration();

  // Load sample shop data (in a real app, this would come from an API)
  loadShopData();
});

/**
 * Initialize modal functionality
 */
function initializeModals() {
  // Get all modals
  const modals = document.querySelectorAll('.modal');
  const modalTriggers = {
    'add-shop-modal': document.getElementById('add-shop-btn'),
    'credentials-modal': document.querySelectorAll('.generate-credentials-btn')
  };
  
  // Setup modal open buttons
  if (modalTriggers['add-shop-modal']) {
    modalTriggers['add-shop-modal'].addEventListener('click', function() {
      openModal('add-shop-modal');
    });
  }
  
  modalTriggers['credentials-modal'].forEach(button => {
    button.addEventListener('click', function() {
      // Get shop information from the card
      const shopCard = this.closest('.shop-card');
      const shopName = shopCard.querySelector('h3').textContent;
      const vendorName = shopCard.querySelector('p:nth-child(1)').textContent.split(':')[1].trim();
      
      // Pre-generate credentials
      const username = generateUsername(vendorName);
      const password = generatePassword(8);
      
      // Set values in the credentials modal
      document.getElementById('generated-username').value = username;
      document.getElementById('generated-password').value = password;
      
      // Open the modal
      openModal('credentials-modal');
    });
  });
  
  // Setup close buttons for all modals
  document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      closeModal(modal.id);
    });
  });
  
  // Close modals when clicking outside
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal(this.id);
      }
    });
  });
  
  // Setup cancel buttons
  document.getElementById('cancel-add-shop')?.addEventListener('click', function() {
    closeModal('add-shop-modal');
  });
  
  document.getElementById('cancel-credentials')?.addEventListener('click', function() {
    closeModal('credentials-modal');
  });
  
  // Setup save buttons
  document.getElementById('save-shop')?.addEventListener('click', function() {
    saveShop();
  });
  
  document.getElementById('save-credentials')?.addEventListener('click', function() {
    saveCredentials();
  });
}

/**
 * Open a modal by ID
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
}

/**
 * Close a modal by ID
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

/**
 * Initialize shop card functionality
 */
function initializeShopCards() {
  // Setup view details buttons
  document.querySelectorAll('.shop-details-btn').forEach(button => {
    button.addEventListener('click', function() {
      const shopCard = this.closest('.shop-card');
      const shopName = shopCard.querySelector('h3').textContent;
      
      // In a real app, this would navigate to a shop details page
      showNotification(`Viewing details for ${shopName}`, 'info');
    });
  });
}

/**
 * Initialize credential generation functionality
 */
function initializeCredentialGeneration() {
  // Setup regenerate username button
  document.getElementById('regenerate-username')?.addEventListener('click', function() {
    const vendorEmail = document.getElementById('vendor-email').value;
    let username;
    
    if (vendorEmail) {
      // Extract username from email
       username = vendorEmail ? vendorEmail.split('@')[0] : generateUsername(vendorName);

    } else {
      username = 'vendor' + Math.floor(1000 + Math.random() * 9000);
    }
    
    document.getElementById('generated-username').value = username;
  });
  
  // Setup regenerate password button
  document.getElementById('regenerate-password')?.addEventListener('click', function() {
    const password = generatePassword(8);
    document.getElementById('generated-password').value = password;
  });
}

/**
 * Generate a username based on vendor name
 */
function generateUsername(vendorName) {
  if (!vendorName) return 'vendor' + Math.floor(1000 + Math.random() * 9000);
  
  // Remove spaces and special characters
  const cleanName = vendorName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Add a random number
  return cleanName + Math.floor(100 + Math.random() * 900);
}

/**
 * Generate a random password
 */
function generatePassword(length = 8) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}


/**
 * Save a new shop
 */
function saveShop() {
  const shopName = document.getElementById('shop-name').value;
  const vendorName = document.getElementById('vendor-name').value;
  const location = document.getElementById('shop-location').value;
  const contactNumber = document.getElementById('contact-number').value;
  const shopType = document.getElementById('shop-type').value;
  const status = document.getElementById('shop-status').value;
  
  // Simple validation
  if (!shopName || !vendorName || !location || !contactNumber || !shopType) {
    showNotification('Please fill all required fields', 'error');
    return;
  }
  
  // In a real app, this would send data to the backend
  // For demo purposes, we'll add it to the UI directly
  
  // Create new shop card
  const shopCardsContainer = document.getElementById('shop-cards-container');
  const newShopCard = document.createElement('div');
  newShopCard.className = 'shop-card';
  newShopCard.innerHTML = `
    <div class="shop-card-header">
      <h3>${shopName}</h3>
      <span class="shop-status ${status}">${status === 'active' ? 'Active' : 'Inactive'}</span>
    </div>
    <div class="shop-card-body">
      <p><strong>Vendor:</strong> ${vendorName}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Contact:</strong> ${contactNumber}</p>
      <p><strong>Type:</strong> ${shopType}</p>
    </div>
    <div class="shop-card-footer">
      <button class="btn btn-secondary shop-details-btn">View Details</button>
      <button class="btn btn-primary generate-credentials-btn">Generate Credentials</button>
    </div>
  `;
  
  // Add to container
  shopCardsContainer.prepend(newShopCard);
  
  // Setup event listeners for the new card
  const detailsBtn = newShopCard.querySelector('.shop-details-btn');
  detailsBtn.addEventListener('click', function() {
    showNotification(`Viewing details for ${shopName}`, 'info');
  });
  
  const credentialsBtn = newShopCard.querySelector('.generate-credentials-btn');
  credentialsBtn.addEventListener('click', function() {
    // Pre-generate credentials
    const username = generateUsername(vendorName);
    const password = generatePassword(8);
    
    // Set values in the credentials modal
    document.getElementById('generated-username').value = username;
    document.getElementById('generated-password').value = password;
    
    // Open the modal
    openModal('credentials-modal');
  });
  
  // Close the modal and reset form
  closeModal('add-shop-modal');
  document.getElementById('add-shop-form').reset();
  
  // Show success message
  showNotification('Shop added successfully!', 'success');
}

/**
 * Save vendor credentials
 */
function saveCredentials() {
  const vendorEmail = document.getElementById('vendor-email').value;
  const username = document.getElementById('generated-username').value;
  const password = document.getElementById('generated-password').value;
  
  // Simple validation
  if (!vendorEmail || !username || !password) {
    showNotification('Please fill all required fields', 'error');
    return;
  }
  
  // In a real app, this would send credentials to the backend and email
  // For demo purposes, we'll just show a success message
  
  // Close the modal and reset form
  closeModal('credentials-modal');
  document.getElementById('credentials-form').reset();
  
  // Show success message
  showNotification(`Credentials generated and sent to ${vendorEmail}`, 'success');
}

/**
 * Load sample shop data
 * In a real app, this would fetch data from an API
 */
function loadShopData() {
  // This function would normally fetch data from the backend
  // For this demo, the sample data is already in the HTML
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
  // Check if a notification container already exists
  let notificationContainer = document.querySelector('.notification-container');
  
  // If not, create one
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    document.body.appendChild(notificationContainer);
    
    // Style the notification container
    Object.assign(notificationContainer.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: '1000'
    });
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `alert alert-${type}`;
  notification.textContent = message;
  
  // Add animation classes
  notification.style.animationName = 'slideIn';
  notification.style.animationDuration = '0.3s';
  
  // Add to container
  notificationContainer.appendChild(notification);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.animationName = 'slideOut';
    setTimeout(() => {
      notification.remove();
      
      // If container is empty, remove it too
      if (notificationContainer.children.length === 0) {
        notificationContainer.remove();
      }
    }, 300);
  }, 5000);
}

// Function to open the modal to add a new shop
document.getElementById('add-shop-btn').addEventListener('click', function () {
  document.getElementById('add-shop-modal').style.display = 'block';
});

// Close the modal
document.querySelectorAll('.close-modal').forEach(function (closeBtn) {
  closeBtn.addEventListener('click', function () {
    document.getElementById('add-shop-modal').style.display = 'none';
  });
});

// Save shop data when form is submitted
// document.getElementById('save-shop').addEventListener('click', function (event) {
//   event.preventDefault();

//   const shopData = {
//     name: document.getElementById('shop-name').value,
//     location: document.getElementById('shop-location').value,
//     contactNumber: document.getElementById('contact-number').value,
//     shopType: document.getElementById('shop-type').value,
//     active: document.getElementById('shop-status').value === 'active', // Convert status to boolean
//     vendorName: document.getElementById('vendor-name').value
//   };

//   // Send data to the backend via fetch
//   fetch('/api/shops', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(shopData)
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Error saving shop data');
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log('Shop added successfully:', data);
//       // Close the modal
//       document.getElementById('add-shop-modal').style.display = 'none';
//       // Optionally, update the UI with the new shop data
//       // You could reload the list of shops here if needed
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// });

// // Cancel button to close the modal without saving
// document.getElementById('cancel-add-shop').addEventListener('click', function () {
//   document.getElementById('add-shop-modal').style.display = 'none';
// });

document.getElementById("save-shop").addEventListener("click", function () {
  // Collect form data
  const shopData = {
    name: document.getElementById("shop-name").value,
    location: document.getElementById("shop-location").value,
    contactNumber: document.getElementById("contact-number").value,
    shopType: document.getElementById("shop-type").value,
    active: document.getElementById("shop-status").value === "active" ? true : false,
    vendorName: document.getElementById("vendor-name").value,
    vendorEmail: document.getElementById("vendor-email").value,
    vendorUsername: document.getElementById("generated-username").value,
    vendorPassword: document.getElementById("generated-password").value,
    vendorContactNumber: document.getElementById("contact-number").value, // Same as shop contact
  };

  // Send POST request to backend
  fetch("http://localhost:8080/api/shops", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shopData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Shop data saved successfully:", data);
      alert("Shop added successfully!");
      // Optionally close the modal here
      document.getElementById("add-shop-modal").style.display = "none";
    })
    .catch((error) => {
      console.error("Error saving shop data:", error);
      alert("Error saving shop data. Please try again.");
    });
});
