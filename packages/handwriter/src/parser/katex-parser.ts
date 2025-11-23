/**
 * KaTeX Parser - Converts KaTeX input into our expression tree
 */

import katex from 'katex';
import {
  ExpressionNode,
  TextNode,
  FractionNode,
  ScriptNode,
  SqrtNode,
  OperatorNode,
  DelimiterNode,
  GroupNode,
  AccentNode
} from '../types.js';

/**
 * Map LaTeX command names to Unicode symbols
 */
const LATEX_TO_UNICODE: Record<string, string> = {
  // Greek letters - lowercase
  'alpha': 'α',
  'beta': 'β',
  'gamma': 'γ',
  'delta': 'δ',
  'epsilon': 'ε',
  'zeta': 'ζ',
  'eta': 'η',
  'theta': 'θ',
  'iota': 'ι',
  'kappa': 'κ',
  'lambda': 'λ',
  'mu': 'μ',
  'nu': 'ν',
  'xi': 'ξ',
  'pi': 'π',
  'rho': 'ρ',
  'sigma': 'σ',
  'tau': 'τ',
  'upsilon': 'υ',
  'phi': 'φ',
  'chi': 'χ',
  'psi': 'ψ',
  'omega': 'ω',
  
  // Greek letters - uppercase
  'Alpha': 'Α',
  'Beta': 'Β',
  'Gamma': 'Γ',
  'Delta': 'Δ',
  'Epsilon': 'Ε',
  'Zeta': 'Ζ',
  'Eta': 'Η',
  'Theta': 'Θ',
  'Iota': 'Ι',
  'Kappa': 'Κ',
  'Lambda': 'Λ',
  'Mu': 'Μ',
  'Nu': 'Ν',
  'Xi': 'Ξ',
  'Pi': 'Π',
  'Rho': 'Ρ',
  'Sigma': 'Σ',
  'Tau': 'Τ',
  'Upsilon': 'Υ',
  'Phi': 'Φ',
  'Chi': 'Χ',
  'Psi': 'Ψ',
  'Omega': 'Ω',
  
  // Mathematical operators
  'int': '∫',
  'sum': '∑',
  'prod': '∏',
  'coprod': '∐',
  'pm': '±',
  'mp': '∓',
  'times': '×',
  'div': '÷',
  'cdot': '·',
  'ast': '∗',
  'star': '⋆',
  'circ': '∘',
  'bullet': '•',
  
  // Relations
  'le': '≤',
  'leq': '≤',
  'ge': '≥',
  'geq': '≥',
  'ne': '≠',
  'neq': '≠',
  'equiv': '≡',
  'approx': '≈',
  'sim': '∼',
  'cong': '≅',
  'propto': '∝',
  
  // Arrows
  'to': '→',
  'rightarrow': '→',
  'leftarrow': '←',
  'leftrightarrow': '↔',
  'Rightarrow': '⇒',
  'Leftarrow': '⇐',
  'Leftrightarrow': '⇔',
  
  // Special symbols
  'infty': '∞',
  'infinity': '∞',
  'partial': '∂',
  'nabla': '∇',
  'emptyset': '∅',
  'varnothing': '∅',
  'in': '∈',
  'notin': '∉',
  'subset': '⊂',
  'supset': '⊃',
  'subseteq': '⊆',
  'supseteq': '⊇',
  'cap': '∩',
  'cup': '∪',
  'wedge': '∧',
  'vee': '∨',
  'neg': '¬',
  'lnot': '¬',
  'forall': '∀',
  'exists': '∃',
  'nexists': '∄',
  
  // Other
  'dots': '…',
  'ldots': '…',
  'cdots': '⋯',
  'vdots': '⋮',
  'ddots': '⋱',
  'ell': 'ℓ',
  'hbar': 'ℏ',
  'imath': 'ı',
  'jmath': 'ȷ',
  'Re': 'ℜ',
  'Im': 'ℑ',
  'wp': '℘',
  'deg': '°',
  'angle': '∠',
  'perp': '⊥',
  'parallel': '∥',
};

/**
 * Parse a KaTeX string into our expression tree
 */
export function parseKaTeX(latex: string): ExpressionNode {
  try {
    // Parse using KaTeX's internal parser
    // Note: __parse is an internal API not exposed in TypeScript types
    const parsed = (katex as any).__parse(latex);
    return convertKaTeXNode(parsed);
  } catch (error) {
    console.error('Error parsing KaTeX:', error);
    throw new Error(`Failed to parse KaTeX expression: ${latex}`);
  }
}

/**
 * Convert a KaTeX AST node to our expression tree node
 */
function convertKaTeXNode(node: any): ExpressionNode {
  if (Array.isArray(node)) {
    // Group of nodes
    const children = node.map(convertKaTeXNode);
    if (children.length === 1) {
      return children[0];
    }
    return {
      type: 'group',
      children
    } as GroupNode;
  }

  const nodeType = node.type;

  switch (nodeType) {
    case 'ordgroup':
    case 'color':
    case 'sizing':
    case 'styling':
      // Groups and styling - process children
      return convertKaTeXNode(node.body);

    case 'textord':
    case 'mathord':
      // Regular text/math character
      const text = node.text || '';
      // Convert LaTeX commands to Unicode symbols
      const value = LATEX_TO_UNICODE[text] || text;
      return {
        type: 'text',
        value,
        style: node.mode === 'math' ? 'italic' : 'normal'
      } as TextNode;

    case 'spacing':
      // Ignore spacing for now
      return {
        type: 'text',
        value: ' '
      } as TextNode;

    case 'op':
    case 'operatorname':
      // Operator
      const opText = node.text || node.name || '';
      const opValue = LATEX_TO_UNICODE[opText] || opText;
      return {
        type: 'operator',
        value: opValue,
        style: 'normal'
      } as TextNode;

    case 'bin':
    case 'rel':
    case 'punct':
      // Binary operators, relations, punctuation
      const binText = node.text || '';
      const binValue = LATEX_TO_UNICODE[binText] || binText;
      return {
        type: 'operator',
        value: binValue,
        style: 'normal'
      } as TextNode;

    case 'supsub':
      // Superscript and/or subscript
      const base = node.base ? convertKaTeXNode(node.base) : { type: 'text', value: '' } as TextNode;
      
      if (node.sup && node.sub) {
        // Both superscript and subscript
        const supNode: ScriptNode = {
          type: 'superscript',
          base,
          script: convertKaTeXNode(node.sup)
        };
        return {
          type: 'subscript',
          base: supNode,
          script: convertKaTeXNode(node.sub)
        } as ScriptNode;
      } else if (node.sup) {
        return {
          type: 'superscript',
          base,
          script: convertKaTeXNode(node.sup)
        } as ScriptNode;
      } else if (node.sub) {
        return {
          type: 'subscript',
          base,
          script: convertKaTeXNode(node.sub)
        } as ScriptNode;
      }
      return base;

    case 'genfrac':
      // Fraction
      if (node.numer && node.denom) {
        return {
          type: 'fraction',
          numerator: convertKaTeXNode(node.numer),
          denominator: convertKaTeXNode(node.denom)
        } as FractionNode;
      }
      break;

    case 'sqrt':
      // Square root or nth root
      return {
        type: 'sqrt',
        content: convertKaTeXNode(node.body),
        index: node.index ? convertKaTeXNode(node.index) : undefined
      } as SqrtNode;

    case 'leftright':
      // Delimiters (parentheses, brackets, etc.)
      return {
        type: getDelimiterType(node.left),
        content: convertKaTeXNode(node.body),
        left: node.left || '',
        right: node.right || '',
        stretchy: true
      } as DelimiterNode;

    case 'op-token':
      // Large operators (sum, integral, product, etc.)
      const opType = getOperatorType(node.text);
      if (opType) {
        return {
          type: opType,
          lower: undefined,
          upper: undefined
        } as OperatorNode;
      }
      return {
        type: 'operator',
        value: node.text || ''
      } as TextNode;

    case 'atom':
      // Atom (like \int, \sum, etc.)
      if (node.family === 'op') {
        const opType = getOperatorType(node.text);
        if (opType) {
          return {
            type: opType
          } as OperatorNode;
        }
      }
      const atomText = node.text || '';
      const atomValue = LATEX_TO_UNICODE[atomText] || atomText;
      return {
        type: 'symbol',
        value: atomValue
      } as TextNode;

    case 'accent':
      // Accents (hat, bar, etc.)
      return {
        type: 'accent',
        base: convertKaTeXNode(node.base),
        accent: node.label || ''
      } as AccentNode;

    case 'array':
    case 'matrix':
      // Matrix
      return {
        type: 'group',
        children: node.body ? node.body.map(convertKaTeXNode) : []
      } as GroupNode;

    default:
      console.warn(`Unknown KaTeX node type: ${nodeType}`, node);
      // Try to process body if it exists
      if (node.body) {
        return convertKaTeXNode(node.body);
      }
      return {
        type: 'text',
        value: ''
      } as TextNode;
  }

  return {
    type: 'text',
    value: ''
  } as TextNode;
}

/**
 * Get delimiter type from KaTeX delimiter string
 */
function getDelimiterType(delimiter: string): 'parenthesis' | 'bracket' | 'brace' {
  if (delimiter === '(' || delimiter === ')') {
    return 'parenthesis';
  }
  if (delimiter === '[' || delimiter === ']') {
    return 'bracket';
  }
  if (delimiter === '\\{' || delimiter === '\\}' || delimiter === '{' || delimiter === '}') {
    return 'brace';
  }
  return 'parenthesis';
}

/**
 * Get operator type from KaTeX operator text
 */
function getOperatorType(text: string): 'integral' | 'sum' | 'product' | null {
  const opMap: Record<string, 'integral' | 'sum' | 'product'> = {
    '∫': 'integral',
    '\\int': 'integral',
    '∑': 'sum',
    '\\sum': 'sum',
    '∏': 'product',
    '\\prod': 'product'
  };
  return opMap[text] || null;
}

/**
 * Helper to extract text content from an expression tree (for debugging)
 */
export function extractText(node: ExpressionNode): string {
  if ('value' in node) {
    return (node as TextNode).value;
  }
  if ('children' in node && node.children) {
    return node.children.map(extractText).join('');
  }
  return '';
}

