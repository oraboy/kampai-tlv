"""
Market Research Agent - Uses GPT-4/OpenAI
"""
import os
from datetime import datetime
from openai import OpenAI
from typing import Dict, List

class MarketResearcher:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self.model = "gpt-4-turbo-preview"  # Update to gpt-5 when available
        
    def research(self, query: str, depth: str = "standard") -> Dict:
        """Conduct market research"""
        
        depth_tokens = {
            "quick": 500,
            "standard": 1500,
            "comprehensive": 3000
        }
        
        system_prompt = """
        You are a market research expert specializing in Japanese food imports to Israel.
        You have deep knowledge of:
        - Tel Aviv restaurant scene
        - Japanese cuisine trends
        - Import regulations
        - Pricing strategies
        - Competition analysis
        
        Provide actionable insights with specific recommendations.
        """
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": query}
                ],
                max_tokens=depth_tokens.get(depth, 1500),
                temperature=0.7
            )
            
            findings = response.choices[0].message.content
            
            return {
                "success": True,
                "findings": findings,
                "query": query,
                "depth": depth,
                "timestamp": datetime.now().isoformat(),
                "tokens_used": response.usage.total_tokens
            }
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def analyze_competition(self, competitor_name: str = None) -> Dict:
        """Analyze competition"""
        query = f"""
        Analyze the Japanese food import market in Tel Aviv.
        {f'Focus on {competitor_name}' if competitor_name else 'List main competitors'}
        
        Include:
        1. Main players
        2. Their strengths/weaknesses
        3. Pricing strategies
        4. Market gaps we can fill
        5. Recommendations for Kampai TLV
        """
        
        return self.research(query, "comprehensive")
    
    def generate_report(self, topic: str) -> Dict:
        """Generate a business report"""
        query = f"""
        Create a business report on: {topic}
        
        Format:
        - Executive Summary
        - Market Analysis
        - Opportunities
        - Risks
        - Recommendations
        - Action Items
        """
        
        return self.research(query, "comprehensive")
