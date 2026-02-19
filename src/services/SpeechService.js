class SpeechService {
    constructor() {
        this.synthesis = window.speechSynthesis;
        this.currentUtterance = null;
        this.maxRetries = 3;
    }

    speak(text, onEndCallback = null) {
        // Cancel any ongoing speech
        this.stop();

        if (!text) return;

        // Create a new utterance
        const utterance = new SpeechSynthesisUtterance(text);

        // Configure settings
        utterance.lang = 'en-US';
        utterance.rate = 1;
        utterance.pitch = 1;

        // Store reference to current utterance
        this.currentUtterance = utterance;

        // Handle completion
        utterance.onend = () => {
            this.currentUtterance = null;
            if (onEndCallback) {
                onEndCallback();
            }
        };

        // Handle errors
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            this.currentUtterance = null;
        };

        // Speak
        this.synthesis.speak(utterance);
    }

    stop() {
        if (this.synthesis.speaking || this.synthesis.pending) {
            this.synthesis.cancel();
        }
        this.currentUtterance = null;
    }

    pause() {
        if (this.synthesis.speaking && !this.synthesis.paused) {
            this.synthesis.pause();
        }
    }

    resume() {
        if (this.synthesis.paused) {
            this.synthesis.resume();
        }
    }

    isActive() {
        return this.synthesis.speaking || this.synthesis.pending;
    }
}

// Create a singleton instance
const speechService = new SpeechService();

export default speechService;
