import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI Coastal Safety Assistant. Ask me about current threats, evacuation centers, or safety recommendations.',
      timestamp: new Date()
    }
  ]);

  const quickQuestions = [
    'Am I safe to fish today?',
    'Where is the nearest evacuation center?',
    'What\'s the current cyclone risk?',
    'Show me safe swimming areas'
  ];

  // Define responses to quick questions
  const getBotResponse = (question: string) => {
    switch (question) {
      case 'Am I safe to fish today?':
        return 'Fishing conditions are safe today. No warnings reported.';
      case 'Where is the nearest evacuation center?':
        return 'The nearest evacuation center is at 5th Avenue, Coastal Shelter, 24/7 operation.';
      case 'What\'s the current cyclone risk?':
        return 'Currently, there is no cyclone risk in your area. Conditions are calm.';
      case 'Show me safe swimming areas':
        return 'Safe swimming areas today: North Beach and South Bay. No rip currents detected.';
      default:
        return 'I\'m still learning, but I can help with safety-related questions! Try asking about coastal conditions or evacuation centers.';
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Generate a bot response based on the question
    const botResponse = {
      id: messages.length + 2,
      type: 'bot',
      content: getBotResponse(message),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botResponse]);
  };

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
    const botResponse = {
      id: messages.length + 1,
      type: 'user',
      content: question,
      timestamp: new Date()
    };

    setMessages([...messages, botResponse]);

    // Generate a bot response based on the quick question
    const quickBotResponse = {
      id: messages.length + 2,
      type: 'bot',
      content: getBotResponse(question),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, quickBotResponse]);
  };

  return (
    <>
      {/* Chat Widget Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-widget"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Panel */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-100 h-120 bg-card border shadow-elevated animate-fade-in-scale z-50">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
              <h3 className="font-semibold text-sm">AI Safety Assistant</h3>
              <p className="text-xs opacity-90">Real-time coastal threat guidance</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-2 rounded-lg text-sm ${
                      msg.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Questions */}
            <div className="p-3 border-t">
              <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
              <div className="grid grid-cols-1 gap-1">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs h-auto py-1 px-2 justify-start text-left"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about safety conditions..."
                className="text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button size="sm" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatWidget;
