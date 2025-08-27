import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface NameFieldProps {
  value: string
  onChange: (value: string) => void
}

export default function NameField({ value, onChange }: NameFieldProps) {
  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="name">Name</Label>
      <Input
        type="text"
        id="name"
        placeholder="Vollständiger Name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
