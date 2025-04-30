# 💰 My Finance Mate  

**My Finance Mate** is a smart income and expense tracking web application built with the MERN stack. It helps users manage their finances efficiently while leveraging machine learning to analyze spending patterns, predict future trends, and provide actionable insights—so you can make smarter financial decisions effortlessly.  

---

## 🚀 Features  

### 🔍 Core Features  
#### 📊 Expense & Income Tracking  
- Add, edit, and delete income/expense entries  
- Categorize transactions (e.g., Food, Travel, Shopping)  
- Monthly/yearly financial summaries  

#### 🤖 AI-Powered Insights  
- Predictive analytics for future spending  
- Personalized suggestions (e.g., "Reduce dining out by 20% to save $X/month")  
- Trend visualization with interactive charts  

#### 🔒 User Management  
- Secure JWT authentication  
- Profile customization  
- Data privacy controls  

---

## 🛠️ Tech Stack  

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)  
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)  
![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)  
![Node.js](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)  
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)  

**Frontend**: React, Redux Toolkit, Tailwind CSS  
**Backend**: Node.js, Express.js  
**Database**: MongoDB  
**Authentication**: JWT  
**AI**: Custom ML Model for Financial Forecasting  

---

## 📦 Getting Started  

### Prerequisites  
- Node.js (v18+)  
- MongoDB (or a cloud connection string)  
- npm / yarn  

### 1. Clone the Repository  
```bash  
git clone https://github.com/your-username/my-finance-mate.git  
cd my-finance-mate  
```  

### 2. Install Dependencies  
**Frontend:**  
```bash  
cd client  
npm install  
```  

**Backend:**  
```bash  
npm install  
```  

### 3. Set Up Environment Variables  
Create `.env` files in both `frontend` and `backend` folders.  

#### Backend `.env`  
```env  
PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
```  

#### Frontend `.env`  
```env  
VITE_FIREBASE_API_KEY=your_firebase_api_key  
VITE_BACKEND_URL=http://localhost:5000  
```  

### 4. Run the Application  
**Backend:**  
```bash   
npm run dev  
```  

**Frontend:**  
```bash  
cd client  
npm run dev  
```  
Access the app at: `http://localhost:5173`  

---

## 🎥 Demo  
> *Replace this section with a GIF/screenshot later*  
![Demo Preview](./demo-screenshot.png)  

---

## 🌐 Live Deployment  
> *Add your live link here (e.g., Vercel, Netlify)*  

---

## 👨‍💻 Contributors  
- **Nisal Mallawaarachchi** (Team Lead)  
- Shakya K. Gurusinghe  
- Isira Fernande  
- Thiruni Jayasinghe  

---

## 🤝 How to Contribute  
1. Fork the repo  
2. Create a branch (`git checkout -b feature/xyz`)  
3. Commit changes (`git commit -m 'Add feature xyz'`)  
4. Push to branch (`git push origin feature/xyz`)  
5. Open a Pull Request  

---

## 📄 License  
This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.  

---

## 🔜 Future Roadmap  
- Mobile app (React Native)  
- PDF report generation  
- Multi-currency support  

--- 