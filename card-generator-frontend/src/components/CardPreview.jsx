import { useRef } from 'react';
import { toPng } from 'html-to-image';

const CardPreview = ({ cardData, backgroundImage }) => {
  const cardRef = useRef(null);

  const downloadCard = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current, { quality: 0.95 });
        const link = document.createElement('a');
        link.download = 'greeting-card.png';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Error generating image:', err);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div
        ref={cardRef}
        className="relative w-full aspect-[4/5] bg-cover bg-center rounded-lg overflow-hidden"
        style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}
      >
        <div className="absolute inset-0 p-8 flex flex-col">
          <div className="mb-4">
            <span className="font-script text-xl">Dear </span>
            <span className="font-script text-xl">{cardData.recipientName}</span>
          </div>
          
          <div className="flex-grow">
            <p className="font-sans text-lg whitespace-pre-wrap">{cardData.message}</p>
          </div>
          
          <div className="mt-4">
            <span className="font-script text-xl">From, </span>
            <span className="font-script text-xl">{cardData.senderName}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={downloadCard}
        className="mt-4 w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Download Card
      </button>
    </div>
  );
};

export default CardPreview;