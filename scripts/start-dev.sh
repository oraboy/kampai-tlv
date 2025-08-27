#!/bin/bash
echo "🍶 Starting Kampai TLV Development Environment"

# Load environment variables
export $(cat .env | grep -v '^#' | xargs)

# Start website preview
echo "🌐 Starting website preview on http://localhost:8000"
cd kampai-app && python -m http.server 8000 &
WEBSITE_PID=$!

# Start Streamlit
echo "🤖 Starting Wingman on http://localhost:8501"
cd ../wingman && streamlit run streamlit_app.py --server.port 8501 &
STREAMLIT_PID=$!

echo ""
echo "✅ Development environment ready!"
echo ""
echo "📝 Website: http://localhost:8000"
echo "🤖 Wingman: http://localhost:8501"
echo ""
echo "Use 'claude-code' for website development"
echo "Press Ctrl+C to stop all services"

# Wait and cleanup on exit
trap "kill $WEBSITE_PID $STREAMLIT_PID 2>/dev/null" EXIT
wait
