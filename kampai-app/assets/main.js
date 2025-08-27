// WhatsApp Integration
function openWhatsApp() {
    const phone = "972501234567"; // Replace with your actual number
    const message = "שלום! אני מעוניין במוצרים יפניים של Kampai TLV";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

// Product functions
function showProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function orderProduct(product) {
    const phone = "972501234567";
    const message = `שלום! אני מעוניין להזמין ${product}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

// AI Chat
let chatOpen = false;

function toggleChat() {
    chatOpen = !chatOpen;
    const chatWindow = document.getElementById('chat-window');
    chatWindow.style.display = chatOpen ? 'flex' : 'none';
    
    if (chatOpen && document.getElementById('messages').children.length === 0) {
        addMessage('bot', 'שלום! אני העוזר של Kampai TLV. איך אפשר לעזור?');
    }
}

function addMessage(sender, text) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        margin: 10px 0;
        padding: 10px;
        border-radius: 10px;
        ${sender === 'bot' ? 
            'background: #f0f0f0; margin-right: 20%;' : 
            'background: #E63946; color: white; margin-left: 20%; text-align: right;'}
    `;
    messageDiv.innerHTML = sender === 'bot' ? `🤖 ${text}` : text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleChat(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message) {
            addMessage('user', message);
            input.value = '';
            
            // Simulate AI response
            setTimeout(() => {
                const responses = {
                    'uni': 'האוני שלנו מגיע טרי מהוקאידו כל שבוע. מחיר: ₪450 ל-100 גרם.',
                    'wagyu': 'בקר וואגיו A5 ממיאזאקי. דורש הזמנה מראש. מחיר: ₪850 לקילו.',
                    'sake': 'יש לנו מבחר מעולה של סאקה פרימיום. מחירים מתחילים מ-₪180.',
                    'default': 'תודה על השאלה! צור איתנו קשר ב-WhatsApp לפרטים נוספים.'
                };
                
                let response = responses.default;
                const lowerMessage = message.toLowerCase();
                
                if (lowerMessage.includes('אוני') || lowerMessage.includes('uni')) {
                    response = responses.uni;
                } else if (lowerMessage.includes('וואגיו') || lowerMessage.includes('wagyu')) {
                    response = responses.wagyu;
                } else if (lowerMessage.includes('סאקה') || lowerMessage.includes('sake')) {
                    response = responses.sake;
                }


