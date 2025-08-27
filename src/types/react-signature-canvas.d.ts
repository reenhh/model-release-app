declare module 'react-signature-canvas' {
  import * as React from 'react';

  interface SignatureCanvasProps {
    penColor?: string;
    backgroundColor?: string;
    canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>;
    clearOnResize?: boolean;
  }

  export default class SignatureCanvas extends React.Component<SignatureCanvasProps> {
    clear(): void;
    toDataURL(type?: string, encoderOptions?: number): string;
  }
}
