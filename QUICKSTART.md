# MedVault Quick Start Guide

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🎯 Demo Flow

### Patient Portal Demo
1. Click "Access Patient Portal" from the home page
2. View the medical timeline
3. Click "Scan Prescription" to test OCR functionality
4. Click "Access Code" to view/generate your patient access code: `MED-2024-001`

### Doctor Portal Demo
1. Click "Access Doctor Portal" from the home page
2. Enter patient access code: `MED-2024-001`
3. View complete patient history
4. Click "New Prescription" to create a prescription
5. Add medications and see real-time drug interaction alerts
6. Submit prescription to add it to patient's record

## 💊 Testing Drug Interactions

Try adding these medications to see interactions:
- **Aspirin** + **Warfarin** = Severe interaction
- **Ibuprofen** + **Aspirin** = Moderate interaction
- **Metformin** + **Alcohol** = Moderate interaction

## 📱 Features to Demo

- ✅ OCR Prescription Scanning (upload or camera)
- ✅ Real-time Drug Interaction Checking
- ✅ Unified Medical Timeline
- ✅ Access Code Sharing
- ✅ Cross-provider Record Access
- ✅ Mobile-first Responsive Design

## 🎨 Tech Stack

- React 19 + TypeScript
- Tailwind CSS
- React Router
- Tesseract.js (OCR)
- Vite

Enjoy your hackathon demo! 🎉

