class NavigatorData {
    getActiveVRDisplays() {
        return navigator.activeVRDisplays || null;
    }

    getBluetooth() {
        return navigator.bluetooth;
    }

    getBuildID() {
        return navigator.buildID;
    }

    getClipboard() {
        return navigator.clipboard;
    }

    getConnection() {
        return {
            connection: navigator.connection,
            mozConnection: navigator.mozConnection,
            webkitConnection: navigator.webkitConnection,
        };
    }

    getContacts() {
        return navigator.contacts;
    }

    getCookieEnabled() {
        return navigator.cookieEnabled;
    }

    getCredentials() {
        return navigator.credentials;
    }

    getDeviceMemory() {
        return navigator.deviceMemory;
    }

    getGeolocation() {
        return navigator.geolocation;
    }

    getGlobalPrivacyControl() {
        return navigator.globalPrivacyControl;
    }

    getGPU() {
        return navigator.gpu;
    }

    getHardwareConcurrency() {
        return navigator.hardwareConcurrency;
    }

    getHID() {
        return navigator.hid;
    }

    getInk() {
        return navigator.ink;
    }

    getKeyboard() {
        return navigator.keyboard;
    }

    getLanguage() {
        return navigator.language;
    }

    getLanguages() {
        return navigator.languages.join(',');
    }

    getLocks() {
        return navigator.locks;
    }

    getLogin() {
        return navigator.login;
    }

    getMaxTouchPoints() {
        return navigator.maxTouchPoints;
    }

    getMediaCapabilities() {
        return navigator.mediaCapabilities;
    }

    getMediaDevices() {
        return navigator.mediaDevices;
    }

    getMediaSession() {
        return navigator.mediaSession;
    }

    getOnLine() {
        return navigator.onLine;
    }

    getPdfViewerEnabled() {
        return navigator.pdfViewerEnabled;
    }

    getPermissions() {
        return navigator.permissions;
    }

    getPresentation() {
        return navigator.presentation;
    }

    getScheduling() {
        return navigator.scheduling;
    }

    getSerial() {
        return navigator.serial;
    }

    getServiceWorker() {
        return navigator.serviceWorker;
    }

    getStorage() {
        return navigator.storage;
    }

    getUSB() {
        return navigator.usb;
    }

    getUserActivation() {
        return navigator.userActivation;
    }

    getUserAgent() {
        return navigator.userAgent;
    }

    getUserAgentData() {
        return navigator.userAgentData;
    }

    getVirtualKeyboard() {
        return navigator.virtualKeyboard;
    }

    getWakeLock() {
        return navigator.wakeLock;
    }

    getWebDriver() {
        return navigator.webdriver;
    }

    getWindowControlsOverlay() {
        return navigator.windowControlsOverlay;
    }
    
    getCpuClasses() {
        return navigator.cpuClass;
    }

    getDoNotTrack() {
        return navigator.doNotTrack;
    }

    getMsDoNotTrack() {
        return navigator.msDoNotTrack;
    }

    getXR() {
        return navigator.xr;
    }

    canShare() {
        return navigator.canShare ? navigator.canShare() : false;
    }

    clearAppBadge() {
        return navigator.clearAppBadge ? navigator.clearAppBadge() : undefined;
    }

    deprecatedReplaceInURN() {
        return navigator.replaceInURN ? navigator.replaceInURN() : undefined;
    }

    getAutoplayPolicy() {
        return navigator.getAutoplayPolicy ? navigator.getAutoplayPolicy() : undefined;
    }

    async getBattery() {
        if (!navigator.getBattery) return navigator.getBattery;

        const battery = await navigator.getBattery();

        return {
            charging: battery.charging,
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime,
            level: battery.level
        };
    }

    getGamepads() {
        return navigator.getGamepads ? navigator.getGamepads() : [];
    }

    getInstalledRelatedApps() {
        return navigator.getInstalledRelatedApps ? navigator.getInstalledRelatedApps() : undefined;
    }

    registerProtocolHandler() {
        return navigator.registerProtocolHandler;
    }

    requestMediaKeySystemAccess() {
        return navigator.requestMediaKeySystemAccess;
    }

    requestMIDIAccess() {
        return navigator.requestMIDIAccess;
    }

    sendBeacon() {
        return navigator.sendBeacon;
    }

    setAppBadge() {
        return navigator.setAppBadge;
    }

    share() {
        return navigator.share;
    }

    unregisterProtocolHandler() {
        return navigator.unregisterProtocolHandler;
    }

    vibrate() {
        return navigator.vibrate;
    }

    getNavigatorData() {
        return {
            activeVRDisplays: this.getActiveVRDisplays(),
            bluetooth: this.getBluetooth(),
            buildID: this.getBuildID(),
            clipboard: this.getClipboard(),
            connection: this.getConnection(),
            contacts: this.getContacts(),
            cookieEnabled: this.getCookieEnabled(),
            credentials: this.getCredentials(),
            deviceMemory: this.getDeviceMemory(),
            geolocation: this.getGeolocation(),
            globalPrivacyControl: this.getGlobalPrivacyControl(),
            gpu: this.getGPU(),
            hardwareConcurrency: this.getHardwareConcurrency(),
            hid: this.getHID(),
            ink: this.getInk(),
            keyboard: this.getKeyboard(),
            language: this.getLanguage(),
            languages: this.getLanguages(),
            locks: this.getLocks(),
            login: this.getLogin(),
            maxTouchPoints: this.getMaxTouchPoints(),
            mediaCapabilities: this.getMediaCapabilities(),
            mediaDevices: this.getMediaDevices(),
            mediaSession: this.getMediaSession(),
            onLine: this.getOnLine(),
            pdfViewerEnabled: this.getPdfViewerEnabled(),
            permissions: this.getPermissions(),
            presentation: this.getPresentation(),
            scheduling: this.getScheduling(),
            serial: this.getSerial(),
            serviceWorker: this.getServiceWorker(),
            storage: this.getStorage(),
            usb: this.getUSB(),
            userActivation: this.getUserActivation(),
            userAgent: this.getUserAgent(),
            userAgentData: this.getUserAgentData(),
            virtualKeyboard: this.getVirtualKeyboard(),
            wakeLock: this.getWakeLock(),
            webdriver: this.getWebDriver(),
            windowControlsOverlay: this.getWindowControlsOverlay(),
            xr: this.getXR(),
            canShare: this.canShare(),
            clearAppBadge: this.clearAppBadge(),
            deprecatedReplaceInURN: this.deprecatedReplaceInURN(),
            getAutoplayPolicy: this.getAutoplayPolicy(),
            battery: this.getBattery(),
            gamepads: this.getGamepads(),
            installedRelatedApps: this.getInstalledRelatedApps(),
            protocolHandler: this.registerProtocolHandler(),
            mediaKeySystemAccess: this.requestMediaKeySystemAccess(),
            midiAccess: this.requestMIDIAccess(),
            sendBeacon: this.sendBeacon(),
            setAppBadge: this.setAppBadge(),
            share: this.share(),
            unregisterProtocolHandler: this.unregisterProtocolHandler(),
            vibrate: this.vibrate(),
            cpuClasses: this.getCpuClasses()

            //canvas
            //webgl
            //audio
            //fonts
        };
    }
}

class BrowserFingerprint {
    getScreenSize() {
        return `${screen.width},${screen.height}`;
    }

    getAvailSize() {
        return `${screen.availWidth},${screen.availHeight}`;
    }

    getColorDepth() { // device
        return screen.colorDepth;
    }

    getPixelRatio() {
        return window.devicePixelRatio;
    }

    getMathTan() {
        return Math.tan(1);
    }

    getDateFormat() {
        return new Date(0).toLocaleString();
    }

    isLocalStorageSupported() {
        return typeof(Storage) !== "undefined";
    }

    isSessionStorageSupported() {
        return typeof(window.sessionStorage) !== "undefined";
    }

    isUserDataSupported() {
        return typeof(document.documentElement.addBehavior) === 'function';
    }

    isIndexedDBSupported() {
        return !!window.indexedDB;
    }

    isAdBlockEnabled() {
        const adElement = document.createElement('div');
        adElement.className = 'ad-banner';
        adElement.style.display = 'none';
        document.body.appendChild(adElement);
        
        const isBlocked = window.getComputedStyle(adElement).display === 'none';
        document.body.removeChild(adElement);
        return isBlocked;
    }

    generate() {
        const navigatorData = new NavigatorData().getNavigatorData();

        const fingerprintData = {
            screenSize: this.getScreenSize(),
            availSize: this.getAvailSize(),
            colorDepth: this.getColorDepth(),
            pixelRatio: this.getPixelRatio(),
            mathtan: this.getMathTan(),
            dateFormat: this.getDateFormat(),
            localStorageSupported: this.isLocalStorageSupported(),
            sessionStorageSupported: this.isSessionStorageSupported(),
            userData: this.isUserDataSupported(),
            indexedDBSupported: this.isIndexedDBSupported(),
            isAdBlockEnabled: this.isAdBlockEnabled(),
            ...navigatorData,
        };

        function wrapValuesWithGetData(data) {
            const wrappedData = {};
            Object.keys(data).forEach(key => {
                wrappedData[key] = getData(data[key]);
            });
            return wrappedData;
        }

        console.log(wrapValuesWithGetData(fingerprintData));
        
        
        console.log(JSON.stringify(fingerprintData))

        return fingerprintData;
    }
}

function getData(variable) {
    if (variable && typeof variable === 'object' && !Array.isArray(variable)) {
        debugger;
        console.log(JSON.stringify(variable))
        return JSON.stringify(variable);
    }
    return variable;
}