// Interaction handler for mouse clicks and object selection
export class InteractionHandler {
    constructor(camera, renderer) {
        this.camera = camera;
        this.renderer = renderer;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Mouse click for object selection
        this.renderer.domElement.addEventListener('click', (event) => {
            this.onMouseClick(event);
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.onWindowResize();
        });
    }
    
    onMouseClick(event) {
        // Calculate mouse position in normalized device coordinates
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Calculate objects intersecting the picking ray
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        
        if (intersects.length > 0) {
            const object = intersects[0].object;
            this.handleObjectClick(object);
        }
    }
    
    handleObjectClick(object) {
        // Find if the clicked object is a planet, sun, or moon
        let planetName = null;
        let isSun = false;
        let isMoon = false;
        
        // Check if it's the sun
        if (object.name === "Sun") {
            isSun = true;
        } else if (object.name === "Moon") {
            isMoon = true;
        } else {
            // Check if it's a planet or planet's child (like rings)
            for (const [name, planet] of Object.entries(this.planets)) {
                if (planet.getMesh() === object || 
                    planet.getMesh().children.includes(object)) {
                    planetName = name;
                    break;
                }
            }
        }
        
        // Trigger appropriate action
        if (planetName) {
            this.onPlanetClick(planetName);
        } else if (isSun) {
            this.onSunClick();
        } else if (isMoon) {
            this.onMoonClick();
        }
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    // Set scene and planets for interaction handling
    setScene(scene, planets) {
        this.scene = scene;
        this.planets = planets;
    }
    
    // Callback functions (to be set by main application)
    onPlanetClick(planetName) {
        // Override this in main application
    }
    
    onSunClick() {
        // Override this in main application
    }
    
    onMoonClick() {
        // Override this in main application
    }
} 
