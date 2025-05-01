/**
 * Vendor Login JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  const vendorLoginForm = document.getElementById('vendor-login-form');

  if (vendorLoginForm) {
    vendorLoginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('vendor-username').value;
      const password = document.getElementById('vendor-password').value;
      
      // Simple validation 
      if (!username || !password) {
        showNotification('Please enter both username and password', 'error');
        return;
      }
      
      // For demo purposes, hardcode a vendor credential
      // In a real application, this would verify with the backend
      if (username === 'vendor1' && password === 'vendor123') {
        // Show success message
        showNotification('Login successful! Redirecting to vendor dashboard...', 'success');
        
        // Redirect to vendor dashboard (not implemented in this demo)
        setTimeout(() => {
          window.location.href = '../../index.html';
        }, 1500);
      } else {
        showNotification('Invalid username or password', 'error');
      }
    });
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
});