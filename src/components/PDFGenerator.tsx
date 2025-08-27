'use client'

import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import SignatureField from '@/components/SignatureField'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type FormData = {
  photographerName: string
  photographerAddress: string
  photographerPhone: string
  eventName: string
  modelName: string
  modelAddress: string
  modelPhone: string
  modelEmail: string
  modelBirthdate: string
  location: string
  date: string
  signature: string
  usageCampaigns: boolean
  usageLicensing: boolean
  usagePrintMedia: boolean
}

export default function PDFGenerator() {
  const formRef = useRef<HTMLDivElement>(null)

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      photographerName: '',
      photographerAddress: '',
      photographerPhone: '',
      eventName: '',
      modelName: '',
      modelAddress: '',
      modelPhone: '',
      modelEmail: '',
      modelBirthdate: '',
      location: '',
      date: '',
      signature: '',
      usageCampaigns: false,
      usageLicensing: false,
      usagePrintMedia: false
    }
  })

  const onSubmit = async (data: FormData) => {
    if (!formRef.current) return;

    // Pflichtprüfung Unterschrift:
    if (!watch('signature')) {
      alert('Bitte Unterschrift hinzufügen!');
      return;
    }

    const html2pdfModule = (await import('html2pdf.js')).default;
    const element = formRef.current;

    const opt = {
      margin: 0,
      filename: 'einverstaendniserklaerung.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    const pdf = html2pdfModule()
      .set(opt)
      .from(element)
      .toPdf()
      .get('pdf');

    pdf.then((pdfInstance: any) => {
      const pageCount = pdfInstance.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdfInstance.setPage(i);
        pdfInstance.setFontSize(10);
        pdfInstance.text(`Seite ${i} von ${pageCount}`, 200, 287);
      }

      pdfInstance.save();
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Formular Felder */}
      <div className="space-y-4">

        {/* Fotograf */}
        <h2 className="text-xl font-bold">Fotograf</h2>
        <div className="space-y-2">
          <Label>Name</Label>
          <Input {...register('photographerName', { required: 'Name ist erforderlich' })} />
          {errors.photographerName && <p className="text-red-600 text-sm">{errors.photographerName.message}</p>}

          <Label>Adresse</Label>
          <Input {...register('photographerAddress')} />

          <Label>Telefon</Label>
          <Input {...register('photographerPhone')} />
        </div>

        {/* Event */}
        <h2 className="text-xl font-bold">Event</h2>
        <div className="space-y-2">
          <Label>Event Name</Label>
          <Input {...register('eventName', { required: 'Event Name ist erforderlich' })} />
          {errors.eventName && <p className="text-red-600 text-sm">{errors.eventName.message}</p>}
        </div>

        {/* Model */}
        <h2 className="text-xl font-bold">Model</h2>
        <div className="space-y-2">
          <Label>Name</Label>
          <Input {...register('modelName', { required: 'Model Name ist erforderlich' })} />
          {errors.modelName && <p className="text-red-600 text-sm">{errors.modelName.message}</p>}

          <Label>Adresse</Label>
          <Input {...register('modelAddress')} />

          <Label>Telefon</Label>
          <Input {...register('modelPhone')} />

          <Label>E-Mail</Label>
          <Input type="email" {...register('modelEmail', { required: 'E-Mail ist erforderlich' })} />
          {errors.modelEmail && <p className="text-red-600 text-sm">{errors.modelEmail.message}</p>}

          <Label>Geburtsdatum</Label>
          <Input type="date" {...register('modelBirthdate', { required: 'Geburtsdatum ist erforderlich' })} />
          {errors.modelBirthdate && <p className="text-red-600 text-sm">{errors.modelBirthdate.message}</p>}
        </div>

        {/* Nutzungsrechte */}
        <h2 className="text-xl font-bold mt-6">Nutzungsrechte</h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register('usageCampaigns')} />
            <Label>darf für Werbekampagnen genutzt werden</Label>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register('usageLicensing')} />
            <Label>darf Dritten lizenziert werden</Label>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register('usagePrintMedia')} />
            <Label>Verwendung auf Flyern / Postern / Bannern</Label>
          </div>
        </div>

        {/* Ort / Datum */}
        <h2 className="text-xl font-bold">Ort & Datum</h2>
        <div className="space-y-2">
          <Label>Ort</Label>
          <Input {...register('location', { required: 'Ort ist erforderlich' })} />
          {errors.location && <p className="text-red-600 text-sm">{errors.location.message}</p>}

          <Label>Datum</Label>
          <Input type="date" {...register('date', { required: 'Datum ist erforderlich' })} />
          {errors.date && <p className="text-red-600 text-sm">{errors.date.message}</p>}
        </div>

        {/* Unterschrift */}
        <h2 className="text-xl font-bold">Unterschrift</h2>
        <SignatureField onEnd={(sig) => setValue('signature', sig)} />
      </div>
      {/* PDF Vorschau / Template */}
      <div
        ref={formRef}
        className="bg-white text-black leading-relaxed"
        style={{
          width: '190mm',
          minHeight: '277mm',
          padding: '15mm 15mm',
          margin: '0 auto',
          fontFamily: 'Arial, sans-serif',
          fontSize: '11pt',
          boxSizing: 'border-box',
          position: 'relative'
        }}
      >
        {/* LOGO + Briefkopf */}
        <div className="flex justify-between items-center mb-8">
          <img src="/logo.png" alt="Logo" style={{ maxHeight: '50px', maxWidth: '150px' }} />
          <div className="text-right text-sm">
            {watch('photographerName')}<br />
            {watch('photographerAddress')}<br />
            {watch('photographerPhone')}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-4">Einverständniserklärung</h2>
        <p className="text-center mb-8">für die Anfertigung und Veröffentlichung von Fotoaufnahmen</p>

        <hr className="my-4" />

        <p className="font-bold mb-1">Fotograf:</p>
        <p>
          {watch('photographerName')}<br />
          {watch('photographerAddress')}<br />
          {watch('photographerPhone')}
        </p>

        <hr className="my-4" />

        <p className="font-bold mb-1">Event:</p>
        <p>{watch('eventName')}</p>

        <hr className="my-4" />

        <p className="font-bold mb-1">Model:</p>
        <p>
          {watch('modelName')}<br />
          {watch('modelAddress')}<br />
          {watch('modelPhone')}<br />
          {watch('modelEmail')}<br />
          Geburtsdatum: {watch('modelBirthdate')}
        </p>

        <hr className="my-4" />

        <p>Ich, <strong>{watch('modelName')}</strong>, erkläre mich damit einverstanden, dass die Fotos oder Videoaufnahmen, die im Rahmen des oben genannten Events gemacht wurden und auf denen ich abgebildet bin von <strong>{watch('photographerName')}</strong> für folgende Zwecke genutzt werden dürfen:</p>

        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>Veröffentlichung auf der Website / den Webseiten des Fotografen</li>
          <li>Veröffentlichung auf Social-Media-Präsenzen des Fotografen</li>
          <li>Printveröffentlichungen in Informationsmaterialen des Fotografen</li>
          <li>sonstige Kampagnen</li>
        </ul>

        <h2 className="text-xl font-bold mt-8">Zusätzliche Nutzungsrechte</h2>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>Werbekampagnen: {watch('usageCampaigns') ? 'Ja' : 'Nein'}</li>
          <li>Dritt-Lizenzierung: {watch('usageLicensing') ? 'Ja' : 'Nein'}</li>
          <li>Flyer / Poster / Banner: {watch('usagePrintMedia') ? 'Ja' : 'Nein'}</li>
        </ul>

        <hr className="my-4" />

        <div className="flex justify-between mt-8">
          <div>
            <p><strong>Ort:</strong> {watch('location')}</p>
          </div>
          <div>
            <p><strong>Datum:</strong> {watch('date')}</p>
          </div>
        </div>

        <div className="mt-12">
          <p className="mb-2"><strong>Unterschrift:</strong></p>
          {watch('signature') ? (
            <img src={watch('signature')} alt="Unterschrift" className="border mt-2 w-64" />
          ) : (
            <p>(Keine Unterschrift vorhanden)</p>
          )}
        </div>

        {/* FOOTER */}
        <div className="text-center text-xs text-gray-500 pt-8 border-t mt-12">
          <p>Kontakt: {watch('photographerName')} | {watch('photographerPhone')} | {watch('photographerAddress')}</p>
          {/* Seitenzahlen → dynamisch per jsPDF → nicht hier */}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          PDF herunterladen
        </button>

        <button
          type="button"
          onClick={() => reset()}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Formular zurücksetzen
        </button>
      </div>

    </form>
  )
}
