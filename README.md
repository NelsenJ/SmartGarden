# 🌱 SmartGarden - Smart Home Project

Project SmartGarden adalah aplikasi smart home yang terdiri dari **API backend** (Python/FastAPI) dan **frontend** (React) untuk monitoring temperature dan humidity secara real-time.

## 📁 Struktur Project

```
SmartGarden/
├── api/                    # Backend API (FastAPI/Flask)
│   ├── app.py             # Aplikasi utama FastAPI
│   ├── flask_app.py       # Aplikasi Flask (WSGI compatible)
│   ├── requirements.txt   # Dependencies Python
│   ├── wsgi.py           # WSGI configuration
│   └── temperature.db    # Database SQLite
├── src/                   # Frontend React (Source)
├── public/                # Frontend React (Public)
├── package.json           # Frontend dependencies
├── vercel.json           # Vercel deployment config
└── README.md             # File ini
```

## 🚀 Cara Menjalankan Project

### Prerequisites

* **Python 3.8+** (untuk backend)
* **Node.js 14+** (untuk frontend)
* **npm** atau **yarn** (package manager)

### Langkah 1: Setup Backend (API)

1. **Buka terminal/command prompt**
2. **Masuk ke folder api:**  
cd api
3. **Install dependencies Python:**  
pip install -r requirements.txt
4. **Jalankan API server:**  
uvicorn app:app --reload --host 0.0.0.0 --port 8000
5. **API akan berjalan di:** `http://localhost:8000`
6. **Dokumentasi API:** `http://localhost:8000/docs`

### Langkah 2: Setup Frontend (React)

1. **Buka terminal/command prompt baru**
2. **Masuk ke folder root:**  
cd SmartGarden
3. **Install dependencies Node.js:**  
npm install
4. **Jalankan React development server:**  
npm start
5. **Frontend akan berjalan di:** `http://localhost:3000`

## 📊 Fitur yang Tersedia

### Backend API (FastAPI/Flask)

* ✅ RESTful API untuk data temperature dan humidity
* ✅ Database SQLite dengan SQLAlchemy
* ✅ Automatic API documentation (Swagger UI)
* ✅ Real-time data monitoring
* ✅ Dummy data generation untuk testing
* ✅ CORS enabled untuk React frontend
* ✅ WSGI compatible untuk deployment

### Frontend (React)

* ✅ Home Page dengan landing page
* ✅ About Page dengan informasi perusahaan
* ✅ Contact Page dengan form kontak
* ✅ Temperature Page dengan real-time monitoring
* ✅ Responsive design
* ✅ Auto-refresh data

## 🔧 Endpoint API

| Method | Endpoint                        | Deskripsi                 |
| ------ | ------------------------------- | ------------------------- |
| GET    | /                               | Informasi API             |
| GET    | /api/health                     | Health check              |
| GET    | /api/temperature                | Data temperature saat ini |
| GET    | /api/temperature/history        | Riwayat temperature       |
| GET    | /api/temperature/stats          | Statistik temperature     |
| POST   | /api/temperature/generate-dummy | Generate data dummy       |

## 🧪 Testing

### Test API

# Health check
curl http://localhost:8000/api/health

# Current temperature
curl http://localhost:8000/api/temperature

# Generate dummy data
curl -X POST "http://localhost:8000/api/temperature/generate-dummy?count=20"

### Test Frontend

1. Pastikan API berjalan di port 8000


## 🛠️ Technologies

### Backend

* **Python 3.8+**
* **FastAPI** \- Modern web framework
* **Flask** \- WSGI compatible framework
* **SQLAlchemy** \- Database ORM
* **Pydantic** \- Data validation
* **Uvicorn** \- ASGI server
* **SQLite** \- Database

### Frontend

* **React 18**
* **JavaScript (ES6+)**
* **CSS3** \- Styling
* **Axios** \- HTTP client
* **React Router** \- Navigation

## 📝 Notes

* **Database**: SQLite file akan dibuat otomatis saat pertama kali menjalankan API
* **Dummy Data**: 10 record dummy akan dibuat otomatis saat startup
* **Auto-refresh**: Frontend akan refresh data setiap 30 detik
* **CORS**: Backend sudah dikonfigurasi untuk menerima request dari frontend
* **Deployment**: Backend di PythonAnywhere, Frontend di Vercel

---

**Happy Coding! 🌱** 