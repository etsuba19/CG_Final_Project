// Star field utility for creating the background stars
export class StarField {
    constructor() {
        this.stars = null;
        this.create();
    }
    
    create() {
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({ 
            color: 0xFFFFFF, 
            size: 0.5,
            transparent: true,
            opacity: 0.8
        });
        
        const starsVertices = [];
        const starsColors = [];
        
        // Generate 10,000 stars with random positions and colors
        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starsVertices.push(x, y, z);
            
            // Add some color variation to stars
            const color = new THREE.Color();
            color.setHSL(Math.random() * 0.1 + 0.9, 0.1, Math.random() * 0.3 + 0.7);
            starsColors.push(color.r, color.g, color.b);
        }
        
        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        starsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starsColors, 3));
        
        this.stars = new THREE.Points(starsGeometry, starsMaterial);
    }
    
    // Get stars mesh for adding to scene
    getMesh() {
        return this.stars;
    }
    
    // Animate stars (optional twinkling effect)
    animate(time) {
        if (this.stars) {
            this.stars.rotation.y = time * 0.0001;
        }
    }
} 
