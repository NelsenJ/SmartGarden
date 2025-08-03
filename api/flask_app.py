from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine, Column, Integer, Float, DateTime, Text, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import random
import datetime
import os

app = Flask(__name__)
CORS(app)

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./temperature.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# SQLAlchemy model
class TemperatureRecord(Base):
    __tablename__ = "temperature_data"
    id = Column(Integer, primary_key=True, index=True)
    temperature = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    location = Column(Text, default="SmartGarden Home")

# Create tables
Base.metadata.create_all(bind=engine)

def generate_dummy_data():
    """Generate realistic temperature and humidity data"""
    temperature = round(random.uniform(20.0, 30.0), 1)
    humidity = round(random.uniform(40.0, 80.0), 1)
    return temperature, humidity

# Initialize database with dummy data
def init_db():
    db = SessionLocal()
    try:
        count = db.query(TemperatureRecord).count()
        if count == 0:
            print("🌱 Generating initial dummy data...")
            for i in range(10):
                temperature, humidity = generate_dummy_data()
                record = TemperatureRecord(
                    temperature=temperature,
                    humidity=humidity,
                    timestamp=datetime.datetime.now() - datetime.timedelta(hours=i)
                )
                db.add(record)
            db.commit()
            print(f"✅ Generated {10} initial records")
    finally:
        db.close()

# Initialize database on startup
init_db()

@app.route('/')
def home():
    return jsonify({
        "message": "🌱 SmartGarden Temperature API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "health": "/api/health",
            "current_temperature": "/api/temperature",
            "history": "/api/temperature/history",
            "stats": "/api/temperature/stats",
            "generate_dummy": "/api/temperature/generate-dummy"
        }
    })

@app.route('/api/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.datetime.now().isoformat(),
        "service": "SmartGarden Temperature API"
    })

@app.route('/api/temperature')
def get_current_temperature():
    db = SessionLocal()
    try:
        latest_record = db.query(TemperatureRecord).order_by(TemperatureRecord.timestamp.desc()).first()
        
        if not latest_record:
            # Generate new data if no records exist
            temperature, humidity = generate_dummy_data()
            record = TemperatureRecord(
                temperature=temperature,
                humidity=humidity,
                timestamp=datetime.datetime.now()
            )
            db.add(record)
            db.commit()
            latest_record = record
        
        return jsonify({
            "temperature": latest_record.temperature,
            "humidity": latest_record.humidity,
            "timestamp": latest_record.timestamp.isoformat(),
            "location": latest_record.location,
            "unit": "celsius"
        })
    finally:
        db.close()

@app.route('/api/temperature/history')
def get_temperature_history():
    limit = request.args.get('limit', 50, type=int)
    db = SessionLocal()
    try:
        records = db.query(TemperatureRecord).order_by(TemperatureRecord.timestamp.desc()).limit(limit).all()
        
        history = []
        for record in records:
            history.append({
                "temperature": record.temperature,
                "humidity": record.humidity,
                "timestamp": record.timestamp.isoformat(),
                "location": record.location,
                "unit": "celsius"
            })
        
        return jsonify({
            "history": history,
            "count": len(history)
        })
    finally:
        db.close()

@app.route('/api/temperature/stats')
def get_temperature_stats():
    db = SessionLocal()
    try:
        stats = db.query(
            func.avg(TemperatureRecord.temperature).label('avg_temp'),
            func.min(TemperatureRecord.temperature).label('min_temp'),
            func.max(TemperatureRecord.temperature).label('max_temp'),
            func.avg(TemperatureRecord.humidity).label('avg_humidity')
        ).first()
        
        return jsonify({
            "average_temperature": round(stats.avg_temp, 1) if stats.avg_temp else 0,
            "min_temperature": round(stats.min_temp, 1) if stats.min_temp else 0,
            "max_temperature": round(stats.max_temp, 1) if stats.max_temp else 0,
            "average_humidity": round(stats.avg_humidity, 1) if stats.avg_humidity else 0
        })
    finally:
        db.close()

@app.route('/api/temperature/generate-dummy', methods=['POST'])
def generate_dummy_records():
    count = request.args.get('count', 10, type=int)
    db = SessionLocal()
    try:
        for i in range(count):
            temperature, humidity = generate_dummy_data()
            record = TemperatureRecord(
                temperature=temperature,
                humidity=humidity,
                timestamp=datetime.datetime.now() - datetime.timedelta(minutes=i*5)
            )
            db.add(record)
        db.commit()
        
        return jsonify({
            "message": f"✅ Generated {count} dummy records",
            "count": count
        })
    finally:
        db.close()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000) 