/**
 * User Login with OTP JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  const userLoginForm = document.getElementById('user-login-form');
  const otpVerificationForm = document.getElementById('otp-verification-form');
  const requestOtpBtn = document.getElementById('request-otp-btn');
  const resendOtpBtn = document.getElementById('resend-otp');
  const otpInputs = document.querySelectorAll('.otp-input');
  
  // OTP handling functionality
  if (requestOtpBtn) {
    requestOtpBtn.addEventListener('click', function() {
      const phoneNumber = document.getElementById('phone').value;
      
      // Simple validation
      if (!phoneNumber || phoneNumber.length < 10) {
        showNotification('Please enter a valid phone number', 'error');
        return;
      }
      
      // In a real application, this would make an API call to send OTP
      // For demo purposes, we'll just show the OTP form
      
      // Hide the phone form and show OTP form
      userLoginForm.style.display = 'none';
      otpVerificationForm.style.display = 'block';
      
      // Show notification
      showNotification('OTP sent to ' + phoneNumber, 'success');
      
      // Focus on first OTP input
      if (otpInputs.length > 0) {
        otpInputs[0].focus();
      }
    });
  }
  
  // Handle resend OTP button
  if (resendOtpBtn) {
    resendOtpBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // In a real application, this would make an API call to resend OTP
      showNotification('OTP resent successfully', 'success');
    });
  }
  
  // Handle OTP input navigation and auto-submit
  if (otpInputs.length > 0) {
    // Auto navigate between OTP inputs
    otpInputs.forEach((input, index) => {
      input.addEventListener('keyup', function(e) {
        // If a digit is entered, move to next input
        if (this.value.length === this.maxLength) {
          if (index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
          }
        }
        
        // If backspace is pressed on an empty input, move to previous input
        if (e.key === 'Backspace' && this.value.length === 0) {
          if (index > 0) {
            otpInputs[index - 1].focus();
          }
        }
        
        // Check if all inputs are filled
        const allFilled = Array.from(otpInputs).every(input => input.value.length === 1);
        
        // Auto-submit if all inputs are filled
        if (allFilled) {
          verifyOtp();
        }
      });
    });
  }
  
  // Handle OTP form submission
  if (otpVerificationForm) {
    otpVerificationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      verifyOtp();
    });
  }
  
  /**
   * Verify the OTP
   */
  function verifyOtp() {
    // Get OTP value from inputs
    const otpValue = Array.from(otpInputs).map(input => input.value).join('');
    
    // Simple validation
    if (otpValue.length !== otpInputs.length) {
      showNotification('Please enter the complete OTP', 'error');
      return;
    }
    
    // For demo purposes, any OTP will work
    // In a real application, this would verify the OTP with the backend
    
    showNotification('OTP verified successfully! Redirecting...', 'success');
    
    // Simulate redirection after successful login
    setTimeout(() => {
      // Redirect to a user dashboard (not implemented in this demo)
      window.location.href = '../../index.html';
    }, 2000);
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