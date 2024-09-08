class KeystrokeDynamics {
    constructor() {
        this.keystrokeData = [];

        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleKeyup = this.handleKeyup.bind(this);

        document.addEventListener('keydown', this.handleKeydown);
        document.addEventListener('keyup', this.handleKeyup);
    }

    handleKeydown(event) {
        console.log('Keydown', event);
        const keyDownTime = Date.now();

        this.logEvent({
            key: event.key,
            time: keyDownTime,
            eventType: 'keydown',
        });

        const previousKeyUpTime = findLastKeyUpEvent(this.keystrokeData);

        if (previousKeyUpTime) {
            const releasePressTime = keyDownTime - previousKeyUpTime;
            
            this.logEvent({
                key: event.key,
                time: releasePressTime,
                eventType: 'keyReleasePress',
            });
        }
    }

    handleKeyup(event) {
        console.log('Keyup', event);

        const keyUpTime = Date.now();

        const lastKeyDownEvent = this.keystrokeData.find(elemEvent => elemEvent.key === event.key && e.eventType === 'keydown');
        const holdTime = lastKeyDownEvent ? keyUpTime - lastKeyDownEvent.keyDownTime : 0;
        const previousKeyUpTime = findLastKeyUpEvent(this.keystrokeData);
    
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

        if (previousKeyUpTime) {
            const releaseTime = keyUpTime - previousKeyUpTime;
            
            this.logEvent({
                key: event.key,
                time: releaseTime,
                eventType: 'keyReleaseRealese',
            });
        }
    }

    logEvent(data) {
        this.keystrokeData.push(data);
    }

    destroy() {
        document.removeEventListener('click', this.handleClick);
        console.log('Event listener removed');
    }

    getDataJSON() {
        return JSON.stringify(this.keystrokeData);
    }
}


function findLastKeyUpEvent(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i].eventType === 'keyup') {
            return array[i];
        }
    }
    return undefined;
}

window.keystrokeDynamics = new KeystrokeDynamics();
