const startBtn = document.getElementById('start-btn');
const breakBtn = document.getElementById('break-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const continueBtn = document.getElementById('continue-btn');
const timerEl = document.getElementById('timer');
const configurationPanel = document.getElementById('configuration-panel');
const configurationBtn = document.getElementById('config-btn');
const circle = document.querySelector('.tracker-circle');
const controllers = document.getElementById('controllers');
const videoBackground = document.getElementById('background-video');

const backgroundPreview = document.getElementById('background-preview');
const backgroundUpload = document.getElementById('background-upload');

const mainBackgroundBtn = document.getElementById('main-background');
const pauseBackgroundBtn = document.getElementById('pause-background');
const breakBackgroundBtn = document.getElementById('break-background');

const alwaysOnFocusMode = document.getElementById('always-focus');
const alwaysOnFullscreen = document.getElementById('always-fullscreen');
const autoStartSessions = document.getElementById('auto-start-sessions');
const autoStartBreaks = document.getElementById('auto-start-breaks');

const focusModeSelector = document.getElementById('focus-mode');
const timerStyleSelector = document.getElementById('style-mode');

const focusSessionMinutes = document.getElementById('focus-session-minutes');
const focusSessionSeconds = document.getElementById('focus-session-seconds');
const breakSessionMinutes = document.getElementById('break-session-minutes');
const breakSessionSeconds = document.getElementById('break-session-seconds');

const coinsEl = document.getElementById('coins');
const coinsIncreaseEl = document.getElementById('coins-increase');

let time = 0;
let breakTime = 0;
let totalTime = 0;
let totalBreakTime = 0;
let reward = 100;
let currentState = 'focus';
let previousState = 'focus';
let timeInterval;
let isAuto = true;
let sessionStartTime = 0;
let focusBackground;
let breakBackground;
let pauseBackground;
let focusBackgroundURL;
let breakBackgroundURL;
let pauseBackgroundURL;
let focusBlob;
let breakBlob;
let pauseBlob;
let currentPreviewState = 'main';
let isImage = false;
let isConfigPanelOpen = false;
let sessionNumber = 1;
let latestCoins = JSON.parse(localStorage.getItem('latestpoints')) || 0;
let auraPoints = JSON.parse(localStorage.getItem('aurapoints')) || 10;

renderCoins();

(async function initializeApp() {
    try {
        await cleanupOldDatabases();
        await checkStorageQuota();
        
        await loadBackground();
        backgroundChanger();
        await previewBackground();
        console.log('✅ App initialized successfully!');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
})();

continueBtn.addEventListener('click', continueTimer);
pauseBtn.addEventListener('click', pauseTimer);
stopBtn.addEventListener('click', stopTimer);
focusSessionMinutes.addEventListener('change', changeTime);
focusSessionSeconds.addEventListener('change', changeTime);
backgroundUpload.addEventListener('change', async () => {
  const files = backgroundUpload.files;
  if (files && files.length > 0) {
    try {
      if (currentPreviewState === 'main') {
          await saveBackground(files[0], 'main');
      } else if (currentPreviewState === 'pause') {
          await saveBackground(files[0], 'pause');
      } else {
          await saveBackground(files[0], 'break');
      }
      await previewBackground();
    } catch (error) {
      console.error('Error saving background:', error);
    }
  } else {
  }
});
mainBackgroundBtn.addEventListener('click', async () => {
    mainBackgroundBtn.style.display = 'none';
    pauseBackgroundBtn.style.display = 'block';
    currentPreviewState = 'pause';
    await previewBackground();
});
pauseBackgroundBtn.addEventListener('click', async () => {
    pauseBackgroundBtn.style.display = 'none';
    breakBackgroundBtn.style.display = 'block';
    currentPreviewState = 'break';
    await previewBackground();
});
breakBackgroundBtn.addEventListener('click', async () => {
    breakBackgroundBtn.style.display = 'none';
    mainBackgroundBtn.style.display = 'block';
    currentPreviewState = 'main';
    await previewBackground();
});
startBtn.addEventListener('click', startTimer);
configurationBtn.addEventListener('click', controlConfigPanel);

function controlConfigPanel() {
    isConfigPanelOpen = !isConfigPanelOpen;
    if (isConfigPanelOpen) {
        configurationPanel.style.marginLeft = '0';
    } else {
        configurationPanel.style.marginLeft = '-70vmin';
    }
}

function backgroundChanger() {
    loadBackground();
    setTimeout(()=> {
        if (currentState === 'focus') {
            videoBackground.style.display = 'block';
            videoBackground.src = focusBackground;
            console.log(videoBackground);
        } else if (currentState === 'pause') {
            videoBackground.style.display = 'block';
            videoBackground.src = pauseBackground;
        } else if (currentState === 'break') {
            videoBackground.style.display = 'block';
            videoBackground.src = breakBackground;
        }
    }, 200);
}

function startTimer() {
    currentState = 'focus';
    if (time <= 0) {
        time = 1500;
        totalTime = 1500;
    }
    sessionStartTime = time;
    renderTimer();
    timeInterval = setInterval(() => {
        count();
    }, 1000);
    circle.classList.add('focus');
    changeBackgrounds();
    setTimeout(() => {
        circleExpand();
    }, 1500)
    startBtn.style.display = 'none';
}

function changeTime(){
    time = Number(focusSessionMinutes.value) * 60 + Number(focusSessionSeconds.value);
    totalTime = time;
    breakTime = Number(breakSessionMinutes.value) * 60 + Number(breakSessionSeconds.value);
    totalBreakTime = breakTime;
    renderTimer();
}

function circleExpand() {
    if (!circle.classList.contains('expand')) {
        const rect = circle.getBoundingClientRect();
        circle.style.position = 'fixed';
        circle.style.top = rect.top + 'px';
        circle.style.left = rect.left + 'px';
        circle.style.width = rect.width + 'px';
        circle.style.height = rect.height + 'px';
        circle.style.margin = '0';
        circle.style.borderRadius = '50%';
        circle.style.transition = 'all 0.6s ease-in-out';
        circle.offsetHeight;
        circle.classList.add('expand');
        circle.style.top = '0';
        circle.style.left = '0';
        circle.style.width = '100vw';
        circle.style.height = '100vh';
        circle.style.borderRadius = '0';
        controllers.style.display = 'flex';
    } else {
        circle.removeAttribute('style');
        circle.classList.remove('expand');
        circle.classList.remove('focus');
    }
}

function count() {
    if (currentState === 'focus') {
        time--;
    } else if (currentState === 'break') {
        breakTime--;
    }
    renderTimer();
}

function renderTimer() {
    const currentTime = currentState === 'focus' ? time : breakTime;
    
    if (currentTime === 0) {
        if (isAuto) {
            switchMode();
            clearInterval(timeInterval);
        } else {
            // breakBtn.style.display = 'block';
            clearInterval(timeInterval);
        }
        return;
    }
    
    let timeInHours;
    let timeInMinutes;
    let timeInSeconds;
    
    if (currentState === 'focus') {
        timeInHours = Math.floor(time / 3600);
        timeInMinutes = timeInHours ? Math.floor((time % 3600) / 60) : Math.floor(time / 60);
        timeInSeconds = Math.floor(time % 60);
    } else if (currentState === 'break') {
        timeInHours = Math.floor(breakTime / 3600);
        timeInMinutes = timeInHours ? Math.floor((breakTime % 3600) / 60) : Math.floor(breakTime / 60);
        timeInSeconds = Math.floor(breakTime % 60);
    } else {
        timerEl.innerHTML = `No TIME \n for JOKES`;
        return;
    }
    
    if (timeInHours) {
        timerEl.textContent = `${timeInHours < 10 ? '0' + timeInHours : timeInHours}:${timeInMinutes < 10 ? '0' + timeInMinutes : timeInMinutes}:${timeInSeconds < 10 ? '0' + timeInSeconds : timeInSeconds}`;
    } else {
        timerEl.textContent = `${timeInMinutes < 10 ? '0' + timeInMinutes : timeInMinutes}:${timeInSeconds < 10 ? '0' + timeInSeconds : timeInSeconds}`;
    }
}

function switchMode() {
    if (currentState === 'focus') {
        calculateCoins(true);
        takeBreak();
    } else {
        newFocusSession();
    }
}

function newFocusSession() {
    currentState = 'focus';
    sessionNumber++;
    time = totalTime;
    breakTime = totalBreakTime;
    if (time <= 0) {
        time = 1500;
        totalTime = 1500;
    }
    sessionStartTime = time;
    changeBackgrounds();
    timeInterval = setInterval(() => {
        count();
    }, 1000);
    startBtn.style.display = 'none';
    controllers.style.display = 'flex';
}

async function previewBackground() {
    try {
        if (!focusBackground && !pauseBackground && !breakBackground) {
            await loadBackground();
        }
        
        let backgroundUrl = null;
        let backgroundName = '';
        
        if (currentPreviewState === 'main') {
            backgroundUrl = focusBackground;
            backgroundName = 'Focus';
        } else if (currentPreviewState === 'break') {
            backgroundUrl = breakBackground;
            backgroundName = 'Break';
        } else {
            backgroundUrl = pauseBackground;
            backgroundName = 'Pause';
        }
        
        if (backgroundUrl) {
            backgroundPreview.innerHTML = `
                <video autoplay muted loop playsinline>
                    <source src="${backgroundUrl}" type="video/mp4">
                </video>
            `;
        } else {
            backgroundPreview.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; font-size: 14px;">
                    No ${backgroundName} background uploaded
                </div>
            `;
        }
    } catch (error) {
        console.error('Error previewing background:', error);
        backgroundPreview.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #f00; font-size: 14px;">
                Error loading background
            </div>
        `;
    }
}

async function changeBackgrounds() {
    try {
        if (!focusBackground && !pauseBackground && !breakBackground) {
            await loadBackground();
        }
        
        let backgroundUrl = null;
        
        if (currentState === 'focus') {
            backgroundUrl = focusBackground;
        } else if (currentState === 'pause') {
            backgroundUrl = pauseBackground;
        } else if (currentState === 'break') {
            backgroundUrl = breakBackground;
        }
        
        if (backgroundUrl) {
            videoBackground.style.display = 'block';
            videoBackground.onerror = (e) => {
                console.error('Error loading video:', e);
                loadBackground().then(() => {
                });
            };
            videoBackground.onloadeddata = () => {
            };
            
            videoBackground.src = backgroundUrl;
            videoBackground.load();
            videoBackground.play().catch(e => console.log('⚠️ Auto-play prevented:', e));
        } else {
            await loadBackground();
            const retryUrl = currentState === 'focus' ? focusBackground : 
                            currentState === 'pause' ? pauseBackground : breakBackground;
            if (retryUrl) {
                videoBackground.src = retryUrl;
                videoBackground.load();
            }
        }
    } catch (error) {
        console.error('Error changing backgrounds:', error);
    }
}

function takeBreak() {
    currentState = 'break';
    breakTime = totalBreakTime;
    if (breakTime <= 0) {
        breakTime = 300;
    }
    changeBackgrounds();
    timeInterval = setInterval(()=> {
        count();
    }, 1000);
}

function calculateCoins(isFullSession = false) {
    let amount = 0;
    const timeSpent = sessionStartTime - time;
    
    if (isFullSession && timeSpent >= sessionStartTime) {
        amount = Math.floor(sessionStartTime / 60) * 10;
        amount *= sessionNumber;
    } else if (timeSpent >= 60) {
        amount = Math.floor(timeSpent / 60) * 5;
    } else {
        amount = 0;
    }

    if (amount > 0) {
        if (apMultiplier > 1) {
            const bonusAmount = amount * (apMultiplier - 1);
            amount *= apMultiplier;
        }
        addCoins(amount);
        showCoinsAnimation();
    }
}

function continueTimer() {
    currentState = previousState;
    changeBackgrounds();
    timeInterval = setInterval(() => {
        count();
    }, 1000);
    continueBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';
}

function pauseTimer() {
    clearInterval(timeInterval);
    previousState = currentState;
    currentState = 'pause';
    changeBackgrounds();
    continueBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
}

function stopTimer() {
    clearInterval(timeInterval);
    
    const wasFullSession = (currentState === 'focus' && time === 0) || (currentState === 'break' && breakTime === 0);
    calculateCoins(wasFullSession);
    
    currentState = 'focus';
    previousState = 'focus';
    sessionNumber = 1;
    time = totalTime;
    breakTime = totalBreakTime;
    sessionStartTime = 0;
    renderTimer();
    circleExpand();
    setTimeout(()=> {
        controllers.style.display = 'none';
        startBtn.style.display = 'block';
    }, 700);
}

async function saveBackground(file, type) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: file.type });
        
        const db = await openDB();
        const tx = db.transaction('backgrounds', 'readwrite');
        const store = tx.objectStore('backgrounds');
        
        const txCompletePromise = new Promise((resolve, reject) => {
            tx.oncomplete = () => {
                resolve(true);
            };
            tx.onerror = (e) => {
                console.error(`Transaction error for ${type}:`, e);
                reject(e);
            };
        });
        
        const putRequest = store.put({
            id: `${type}-background`,
            blob: blob,
            name: file.name,
            type: file.type,
            size: file.size,
            date: new Date().toISOString()
        });
        
        putRequest.onerror = (e) => {
            console.error(`Put request error for ${type}:`, e);
            
            if (e.target.error.name === 'QuotaExceededError') {
                alert('Storage quota exceeded! Please clear some space by:\n1. Clearing browser cache\n2. Deleting old backgrounds\n3. Uploading smaller video files');
            }
        };
        await txCompletePromise;
        
        const objectURL = URL.createObjectURL(blob);
        
        if (type === 'main') {
            focusBlob = blob;
            focusBackground = objectURL;
            focusBackgroundURL = objectURL;
        } else if (type === 'pause') {
            pauseBlob = blob;
            pauseBackground = objectURL;
            pauseBackgroundURL = objectURL;
        } else if (type === 'break') {
            breakBlob = blob;
            breakBackground = objectURL;
            breakBackgroundURL = objectURL;
        }
        return true;
        
    } catch (error) {
        throw error;
    }
}

async function cleanupOldDatabases() {
    try {
        const databases = await indexedDB.databases();
        const dbsToDelete = [];
        const keepDB = 'AuroCoreDB';
        for (const dbInfo of databases) {
            if (dbInfo.name !== keepDB) {
                dbsToDelete.push(dbInfo.name);
            }
        }
        
        if (dbsToDelete.length > 0) {
            for (const dbName of dbsToDelete) {
                const deleteRequest = indexedDB.deleteDatabase(dbName);
                
                await new Promise((resolve, reject) => {
                    deleteRequest.onsuccess = () => {
                        resolve();
                    };
                    deleteRequest.onerror = (e) => {
                        console.error(`Error deleting database ${dbName}:`, e);
                        resolve();
                    };
                    deleteRequest.onblocked = () => {
                        resolve();
                    };
                });
            }
        } else {
            //soMEATHING
        }
    } catch (error) {
        console.error('Error during database cleanup:', error);
    }
}
async function checkStorageQuota() {
    try {
        if (navigator.storage && navigator.storage.estimate) {
            const estimate = await navigator.storage.estimate();
            const usageInMB = (estimate.usage / (1024 * 1024)).toFixed(2);
            const quotaInMB = (estimate.quota / (1024 * 1024)).toFixed(2);
            const percentUsed = ((estimate.usage / estimate.quota) * 100).toFixed(1);
            
            console.log(`💾 Storage: ${usageInMB}MB / ${quotaInMB}MB (${percentUsed}% used)`);
            
            if (percentUsed > 90) {
                alert('Storage is almost full! Consider clearing browser data or old files.');
            } else if (percentUsed > 75) {
                //IDK
            }
        }
    } catch (error) {
    }
}

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('AuroCoreDB', 3);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('backgrounds')) {
                db.createObjectStore('backgrounds', { keyPath: 'id' });
            }
        };
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
}


async function loadBackground() {
    try {
        const db = await openDB();
        const tx = db.transaction('backgrounds', 'readonly');
        const store = tx.objectStore('backgrounds');
        const keys = ['main-background', 'pause-background', 'break-background'];
        
        const promises = keys.map(key => {
            return new Promise((resolve) => {
                const req = store.get(key);
                
                req.onsuccess = () => {
                    const record = req.result;
                    if (record && record.blob) {
                        if (!(record.blob instanceof Blob) || record.blob.size === 0) {
                            resolve(null);
                            return;
                        }
                        const objectURL = URL.createObjectURL(record.blob);
                        if (key === 'main-background') {
                            focusBlob = record.blob;
                            focusBackground = objectURL;
                            focusBackgroundURL = objectURL;
                        } else if (key === 'pause-background') {
                            pauseBlob = record.blob;
                            pauseBackground = objectURL;
                            pauseBackgroundURL = objectURL;
                        } else if (key === 'break-background') {
                            breakBlob = record.blob;
                            breakBackground = objectURL;
                            breakBackgroundURL = objectURL;
                        }
                        resolve(objectURL);
                    } else {
                        console.log(`${key} not found in database`);
                        resolve(null);
                    }
                };
                
                req.onerror = (e) => {
                    console.error(`Error loading ${key}:`, e);
                    resolve(null);
                };
            });
        });
        
        await Promise.all(promises);
        return true;
    } catch (error) {
        console.error('Error in loadBackground:', error);
        return false;
    }
}

function addCoins(amount) {
    latestCoins = amount;
    auraPoints += amount;
    localStorage.setItem('latestpoints', JSON.stringify(latestCoins));
    localStorage.setItem('aurapoints', JSON.stringify(auraPoints));
    renderCoins();
    updateShopUI();
}

function removeCoins(amount) {
    latestCoins = 0;
    auraPoints -= amount;
    localStorage.setItem('latestpoints', JSON.stringify(latestCoins));
    localStorage.setItem('aurapoints', JSON.stringify(auraPoints));
    renderCoins();
}

function renderCoins() {
    coinsEl.textContent = auraPoints;
    coinsIncreaseEl.textContent = '+' + latestCoins;
}

function showCoinsAnimation() {
    coinsIncreaseEl.style.opacity = '1';
    coinsIncreaseEl.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        coinsIncreaseEl.style.opacity = '0';
        coinsIncreaseEl.style.transform = 'translateY(0)';
    }, 3000);
}

async function clearAllBackgrounds() {
    try {
        const db = await openDB();
        const tx = db.transaction('backgrounds', 'readwrite');
        const store = tx.objectStore('backgrounds');
        
        await new Promise((resolve, reject) => {
            const clearRequest = store.clear();
            clearRequest.onsuccess = () => {
                if (focusBackgroundURL) URL.revokeObjectURL(focusBackgroundURL);
                if (pauseBackgroundURL) URL.revokeObjectURL(pauseBackgroundURL);
                if (breakBackgroundURL) URL.revokeObjectURL(breakBackgroundURL);
                focusBackground = null;
                pauseBackground = null;
                breakBackground = null;
                focusBackgroundURL = null;
                pauseBackgroundURL = null;
                breakBackgroundURL = null;
                
                resolve();
            };
            clearRequest.onerror = (e) => {
                console.error('Error clearing backgrounds:', e);
                reject(e);
            };
        });
        await checkStorageQuota();
        return true;
    } catch (error) {
        console.error('Error in clearAllBackgrounds:', error);
        return false;
    }
}

window.clearAllBackgrounds = clearAllBackgrounds;

let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];
let activeBonus = JSON.parse(localStorage.getItem('activeBonus')) || null;
let activeShadowColor = localStorage.getItem('activeShadowColor') || 'rgb(255, 158, 232)';
let apMultiplier = 1;

function initializeShop() {
    const shopItems = document.querySelectorAll('.shop-item, .shop-bonus');
    
    shopItems.forEach(item => {
        const itemId = item.id;
        const price = parseInt(item.dataset.price);
        const type = item.dataset.type;
        
        if (purchasedItems.includes(itemId)) {
            item.classList.add('purchased');
        }
        if (activeBonus === itemId && type === 'bonus') {
            item.classList.add('active');
            apMultiplier = parseInt(item.dataset.multiplier);
        }
        
        item.addEventListener('click', () => handlePurchase(item));
    });
    
    if (activeShadowColor) {
        applyShadowColor(activeShadowColor);
    }
    
    updateShopUI();
}

function handlePurchase(item) {
    const itemId = item.id;
    const price = parseInt(item.dataset.price);
    const type = item.dataset.type;
    const itemName = item.querySelector('.item-name').textContent;
    
    if (purchasedItems.includes(itemId)) {
        if (type === 'shadow') {
            const color = item.dataset.color;
            activeShadowColor = color;
            localStorage.setItem('activeShadowColor', color);
            applyShadowColor(color);
        } else if (type === 'bonus') {
            if (activeBonus === itemId) {
                activeBonus = null;
                apMultiplier = 1;
                item.classList.remove('active');
            } else {
                if (activeBonus) {
                    document.getElementById(activeBonus)?.classList.remove('active');
                }
                activeBonus = itemId;
                apMultiplier = parseInt(item.dataset.multiplier);
                item.classList.add('active');
            }
            localStorage.setItem('activeBonus', JSON.stringify(activeBonus));
        }
        return;
    }
    
    if (auraPoints < price) {
        item.classList.add('insufficient-funds');
        setTimeout(() => item.classList.remove('insufficient-funds'), 1000);
        alert(`Not enough AP! You need ${price} AP but only have ${auraPoints} AP.`)
        return;
    }
    auraPoints -= price;
    purchasedItems.push(itemId);
    item.classList.add('purchased');
    
    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
    localStorage.setItem('aurapoints', JSON.stringify(auraPoints));
    
    if (type === 'shadow') {
        const color = item.dataset.color;
        activeShadowColor = color;
        localStorage.setItem('activeShadowColor', color);
        applyShadowColor(color);
    } else if (type === 'bonus' && !activeBonus) {
        activeBonus = itemId;
        apMultiplier = parseInt(item.dataset.multiplier);
        item.classList.add('active');
        localStorage.setItem('activeBonus', JSON.stringify(activeBonus));
    }
    
    renderCoins();
    updateShopUI();
    alert(`Successfully purchased ${itemName}!`);
}

function applyShadowColor(color) {
    const circle = document.querySelector('.tracker-circle');
    if (circle) {
        circle.style.boxShadow = `0 0 40px ${color}`;
    }
}

function updateShopUI() {
    const shopItems = document.querySelectorAll('.shop-item, .shop-bonus');
    
    shopItems.forEach(item => {
        const price = parseInt(item.dataset.price);
        
        if (!purchasedItems.includes(item.id)) {
            if (auraPoints < price) {
                item.classList.add('insufficient-funds');
            } else {
                item.classList.remove('insufficient-funds');
            }
        }
    });
}

setTimeout(() => {
    initializeShop();
}, 500);

