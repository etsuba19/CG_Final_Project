import { SUN_DATA } from '../config/PlanetData.js';

// Sun class for creating and managing the sun object
export class Sun {
    constructor() {
        this.mesh = null;
        this.light = null;
        this.create();
    }
    
    create() {
        // Create glowing sun geometry
        const sunGeometry = new THREE.SphereGeometry(SUN_DATA.size, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ 
            color: SUN_DATA.color,
            emissive: SUN_DATA.color,
            emissiveIntensity: 0.8
        });
        
        this.mesh = new THREE.Mesh(sunGeometry, sunMaterial);
        this.mesh.name = "Sun";
        
        // Add sun glow effect
        this.addGlowEffect();
        
        // Add lighting
        this.addLighting();
    }
    
    addGlowEffect() {
        const sunGlowGeometry = new THREE.SphereGeometry(SUN_DATA.size + 1, 32, 32);
        const sunGlowMaterial = new THREE.MeshBasicMaterial({
            color: SUN_DATA.color,
            transparent: true,
            opacity: 0.5
        });
        const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
        this.mesh.add(sunGlow);
    }
    
    addLighting() {
        // Add point light from sun
        this.light = new THREE.PointLight(0xFFFFFF, 3, 300);
        this.light.position.set(0, 0, 0);
        this.light.castShadow = true;
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
        
        return [this.light, ambientLight];
    }
    
    // Get sun mesh for adding to scene
    getMesh() {
        return this.mesh;
    }
    
    // Get lighting objects
    getLights() {
        return this.addLighting();
    }
    
    // Get sun data for UI display
    getData() {
        return SUN_DATA;
    }
} 