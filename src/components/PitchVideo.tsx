import React, { useState } from 'react';

interface PitchVideoProps {
  videoUrl?: string;
  title?: string;
  description?: string;
}

const PitchVideo: React.FC<PitchVideoProps> = ({ 
  videoUrl = "https://youtu.be/wCi-Vt77m2A?si=LnWz5_RHd2phGVnf", 
  title = "ClearZ The Mind - Investment Pitch", 
  description = "Watch our pitch video to learn about ClearZ The Mind's mission and investment opportunity." 
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      margin: '2rem 0',
      textAlign: 'center'
    }}>
      <h2 style={{ marginBottom: '1rem', color: '#333' }}>{title}</h2>
      <p style={{ marginBottom: '2rem', color: '#666', maxWidth: '600px', margin: '0 auto 2rem' }}>
        {description}
      </p>
      
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        aspectRatio: '16/9',
        backgroundColor: '#000',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff',
            fontSize: '1.2rem'
          }}>
            Loading video...
          </div>
        )}
        
        <iframe
          src={videoUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handleVideoLoad}
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
        />
      </div>
    </div>
  );
};

export default PitchVideo;