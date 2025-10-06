# 🎯 AuroCore - Personal Productivity Tracker

A beautiful, feature-rich Pomodoro timer and productivity tracker with gamification elements. Track your focus sessions, earn Aura Points (AP), and customize your experience with purchasable items.

## ✨ Features

### 🕐 Timer & Session Management
- **Pomodoro Timer** - Customizable focus and break sessions
- **Auto-switching** - Automatically transitions between focus and break modes
- **Session Tracking** - Counts and displays session numbers
- **Pause/Resume** - Full control over your sessions
- **Custom Durations** - Set your own focus and break times (minutes and seconds)

### 💰 Aura Points (AP) System
- **Earn Rewards** - Get AP for completing focus sessions
- **Session Multiplier** - Earn more for consecutive sessions
- **Bonus Multipliers** - Purchase multipliers to boost earnings (×2, ×3, ×4)
- **Real-time Display** - See your AP count with animated coin icon
- **Persistent Progress** - All points saved in browser storage

### 🛒 Shop System
#### Shadow Color Items (Customization)
- **Purple Glow** - 300 AP
- **Red Glow** - 300 AP
- **Cyan Glow** - 300 AP
- **Gold Glow** - 500 AP (Premium)
- **Green Glow** - 400 AP

#### AP Bonus Multipliers
- **Double AP (×2)** - 500 AP
- **Triple AP (×3)** - 1000 AP
- **Quadra AP (×4)** - 2000 AP

### 🎨 Customization
- **Custom Backgrounds** - Upload your own videos or images
- **Three Background States**:
  - Main/Focus background
  - Pause background
  - Break background
- **IndexedDB Storage** - Backgrounds saved locally
- **Shadow Colors** - Customize circle glow effects

### 🎬 Visual Effects
- **Fullscreen Mode** - Immersive focus experience
- **Animated Transitions** - Smooth circle expansion
- **Glowing Effects** - Beautiful shadow animations
- **Floating Coin** - Animated AP indicator
- **Responsive Design** - Works on all screen sizes
## 📖 How to Use

### Basic Timer Usage

1. **Set Your Time**
   - Open Configuration Panel
   - Adjust focus session duration (default: 25 minutes)
   - Adjust break session duration (default: 5 minutes)

2. **Start a Session**
   - Click the Play button ▶️
   - Timer enters fullscreen mode
   - Background displays your custom video/image

3. **Control Your Session**
   - ⏸️ **Pause** - Pause the current session
   - ▶️ **Continue** - Resume paused session
   - ⏹️ **Stop** - End session and calculate rewards

### Earning Aura Points

- **Full Session** - 10 AP per minute × session number
- **Partial Session** - 5 AP per minute (minimum 1 minute)
- **Multipliers** - Purchase bonuses to increase earnings

### Shopping & Upgrades

1. Open Configuration Panel
2. Scroll to Shop section
3. Click items to purchase (if you have enough AP)
4. Click purchased items to apply/activate them

### Custom Backgrounds

1. Open Configuration Panel
2. Select background type (Main/Pause/Break)
3. Click "Change The Background"
4. Upload video file. (DOESN'T WORK WITH IMAGES)
5. Preview appears instantly

## 💾 Data Storage

### LocalStorage
- `aurapoints` - Your total Aura Points
- `latestpoints` - Points earned in last session
- `purchasedItems` - Array of purchased shop items
- `activeBonus` - Currently active AP multiplier
- `activeShadowColor` - Selected glow color

### IndexedDB
- **Database**: `AuroCoreDB`
- **Store**: `backgrounds`
- Stores uploaded background videos/images as blobs
- Automatic cleanup of old databases on startup

## 🎮 Keyboard Shortcuts

Currently manual controls only. Keyboard shortcuts coming in future update!

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling & animations
- **JavaScript (ES6+)** - Functionality
- **IndexedDB API** - Background storage
- **LocalStorage API** - Settings & progress
- **Font Awesome** - Icons

## 🐛 Known Issues

- Auto-play may be blocked on some browsers (requires user interaction)
- Large video files may impact performance
- Storage quota varies by browser

**Made with 💜 by YoussefReaper**

*Stay focused, earn aura, level up your productivity!* 🚀
