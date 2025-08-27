"""
Website Coder Agent - Uses Claude/Anthropic
"""
import os
import subprocess
from pathlib import Path
from datetime import datetime
import anthropic
from typing import Dict

class WebsiteCoder:
    def __init__(self):
        self.client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
        self.website_path = Path(__file__).parent.parent.parent / "kampai-app"
        
    def analyze_website(self) -> str:
        """Analyze current website structure"""
        files = []
        for file in self.website_path.glob("**/*"):
            if file.is_file() and not file.name.startswith('.'):
                files.append(str(file.relative_to(self.website_path)))
        return f"Website files: {', '.join(files[:10])}"
    
    def generate_code(self, task: str, file_type: str = "html") -> Dict:
        """Generate code using Claude"""
        
        # Read current website context
        context = ""
        if (self.website_path / "index.html").exists():
            with open(self.website_path / "index.html", "r") as f:
                context = f.read()[:1000]  # First 1000 chars
        
        prompt = f"""
        You are a web developer for Kampai TLV, a premium Japanese food import business.
        
        Current website context:
        {context}
        
        Task: {task}
        
        Generate {file_type} code that:
        1. Is modern and professional
        2. Matches the existing style
        3. Is mobile-responsive
        4. Uses the color scheme: #E63946 (primary), #1D3557 (secondary)
        
        Provide only the code, no explanations.
        """
        
        try:
            response = self.client.messages.create(
                model="claude-3-sonnet-20240229",
                max_tokens=2000,
                messages=[{"role": "user", "content": prompt}]
            )
            
            code = response.content[0].text
            
            return {
                "success": True,
                "code": code,
                "task": task,
                "timestamp": datetime.now().isoformat()
            }
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def update_website(self, file_name: str, content: str) -> Dict:
        """Update a website file"""
        try:
            file_path = self.website_path / file_name
            
            # Backup existing file
            if file_path.exists():
                backup_path = file_path.with_suffix(f'.backup-{datetime.now().strftime("%Y%m%d-%H%M%S")}')
                file_path.rename(backup_path)
            
            # Write new content
            with open(file_path, 'w') as f:
                f.write(content)
            
            return {
                "success": True,
                "message": f"Updated {file_name}",
                "backup": str(backup_path) if 'backup_path' in locals() else None
            }
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def deploy_to_netlify(self) -> Dict:
        """Deploy changes to Netlify"""
        try:
            os.chdir(self.website_path)
            result = subprocess.run(
                ["netlify", "deploy", "--prod", "--dir", "."],
                capture_output=True,
                text=True
            )
            
            if result.returncode == 0:
                return {
                    "success": True,
                    "message": "Deployed to Netlify successfully!",
                    "url": "https://kampai-tlv.netlify.app"
                }
            else:
                return {"success": False, "error": result.stderr}
        except Exception as e:
            return {"success": False, "error": str(e)}
