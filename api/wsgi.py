import sys
import os

# Add the current directory to the Python path
sys.path.insert(0, os.path.dirname(__file__))

from app import app

# For WSGI compatibility (if needed for some deployment platforms)
application = app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 