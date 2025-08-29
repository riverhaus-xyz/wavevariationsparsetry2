// WaveVariationSparse - Converted from React
document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('ribbonCanvas');
    if (!canvas) return;
    
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 550;
    canvas.height = 550;
    
    var WaveVariationSparse = function() {
                this.segments = [];
                this.segmentCount = 30;
                this.width = 100;
                this.initialize();
            };
            
            WaveVariationSparse.prototype.initialize = function() {
                for (let i = 0; i < this.segmentCount; i++) {
                    this.segments.push({
                        x: 0,
                        y: 0,
                        angle: 0,
                        width: this.width,
                        height: 20,
                        depth: 0
                    });
                }
            };
            
            WaveVariationSparse.prototype.update = function(time) {
                const centerX = 550 / 2;
                const centerY = 550 / 2;
                
                for (let i = 0; i < this.segments.length; i++) {
                    const t = i / (this.segments.length - 1);
                    const segment = this.segments[i];
                    
                    const smoothTime = time * 0.25;
                    const baseAngle = t * Math.PI * 6 + smoothTime;
                    const foldPhase = Math.sin(smoothTime * 0.01 + t * Math.PI * 4);
                    const heightPhase = Math.cos(smoothTime * 0.00375 + t * Math.PI * 3);
                    
                    const radius = 120 + foldPhase * 60;
                    segment.x = centerX + Math.cos(baseAngle) * radius;
                    segment.y = centerY + Math.sin(baseAngle) * radius + heightPhase * 30;
                    
                    segment.angle = baseAngle + foldPhase * Math.PI * 0.5;
                    segment.width = this.width * (1 + foldPhase * 0.3);
                    segment.depth = Math.sin(baseAngle + time * 0.15);
                }
            };
            
            WaveVariationSparse.prototype.draw = function(ctx) {
                // Implementation would go here
            };
    
    // Animation loop
    var ribbon = new WaveVariationSparse();
    var time = 0;
    var animationFrameId;
    
    function animate() {
        ctx.fillStyle = '#F0EEE6';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        time += 0.00125;
        ribbon.update(time);
        ribbon.draw(ctx);
        
        animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', function() {
        cancelAnimationFrame(animationFrameId);
    });
});