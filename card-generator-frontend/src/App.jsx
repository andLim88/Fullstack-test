import { useState } from 'react';
import CardForm from './components/CardForm';
import CardPreview from './components/CardPreview';

function App() {
  const [cardData, setCardData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (values) => {
    setIsGenerating(true);
    try {
      setCardData(values);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
          <div>
            <CardForm onSubmit={handleSubmit} isGenerating={isGenerating} />
          </div>
          {cardData && (
            <div>
              <CardPreview 
                cardData={{
                  recipientName: cardData.recipientName,
                  message: cardData.message,
                  senderName: cardData.senderName
                }} 
                backgroundImage={cardData.backgroundImage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;