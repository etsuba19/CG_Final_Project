import { MOON_DATA } from '../config/PlanetData.js';

// Planet class for creating and managing individual planets
export class Planet {
    constructor(name, data) {
        this.name = name;
        this.data = data;
        this.mesh = null;
        this.orbit = null;
        this.moon = null;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationAngle = 0;
        
        this.create();
    }
    
    create() {
        // Create planet geometry and material
        const planetGeometry = new THREE.SphereGeometry(this.data.size, 32, 32);
        const planetMaterial = new THREE.MeshLambertMaterial({ 
            color: this.data.color,
            emissive: new THREE.Color(this.data.color).multiplyScalar(0.3)
        });
        
        this.mesh = new THREE.Mesh(planetGeometry, planetMaterial);
        this.mesh.name = this.name;
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        
        // Position planet on its orbit
        this.mesh.position.x = this.data.distance;
        
        // Create orbit ring
        this.createOrbit();
        
        // Add special features
        this.addSpecialFeatures();
    }
    
    createOrbit() {
        const orbitGeometry = new THREE.RingGeometry(this.data.distance - 0.1, this.data.distance + 0.1, 64);
        const orbitMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xAAAAAA, 
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
        });
        
        this.orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        this.orbit.rotation.x = Math.PI / 2;
        this.orbit.name = `${this.name}_orbit`;
    }
    
    addSpecialFeatures() {
        // Add Saturn's rings
        if (this.name === 'saturn') {
            this.addRings();
        }
        
        // Add Earth's moon
        if (this.name === 'earth') {
            this.addMoon();
        }
    }
    
    addRings() {
        const ringGeometry = new THREE.RingGeometry(
            this.mesh.geometry.parameters.radius + 1, 
            this.mesh.geometry.parameters.radius + 3, 
            64
        );
        const ringMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xD4AF37,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
        });
        const rings = new THREE.Mesh(ringGeometry, ringMaterial);
        rings.rotation.x = Math.PI / 2;
        this.mesh.add(rings);
    }
    
    addMoon() {
        const moonGeometry = new THREE.SphereGeometry(MOON_DATA.size, 32, 32);
        const moonMaterial = new THREE.MeshLambertMaterial({ 
            color: MOON_DATA.color,
            emissive: new THREE.Color(MOON_DATA.color).multiplyScalar(0.2)
        });
        
        this.moon = new THREE.Mesh(moonGeometry, moonMaterial);
        this.moon.position.set(MOON_DATA.distance, 0, 0);
        this.moon.castShadow = true;
        this.moon.name = "Moon";
        
        this.mesh.add(this.moon);
    }
    
    // Update planet position and rotation
    update(deltaTime, simulationSpeed) {
        const timeScale = deltaTime * simulationSpeed * 0.1;
        
        // Update orbital position
        this.angle += timeScale / this.data.period;
        this.mesh.position.x = Math.cos(this.angle) * this.data.distance;
        this.mesh.position.z = Math.sin(this.angle) * this.data.distance;
        
        // Update rotation
        this.rotationAngle += timeScale / Math.abs(this.data.rotation);
        this.mesh.rotation.y = this.rotationAngle;
        
        // Update moon if exists
        if (this.moon) {
            this.updateMoon(timeScale);
        }
    }
    
    updateMoon(timeScale) {
        // Simple moon orbit around Earth
        const moonAngle = timeScale / MOON_DATA.period;
        this.moon.position.x = Math.cos(moonAngle) * MOON_DATA.distance;
        this.moon.position.z = Math.sin(moonAngle) * MOON_DATA.distance;
    }
    
    // Get planet mesh
    getMesh() {
        return this.mesh;
    }
    
    // Get orbit mesh
    getOrbit() {
        return this.orbit;
    }
    
    // Toggle orbit visibility
    setOrbitVisible(visible) {
        if (this.orbit) {
            this.orbit.visible = visible;
        }
    }
    
    // Get planet data for UI
    getData() {
        return this.data;
    }
} 