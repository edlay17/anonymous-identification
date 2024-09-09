performance.mark('start-fingerprint');

class NavigatorData {
    getActiveVRDisplays() {
        try {
            return navigator.activeVRDisplays || null;
        } catch (error) {
            console.error('Error in getActiveVRDisplays:', error);
            return error.message;
        }
    }

    async getBluetooth() {
        try {
            const bluetooth = navigator.bluetooth;
            
            if (bluetooth) {
                const isAvailable = await getAvailability();
                
                return isAvailable;
            }

            return false;
        } catch (error) {
            console.error('Error in getBluetooth:', error);
            return error.message;
        }
    }

    getBuildID() {
        try {
            return navigator.buildID;
        } catch (error) {
            console.error('Error in getBuildID:', error);
            return error.message;
        }
    }

    getClipboard() {
        try {
            return !!navigator.clipboard;
        } catch (error) {
            console.error('Error in getClipboard:', error);
            return error.message;
        }
    }

    getConnection() {
        try {
            const data = {
                connection: !!navigator.connection,
                mozConnection: !!navigator.mozConnection,
                webkitConnection: !!navigator.webkitConnection,
            };

            return JSON.stringify(data);
        } catch (error) {
            console.error('Error in getConnection:', error);
            return error.message;
        }
    }

    getContacts() {
        try {
            return navigator.contacts;
        } catch (error) {
            console.error('Error in getContacts:', error);
            return error.message;
        }
    }

    getCookieEnabled() {
        try {
            return navigator.cookieEnabled;
        } catch (error) {
            console.error('Error in getCookieEnabled:', error);
            return error.message;
        }
    }

    getCredentials() {
        try {
            return !!navigator.credentials;
        } catch (error) {
            console.error('Error in getCredentials:', error);
            return error.message;
        }
    }

    getDeviceMemory() {
        try {
            return navigator.deviceMemory;
        } catch (error) {
            console.error('Error in getDeviceMemory:', error);
            return error.message;
        }
    }

    async getGeolocation() {
        try {
            const result = navigator.permissions.query({ name: 'geolocation' })
                .then((permissionStatus) => {
                    if (permissionStatus.state === 'granted') {
                        const geo = navigator.geolocation;

                        if (!geo) return false;

                        return new Promise((resolve, reject) => {
                            navigator.geolocation.getCurrentPosition(
                                () => {
                                    resolve(true);
                                },
                                ({ code, message }) => {
                                    resolve(JSON.stringify({
                                        code,
                                        message,
                                    }));
                                }
                            );
                        });
                    }

                    return `Geolocation permission state: ${permissionStatus.state}`;
                });
            
            return result;
        } catch (error) {
            console.error('Error in getGeolocation:', error);
            return error.message;
        }
    }

    getGlobalPrivacyControl() {
        try {
            return navigator.globalPrivacyControl;
        } catch (error) {
            console.error('Error in getGlobalPrivacyControl:', error);
            return error.message;
        }
    }

    getGPU() {
        try {
            return navigator.gpu;
        } catch (error) {
            console.error('Error in getGPU:', error);
            return error.message;
        }
    }

    getHardwareConcurrency() {
        try {
            return navigator.hardwareConcurrency;
        } catch (error) {
            console.error('Error in getHardwareConcurrency:', error);
            return error.message;
        }
    }

    async getHID() {
        try {
            const hid = navigator.hid;

            if (!hid) return false;

            return navigator.hid.getDevices().then((devices) => {
                return JSON.stringify(devices);
            });
        } catch (error) {
            console.error('Error in getHID:', error);
            return error.message;
        }
    }

    getInk() {
        try {
            return !!navigator.ink;
        } catch (error) {
            console.error('Error in getInk:', error);
            return error.message;
        }
    }

    getKeyboard() {
        try {
            return !!navigator.keyboard;
        } catch (error) {
            console.error('Error in getKeyboard:', error);
            return error.message;
        }
    }

    getLanguage() {
        try {
            return navigator.language;
        } catch (error) {
            console.error('Error in getLanguage:', error);
            return error.message;
        }
    }

    getLanguages() {
        try {
            return navigator.languages.join(',');
        } catch (error) {
            console.error('Error in getLanguages:', error);
            return error.message;
        }
    }

    getLocks() {
        try {
            return !!navigator.locks;
        } catch (error) {
            console.error('Error in getLocks:', error);
            return error.message;
        }
    }

    getLogin() {
        try {
            return navigator.login;
        } catch (error) {
            console.error('Error in getLogin:', error);
            return error.message;
        }
    }

    getMaxTouchPoints() {
        try {
            return navigator.maxTouchPoints;
        } catch (error) {
            console.error('Error in getMaxTouchPoints:', error);
            return error.message;
        }
    }

    async getMediaDevices() {
        try {
            return navigator.mediaDevices.enumerateDevices()
                .then((data) => {
                    const result = data.map(({kind, label}) => {
                        return {
                            name: kind,
                            isAvailable: !!label,
                        }
                    })

                    const resultJSON = JSON.stringify(result);

                    return hashString(resultJSON);
                });
        } catch (error) {
            console.error('Error in getMediaDevices:', error);
            return error.message;
        }
    }

    getMediaSession() {
        try {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: 'track name',
                artist: 'author',
                album: 'albom',
                artwork: [
                { src: 'https://example.com/album-art.jpg', sizes: '512x512', type: 'image/jpeg' }
                ]
            });

            const mediaMetadata = navigator.mediaSession.metadata;

            const metadata = {
                title: mediaMetadata.title,
                artist: mediaMetadata.artist,
                album: mediaMetadata.album,
                artwork: mediaMetadata.artwork.map(img => ({
                    src: img.src,
                    sizes: img.sizes,
                    type: img.type
                }))
            };

              const actions = [
                'play',
                'pause',
                'previoustrack',
                'nexttrack',
                'seekbackward',
                'seekforward',
                'stop'
            ];

            function testAction(action) {
                try {
                    navigator.mediaSession.setActionHandler(action, () => {})

                    return {
                        action,
                        isAvailable: true,
                    }
                } catch (error) {
                    return {
                        action,
                        isAvailable: false,
                    }
                }
            }

            const supportedActions = actions.map(testAction);

            const result = {
                metadata,
                supportedActions,
            }

            const resultJSON = JSON.stringify(result);

            return resultJSON;
        } catch (error) {
            console.error('Error in getMediaSession:', error);
            return error.message;
        }
    }

    getOnLine() {
        try {
            return navigator.onLine;
        } catch (error) {
            console.error('Error in getOnLine:', error);
            return error.message;
        }
    }

    getPdfViewerEnabled() {
        try {
            return navigator.pdfViewerEnabled;
        } catch (error) {
            console.error('Error in getPdfViewerEnabled:', error);
            return error.message;
        }
    }

    async getPermissions() {
        try {
            const permissionsToCheck = [
                'geolocation',
                'notifications',
                'camera',
                'microphone',
                'midi',
                'clipboard-read',
                'clipboard-write',
                'push',
                'background-sync',
                'ambient-light-sensor',
                'accelerometer',
                'gyroscope',
                'magnetometer',
                'accessibility-events',
                'clipboard-read',
                'clipboard-write',
            ];

            const results = {};

            for (const permissionName of permissionsToCheck) {
                try {
                    const permissionStatus = await navigator.permissions.query({ name: permissionName });
                    results[permissionName] = permissionStatus.state;
                } catch (error) {
                    results[permissionName] = 'Permission not supported or query failed';
                }
            }

            return JSON.stringify(results);
        } catch (error) {
            console.error('Error in getPermissions:', error);
            return error.message;
        }
    }

    getPresentation() {
        try {
            return !!navigator.presentation;
        } catch (error) {
            console.error('Error in getPresentation:', error);
            return error.message;
        }
    }

    getScheduling() {
        try {
            return !!(navigator.scheduling && navigator.scheduling.isInputPending);
        } catch (error) {
            console.error('Error in getScheduling:', error);
            return error.message;
        }
    }

    async getSerial() {
        try {
            const ports = await navigator.serial.getPorts();
            return JSON.stringify(ports);
        } catch (error) {
            console.error('Error in getSerial:', error);
            return error.message;
        }
    }

    getServiceWorker() {
        try {
            return !!navigator.serviceWorker;
        } catch (error) {
            console.error('Error in getServiceWorker:', error);
            return error.message;
        }
    }

    async getStorage() {
        try {
            const isPersistent = await navigator.storage.persisted();

            return isPersistent ? 'persistent' : 'not persistent';
        } catch (error) {
            console.error('Error in getStorage:', error);
            return error.message;
        }
    }

    async getUSB() {
        try {
            const devices = await navigator.usb.getDevices();
            return JSON.stringify(devices);
        } catch (error) {
            console.error('Error in getUSB:', error);
            return error.message;
        }
    }

    getUserActivation() {
        try {
            return !!navigator.userActivation;
        } catch (error) {
            console.error('Error in getUserActivation:', error);
            return error.message;
        }
    }

    getUserAgent() {
        try {
            return navigator.userAgent;
        } catch (error) {
            console.error('Error in getUserAgent:', error);
            return error.message;
        }
    }

    getUserAgentData() {
        try {
            const {
                brands,
                isMobile,
                platform
            } = navigator.userAgentData;

            const result = {
                brands,
                isMobile,
                platform
            }

            return JSON.stringify(result);
        } catch (error) {
            console.error('Error in getUserAgentData:', error);
            return error.message;
        }
    }

    getVirtualKeyboard() {
        try {
            return !!navigator.virtualKeyboard;
        } catch (error) {
            console.error('Error in getVirtualKeyboard:', error);
            return error.message;
        }
    }

    getWakeLock() {
        try {
            return !!navigator.wakeLock.request;
        } catch (error) {
            console.error('Error in getWakeLock:', error);
            return error.message;
        }
    }

    getWebDriver() {
        try {
            return navigator.webdriver;
        } catch (error) {
            console.error('Error in getWebDriver:', error);
            return error.message;
        }
    }

    getWindowControlsOverlay() {
        try {
            return !!navigator.windowControlsOverlay;
        } catch (error) {
            console.error('Error in getWindowControlsOverlay:', error);
            return error.message;
        }
    }

    getCpuClasses() {
        try {
            return navigator.cpuClass;
        } catch (error) {
            console.error('Error in getCpuClasses:', error);
            return error.message;
        }
    }

    getDoNotTrack() {
        try {
            return navigator.doNotTrack;
        } catch (error) {
            console.error('Error in getDoNotTrack:', error);
            return error.message;
        }
    }

    getMsDoNotTrack() {
        try {
            return navigator.msDoNotTrack;
        } catch (error) {
            console.error('Error in getMsDoNotTrack:', error);
            return error.message;
        }
    }

    async getXR() {
        try {
            const availableSessions = await Promise.all([
                navigator.xr.isSessionSupported('immersive-vr'),
                navigator.xr.isSessionSupported('immersive-ar'),
                navigator.xr.isSessionSupported('inline'),
            ]) 

            const result = {
                vr: availableSessions[0],
                ar: availableSessions[1],
                inline: availableSessions[2],
            }

            return JSON.stringify(result);
        } catch (error) {
            console.error('Error in getXR:', error);
            return error.message;
        }
    }

    canShare() {
        try {
            return navigator.canShare ? navigator.canShare() : false;
        } catch (error) {
            console.error('Error in canShare:', error);
            return error.message;
        }
    }

    clearAppBadge() {
        try {
            return !!navigator.clearAppBadge;
        } catch (error) {
            console.error('Error in clearAppBadge:', error);
            return error.message;
        }
    }

    deprecatedReplaceInURN() {
        try {
            return navigator.replaceInURN ? navigator.replaceInURN() : undefined;
        } catch (error) {
            console.error('Error in deprecatedReplaceInURN:', error);
            return error.message;
        }
    }

    getAutoplayPolicy() {
        try {
            return navigator.getAutoplayPolicy ? navigator.getAutoplayPolicy() : undefined;
        } catch (error) {
            console.error('Error in getAutoplayPolicy:', error);
            return error.message;
        }
    }

    async getBattery() {
        try {
            if (!navigator.getBattery) return navigator.getBattery;

            const battery = await navigator.getBattery();

            return !!battery;
        } catch (error) {
            console.error('Error in getBattery:', error);
            return error.message;
        }
    }

    getGamepads() {
        try {
            return navigator.getGamepads ? JSON.stringify(navigator.getGamepads()) : [];
        } catch (error) {
            console.error('Error in getGamepads:', error);
            return error.message;
        }
    }

    async getInstalledRelatedApps() {
        try {
            if (!navigator.getInstalledRelatedApps) return false;

            return navigator.getInstalledRelatedApps().then(relatedApps => {
                return JSON.stringify(relatedApps);
            }).catch(error => {
                return(`Error getting installed related apps: ${error}`);
            });
        } catch (error) {
            console.error('Error in getInstalledRelatedApps:', error);
            return error.message;
        }
    }

    registerProtocolHandler() {
        try {
            return !!navigator.registerProtocolHandler;
        } catch (error) {
            console.error('Error in registerProtocolHandler:', error);
            return error.message;
        }
    }

    async requestMediaKeySystemAccess() {
        try {
            const keySystem = 'com.widevine.alpha'; // Widevine для Chrome и Android

            const config = [
            {
                initDataTypes: ['cenc', 'webm'], // Common Encryption и WebM
                audioCapabilities: [
                { contentType: 'audio/mp4; codecs="mp4a.40.2"' },  // AAC (Advanced Audio Codec)
                { contentType: 'audio/webm; codecs="opus"' }       // Opus (WebM формат)
                ],
                videoCapabilities: [
                { contentType: 'video/mp4; codecs="avc1.42E01E"' }, // H.264 (MP4)
                { contentType: 'video/mp4; codecs="hev1.1.6.L93.90"' }, // H.265/HEVC (MP4)
                { contentType: 'video/webm; codecs="vp8"' },        // VP8 (WebM)
                { contentType: 'video/webm; codecs="vp9"' },        // VP9 (WebM)
                { contentType: 'video/mp4; codecs="av01.0.04M.08"' } // AV1 (MP4)
                ]
            },
            {
                initDataTypes: ['cenc'],
                audioCapabilities: [
                { contentType: 'audio/mp4; codecs="ac-3"' },  // Dolby Digital (AC-3)
                { contentType: 'audio/mp4; codecs="ec-3"' }   // Dolby Digital Plus (E-AC-3)
                ],
                videoCapabilities: [
                { contentType: 'video/mp4; codecs="avc1.4D401E"' }, // H.264 Main Profile
                { contentType: 'video/mp4; codecs="hev1.1.6.L120.90"' }, // H.265/HEVC High Tier
                { contentType: 'video/mp4; codecs="av01.0.08M.10.0.110.01.01.01.0"' } // AV1 High Profile
                ]
            },
            {
                initDataTypes: ['keyids', 'mp4'], // Идентификаторы ключей и MP4
                audioCapabilities: [
                { contentType: 'audio/mp4; codecs="mp4a.40.5"' },  // AAC-LC
                { contentType: 'audio/mp4; codecs="ac-3"' },  // Dolby Digital (AC-3)
                { contentType: 'audio/mp4; codecs="ec-3"' }   // Dolby Digital Plus (E-AC-3)
                ],
                videoCapabilities: [
                { contentType: 'video/mp4; codecs="hvc1.1.6.L93.B0"' }, // H.265/HEVC (MP4)
                { contentType: 'video/mp4; codecs="vp09.00.10.08"' }, // VP9 Profile 0
                { contentType: 'video/mp4; codecs="av01.0.05M.10"' } // AV1 (MP4)
                ]
            },
            {
                initDataTypes: ['cenc'],
                audioCapabilities: [
                { contentType: 'audio/mp4; codecs="mp4a.40.2"' }, // AAC-LC
                { contentType: 'audio/mp4; codecs="mp4a.40.5"' }, // HE-AAC
                { contentType: 'audio/mp4; codecs="ac-3"' }, // Dolby Digital (AC-3)
                { contentType: 'audio/mp4; codecs="ec-3"' } // Dolby Digital Plus (E-AC-3)
                ],
                videoCapabilities: [
                { contentType: 'video/mp4; codecs="avc1.42E01E"' }, // H.264 Baseline Profile
                { contentType: 'video/mp4; codecs="avc1.4D401E"' }, // H.264 Main Profile
                { contentType: 'video/mp4; codecs="hev1.1.6.L93.B0"' }, // H.265/HEVC (Main Profile)
                { contentType: 'video/mp4; codecs="vp09.00.50.08"' }, // VP9 Profile 2
                { contentType: 'video/mp4; codecs="av01.0.05M.08"' } // AV1 Main Profile
                ]
            }
            ];

            return navigator.requestMediaKeySystemAccess(keySystem, config)
                .then(mediaKeySystemAccess => {
                    const configurations = mediaKeySystemAccess.getConfiguration();
                    const configurationsJSON = JSON.stringify(configurations);
                    return hashString(configurationsJSON);
                })
                .catch(error => {
                    return error.message;
                });
        } catch (error) {
            console.error('Error in requestMediaKeySystemAccess:', error);
            return error.message;
        }
    }

    async requestMIDIAccess() {
        try {
            return navigator.requestMIDIAccess().then(
                (midiAccess) => {
                    const result = {
                        accessGranted: true,
                        input: [],
                        output: [],
                    }

                    for (const input of midiAccess.inputs.values()) {
                        result.input.push(input.name);
                    }

                    for (const output of midiAccess.outputs.values()) {
                        result.input.push(output.name);
                    }

                    const resultJSON = JSON.stringify(result);
                    return hashString(resultJSON);
                },
                (error) => {
                    return error.message;
                }
            );
        } catch (error) {
            return error.message;
        }
    }

    sendBeacon() {
        try {
            const url = 'https://server.localhost/analytics';

            const data = JSON.stringify({
              event: 'pageUnload',
              timestamp: new Date().toISOString(),
            });
          
            const success = navigator.sendBeacon(url, data);
          
            if (success) {
              return 'Beacon sent successfully';
            } else {
              return 'Failed to send beacon';
            }
        } catch (error) {
            console.error('Error in sendBeacon:', error);
            return error.message;
        }
    }

    setAppBadge() {
        try {
            return !!navigator.setAppBadge;
        } catch (error) {
            console.error('Error in setAppBadge:', error);
            return error.message;
        }
    }

    share() {
        try {
            return navigator.share;
        } catch (error) {
            console.error('Error in share:', error);
            return error.message;
        }
    }

    unregisterProtocolHandler() {
        try {
            return !!navigator.unregisterProtocolHandler;
        } catch (error) {
            console.error('Error in unregisterProtocolHandler:', error);
            return error.message;
        }
    }

    vibrate() {
        try {
            return !!navigator.vibrate;
        } catch (error) {
            console.error('Error in vibrate:', error);
            return error.message;
        }
    }

    async getNavigatorData() {
        const data = await Promise.all([
            this.getBattery(),
            this.getBluetooth(),
            this.getGeolocation(),
            this.getHID(),
            this.getInstalledRelatedApps(),
            this.getMediaDevices(),
            this.requestMediaKeySystemAccess(),
            this.requestMIDIAccess(),
            this.getPermissions(),
            this.getSerial(),
            this.getStorage(),
            this.getUSB(),
            this.getXR(),
        ])

        return {
            activeVRDisplays: this.getActiveVRDisplays(),
            bluetooth: data[1],
            buildID: this.getBuildID(),
            clipboard: this.getClipboard(),
            connection: this.getConnection(),
            contacts: this.getContacts(),
            cookieEnabled: this.getCookieEnabled(),
            credentials: this.getCredentials(),
            deviceMemory: this.getDeviceMemory(),
            geolocation: data[2],
            globalPrivacyControl: this.getGlobalPrivacyControl(),
            gpu: this.getGPU(),
            hardwareConcurrency: this.getHardwareConcurrency(),
            hid: data[3],
            ink: this.getInk(),
            keyboard: this.getKeyboard(),
            language: this.getLanguage(),
            languages: this.getLanguages(),
            locks: this.getLocks(),
            login: this.getLogin(),
            maxTouchPoints: this.getMaxTouchPoints(),
            mediaDevices: data[5],
            mediaSession: this.getMediaSession(),
            onLine: this.getOnLine(),
            pdfViewerEnabled: this.getPdfViewerEnabled(),
            permissions: data[8],
            presentation: this.getPresentation(),
            scheduling: this.getScheduling(),
            serial: data[9],
            serviceWorker: this.getServiceWorker(),
            storage: data[10],
            usb: data[11],
            userActivation: this.getUserActivation(),
            userAgent: this.getUserAgent(),
            userAgentData: this.getUserAgentData(),
            virtualKeyboard: this.getVirtualKeyboard(),
            wakeLock: this.getWakeLock(),
            webdriver: this.getWebDriver(),
            windowControlsOverlay: this.getWindowControlsOverlay(),
            xr: data[12],
            canShare: this.canShare(),
            clearAppBadge: this.clearAppBadge(),
            deprecatedReplaceInURN: this.deprecatedReplaceInURN(),
            getAutoplayPolicy: this.getAutoplayPolicy(),
            battery: data[0],
            gamepads: this.getGamepads(),
            installedRelatedApps: data[4],
            protocolHandler: this.registerProtocolHandler(),
            mediaKeySystemAccess: data[6],
            midiAccess: data[7],
            sendBeacon: this.sendBeacon(),
            setAppBadge: this.setAppBadge(),
            share: this.share(),
            unregisterProtocolHandler: this.unregisterProtocolHandler(),
            vibrate: this.vibrate(),
            cpuClasses: this.getCpuClasses()
        };
    }
}

class GeneralData {
    getScreenSize() {
        return `${screen.width},${screen.height}`;
    }

    getAvailSize() {
        return `${screen.availWidth},${screen.availHeight}`;
    }

    getColorDepth() {
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

    isWebSocketSupported() {
        return !!window.WebSocket;
    }

    getGeneralData() {
        return {
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
            isWebSocketSupported: this.isWebSocketSupported(),
        }
    }
}

class DeviceData {
    async getCanvasFingerprint() {
        const canvas = document.getElementById('fingerprintCanvas');
        const ctx = canvas.getContext('2d');

        ctx.textBaseline = 'top';

        ctx.font = '20px "Arial Black", Gadget, sans-serif';
        ctx.fillStyle = '#f60';
        ctx.fillText('Hello, Arial Black!', 10, 10);

        ctx.font = '20px "Comic Sans MS", cursive, sans-serif';
        ctx.fillStyle = '#069';
        ctx.fillText('Hello, Comic Sans MS!', 10, 40);

        ctx.font = 'italic 18px "Courier New", Courier, monospace';
        ctx.fillStyle = '#0f0';
        ctx.fillText('Hello, Courier New!', 10, 70);

        ctx.font = 'bold 18px "Times New Roman", Times, serif';
        ctx.fillStyle = '#f00';
        ctx.fillText('Hello, Times New Roman!', 10, 100);

        ctx.font = '20px "Lucida Console", Monaco, monospace';
        ctx.fillStyle = '#00f';
        ctx.fillText('Hello, Lucida Console!', 10, 130);

        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 4;

        ctx.font = 'bold 16px "Verdana", Geneva, sans-serif';
        ctx.fillStyle = '#900';
        ctx.fillText('Hello, Verdana with Shadow!', 10, 160);

        ctx.strokeStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.beginPath();
        ctx.arc(350, 100, 50, 0, Math.PI * 2, true);
        ctx.stroke();

        ctx.fillStyle = "rgb(255,0,255)";
        ctx.beginPath();
        ctx.rect(20, 20, 150, 100);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "rgb(0,255,255)";
        ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      
        const txt = "abz190#$%^@£éú";
        ctx.textBaseline = "top";
        ctx.font = '17px "Arial 17"';
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "rgb(255,5,5)";
        ctx.rotate(0.03);
        ctx.fillText(txt, 4, 17);
        ctx.fillStyle = "rgb(155,255,5)";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "red";
        ctx.fillRect(20, 12, 100, 5);

        const dataURL = canvas.toDataURL();
        const hash = await hashString(dataURL);

        canvas.style.display = 'none';

        return hash;
    }

    async getWebglFingerprint() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                    
        if (!gl) {
            return 'WebGL not supported';
        }
        
        const vertexShaderSource = 'attribute vec2 position; void main() { gl_Position = vec4(position, 0, 1); }';
        const fragmentShaderSource = 'void main() { gl_FragColor = vec4(1, 0, 0.5, 1); }';
        
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);
        
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(fragmentShader);
        
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        
        const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                -1, -1,
                1, -1,
                -1, 1,
                1, 1
            ]), gl.STATIC_DRAW);
        
        const positionLocation = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        
        gl.clearColor(1, 1, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        
        const pixels = new Uint8Array(canvas.width * canvas.height * 4);
        gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

        const hash = await hashString(pixels);

        return hash;
    }

    async getAudioFingerprint() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            const oscillator = audioContext.createOscillator();
            oscillator.type = 'triangle';

            const gainNode = audioContext.createGain();
            gainNode.gain.value = 0;

            const compressor = audioContext.createDynamicsCompressor();
            compressor.threshold.setValueAtTime(-50, audioContext.currentTime);
            compressor.knee.setValueAtTime(40, audioContext.currentTime);
            compressor.ratio.setValueAtTime(12, audioContext.currentTime);
            compressor.attack.setValueAtTime(0, audioContext.currentTime);
            compressor.release.setValueAtTime(0.25, audioContext.currentTime);

            oscillator.connect(gainNode);
            gainNode.connect(compressor);
            compressor.connect(audioContext.destination);

            oscillator.start(0);

            const analyser = audioContext.createAnalyser();
            compressor.connect(analyser);

            analyser.fftSize = 512;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Float32Array(bufferLength);
            analyser.getFloatFrequencyData(dataArray);

            oscillator.stop(audioContext.currentTime + 0.5);

            const fingerprint = await hashBuffer(dataArray);
            return fingerprint;

        } catch (e) {
            return 'Error generating audio fingerprint: ' + e.message;
        }
    }
    
    async getFontFingerprint() {
        const fonts = [
            'Arial', 'Arial Black', 'Verdana', 'Helvetica', 'Tahoma', 'Trebuchet MS', 'Times New Roman', 
            'Georgia', 'Garamond', 'Courier New', 'Brush Script MT', 'Comic Sans MS', 'Impact', 'Lucida Sans Unicode', 
            'Palatino', 'Bookman', 'Candara', 'Courier', 'Arial Narrow', 'Consolas', 'Constantia', 'Corbel',
            'Franklin Gothic Medium', 'Gill Sans', 'Futura', 'Century Gothic', 'Lucida Console', 'Lucida Sans',
            'MS Serif', 'MS Sans Serif', 'Papyrus', 'Symbol', 'Verdana Pro', 'Wingdings', 'Calibri', 'Cambria', 
            'Didot', 'Optima', 'Perpetua', 'Rockwell', 'Gill Sans MT', 'Times', 'Apple Chancery', 'Andale Mono', 
            'Baskerville', 'Big Caslon', 'Charcoal', 'Copperplate', 'Hoefler Text', 'Monaco', 'New Century Schoolbook', 
            'URW Chancery L', 'Webdings', 'Dingbats', 'Lucida Bright', 'PT Serif', 'Roboto', 'Ubuntu', 'Noto Sans',
            'Segoe UI', 'Open Sans', 'Lato', 'Oswald', 'Slabo 27px', 'PT Sans', 'Merriweather', 'Arvo', 
            'Josefin Sans', 'Poppins', 'Raleway', 'Playfair Display', 'Rubik', 'Montserrat', 'Nunito', 'Caveat', 
            'Pacifico', 'Quicksand', 'Lobster', 'Dancing Script', 'Cinzel', 'Amatic SC', 'Abril Fatface', 'Anton',
            'Bebas Neue', 'Fira Sans', 'Oxygen', 'Inconsolata', 'Kanit', 'Titillium Web', 'Vollkorn', 'Zilla Slab',
            'Muli', 'Avenir', 'Segoe Script', 'Segoe Print', 'Lucida Handwriting', 'Goudy Old Style', 'Minion Pro',
            'Plantagenet Cherokee', 'Academy Engraved LET', 'American Typewriter', 'Bangla Sangam MN', 'Marker Felt',
            'Party LET', 'Snell Roundhand', 'Zapfino', 'Trebuchet', 'Wingdings 2', 'Wingdings 3'
        ];

        const baseFonts = ['monospace', 'sans-serif', 'serif'];

        const sampleText = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:'\",.<>?/`~\\";
        const testSize = '100px';

        const createTestElement = (fontFamily) => {
            const span = document.createElement('span');
            span.style.fontSize = testSize;
            span.style.fontFamily = fontFamily;
            span.className = 'hidden';
            span.textContent = sampleText;
            document.body.appendChild(span);
            return span;
        };

        const getElementSize = (element) => {
            return { width: element.offsetWidth, height: element.offsetHeight };
        };

        const defaultSizes = {};

        for (const baseFont of baseFonts) {
            const span = createTestElement(baseFont);
            defaultSizes[baseFont] = getElementSize(span);
            document.body.removeChild(span);
        }

        const buffer = new ArrayBuffer(fonts.length * 8);
        const view = new DataView(buffer);

        fonts.forEach((font, index) => {
            const span = createTestElement(`${font}, monospace`);
            const size = getElementSize(span);
            document.body.removeChild(span);

            if (size.width !== defaultSizes['monospace'].width || size.height !== defaultSizes['monospace'].height) {
                view.setFloat32(index * 8, size.width);
                view.setFloat32(index * 8 + 4, size.height);
            } else {
                view.setFloat32(index * 8, 0);
                view.setFloat32(index * 8 + 4, 0);
            }
        });

        const fingerprint = await hashBuffer(buffer);
        return fingerprint;
    }

    async getMediaCapabilities() {
        try {
            const mediaFormats = [
                { type: 'file', video: { contentType: 'video/webm; codecs="vp8"', width: 640, height: 480, bitrate: 500000, framerate: 30 } },
                { type: 'file', video: { contentType: 'video/webm; codecs="vp9"', width: 1920, height: 1080, bitrate: 8000000, framerate: 60 } },
                { type: 'file', video: { contentType: 'video/webm; codecs="av1"', width: 1920, height: 1080, bitrate: 5000000, framerate: 30 } },
                { type: 'file', video: { contentType: 'video/mp4; codecs="avc1.42E01E"', width: 640, height: 480, bitrate: 500000, framerate: 30 } },
                { type: 'file', video: { contentType: 'video/mp4; codecs="avc1.4D401E"', width: 1280, height: 720, bitrate: 2000000, framerate: 30 } },
                { type: 'file', video: { contentType: 'video/mp4; codecs="avc1.64001F"', width: 1920, height: 1080, bitrate: 5000000, framerate: 60 } },
                { type: 'file', video: { contentType: 'video/mp4; codecs="hev1.1.6.L93.B0"', width: 3840, height: 2160, bitrate: 10000000, framerate: 60 } },
                { type: 'file', video: { contentType: 'video/mp4; codecs="av01.0.05M.08"', width: 1920, height: 1080, bitrate: 5000000, framerate: 30 } },
                { type: 'file', video: { contentType: 'video/ogg; codecs="theora"', width: 640, height: 480, bitrate: 500000, framerate: 30 } },
                { type: 'file', video: { contentType: 'video/x-matroska; codecs="avc1.42E01E"', width: 640, height: 480, bitrate: 500000, framerate: 30 } },
                { type: 'file', video: { contentType: 'video/x-matroska; codecs="vp8"', width: 640, height: 480, bitrate: 500000, framerate: 30 } },
                { type: 'file', video: { contentType: 'video/x-flv; codecs="vp6"', width: 640, height: 480, bitrate: 500000, framerate: 30 } },
                { type: 'file', video: { contentType: 'video/x-flv; codecs="h263"', width: 640, height: 480, bitrate: 500000, framerate: 30 } },
                { type: 'file', audio: { contentType: 'audio/mp4; codecs="mp4a.40.2"', channels: 2, bitrate: 128000, samplerate: 44100 } },
                { type: 'file', audio: { contentType: 'audio/mp4; codecs="mp4a.40.5"', channels: 2, bitrate: 64000, samplerate: 44100 } },
                { type: 'file', audio: { contentType: 'audio/webm; codecs="opus"', channels: 2, bitrate: 96000, samplerate: 48000 } },
                { type: 'file', audio: { contentType: 'audio/webm; codecs="vorbis"', channels: 2, bitrate: 128000, samplerate: 44100 } },
                { type: 'file', audio: { contentType: 'audio/ogg; codecs="opus"', channels: 2, bitrate: 96000, samplerate: 48000 } },
                { type: 'file', audio: { contentType: 'audio/ogg; codecs="vorbis"', channels: 2, bitrate: 128000, samplerate: 44100 } },
                { type: 'file', audio: { contentType: 'audio/mpeg; codecs="mp3"', channels: 2, bitrate: 128000, samplerate: 44100 } },
                { type: 'file', audio: { contentType: 'audio/wav; codecs="1"', channels: 2, bitrate: 1411200, samplerate: 44100 } },
                { type: 'file', audio: { contentType: 'audio/flac', channels: 2, bitrate: 1000000, samplerate: 44100 } },
                { type: 'file', audio: { contentType: 'audio/aac', channels: 2, bitrate: 128000, samplerate: 44100 } },
                { type: 'file', audio: { contentType: 'audio/3gpp; codecs="samr"', channels: 1, bitrate: 12200, samplerate: 8000 } },
                { type: 'file', audio: { contentType: 'audio/3gpp2; codecs="sawb"', channels: 1, bitrate: 24000, samplerate: 16000 } },
            ];

            const formatsPromise = mediaFormats.map((format) => navigator.mediaCapabilities.decodingInfo(format));
            const result = await Promise.all(formatsPromise);
            
            const resultJSON = JSON.stringify(result);
            const hash = hashString(resultJSON);

            return hash;
        } catch (error) {
            console.error('Error in getMediaCapabilities:', error);
            return error.message;
        }
    }

    async getDeviceData() {
      const deviceData = await Promise.all([
        this.getCanvasFingerprint(),
        this.getWebglFingerprint(),
        this.getAudioFingerprint(),
        this.getFontFingerprint(),
        this.getMediaCapabilities(),
      ])

      return {
        canvas: deviceData[0],
        webgl: deviceData[1],
        audio: deviceData[2],
        fonts: deviceData[3],
        mediaCapabilities: deviceData[4],
      };
    }
}

class BrowserFingerprint {
    async generate() {
        const fingerprints = await Promise.all([
            new NavigatorData().getNavigatorData(),
            new DeviceData().getDeviceData(),
        ])

        const general = new GeneralData().getGeneralData();;

        const fingerprintData = {
            general,
            navigator: fingerprints[0],
            device: fingerprints[1],
        };

        return fingerprintData;
    }
}


async function hashString(message) {
    const msgBuffer = new TextEncoder().encode(message);

    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
}

function hashBuffer(buffer) {
    return crypto.subtle.digest('SHA-256', buffer).then(hash => {
        return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    });
}