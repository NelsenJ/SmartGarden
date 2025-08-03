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

## 🚀 Deployment ke Vercel

### Prerequisites untuk Deployment

* **GitHub account** (untuk repository)
* **Vercel account** (gratis di [vercel.com](https://vercel.com))
* **Node.js 14+** (untuk build)

### Langkah Deployment

1. **Push project ke GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy ke Vercel:**
   - Buka [vercel.com](https://vercel.com)
   - Login dengan GitHub
   - Klik "New Project"
   - Import repository SmartGarden
   - Vercel akan otomatis mendeteksi React app
   - Klik "Deploy"

3. **Konfigurasi Environment Variables (opsional):**
   - Di dashboard Vercel, masuk ke project settings
   - Tambahkan environment variables jika diperlukan
   - Redeploy jika ada perubahan

4. **Custom Domain (opsional):**
   - Di project settings Vercel
   - Tambahkan custom domain jika diperlukan

### File Konfigurasi Vercel

Project sudah dilengkapi dengan:
- `vercel.json` - Konfigurasi deployment
- `public/manifest.json` - PWA manifest
- `.gitignore` yang sudah dioptimasi untuk Vercel

### Build Command

Vercel akan otomatis menjalankan:
```bash
npm run build
```

### Output Directory

Build files akan disimpan di folder `build/` yang sudah tidak di-ignore oleh Git.

## ✅ Status Deployment

- ✅ `.gitignore` sudah dioptimasi untuk Vercel
- ✅ `public/` folder tidak di-ignore
- ✅ `build/` folder tidak di-ignore
- ✅ `vercel.json` sudah dikonfigurasi
- ✅ `manifest.json` sudah dibuat
- ✅ Build test berhasil
2. Pastikan frontend berjalan di port 3000
3. Buka browser: `http://localhost:3000`
4. Navigate ke halaman "Temperature" untuk melihat monitoring

##️ Troubleshooting

### Masalah Umum

**1\. Port sudah digunakan**

# Cek port yang digunakan
netstat -ano | findstr :8000
netstat -ano | findstr :3000

# Kill process jika perlu
taskkill /PID [PID_NUMBER] /F

**2\. Dependencies tidak terinstall**

# Backend
cd api
pip install -r requirements.txt

# Frontend
npm install

**3\. Database error**

# Hapus file database dan restart
cd api
del temperature.db
uvicorn app:app --reload --host 0.0.0.0 --port 8000

**4\. CORS error di frontend**

* Pastikan API berjalan di `http://localhost:8000`
* Cek file `src/config.js` untuk URL API

### Error Messages

**"Module not found"**

* Jalankan `npm install` di folder root
* Jalankan `pip install -r requirements.txt` di folder api

**"Address already in use"**

* Cek apakah ada aplikasi lain yang menggunakan port 8000 atau 3000
* Gunakan port berbeda: `uvicorn app:app --reload --host 0.0.0.0 --port 8001`

**"Database locked"**

* Tutup semua aplikasi yang mengakses database
* Restart API server

## 📱 Cara Menggunakan Aplikasi

1. **Buka browser** dan kunjungi `http://localhost:3000`
2. **Navigasi menu:**  
   * **Home**: Halaman utama  
   * **About**: Informasi tentang SmartGarden  
   * **Contact**: Form kontak  
   * **Temperature**: Monitoring temperature real-time
3. **Di halaman Temperature:**  
   * Lihat data temperature dan humidity saat ini  
   * Lihat grafik riwayat data  
   * Data akan auto-refresh setiap 5 detik

## 🔄 Auto-Start Script (Windows)

Buat file `start.bat` di root folder:

@echo off
echo Starting SmartGarden Project...
echo.

echo Starting API Server...
start "API Server" cmd /k "cd api && uvicorn app:app --reload --host 0.0.0.0 --port 8000"

echo Waiting 3 seconds...
timeout /t 3 /nobreak > nul

echo Starting Frontend...
start "Frontend" cmd /k "npm start"

echo.
echo SmartGarden is starting...
echo API: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
pause

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

## 🤝 Support

Jika ada masalah atau pertanyaan:
1. Cek bagian Troubleshooting di atas
2. Pastikan semua dependencies terinstall dengan benar
3. Restart kedua server (API dan Frontend)
4. Cek console browser untuk error JavaScript
5. Cek terminal untuk error Python/Node.js

---

**Happy Coding! 🌱** 