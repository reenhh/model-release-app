import PDFGenerator from '@/components/PDFGenerator'

export default function Home() {
  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Model Release Formular</h1>
      <PDFGenerator />
    </main>
  )
}
