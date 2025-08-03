# 🚀 Panduan Deployment SmartGarden ke PythonAnywhere

Panduan lengkap untuk mendeploy project SmartGarden (FastAPI + React) ke PythonAnywhere.

## 📋 Prerequisites

- Akun PythonAnywhere (gratis atau berbayar)
- Git repository SmartGarden di GitHub
- Domain (opsional, untuk custom domain)

## 🔧 Langkah 1: Persiapan Repository

### 1.1 Upload ke GitHub
```bash
# Inisialisasi git (jika belum)
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit: SmartGarden project"

# Buat repository di GitHub, lalu push
git remote add origin https://github.com/username/SmartGarden.git
git branch -M main
git push -u origin main
```

### 1.2 Pastikan .gitignore sudah benar
File `.gitignore` sudah ada dan mencakup:
- `node_modules/`
- `__pycache__/`
- `*.db` (database SQLite)
- `.env` files
- Build files

## 🌐 Langkah 2: Setup PythonAnywhere

### 2.1 Login ke PythonAnywhere
1. Buka [www.pythonanywhere.com](https://www.pythonanywhere.com)
2. Sign up atau login
3. Pilih plan (Free atau Paid)

### 2.2 Clone Repository
```bash
# Di PythonAnywhere Bash Console
cd ~
git clone https://github.com/username/SmartGarden.git
cd SmartGarden
```

### 2.3 Setup Virtual Environment
```bash
# Buat virtual environment
python3 -m venv smartgarden_env

# Aktifkan virtual environment
source smartgarden_env/bin/activate

# Install dependencies
cd api
pip install -r requirements.txt
```

## 🔧 Langkah 3: Konfigurasi Web App

### 3.1 Buat Web App
1. Buka **Web** tab di PythonAnywhere
2. Klik **Add a new web app**
3. Pilih **Manual configuration**
4. Pilih **Python 3.9** (atau versi terbaru)

### 3.2 Konfigurasi WSGI
1. Klik **WSGI configuration file**
2. Ganti isi file dengan:

```python
import sys
import os

# Add project directory to Python path
path = '/home/username/SmartGarden/api'
if path not in sys.path:
    sys.path.append(path)

# Import FastAPI app
from app import app

# For WSGI compatibility
application = app
```

### 3.3 Set Working Directory
1. Di **Web** tab, set **Working directory** ke:
   ```
   /home/username/SmartGarden/api
   ```

### 3.4 Environment Variables
1. Di **Web** tab, tambahkan environment variables:
   ```
   PYTHONPATH=/home/username/SmartGarden/api
   ```

## 🗄️ Langkah 4: Setup Database

### 4.1 Database SQLite
```bash
# Di PythonAnywhere Bash Console
cd ~/SmartGarden/api

# Aktifkan virtual environment
source ~/smartgarden_env/bin/activate

# Jalankan aplikasi untuk membuat database
python -c "from app import app; print('Database created')"
```

### 4.2 Set Database Permissions
```bash
# Pastikan database bisa diakses
chmod 666 temperature.db
```

## 🌐 Langkah 5: Konfigurasi Domain

### 5.1 Free Account
- URL: `username.pythonanywhere.com`
- Subdomain: `smartgarden.username.pythonanywhere.com`

### 5.2 Paid Account (Custom Domain)
1. Di **Web** tab, klik **Add a new domain**
2. Masukkan domain Anda
3. Update DNS records di provider domain

## 🔧 Langkah 6: Deploy Frontend

### 6.1 Build React App
```bash
# Di local machine atau PythonAnywhere
cd frontend
npm install
npm run build
```

### 6.2 Upload Build Files
1. Upload folder `build/` ke PythonAnywhere
2. Atau build di PythonAnywhere (jika ada Node.js)

### 6.3 Serve Static Files
1. Di **Web** tab, tambahkan static files:
   - URL: `/static/`
   - Directory: `/home/username/SmartGarden/frontend/build/`

## 🔧 Langkah 7: Konfigurasi CORS

### 7.1 Update CORS di API
Edit file `api/app.py`:

```python
# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://username.pythonanywhere.com",
        "https://smartgarden.username.pythonanywhere.com",
        "http://localhost:3000"  # Untuk development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 7.2 Update Frontend Config
Edit file `frontend/src/config.js`:

```javascript
const config = {
  // API Configuration
  API_BASE_URL: process.env.REACT_APP_API_URL || 'https://username.pythonanywhere.com',
  
  // Auto-refresh interval (in milliseconds)
  REFRESH_INTERVAL: 30000, // 30 seconds
  
  // Temperature thresholds
  TEMPERATURE_THRESHOLDS: {
    COLD: 20,    // Below this is considered cold
    HOT: 28,     // Above this is considered hot
  },
  
  // Humidity thresholds
  HUMIDITY_THRESHOLDS: {
    LOW: 40,     // Below this is considered low
    HIGH: 70,    // Above this is considered high
  }
};

export default config;
```

## 🚀 Langkah 8: Deploy dan Test

### 8.1 Reload Web App
1. Di **Web** tab, klik **Reload**
2. Tunggu beberapa detik

### 8.2 Test API
```bash
# Test health endpoint
curl https://username.pythonanywhere.com/api/health

# Test temperature endpoint
curl https://username.pythonanywhere.com/api/temperature
```

### 8.3 Test Frontend
1. Buka browser
2. Kunjungi: `https://username.pythonanywhere.com`
3. Test semua fitur

## 🔧 Langkah 9: Monitoring dan Maintenance

### 9.1 Error Logs
1. Di **Web** tab, klik **Error log**
2. Monitor error yang terjadi

### 9.2 Server Logs
1. Di **Web** tab, klik **Server log**
2. Monitor server performance

### 9.3 Database Backup
```bash
# Backup database
cp ~/SmartGarden/api/temperature.db ~/backup_temperature.db
```

## 🛠️ Troubleshooting

### Masalah Umum

**1. Import Error**
```bash
# Pastikan virtual environment aktif
source ~/smartgarden_env/bin/activate

# Install ulang dependencies
pip install -r requirements.txt
```

**2. Database Error**
```bash
# Hapus dan buat ulang database
rm ~/SmartGarden/api/temperature.db
python -c "from app import app; print('Database recreated')"
```

**3. CORS Error**
- Pastikan domain frontend sudah ditambahkan di CORS settings
- Cek apakah HTTPS/HTTP sudah benar

**4. Static Files Not Found**
- Pastikan path static files sudah benar
- Reload web app setelah mengubah static files

**5. 500 Internal Server Error**
- Cek error logs di PythonAnywhere
- Pastikan semua dependencies terinstall
- Cek WSGI configuration

### Error Messages

**"ModuleNotFoundError"**
```bash
# Install dependencies
source ~/smartgarden_env/bin/activate
pip install -r requirements.txt
```

**"Database locked"**
```bash
# Restart web app
# Atau hapus dan buat ulang database
```

**"Permission denied"**
```bash
# Set permissions
chmod 666 ~/SmartGarden/api/temperature.db
```

## 📊 Monitoring

### 9.4 Performance Monitoring
1. **CPU Usage**: Monitor di **Web** tab
2. **Memory Usage**: Cek di **Account** tab
3. **Disk Usage**: Monitor storage usage

### 9.5 Logs Monitoring
```bash
# View error logs
tail -f ~/.local/share/pythonanywhere/log_files/username.pythonanywhere.com.error.log

# View access logs
tail -f ~/.local/share/pythonanywhere/log_files/username.pythonanywhere.com.access.log
```

## 🔄 Update Deployment

### Update Code
```bash
# Pull latest changes
cd ~/SmartGarden
git pull origin main

# Install new dependencies (jika ada)
source ~/smartgarden_env/bin/activate
cd api
pip install -r requirements.txt

# Reload web app
# Klik Reload di Web tab
```

### Update Frontend
```bash
# Build ulang frontend
cd ~/SmartGarden/frontend
npm run build

# Upload build files ke static directory
# Reload web app
```

## 💡 Tips dan Best Practices

### 1. Security
- Gunakan HTTPS untuk production
- Jangan expose database credentials
- Regular backup database

### 2. Performance
- Enable gzip compression
- Optimize static files
- Monitor resource usage

### 3. Maintenance
- Regular update dependencies
- Monitor error logs
- Backup data secara berkala

### 4. Development Workflow
- Test di local sebelum deploy
- Gunakan staging environment
- Version control semua changes

## 📞 Support

Jika ada masalah:
1. Cek error logs di PythonAnywhere
2. Test di local environment
3. Cek dokumentasi PythonAnywhere
4. Contact PythonAnywhere support

---

**Happy Deploying! 🚀** 