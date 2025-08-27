#!/usr/bin/env python3
"""Test Gemini API specifically"""

import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment
load_dotenv()

# Configure
api_key = os.getenv('GOOGLE_AI_KEY')
if not api_key:
    print("❌ No Google API key found in .env")
    exit(1)

genai.configure(api_key=api_key)

print("🔍 Checking available Gemini models...\n")

# List all available models
try:
    models = genai.list_models()
    print("Available models that support content generation:")
    for model in models:
        if 'generateContent' in model.supported_generation_methods:
            print(f"  ✅ {model.name}")
            print(f"     Display name: {model.display_name}")
            print(f"     Description: {model.description[:100]}...")
            print()
except Exception as e:
    print(f"❌ Error listing models: {e}")
    exit(1)

# Test the recommended model
print("\n🧪 Testing gemini-1.5-flash model...")
try:
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content("Say 'Kampai TLV Gemini works!'")
    print(f"✅ Success: {response.text}")
except Exception as e:
    print(f"❌ Error: {e}")
    
    # Try older model
    print("\n🧪 Trying gemini-1.0-pro model...")
    try:
        model = genai.GenerativeModel('gemini-1.0-pro')
        response = model.generate_content("Say 'Kampai TLV Gemini works!'")
        print(f"✅ Success: {response.text}")
    except Exception as e2:
        print(f"❌ Error: {e2}")
