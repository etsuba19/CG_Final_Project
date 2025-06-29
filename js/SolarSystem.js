import { PLANET_DATA } from './config/PlanetData.js';
import { CameraController } from './utils/CameraController.js';
import { InteractionHandler } from './utils/InteractionHandler.js';
import { StarField } from './utils/StarField.js';
import { InfoPanel } from './ui/InfoPanel.js';
import { Sun } from './objects/Sun.js';
import { Planet } from './objects/Planet.js';
import { MOON_DATA } from './config/PlanetData.js';

// Main Solar System application class
export class SolarSystem {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        
        this.cameraController = null;
        this.interactionHandler = null;
        this.infoPanel = null;
        
        this.sun = null;
        this.planets = {};
        this.starField = null;
        
        this.simulationSpeed = 2;
        this.showOrbits = true;
        this.clock = new THREE.Clock();
        
        this.init();
        this.setupCallbacks();
        this.animate();
    }
    
    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupControllers();
        this.createSolarSystem();
        this.hideLoading();
    }
    
    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000011);
    }
    
    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 50, 100);
    }
    
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.getElementById('container').appendChild(this.renderer.domElement);
    }
    
    setupControllers() {
        this.cameraController = new CameraController(this.camera, this.renderer);
        this.interactionHandler = new InteractionHandler(this.camera, this.renderer);
        this.infoPanel = new InfoPanel();
    }
    
    createSolarSystem() {
        // Create star field
        this.starField = new StarField();
        this.scene.add(this.starField.getMesh());
        
        // Create sun
        this.sun = new Sun();
        this.scene.add(this.sun.getMesh());
        
        // Add sun lighting
        const lights = this.sun.getLights();
        lights.forEach(light => this.scene.add(light));
        
        // Create planets
        Object.keys(PLANET_DATA).forEach(planetName => {
            const planet = new Planet(planetName, PLANET_DATA[planetName]);
            this.planets[planetName] = planet;
            
            this.scene.add(planet.getMesh());
            this.scene.add(planet.getOrbit());
        });
        
        // Set scene for interaction handler
        this.interactionHandler.setScene(this.scene, this.planets);
    }
    
    setupCallbacks() {
        // Info panel callbacks
        this.infoPanel.onSpeedChange = (speed) => {
            this.simulationSpeed = speed;
        };
        
        this.infoPanel.onResetCamera = () => {
            this.cameraController.reset();
        };
        
        this.infoPanel.onToggleOrbits = () => {
            this.toggleOrbits();
        };
        
        // Interaction handler callbacks
        this.interactionHandler.onPlanetClick = (planetName) => {
            this.focusOnPlanet(planetName);
            this.showPlanetInfo(planetName);
        };
        
        this.interactionHandler.onSunClick = () => {
            this.focusOnSun();
            this.showSunInfo();
        };
        
        this.interactionHandler.onMoonClick = () => {
            this.focusOnMoon();
            this.showMoonInfo();
        };
        
        // Camera controller keyboard handling
        document.addEventListener('keydown', (event) => {
            this.cameraController.handleKeyboard(event);
        });
    }
    
    focusOnPlanet(planetName) {
        const planet = this.planets[planetName];
        const distance = planet.getData().distance + planet.getData().size + 10;
        this.cameraController.focusOnObject(planet.getMesh(), distance);
    }
    
    focusOnSun() {
        const targetPosition = new THREE.Vector3(0, 20, 30);
        this.cameraController.animateTo(targetPosition, new THREE.Vector3(0, 0, 0));
    }
    
    focusOnMoon() {
        const earth = this.planets['earth'];
        const moon = earth.mesh.children.find(child => child.name === "Moon");
        if (moon) {
            this.cameraController.focusOnObject(moon, 8);
        }
    }
    
    showPlanetInfo(planetName) {
        const planetData = this.planets[planetName].getData();
        this.infoPanel.showPlanetInfo(planetData);
    }
    
    showSunInfo() {
        const sunData = this.sun.getData();
        this.infoPanel.showSunInfo(sunData);
    }
    
    showMoonInfo() {
        this.infoPanel.planetNameElement.textContent = MOON_DATA.name;
        this.infoPanel.planetDetailsElement.innerHTML = `
            <strong>Type:</strong> Natural Satellite<br>
            <strong>Fact 1:</strong> ${MOON_DATA.fact1}<br>
            <strong>Fact 2:</strong> ${MOON_DATA.fact2}<br>
            <strong>Fact 3:</strong> ${MOON_DATA.fact3}
        `;
    }
    
    toggleOrbits() {
        this.showOrbits = !this.showOrbits;
        Object.values(this.planets).forEach(planet => {
            planet.setOrbitVisible(this.showOrbits);
        });
    }
    
    updatePlanets(deltaTime) {
        Object.values(this.planets).forEach(planet => {
            planet.update(deltaTime, this.simulationSpeed);
        });
    }
    
    hideLoading() {
        this.infoPanel.hideLoading();
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const deltaTime = this.clock.getDelta();
        const time = this.clock.getElapsedTime();
        
        this.updatePlanets(deltaTime);
        this.cameraController.update();
        this.starField.animate(time);
        
        this.renderer.render(this.scene, this.camera);
    }
} 