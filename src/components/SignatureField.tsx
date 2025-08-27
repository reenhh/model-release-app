'use client'

import { Label } from "@/components/ui/label"
import SignatureCanvas from "react-signature-canvas"
import { useRef } from "react"

interface SignatureFieldProps {
  onEnd: (dataUrl: string) => void
}

export default function SignatureField({ onEnd }: SignatureFieldProps) {
  const sigRef = useRef<SignatureCanvas>(null)

  const handleClear = () => {
    sigRef.current?.clear()
    onEnd('')
  }

  const handleEnd = () => {
    const signaturePad = sigRef.current as any
    const dataUrl = signaturePad?.getTrimmedCanvas()?.toDataURL('image/png') || ''
    onEnd(dataUrl)
  }

  return (
    <div className="flex flex-col space-y-2">
      <Label>Unterschrift</Label>
      <div
        className="border border-gray-300 rounded"
        onMouseUp={handleEnd}
        onTouchEnd={handleEnd}
      >
        <SignatureCanvas
          penColor="black"
          canvasProps={{
            width: 400,
            height: 200,
            className: "w-full h-48",
          }}
          ref={sigRef}
        />
      </div>
      <button
        type="button"
        onClick={handleClear}
        className="bg-red-500 text-white px-2 py-1 rounded w-fit"
      >
        Löschen
      </button>
    </div>
  )
}
