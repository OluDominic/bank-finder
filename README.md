# 🏦 Nigerian Bank Finder

A modern, feature-rich web application for finding and managing Nigerian bank branch information across all 36 states and the FCT.

![React](https://img.shields.io/badge/React-19-blue)
![Material-UI](https://img.shields.io/badge/Material--UI-7-blue)
![Vite](https://img.shields.io/badge/Vite-5-646CFF)

## ✨ Features

### 🎯 Core Functionality
- **Smart Search** - Find bank branches by bank name and state
- **Real-time Filtering** - Filter search results instantly
- **Bank Information** - View bank codes and USSD details
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop

### 🌟 Advanced Features
- **🌓 Dark Mode** - Toggle between light and dark themes
- **❤️ Favorites System** - Save and manage your favorite branches
- **📊 Compare Banks** - Side-by-side branch count comparison
- **📥 Export Data** - Download results as CSV or JSON
- **🔗 Share Search** - Generate shareable links
- **📌 Recent Searches** - Quick access to your last 5 searches
- **📈 Statistics Dashboard** - Overview of banks, states, and favorites

### 💾 Data Management
- **Persistent Storage** - Favorites and recent searches saved locally
- **No API Required** - Works offline after initial load
- **Privacy Focused** - All data stored locally, no tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 18.14+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd bank-finder-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage

1. **Search for Branches**
   - Select a bank from the dropdown
   - Choose a state
   - Click "Search" to view all branches

2. **Manage Favorites**
   - Click the ♡ icon to add branches to favorites
   - Access favorites via the heart button in the header
   - Remove from favorites by clicking the ♥ icon again

3. **Compare Banks**
   - Click the compare arrows icon in the header
   - Select two banks and a state
   - View side-by-side comparison

4. **Export Data**
   - After searching, click "Export"
   - Choose CSV (for Excel) or JSON format

5. **Share Results**
   - Click "Share Search" to copy a shareable link
   - Send the link to friends or colleagues

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Material-UI v7** - Component library
- **Vite** - Build tool and dev server
- **naija-banks-branches-sortcode** - Nigerian bank data package

## 📁 Project Structure

```
bank-finder-app/
├── src/
│   ├── components/
│   │   ├── BankSelector.jsx       # Bank dropdown selector
│   │   ├── StateSelector.jsx      # State dropdown selector
│   │   ├── ResultsTable.jsx       # Results display with pagination
│   │   ├── StatsCard.jsx          # Statistics cards
│   │   ├── CompareModal.jsx       # Bank comparison modal
│   │   ├── ExportMenu.jsx         # Export functionality
│   │   └── FavoritesDrawer.jsx    # Favorites sidebar
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Application styles
│   └── main.jsx                   # Application entry point
├── public/                        # Static assets
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## 🎨 Features in Detail

See [FEATURES.md](./FEATURES.md) for a comprehensive guide to all features and use cases.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Bank data provided by [naija-banks-branches-sortcode](https://www.npmjs.com/package/naija-banks-branches-sortcode)
- UI components by [Material-UI](https://mui.com/)

## 📞 Support

For issues or questions, please open an issue on GitHub.
