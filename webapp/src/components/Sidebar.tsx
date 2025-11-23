import { useState, useRef, useEffect } from 'react';
import './Sidebar.css';

interface SidebarProps {
  onSubmit: (latex: string, speed: number, position: { x: number; y: number }) => void;
  isAnimating: boolean;
}

const exampleEquations = [
  { label: 'Quadratic Formula', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
  { label: 'Pythagorean Theorem', latex: 'a^2 + b^2 = c^2' },
  { label: 'Euler\'s Identity', latex: 'e^{i\\pi} + 1 = 0' },
  { label: 'Integral', latex: '\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}' },
  { label: 'Sum', latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}' },
  { label: 'Fraction', latex: '\\frac{x+y}{x-y}' },
  { label: 'Greek Letters', latex: '\\alpha + \\beta = \\gamma' },
];

function Sidebar({ onSubmit, isAnimating }: SidebarProps) {
  const [latex, setLatex] = useState('');
  const [speed, setSpeed] = useState(300);
  const [posX, setPosX] = useState(100);
  const [posY, setPosY] = useState(100);
  const [showExamples, setShowExamples] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [latex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (latex.trim() && !isAnimating) {
      onSubmit(latex, speed, { x: posX, y: posY });
    }
  };

  const handleExampleClick = (exampleLatex: string) => {
    setLatex(exampleLatex);
    setShowExamples(false);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>KaTeX Whiteboard</h1>
        <p className="subtitle">Handwritten Math Equations</p>
      </div>

      <form onSubmit={handleSubmit} className="sidebar-form">
        <div className="form-group">
          <label htmlFor="latex-input">
            KaTeX Expression
            <span className="label-help">
              (Enter LaTeX math notation)
            </span>
          </label>
          <textarea
            ref={textareaRef}
            id="latex-input"
            className="math-input"
            value={latex}
            onChange={(e) => setLatex(e.target.value)}
            placeholder="e.g., x^2 + y^2 = r^2"
            rows={3}
            disabled={isAnimating}
          />
        </div>

        <div className="form-group">
          <label htmlFor="speed-slider">
            Writing Speed: {speed} px/s
          </label>
          <input
            id="speed-slider"
            type="range"
            min="50"
            max="1000"
            step="50"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isAnimating}
          />
          <div className="slider-labels">
            <span>Slow</span>
            <span>Fast</span>
          </div>
        </div>

        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="pos-x">X Position</label>
            <input
              id="pos-x"
              type="number"
              value={posX}
              onChange={(e) => setPosX(Number(e.target.value))}
              disabled={isAnimating}
              min="0"
              step="10"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pos-y">Y Position</label>
            <input
              id="pos-y"
              type="number"
              value={posY}
              onChange={(e) => setPosY(Number(e.target.value))}
              disabled={isAnimating}
              min="0"
              step="10"
            />
          </div>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={!latex.trim() || isAnimating}
        >
          {isAnimating ? 'Drawing...' : 'Draw Equation'}
        </button>
      </form>

      <div className="examples-section">
        <button
          className="examples-toggle"
          onClick={() => setShowExamples(!showExamples)}
        >
          {showExamples ? '▼' : '▶'} Example Equations
        </button>
        
        {showExamples && (
          <div className="examples-list">
            {exampleEquations.map((example, index) => (
              <button
                key={index}
                className="example-button"
                onClick={() => handleExampleClick(example.latex)}
                disabled={isAnimating}
              >
                <span className="example-label">{example.label}</span>
                <code className="example-latex">{example.latex}</code>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <p className="info-text">
          This app converts KaTeX mathematical expressions into handwritten-style 
          drawings on the Excalidraw whiteboard.
        </p>
        <div className="tips">
          <strong>Tips:</strong>
          <ul>
            <li>Use standard LaTeX syntax for math</li>
            <li>Adjust writing speed for different effects</li>
            <li>Set X/Y position to place equations</li>
            <li>Click examples to try them out</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

