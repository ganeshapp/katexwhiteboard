import { useState, useRef } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import { KaTeXHandwriter } from '@katex-whiteboard/handwriter';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const handwriterRef = useRef<KaTeXHandwriter | null>(null);

  const handleExcalidrawMount = (api: any) => {
    setExcalidrawAPI(api);
  };

  const handleSubmit = async (
    latex: string,
    speed: number,
    position: { x: number; y: number }
  ) => {
    if (!excalidrawAPI || !latex.trim()) {
      return;
    }

    setIsAnimating(true);

    try {
      // Create or update handwriter with current settings
      if (!handwriterRef.current) {
        handwriterRef.current = new KaTeXHandwriter({
          fontSize: 80, // Increased from 40 to 80 for better legibility
          speed,
          position,
          spacing: 0.15, // Increased spacing
          variation: 0.2 // Reduced variation for cleaner look
        });
      } else {
        handwriterRef.current.updateConfig({
          speed,
          position
        });
      }

      // Animate the equation on Excalidraw
      await handwriterRef.current.animateOnExcalidraw(
        excalidrawAPI,
        latex,
        {
          strokeColor: '#1e1e1e',
          strokeWidth: 1, // Reduced from 2 to 1 for cleaner lines
          roughness: 0,
          opacity: 100
        }
      );
    } catch (error) {
      console.error('Error drawing equation:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <div className="app">
      <Sidebar onSubmit={handleSubmit} isAnimating={isAnimating} />
      <div className="excalidraw-container">
        <Excalidraw
          excalidrawAPI={(api) => handleExcalidrawMount(api)}
          initialData={{
            appState: {
              viewBackgroundColor: '#ffffff',
              currentItemStrokeColor: '#1e1e1e',
              currentItemBackgroundColor: 'transparent',
              currentItemFillStyle: 'solid',
              currentItemStrokeWidth: 2,
              currentItemRoughness: 0,
            },
            scrollToContent: true
          }}
        />
      </div>
    </div>
  );
}

export default App;

