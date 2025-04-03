// Hero Slideshow Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show the current slide
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Initialize slideshow
    showSlide(currentSlide);
    
    // Auto-advance slideshow every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Initialize tooltips and popovers if using Bootstrap
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});

// Live match updates simulation
function updateLiveMatches() {
    // In a real application, this would fetch data from an API
    // For demonstration, we'll just update the time
    const matchTimeElements = document.querySelectorAll('.match-info .text-muted');
    
    matchTimeElements.forEach(element => {
        const content = element.textContent;
        
        if (content.includes("'")) {
            // Football match
            let minute = parseInt(content.replace("'", ""));
            minute = (minute + 1) % 90;
            if (minute === 0) minute = 1;
            element.textContent = minute + "'";
        } else if (content.includes("Q")) {
            // Basketball match
            const parts = content.split(" - ");
            const quarter = parts[0];
            let time = parts[1];
            
            const timeParts = time.split(":");
            let minutes = parseInt(timeParts[0]);
            let seconds = parseInt(timeParts[1]);
            
            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
            }
            if (minutes < 0) {
                minutes = 12; // Reset to beginning of quarter
            }
            
            element.textContent = quarter + " - " + minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
        }
    });
}

// Update live matches every second
setInterval(updateLiveMatches, 1000);

// Login form validation
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email.trim() === '' || password.trim() === '') {
                showAlert('Please fill in all fields', 'danger');
                return;
            }
            
            // In a real application, you would send this data to your server
            // For demonstration, we'll just show a success message
            showAlert('Login successful! Redirecting...', 'success');
            
            // Simulate redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
});

// Sign up form validation
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
                showAlert('Please fill in all fields', 'danger');
                return;
            }
            
            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'danger');
                return;
            }
            
            // In a real application, you would send this data to your server
            // For demonstration, we'll just show a success message
            showAlert('Account created successfully! Redirecting...', 'success');
            
            // Simulate redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
});

// Helper function to show alerts
function showAlert(message, type) {
    const alertContainer = document.querySelector('.alert-container');
    
    if (alertContainer) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        alertContainer.appendChild(alert);
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                alert.remove();
            }, 500);
        }, 5000);
    }
}
