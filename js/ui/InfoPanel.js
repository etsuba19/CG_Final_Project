// UI controller for information panel and user interactions
export class InfoPanel {
    constructor() {
        this.planetNameElement = document.getElementById('planet-name');
        this.planetDetailsElement = document.getElementById('planet-details');
        this.speedSlider = document.getElementById('speed-slider');
        this.speedValue = document.getElementById('speed-value');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Speed control
        this.speedSlider.addEventListener('input', (event) => {
            const speed = parseFloat(event.target.value);
            this.updateSpeedDisplay(speed);
            this.onSpeedChange(speed);
        });
        
        // Control buttons
        document.getElementById('reset-camera').addEventListener('click', () => {
            this.onResetCamera();
        });
        
        document.getElementById('toggle-orbits').addEventListener('click', () => {
            this.onToggleOrbits();
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (event) => {
            this.handleKeyboard(event);
        });
    }
    
    // Display planet information
    showPlanetInfo(planetData) {
        this.planetNameElement.textContent = planetData.name;
        this.planetDetailsElement.innerHTML = `
            <strong>Type:</strong> ${planetData.type}<br>
            <strong>Fact 1:</strong> ${planetData.fact1}<br>
            <strong>Fact 2:</strong> ${planetData.fact2}<br>
            <strong>Fact 3:</strong> ${planetData.fact3}
        `;
    }
    
    // Display sun information
    showSunInfo(sunData) {
        this.planetNameElement.textContent = sunData.name;
        this.planetDetailsElement.innerHTML = `
            <strong>Type:</strong> ${sunData.type}<br>
            <strong>Fact 1:</strong> ${sunData.fact1}<br>
            <strong>Fact 2:</strong> ${sunData.fact2}<br>
            <strong>Fact 3:</strong> ${sunData.fact3}
        `;
    }
    
    // Update speed display
    updateSpeedDisplay(speed) {
        this.speedValue.textContent = speed + 'x';
    }
    
    // Handle keyboard events
    handleKeyboard(event) {
        switch(event.key) {
            case ' ':
                event.preventDefault();
                this.togglePause();
                break;
        }
    }
    
    // Toggle pause/resume
    togglePause() {
        const currentSpeed = parseFloat(this.speedSlider.value);
        const newSpeed = currentSpeed === 0 ? 1 : 0;
        this.speedSlider.value = newSpeed;
        this.updateSpeedDisplay(newSpeed);
        this.onSpeedChange(newSpeed);
    }
    
    // Callback functions (to be set by main application)
    onSpeedChange(speed) {
        // Override this in main application
    }
    
    onResetCamera() {
        // Override this in main application
    }
    
    onToggleOrbits() {
        // Override this in main application
    }
    
    // Hide loading screen
    hideLoading() {
        document.getElementById('loading').style.display = 'none';
    }
}
