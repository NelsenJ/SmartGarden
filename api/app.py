from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, Float, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import random
import datetime
from typing import List, Optional
import os
from contextlib import asynccontextmanager

# Generate initial dummy data when app starts
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan event handler for FastAPI"""
    # Startup
    db = SessionLocal()
    try:
        # Check if we already have data
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
    
    print("🚀 SmartGarden Temperature API is running!")
    print("📍 Local: http://localhost:8000")
    print("📊 API Endpoints:")
    print("   - GET /api/temperature")
    print("   - GET /api/temperature/history")
    print("   - GET /api/temperature/stats")
    print("   - GET /api/health")
    print("   - POST /api/temperature/generate-dummy")
    print("📖 Documentation: http://localhost:8000/docs")
    
    yield
    
    # Shutdown
    print("🛑 Shutting down SmartGarden API...")

# FastAPI app initialization with lifespan
app = FastAPI(
    title="SmartGarden Temperature API",
    description="API untuk monitoring temperature dan humidity di SmartGarden",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./temperature.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Pydantic models for API responses
class TemperatureData(BaseModel):
    temperature: float
    humidity: float
    timestamp: str
    location: str = "SmartGarden Home"
    unit: str = "celsius"

class TemperatureHistory(BaseModel):
    history: List[TemperatureData]
    count: int

class TemperatureStats(BaseModel):
    average_temperature: float
    min_temperature: float
    max_temperature: float
    average_humidity: float

class HealthResponse(BaseModel):
    status: str
    timestamp: str
    service: str

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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def generate_dummy_data():
    """Generate realistic temperature and humidity data"""
    # Simulate realistic temperature (20-30°C) and humidity (40-80%)
    temperature = round(random.uniform(20, 30), 1)
    humidity = round(random.uniform(40, 80), 1)
    return temperature, humidity

@app.get("/", response_model=dict)
async def home():
    """Root endpoint with API information"""
    return {
        "message": "SmartGarden Temperature API",
        "version": "1.0.0",
        "endpoints": {
            "/api/temperature": "Get current temperature",
            "/api/temperature/history": "Get temperature history",
            "/api/temperature/stats": "Get temperature statistics",
            "/api/health": "Health check",
            "/docs": "API documentation"
        }
    }

@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.datetime.now().isoformat(),
        service="SmartGarden Temperature API"
    )

@app.get("/api/temperature", response_model=TemperatureData)
async def get_current_temperature():
    """Get current temperature and humidity data"""
    temperature, humidity = generate_dummy_data()
    timestamp = datetime.datetime.now()
    
    # Store in database
    db = SessionLocal()
    try:
        record = TemperatureRecord(
            temperature=temperature,
            humidity=humidity,
            timestamp=timestamp
        )
        db.add(record)
        db.commit()
    finally:
        db.close()
    
    return TemperatureData(
        temperature=temperature,
        humidity=humidity,
        timestamp=timestamp.isoformat(),
        location="SmartGarden Home",
        unit="celsius"
    )

@app.get("/api/temperature/history", response_model=TemperatureHistory)
async def get_temperature_history(limit: int = 50):
    """Get temperature history from database"""
    try:
        db = SessionLocal()
        records = db.query(TemperatureRecord).order_by(
            TemperatureRecord.timestamp.desc()
        ).limit(limit).all()
        
        history = []
        for record in records:
            history.append(TemperatureData(
                temperature=record.temperature,
                humidity=record.humidity,
                timestamp=record.timestamp.isoformat(),
                location=record.location,
                unit="celsius"
            ))
        
        return TemperatureHistory(history=history, count=len(history))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

@app.get("/api/temperature/stats", response_model=TemperatureStats)
async def get_temperature_stats():
    """Get temperature statistics"""
    try:
        db = SessionLocal()
        from sqlalchemy import func
        
        result = db.query(
            func.avg(TemperatureRecord.temperature).label('avg_temp'),
            func.min(TemperatureRecord.temperature).label('min_temp'),
            func.max(TemperatureRecord.temperature).label('max_temp'),
            func.avg(TemperatureRecord.humidity).label('avg_humidity')
        ).first()
        
        return TemperatureStats(
            average_temperature=round(result.avg_temp, 1) if result.avg_temp else 0,
            min_temperature=round(result.min_temp, 1) if result.min_temp else 0,
            max_temperature=round(result.max_temp, 1) if result.max_temp else 0,
            average_humidity=round(result.avg_humidity, 1) if result.avg_humidity else 0
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

@app.post("/api/temperature/generate-dummy")
async def generate_dummy_records(count: int = 10):
    """Generate dummy temperature records for testing"""
    try:
        db = SessionLocal()
        records_created = 0
        
        for _ in range(count):
            temperature, humidity = generate_dummy_data()
            record = TemperatureRecord(
                temperature=temperature,
                humidity=humidity,
                timestamp=datetime.datetime.now() - datetime.timedelta(
                    hours=random.randint(0, 24),
                    minutes=random.randint(0, 60)
                )
            )
            db.add(record)
            records_created += 1
        
        db.commit()
        return {"message": f"Generated {records_created} dummy records"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 