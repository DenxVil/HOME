# 🏠 My Luxury Home 3D Viewer

An interactive 3D visualization of my **integrated luxury 2BHK + guest room** home on a **30' × 60'** North-facing plot in New Delhi.

## 📊 Project Specifications

| Property | Value |
|----------|-------|
| **Plot Size** | 30 ft (Width) × 60 ft (Depth) |
| **Built-up Area** | 1,330 sq. ft. |
| **Plot Area** | 1,800 sq. ft. |
| **Facing** | North (Auspicious) ✓ |
| **Bedrooms** | 2 Master + 1 Guest |
| **Bathrooms** | 3 (2 Attached + 1 Common) |
| **Estimated Cost** | ₹3.5-4.0 Cr (Delhi rates) |
| **Construction Time** | 6-8 months |
| **Vastu Compliant** | Yes ✓ |

## 🏗️ Layout Overview

### North Zone (Public)
- **Parking & Terrace** (10×10 ft)
- **Living Hall** (17×18 ft, 306 sq. ft.)

### Center Zone (Service)
- **Central Corridor** (6×60 ft)
- **Kitchen** (10×10 ft)
- **Store Room** (10×13 ft)
- **Puja Room** (10×5 ft)
- **Utility Duct** (4×4 ft)

### South Zone (Private)
- **Master Bedroom 1** (11×14 ft) + Attached Bath
- **Bedroom 2** (12×13.5 ft) + Attached Bath
- **Guest Room** (10×10 ft)
- **Common Bathroom**
- **Rear Setback** (3 ft, ventilation)

## 🎮 How to Use

### Online
Open the live viewer at: **[GitHub Pages URL will go here]**

### Local Development
1. Clone this repository
2. Open `index.html` in a modern web browser
3. Use mouse to interact with the 3D model:
   - **Left-click + drag**: Rotate view
   - **Right-click + drag**: Pan camera
   - **Scroll wheel**: Zoom in/out
   - **Double-click**: Reset to default view

## 🛠️ Technology Stack

- **Three.js** - 3D WebGL rendering engine
- **HTML5 Canvas** - GPU-accelerated graphics
- **JavaScript ES6** - Modern interactive controls
- **OrbitControls** - Intuitive camera manipulation

## ✨ Features

✓ **15 Rooms** visualized with accurate dimensions  
✓ **Real materials** - Marble, ceramic tiles, wood, stone  
✓ **Natural lighting** simulation  
✓ **Interactive room list** with area calculations  
✓ **Responsive design** - Works on desktop, tablet, mobile  
✓ **Stats display** - FPS, camera position, geometry info  
✓ **Vastu-compliant layout** - Auspicious room placements  

## 📐 Design Principles

1. **Integrated Rear Setback** - 3 ft deep ventilation zone
2. **Utility Duct** - Centralized MEP infrastructure (4×4 ft)
3. **Central Corridor** - Efficient traffic flow spine
4. **Vastu Compliance** - All defects remedied (toilets, stairs, puja room)
5. **Luxury Materials** - Polished marble, engineered wood, premium finishes
6. **Natural Light** - Cross-ventilation everywhere
7. **Space Efficiency** - Zero wasted area
8. **Future-proof** - Flexible spaces (guest room = office/yoga/studio)

## 🏛️ Vastu Corrections Applied

| Issue | Location | Remedy |
|-------|----------|--------|
| Toilet in SW | Master Bath | Door closed, sea salt, warm colors, bronze fixtures |
| Toilet in SE | Guest Bath | Warm earth tones, red accent stripe, Vastu pyramid |
| Stairs on East | Center position | Glass railings, bright lighting, open risers |
| Puja in West | West wall | Idols face East, pale yellow, soft lighting |

## 📱 Responsive & Accessible

- Works on **desktop, tablet, mobile**
- Touch gestures supported
- Keyboard shortcuts (coming soon)
- Statistics overlay (FPS, camera position)
- Room information panel

## 🚀 Deployment to GitHub Pages

1. Create a new GitHub repo: `house-3d`
2. Push this folder to the repo
3. In **Settings → Pages**:
   - Source: `main` branch
   - Folder: `/root`
4. Your site goes live at: `https://username.github.io/house-3d`

## 📦 File Structure

\`\`\`
.
├── index.html              # Main HTML file
├── js/
│   └── main.js            # Three.js viewer logic
├── data/
│   └── house_model_spec.json  # Room specifications
├── README.md              # This file
└── .gitignore            # GitHub ignore rules
\`\`\`

## 🎨 Color Scheme

- **Hall**: Polished white marble (#FFFFFE)
- **Bedrooms**: Warm wood tones (#DEB887)
- **Bathrooms**: Ceramic cream (#FFE4C4)
- **Kitchen**: Light yellow (#FFFACD)
- **Corridor**: Off-white (#FFFFF0)
- **Boundary**: Stone grey (#888888)

## 🔍 Next Steps

- [ ] Add furniture models (beds, sofas, dining tables)
- [ ] Implement room labels/tooltips on hover
- [ ] Add materials/texture mapping
- [ ] Export to glTF for iPad AR viewing
- [ ] Add floor plan 2D overlay
- [ ] Section cuts (A-A, B-B)
- [ ] Day/night lighting modes
- [ ] Measurement tool (distance, area)

---

**Built with ❤️ using Three.js**  
Last updated: December 8, 2025
