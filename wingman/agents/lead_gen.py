"""
Lead Generation Agent - Uses Gemini
"""
import os
import json
import google.generativeai as genai
from typing import Dict
from datetime import datetime

class LeadGenerator:
    def __init__(self):
        genai.configure(api_key=os.getenv('GOOGLE_AI_KEY'))
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        
    def qualify_lead(self, message: str, phone: str = None) -> Dict:
        """Qualify and respond to leads"""
        
        prompt = f"""
        You are an assistant for Kampai TLV, premium Japanese food imports in Tel Aviv.
        
        Customer message: {message}
        
        Analyze and respond:
        1. Detect language (Hebrew/English)
        2. Intent score (1-10, where 10 is ready to buy)
        3. Category: restaurant/chef/home/other
        4. Products interested in
        5. Appropriate response (in their language)
        
        Our products:
        - Uni (sea urchin) - ₪450/100g
        - Wagyu A5 - ₪850/kg
        - Premium Sake - ₪180+
        - Seasonal fish - market price
        
        Format as JSON:
        {{
            "language": "hebrew/english",
            "intent_score": 1-10,
            "category": "type",
            "products": ["list"],
            "response": "your response",
            "follow_up": "next action"
        }}
        """
        
        try:
            response = self.model.generate_content(prompt)
            
            # Parse JSON from response
            try:
                # Clean the response to get JSON
                text = response.text
                if "```json" in text:
                    text = text.split("```json")[1].split("```")[0]
                elif "```" in text:
                    text = text.split("```")[1].split("```")[0]
                
                result = json.loads(text.strip())
            except:
                # Fallback parsing
                result = {
                    "language": "english",
                    "intent_score": 5,
                    "category": "unknown",
                    "products": [],
                    "response": response.text[:200] if response.text else "Thank you for your interest!",
                    "follow_up": "contact_customer"
                }
            
            result["phone"] = phone
            result["timestamp"] = datetime.now().isoformat()
            
            return {
                "success": True,
                "analysis": result
            }
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def generate_outreach(self, target: str = "restaurants") -> Dict:
        """Generate outreach messages"""
        
        prompt = f"""
        Create an outreach message for {target} in Tel Aviv about Kampai TLV's Japanese imports.
        
        Make it:
        - Personal and professional
        - Highlight our unique value (direct from Japan, premium quality)
        - Include a clear call-to-action
        - In both Hebrew and English
        
        Keep it under 100 words per language.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return {
                "success": True,
                "message": response.text,
                "target": target
            }
        except Exception as e:
            return {"success": False, "error": str(e)}
