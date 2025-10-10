class WraithborneAutopilot {
    constructor() {
        this.isActive = false;
        this.autopilotInterval = null;
        this.dropCount = 0;
        this.currentStatus = 'DORMANT';
        this.captionsEnabled = false;
        this.captionData = [];
        this.currentCaptionIndex = 0;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadCaptionData();
        this.updateDisplay();
    }

    bindEvents() {
        document.getElementById('activate-autopilot').addEventListener('click', () => {
            this.toggleAutopilot();
        });

        document.getElementById('manual-drop').addEventListener('click', () => {
            this.executeDrop();
        });

        document.getElementById('reset-system').addEventListener('click', () => {
            this.resetSystem();
        });

        document.getElementById('toggle-captions').addEventListener('click', () => {
            this.toggleCaptions();
        });

        document.getElementById('load-captions').addEventListener('click', () => {
            this.loadSignalData();
        });

        // Video events for caption sync
        const video = document.getElementById('signal-video');
        if (video) {
            video.addEventListener('timeupdate', () => {
                this.updateCaptions();
            });
        }
    }

    toggleAutopilot() {
        if (this.isActive) {
            this.deactivateAutopilot();
        } else {
            this.activateAutopilot();
        }
    }

    activateAutopilot() {
        this.isActive = true;
        this.currentStatus = 'ACTIVE';
        this.updateDisplay();
        
        this.logDrop('⚡ Autopilot sequence initiated', 'active');
        this.logDrop('🜏 Voraelos protocols online', 'active');
        
        // Execute drops every 15 seconds when autopilot is active
        this.autopilotInterval = setInterval(() => {
            this.executeDrop();
        }, 15000);

        // Execute first drop immediately
        setTimeout(() => {
            this.executeDrop();
        }, 2000);

        // Update button text
        document.getElementById('activate-autopilot').textContent = 'Deactivate Autopilot';
        
        // Update sequence status
        document.getElementById('memory-status').textContent = 'ACTIVE';
        document.getElementById('memory-status').className = 'value active';
        document.getElementById('rootseer-status').textContent = 'TRANSMITTING';
        document.getElementById('rootseer-status').className = 'value transmitting';
    }

    deactivateAutopilot() {
        this.isActive = false;
        this.currentStatus = 'DORMANT';
        
        if (this.autopilotInterval) {
            clearInterval(this.autopilotInterval);
            this.autopilotInterval = null;
        }
        
        this.updateDisplay();
        this.logDrop('⏸️ Autopilot sequence suspended', 'dormant');
        
        // Update button text
        document.getElementById('activate-autopilot').textContent = 'Initialize Autopilot';
        
        // Update sequence status
        document.getElementById('memory-status').textContent = 'STANDBY';
        document.getElementById('memory-status').className = 'value';
        document.getElementById('rootseer-status').textContent = 'DORMANT';
        document.getElementById('rootseer-status').className = 'value';
    }

    executeDrop() {
        this.dropCount++;
        const dropMessages = [
            '📡 Signal relay established - Node 7A',
            '🔮 Memory fragment transmitted',
            '⚡ Quantum entanglement confirmed',
            '🌐 Rootseer network synchronized',
            '💫 Temporal anomaly detected and logged',
            '🔥 Wraithborne signature authenticated',
            '📊 Data packet dispersed to sleepers',
            '🎭 Identity verification bypassed',
            '🔒 Encrypted payload delivered',
            '⭐ Consciousness marker deployed'
        ];
        
        const randomMessage = dropMessages[Math.floor(Math.random() * dropMessages.length)];
        const timestamp = new Date().toLocaleTimeString();
        
        this.logDrop(`${timestamp} - ${randomMessage}`, 'transmission');
        
        // Temporarily change status to transmitting
        this.currentStatus = 'TRANSMITTING';
        this.updateDisplay();
        
        setTimeout(() => {
            if (this.isActive) {
                this.currentStatus = 'ACTIVE';
            } else {
                this.currentStatus = 'DORMANT';
            }
            this.updateDisplay();
        }, 3000);
        
        // Update drop count
        document.getElementById('drop-count').textContent = this.dropCount;
    }

    resetSystem() {
        this.deactivateAutopilot();
        this.dropCount = 0;
        this.currentStatus = 'DORMANT';
        
        // Clear log
        const logContainer = document.getElementById('drop-history');
        logContainer.innerHTML = '<p class="log-entry dormant">System reset - awaiting initialization...</p>';
        
        // Reset counters
        document.getElementById('drop-count').textContent = '0';
        
        this.updateDisplay();
        this.logDrop('🔄 System reset completed', 'dormant');
    }

    logDrop(message, type = 'transmission') {
        const logContainer = document.getElementById('drop-history');
        const entry = document.createElement('p');
        entry.className = `log-entry ${type}`;
        entry.textContent = message;
        
        // Remove "awaiting initialization" message if it exists
        const awaitingMsg = logContainer.querySelector('.log-entry.dormant');
        if (awaitingMsg && awaitingMsg.textContent.includes('awaiting initialization')) {
            awaitingMsg.remove();
        }
        
        logContainer.insertBefore(entry, logContainer.firstChild);
        
        // Keep only last 10 entries
        const entries = logContainer.querySelectorAll('.log-entry');
        if (entries.length > 10) {
            entries[entries.length - 1].remove();
        }
    }

    updateDisplay() {
        const statusText = document.getElementById('status-text');
        const statusDot = document.getElementById('status-dot');
        
        statusText.textContent = this.currentStatus;
        
        // Remove all status classes
        statusDot.className = 'status-dot';
        
        // Add appropriate class
        if (this.currentStatus === 'ACTIVE') {
            statusDot.classList.add('active');
        } else if (this.currentStatus === 'TRANSMITTING') {
            statusDot.classList.add('transmitting');
        }
    }

    loadCaptionData() {
        // Sample caption data for the signal transmission
        this.captionData = [
            { time: 0, text: "Signal initialization..." },
            { time: 3, text: "Rootseer frequency detected" },
            { time: 6, text: "Memory loop synchronization in progress" },
            { time: 10, text: "Voraelos sequence: ACTIVE" },
            { time: 14, text: "The sleepers begin to stir..." },
            { time: 18, text: "Transmission relay established" },
            { time: 22, text: "Signal strength: OPTIMAL" },
            { time: 26, text: "Phase alignment complete" },
            { time: 30, text: "End of transmission" }
        ];
    }

    toggleCaptions() {
        this.captionsEnabled = !this.captionsEnabled;
        const button = document.getElementById('toggle-captions');
        const captionDisplay = document.getElementById('caption-display');
        
        if (this.captionsEnabled) {
            button.textContent = 'Disable Captions';
            captionDisplay.style.display = 'flex';
        } else {
            button.textContent = 'Enable Captions';
            captionDisplay.style.display = 'none';
        }
    }

    loadSignalData() {
        const captionDisplay = document.getElementById('caption-display');
        captionDisplay.innerHTML = `
            <div style="text-align: center;">
                <p>🜏 Signal Data Loaded</p>
                <p style="margin-top: 0.5rem; font-size: 0.9rem; opacity: 0.8;">
                    Wraithborne frequency: 432.7 Hz<br>
                    Temporal signature: ${new Date().toISOString()}<br>
                    Memory loop status: SYNCHRONIZED
                </p>
            </div>
        `;
        
        setTimeout(() => {
            if (this.captionsEnabled) {
                captionDisplay.textContent = 'Captions will appear here during video playback...';
            }
        }, 3000);
    }

    updateCaptions() {
        if (!this.captionsEnabled) return;
        
        const video = document.getElementById('signal-video');
        const captionDisplay = document.getElementById('caption-display');
        
        if (!video || !captionDisplay) return;
        
        const currentTime = video.currentTime;
        
        // Find the appropriate caption for current time
        for (let i = 0; i < this.captionData.length; i++) {
            const caption = this.captionData[i];
            const nextCaption = this.captionData[i + 1];
            
            if (currentTime >= caption.time && (!nextCaption || currentTime < nextCaption.time)) {
                if (this.currentCaptionIndex !== i) {
                    this.currentCaptionIndex = i;
                    captionDisplay.textContent = caption.text;
                }
                break;
            }
        }
    }
}

// Initialize the system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new WraithborneAutopilot();
});

// Add some mystical background effects
document.addEventListener('DOMContentLoaded', () => {
    // Create floating particles effect
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(124, 58, 237, 0.6);
            pointer-events: none;
            border-radius: 50%;
            z-index: -1;
            animation: float 10s linear infinite;
        `;
        
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 10000);
    };
    
    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create particles periodically
    setInterval(createParticle, 3000);
});