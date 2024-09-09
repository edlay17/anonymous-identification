class KeystrokeDynamics {
    constructor() {
        this.keystrokeData = [];
        this.lastKeyup = null;
        this.totalExecutionTime = 0;

        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleKeyup = this.handleKeyup.bind(this);

        document.addEventListener('keydown', this.handleKeydown);
        document.addEventListener('keyup', this.handleKeyup);
    }

    handleKeydown(event) {
        performance.mark('start-keydown');

        const keyDownTime = Date.now();

        this.logEvent({
            key: event.key,
            time: keyDownTime,
            eventType: 'keydown',
        });

        if (this.lastKeyup) {
            const releasePressTime = keyDownTime - this.lastKeyup.time;
            
            this.logEvent({
                key: event.key,
                prevKey: this.lastKeyup.key,
                time: releasePressTime,
                eventType: 'keyReleasePress',
            });
        }

        performance.mark('end-keydown');

        performance.measure('handleKeydown', 'start-keydown', 'end-keydown');

        const measure = performance.getEntriesByName('handleKeydown').pop();
        this.totalExecutionTime += measure.duration;

        performance.clearMarks();
        performance.clearMeasures();
    }

    handleKeyup(event) {
        performance.mark('start-keyup');

        const keyUpTime = Date.now();

        const lastKeyDownEvent = this.keystrokeData.find(elemEvent => elemEvent.key === event.key && elemEvent.eventType === 'keydown');
        const holdTime = lastKeyDownEvent ? keyUpTime - lastKeyDownEvent.time : 0;
    
        this.logEvent({
            key: event.key,
            time: keyUpTime,
            eventType: 'keyup',
        });

        if (holdTime) {
            this.logEvent({
                key: event.key,
                time: holdTime,
                eventType: 'keyhold',
            });
        }

        if (this.lastKeyup) {
            const releaseTime = keyUpTime - this.lastKeyup.time;
            
            this.logEvent({
                key: event.key,
                prevKey: this.lastKeyup.key,
                time: releaseTime,
                eventType: 'keyReleaseRelease',
            });
        }

        this.lastKeyup = {
            key: event.key,
            time: keyUpTime,
            eventType: 'keyup',
        }

        performance.mark('end-keyup');

        performance.measure('handleKeyup', 'start-keyup', 'end-keyup');

        const measure = performance.getEntriesByName('handleKeyup').pop();
        this.totalExecutionTime += measure.duration;

        performance.clearMarks();
        performance.clearMeasures();
    }

    logEvent(data) {
        this.keystrokeData.push(data);
    }

    destroy() {
        document.removeEventListener('keydown', this.handleClick);
        document.removeEventListener('clikeyupck', this.handleClick);
    }

    getDataJSON() {
        return JSON.stringify(this.keystrokeData);
    }
}

window.keystrokeDynamics = new KeystrokeDynamics();
