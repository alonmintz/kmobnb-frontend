# kmobnb-frontend 🏠

This is the **frontend** for **KmoBnb**, a full-stack Airbnb-style booking platform. It allows users to search, browse, and book stays, manage their listings, and communicate with hosts. Built using **React**, **Vite**, and **SCSS**, this client app is optimized for a fast and responsive user experience.

---

## 🌐 Live Preview

[Hosted on Render](https://kmobnb.onrender.com/)

---

## ⚛️ Tech Stack

- **React** (with hooks)
- **Vite** – for ultra-fast development and build
- **SCSS** – custom styles
- **React Router** – client-side routing
- **Axios** – for HTTP requests
- **Redux Toolkit** – state management
- **React Date Range / Date Picker** – booking UI
- **Socket.IO** – real-time notifications (planned)
- **Google Maps API** – location picker & map integration

---

## 📁 Project Structure

kmobnb-frontend/  
├── assets/ # Images, icons, styles  
├── components/ # Reusable components (buttons, modals, etc.)  
├── pages/ # Page-level views (Home, StayDetails, etc.)  
├── services/ # Axios and business logic services  
├── store/ # Redux setup and slices  
├── hooks/ # Custom React hooks  
├── App.jsx # Root component  
├── main.jsx # Vite entry point  
└── index.html # Main HTML file  

---

## ⚙️ Setup & Run Locally  

### 1. Clone the repo  

```bash
git clone https://github.com/alonmintz/kmobnb-frontend.git
cd kmobnb-frontend
```
### 2. Install dependencies  
```bash
npm install
```
### 3. Create .env file
```env
VITE_API_URL=http://localhost:3030/api
VITE_GOOGLE_MAPS_API_KEY=<your_google_maps_api_key>
```
Replace <your_google_maps_api_key> with a valid key from the Google Cloud Console.

### 4. Start the development server
```bash
npm run dev
```
The app will be available at http://localhost:5173

🔗 Backend API  
This app connects to the kmobnb-backend server. Make sure it’s running locally or in production and that VITE_API_URL points to it.  
  
## 🖼 Features  
🔍 Search stays by location and date  

📅 Airbnb-style date picker  

🗺 Interactive map using Google Maps API  

💬 Leave reviews and ratings  

🧾 Host dashboard to manage listings  

📲 Responsive UI for mobile & desktop  

🔐 Login/signup with session management  

⚡️ Instant UI updates with Redux state management  

## 🧪 Testing (Coming Soon)  
Integration with Cypress or React Testing Library is planned  

## 📦 Deployment  
To build the app for production:  

```bash
npm run build
```
You can then serve the dist/ folder using any static host (like Render, Netlify, or GitHub Pages).

## 📌 Related Projects  
Backend Repository: [kmobnb-backend](https://github.com/alonmintz/kmobnb-backend) 

## 🧑‍💻 Authors  
Alon Mintz: [Github](https://github.com/alonmintz)   
Eyal Kravitz: [Github](https://github.com/keyal)  
