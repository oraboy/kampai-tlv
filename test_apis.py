#!/usr/bin/env python3
"""Test all AI APIs for Kampai TLV"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

print("🍶 Testing Kampai TLV AI APIs\n")
print("=" * 40)

# Check if keys exist
keys_status = {
    "ANTHROPIC_API_KEY": os.getenv('ANTHROPIC_API_KEY'),
    "OPENAI_API_KEY": os.getenv('OPENAI_API_KEY'),
    "GOOGLE_AI_KEY": os.getenv('GOOGLE_AI_KEY')
}

print("\n📋 API Keys Status:")
for key_name, key_value in keys_status.items():
    if key_value:
        # Show only first/last 4 chars for security
        masked = f"{key_value[:4]}...{key_value[-4:]}" if len(key_value) > 8 else "***"
        print(f"✅ {key_name}: {masked}")
    else:
        print(f"❌ {key_name}: Not set")

print("\n" + "=" * 40)
print("\n🧪 Testing API Connections:\n")

# Test Anthropic
def test_anthropic():
    try:
        import anthropic
        client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
        response = client.messages.create(
            model="claude-3-haiku-20240307",  # Using Haiku for cheap test
            max_tokens=50,
            messages=[{"role": "user", "content": "Say 'Kampai Claude works!'"}]
        )
        print(f"✅ Claude API: {response.content[0].text}")
        return True
    except Exception as e:
        print(f"❌ Claude API Error: {str(e)[:100]}")
        return False

# Test OpenAI
def test_openai():
    try:
        from openai import OpenAI
        client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Using 3.5 for cheap test
            messages=[{"role": "user", "content": "Say 'Kampai GPT works!'"}],
            max_tokens=50
        )
        print(f"✅ OpenAI API: {response.choices[0].message.content}")
        return True
    except Exception as e:
        print(f"❌ OpenAI API Error: {str(e)[:100]}")
        return False

# Test Google AI - UPDATED FOR NEW MODELS
def test_google():
    try:
        import google.generativeai as genai
        genai.configure(api_key=os.getenv('GOOGLE_AI_KEY'))
        
        # Try different Gemini models
        models_to_try = [
            'gemini-1.5-flash',  # New fast model
            'gemini-1.5-pro',    # New pro model
            'gemini-1.0-pro',    # Older but stable
        ]
        
        for model_name in models_to_try:
            try:
                model = genai.GenerativeModel(model_name)
                response = model.generate_content("Say 'Kampai Gemini works!'")
                print(f"✅ Google AI API ({model_name}): {response.text}")
                return True
            except Exception as e:
                continue
        
        # If all models fail, show available models
        print("Available Gemini models:")
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f"  - {m.name}")
        
        print("❌ Google AI API: No working model found")
        return False
        
    except Exception as e:
        print(f"❌ Google AI API Error: {str(e)[:100]}")
        return False

# Run tests
results = {
    "Claude": test_anthropic(),
    "GPT": test_openai(), 
    "Gemini": test_google()
}

print("\n" + "=" * 40)
print("\n📊 Summary:")
working = sum(results.values())
total = len(results)
print(f"✅ {working}/{total} APIs working")

if working == total:
    print("\n🎉 All AI systems operational!")
    print("Your Kampai TLV AI Wingman is ready!")
else:
    print("\n⚠️  Some APIs need configuration.")
    print("Check your API keys and try again.")

print("\n💡 Tips:")
if not results["Claude"]:
    print("- Claude: Make sure you have credits at console.anthropic.com")
if not results["GPT"]:
    print("- OpenAI: Check billing at platform.openai.com/account/billing")
if not results["Gemini"]:
    print("- Gemini: Ensure API is enabled at console.cloud.google.com")
