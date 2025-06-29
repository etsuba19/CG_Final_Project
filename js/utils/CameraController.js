// Camera controller for smooth navigation and animations
export class CameraController {
    constructor(camera, renderer) {
        this.camera = camera;
        this.renderer = renderer;
        this.controls = null;
        this.init();
    }
    
    init() {
        // Setup OrbitControls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxDistance = 800;
        this.controls.minDistance = 20;
    }
    
    // Smooth camera animation to target position
    animateTo(targetPosition, lookAtPosition, duration = 2000) {
        const startPosition = this.camera.position.clone();
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth movement
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            this.camera.position.lerpVectors(startPosition, targetPosition, easeProgress);
            this.controls.target.lerpVectors(this.controls.target, lookAtPosition, easeProgress);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    // Focus camera on a specific object
    focusOnObject(object, distance = 10) {
        const targetPosition = new THREE.Vector3(
            object.position.x,
            object.position.y + 5,
            object.position.z + distance
        );
        
        this.animateTo(targetPosition, object.position);
    }
    
    // Reset camera to default position
    reset() {
        this.camera.position.set(0, 50, 100);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }
    
    // Handle keyboard camera movement
    handleKeyboard(event) {
        const speed = 5;
        switch(event.key) {
            case 'ArrowUp':
                this.camera.position.y += speed;
                break;
            case 'ArrowDown':
                this.camera.position.y -= speed;
                break;
            case 'ArrowLeft':
                this.camera.position.x -= speed;
                break;
            case 'ArrowRight':
                this.camera.position.x += speed;
                break;
        }
    }
    
    // Update controls (called in animation loop)
    update() {
        this.controls.update();
    }
    
    // Handle window resize
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
} 
