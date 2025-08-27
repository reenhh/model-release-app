import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface DateFieldProps {
  value: string
  onChange: (value: string) => void
}

export default function DateField({ value, onChange }: DateFieldProps) {
  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="date">Datum</Label>
      <Input
        type="date"
        id="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
