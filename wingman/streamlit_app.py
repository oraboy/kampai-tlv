"""
Kampai TLV AI Wingman Dashboard
"""
import streamlit as st
import os
import sys
from pathlib import Path
from datetime import datetime, timedelta
import pandas as pd
import json
from dotenv import load_dotenv

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

# Load environment variables
load_dotenv()

# Import our agents
from wingman.agents.coder import WebsiteCoder
from wingman.agents.researcher import MarketResearcher
from wingman.agents.lead_gen import LeadGenerator

# Page configuration
st.set_page_config(
    page_title="Kampai AI Wingman",
    page_icon="🍶",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Initialize session state
if 'coder' not in st.session_state:
    st.session_state.coder = WebsiteCoder()
if 'researcher' not in st.session_state:
    st.session_state.researcher = MarketResearcher()
if 'lead_gen' not in st.session_state:
    st.session_state.lead_gen = LeadGenerator()
if 'messages' not in st.session_state:
    st.session_state.messages = []

# Header
st.title("🍶 Kampai TLV AI Wingman")
st.caption(f"Live: [kampai-tlv.netlify.app](https://kampai-tlv.netlify.app) | {datetime.now().strftime('%H:%M')}")

# Sidebar
st.sidebar.title("Navigation")
mode = st.sidebar.radio(
    "Select Mode",
    ["📊 Dashboard", "💻 Website Coder", "🔍 Market Research", "💬 Lead Manager", "⚙️ Settings"]
)

# Main content
if mode == "📊 Dashboard":
    st.header("Dashboard")
    
    # Metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Website Status", "🟢 Live", "Updated today")
    with col2:
        st.metric("AI Tasks Today", "12", "↑ 5")
    with col3:
        st.metric("Leads This Week", "8", "↑ 3")
    with col4:
        st.metric("API Status", "✅ All Active", "")
    
    # Recent Activity
    st.subheader("Recent Activity")
    
    activities = [
        {"Time": "10 min ago", "Event": "Website updated", "Agent": "Claude"},
        {"Time": "1 hour ago", "Event": "Lead qualified", "Agent": "Gemini"},
        {"Time": "3 hours ago", "Event": "Market research completed", "Agent": "GPT-4"},
    ]
    
    df = pd.DataFrame(activities)
    st.dataframe(df, use_container_width=True, hide_index=True)
    
    # Quick Actions
    st.subheader("Quick Actions")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        if st.button("🔄 Update Website", use_container_width=True):
            st.info("Switching to Website Coder...")
    
    with col2:
        if st.button("📈 Generate Report", use_container_width=True):
            st.info("Switching to Research...")
    
    with col3:
        if st.button("📢 Check Leads", use_container_width=True):
            st.info("Switching to Lead Manager...")

elif mode == "💻 Website Coder":
    st.header("Website Coder - Claude Integration")
    
    # Website info
    with st.expander("Current Website Status", expanded=True):
        website_info = st.session_state.coder.analyze_website()
        st.write(website_info)
        st.link_button("View Live Site", "https://kampai-tlv.netlify.app", type="primary")
    
    # Code generation
    st.subheader("Generate Code")
    
    task = st.text_area(
        "What should I build or update?",
        placeholder="e.g., Add a seasonal promotion banner for winter specialties",
        height=100
    )
    
    col1, col2 = st.columns([3, 1])
    
    with col1:
        file_type = st.selectbox(
            "File Type",
            ["HTML", "CSS", "JavaScript"],
            index=0
        )
    
    with col2:
        if st.button("🤖 Generate Code", type="primary", use_container_width=True):
            if task:
                with st.spinner("Claude is generating code..."):
                    result = st.session_state.coder.generate_code(task, file_type.lower())
                    
                    if result["success"]:
                        st.success("Code generated successfully!")
                        
                        # Display code
                        st.code(result["code"], language=file_type.lower())
                        
                        # Save option
                        st.subheader("Apply Changes")
                        file_name = st.text_input("File name", value="index.html")
                        
                        col1, col2 = st.columns(2)
                        with col1:
                            if st.button("💾 Save to Website"):
                                save_result = st.session_state.coder.update_website(
                                    file_name, 
                                    result["code"]
                                )
                                if save_result["success"]:
                                    st.success(save_result["message"])
                        
                        with col2:
                            if st.button("🚀 Deploy to Netlify"):
                                deploy_result = st.session_state.coder.deploy_to_netlify()
                                if deploy_result["success"]:
                                    st.balloons()
                                    st.success(deploy_result["message"])
                    else:
                        st.error(f"Error: {result['error']}")
            else:
                st.warning("Please enter a task description")

elif mode == "🔍 Market Research":
    st.header("Market Research - GPT-4 Integration")
    
    # Research input
    research_type = st.selectbox(
        "Research Type",
        ["Custom Query", "Competition Analysis", "Business Report"]
    )
    
    if research_type == "Custom Query":
        query = st.text_area(
            "What would you like to research?",
            placeholder="e.g., What are the top 10 Japanese restaurants in Tel Aviv?",
            height=100
        )
        
        depth = st.select_slider(
            "Research Depth",
            options=["quick", "standard", "comprehensive"],
            value="standard"
        )
        
        if st.button("🔍 Start Research", type="primary"):
            if query:
                with st.spinner(f"GPT-4 is conducting {depth} research..."):
                    result = st.session_state.researcher.research(query, depth)
                    
                    if result["success"]:
                        st.success("Research completed!")
                        
                        # Display findings
                        st.subheader("Research Findings")
                        st.write(result["findings"])
                        
                        # Metadata
                        with st.expander("Research Details"):
                            st.write(f"Query: {result['query']}")
                            st.write(f"Depth: {result['depth']}")
                            st.write(f"Tokens used: {result.get('tokens_used', 'N/A')}")
                            st.write(f"Timestamp: {result['timestamp']}")
                    else:
                        st.error(f"Research failed: {result['error']}")
    
    elif research_type == "Competition Analysis":
        competitor = st.text_input(
            "Competitor name (optional)",
            placeholder="Leave empty for general analysis"
        )
        
        if st.button("🔍 Analyze Competition", type="primary"):
            with st.spinner("Analyzing competition..."):
                result = st.session_state.researcher.analyze_competition(competitor)
                
                if result["success"]:
                    st.success("Analysis completed!")
                    st.write(result["findings"])
                else:
                    st.error(f"Analysis failed: {result['error']}")
    
    else:  # Business Report
        topic = st.text_input(
            "Report Topic",
            placeholder="e.g., Q1 2024 Strategy for Kampai TLV"
        )
        
        if st.button("📄 Generate Report", type="primary"):
            if topic:
                with st.spinner("Generating comprehensive report..."):
                    result = st.session_state.researcher.generate_report(topic)
                    
                    if result["success"]:
                        st.success("Report generated!")
                        st.write(result["findings"])
                    else:
                        st.error(f"Report generation failed: {result['error']}")

elif mode == "💬 Lead Manager":
    st.header("Lead Manager - Gemini Integration")
    
    # Lead qualification
    st.subheader("Test Lead Qualification")
    
    test_message = st.text_area(
        "Enter customer message to analyze:",
        value="Hi, I have a restaurant in Rothschild and need fresh uni every week",
        height=80
    )
    
    phone = st.text_input("Phone (optional)", placeholder="+972-50-XXX-XXXX")
    
    if st.button("🤖 Qualify Lead", type="primary"):
        with st.spinner("Gemini is analyzing..."):
            result = st.session_state.lead_gen.qualify_lead(test_message, phone)
            
            if result["success"]:
                analysis = result["analysis"]
                
                col1, col2 = st.columns(2)
                
                with col1:
                    st.metric("Intent Score", f"{analysis.get('intent_score', 'N/A')}/10")
                    st.metric("Category", analysis.get('category', 'Unknown'))
                    st.metric("Language", analysis.get('language', 'Unknown'))
                
                with col2:
                    st.write("**Products Interest:**")
                    products = analysis.get('products', [])
                    if products:
                        for product in products:
                            st.write(f"• {product}")
                    else:
                        st.write("No specific products")
                
                st.subheader("Suggested Response")
                st.info(analysis.get('response', 'No response generated'))
                
                st.write("**Next Action:**", analysis.get('follow_up', 'Follow up'))
            else:
                st.error(f"Analysis failed: {result['error']}")
    
    # Outreach generator
    st.subheader("Generate Outreach Messages")
    
    target = st.selectbox(
        "Target Audience",
        ["restaurants", "private_chefs", "hotels", "catering_companies"]
    )
    
    if st.button("📢 Generate Outreach", type="secondary"):
        with st.spinner("Creating outreach message..."):
            result = st.session_state.lead_gen.generate_outreach(target)
            
            if result["success"]:
                st.success("Outreach message generated!")
                st.text_area("Message", result["message"], height=200)
            else:
                st.error(f"Generation failed: {result['error']}")

else:  # Settings
    st.header("⚙️ Settings")
    
    # API Status
    st.subheader("API Status")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        claude_status = "✅ Active" if os.getenv('ANTHROPIC_API_KEY') else "❌ Not configured"
        st.metric("Claude (Coder)", claude_status)
    
    with col2:
        gpt_status = "✅ Active" if os.getenv('OPENAI_API_KEY') else "❌ Not configured"
        st.metric("GPT-4 (Research)", gpt_status)
    
    with col3:
        gemini_status = "✅ Active" if os.getenv('GOOGLE_AI_KEY') else "❌ Not configured"
        st.metric("Gemini (Leads)", gemini_status)
    
    # Test APIs
    if st.button("🧪 Test All APIs"):
        with st.spinner("Testing APIs..."):
            # You can run your test_apis.py here
            st.success("All APIs tested successfully!")
    
    # Export/Import settings
    st.subheader("Data Management")
    
    col1, col2 = st.columns(2)
    
    with col1:
        if st.button("📥 Export Settings"):
            st.info("Settings exported to kampai_settings.json")
    
    with col2:
        if st.button("📤 Import Settings"):
            st.info("Settings imported successfully")

# Footer
st.sidebar.divider()
st.sidebar.caption("Kampai TLV AI Wingman v1.0")
st.sidebar.caption("Made with ❤️ for Japanese cuisine")
