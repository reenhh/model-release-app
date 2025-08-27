'use client';

import React, { forwardRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

// Optional: Typ für SignatureCanvas holen
import type SignatureCanvasType from 'react-signature-canvas';

const SignaturePad = forwardRef<SignatureCanvasType, React.ComponentProps<typeof SignatureCanvas>>(
  (props, ref) => {
    return (
      <SignatureCanvas
        penColor="black"
        backgroundColor="white"
        canvasProps={{ width: 400, height: 150, className: 'border' }}
        ref={ref}
        {...props} // Props durchreichen (z.B. falls du später mal "penColor" in page.tsx übergeben willst)
      />
    );
  }
);

SignaturePad.displayName = 'SignaturePad';

export default SignaturePad;
