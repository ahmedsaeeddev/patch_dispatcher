class BeforeAfterSlider1 {
    constructor() {
        this.sliderContainer1 = document.getElementById('sliderContainer1');
        this.afterImage1 = document.getElementById('afterImage1');
        this.sliderHandle1 = document.getElementById('sliderHandle1');
        this.sliderLine1 = document.getElementById('sliderLine1');

        this.isDragging1 = false;
        this.currentPosition1 = 50; // Start at 50%

        this.init1();
    }

    init1() {
        // Mouse events
        this.sliderContainer1.addEventListener('mousedown', (e) => this.startDrag1(e));
        document.addEventListener('mousemove', (e) => this.drag1(e));
        document.addEventListener('mouseup', () => this.stopDrag1());

        // Touch events for mobile
        this.sliderContainer1.addEventListener('touchstart', (e) => this.startDrag1(e), { passive: false });
        document.addEventListener('touchmove', (e) => this.drag1(e), { passive: false });
        document.addEventListener('touchend', () => this.stopDrag1());

        // Prevent context menu on right click
        this.sliderContainer1.addEventListener('contextmenu', (e) => e.preventDefault());

        // Keyboard accessibility
        this.sliderContainer1.addEventListener('keydown', (e) => this.handleKeyboard1(e));
        this.sliderContainer1.setAttribute('tabindex', '0');

        // Set initial position
        this.updateSliderPosition1(this.currentPosition1);
    }

    startDrag1(e) {
        this.isDragging1 = true;
        this.sliderContainer1.style.cursor = 'grabbing';

        // Get initial position
        const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        this.updatePosition1(clientX);

        // Prevent text selection
        document.body.style.userSelect = 'none';

        // Prevent default to avoid scrolling on touch devices
        e.preventDefault();
    }

    drag1(e) {
        if (!this.isDragging1) return;

        const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        this.updatePosition1(clientX);

        // Prevent default to avoid scrolling on touch devices
        if (e.type === 'touchmove') {
            e.preventDefault();
        }
    }

    stopDrag1() {
        if (!this.isDragging1) return;

        this.isDragging1 = false;
        this.sliderContainer1.style.cursor = 'grab';
        document.body.style.userSelect = '';
    }

    updatePosition1(clientX) {
        const rect = this.sliderContainer1.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const percentage = (offsetX / rect.width) * 100;

        // Clamp between 0 and 100
        this.currentPosition1 = Math.max(0, Math.min(100, percentage));

        this.updateSliderPosition1(this.currentPosition1);
    }

    updateSliderPosition1(percentage) {
        // Update after image clip-path
        this.afterImage1.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;

        // Update slider handle and line position
        this.sliderHandle1.style.left = `${percentage}%`;
        this.sliderLine1.style.left = `${percentage}%`;

        // Add subtle animation feedback
        this.sliderHandle1.style.transform = `translate(-50%, -50%) ${this.isDragging1 ? 'scale(1.1)' : 'scale(1)'}`;
    }

    handleKeyboard1(e) {
        let newPosition = this.currentPosition1;

        switch (e.key) {
            case 'ArrowLeft':
                newPosition = Math.max(0, this.currentPosition1 - 5);
                break;
            case 'ArrowRight':
                newPosition = Math.min(100, this.currentPosition1 + 5);
                break;
            case 'Home':
                newPosition = 0;
                break;
            case 'End':
                newPosition = 100;
                break;
            default:
                return;
        }

        this.currentPosition1 = newPosition;
        this.updateSliderPosition1(this.currentPosition1);
        e.preventDefault();
    }
}

// Enhanced image loading with error handling
class ImageLoader1 {
    constructor() {
        this.loadImages1();
    }

    loadImages1() {
        const images = document.querySelectorAll('.image-container1 img');

        images.forEach(img => {
            img.addEventListener('load', () => {
                img.style.animation = 'none';
                img.style.background = 'none';
            });

            img.addEventListener('error', () => {
                this.handleImageError1(img);
            });
        });
    }

    handleImageError1(img) {
        // Create a placeholder with a nice gradient
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
            font-weight: 600;
        `;

        const isAfter = img.alt.includes('After');
        placeholder.textContent = `${isAfter ? 'After' : 'Before'} Image Not Found`;

        img.parentNode.replaceChild(placeholder, img);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BeforeAfterSlider1();
    new ImageLoader1();

    // Add some visual feedback on page load
    const container = document.querySelector('.slider-container1');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';

    setTimeout(() => {
        container.style.transition = 'all 0.6s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Re-initialize slider position on resize
    const slider = document.querySelector('.slider-container1');
    if (slider) {
        const event = new CustomEvent('resize');
        slider.dispatchEvent(event);
    }
});