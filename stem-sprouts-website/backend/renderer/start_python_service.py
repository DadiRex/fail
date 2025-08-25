#!/usr/bin/env python3
"""
Startup script for the AI STEM Video Bot Python service
"""

import subprocess
import sys
import os
import time
import webbrowser
from pathlib import Path

def check_python_dependencies():
    """Check if required Python packages are installed"""
    required_packages = [
        'flask', 'flask-cors', 'moviepy', 'PIL', 'numpy', 'cv2'
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
            print(f"✓ {package}")
        except ImportError:
            missing_packages.append(package)
            print(f"✗ {package} - MISSING")
    
    if missing_packages:
        print(f"\nMissing packages: {', '.join(missing_packages)}")
        print("Install them with: pip install -r requirements.txt")
        return False
    
    return True

def start_python_service():
    """Start the Python video processor service"""
    print("Starting Python Video Processor Service...")
    
    # Get the directory of this script
    script_dir = Path(__file__).parent
    
    # Change to the script directory
    os.chdir(script_dir)
    
    # Start the Flask service
    try:
        print("Starting service on http://localhost:5000")
        print("Press Ctrl+C to stop the service")
        
        # Import and run the Flask app
        from video_processor import app
        app.run(host='0.0.0.0', port=5000, debug=True)
        
    except KeyboardInterrupt:
        print("\nService stopped by user")
    except Exception as e:
        print(f"Error starting service: {e}")
        print("Make sure all dependencies are installed")

def main():
    """Main startup function"""
    print("=" * 50)
    print("AI STEM Video Bot - Python Service")
    print("=" * 50)
    
    print("\nChecking dependencies...")
    if not check_python_dependencies():
        print("\nPlease install missing dependencies first.")
        return
    
    print("\nAll dependencies are available!")
    print("\nStarting service...")
    
    # Start the service
    start_python_service()

if __name__ == "__main__":
    main() 