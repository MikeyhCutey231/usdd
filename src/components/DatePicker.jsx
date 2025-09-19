import React, { useState } from "react"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function DatePicker({ onSelect }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("Select a date range")
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });
  const [month, setMonth] = useState(new Date())

  const toPhTime = (date) => {
    const utcDate = new Date(date);
    return new Date(utcDate.getTime() + (8 * 60 * 60 * 1000));
  }

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Schedule Date
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="Tomorrow or next week"
          className="bg-background pr-10"
          onChange={(e) => {
            setValue(e.target.value)
            const parsedDate = new Date(e.target.value)
            if (!isNaN(parsedDate)) {
              setDateRange({ from: parsedDate, to: parsedDate })
              setMonth(parsedDate)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border border-[#2F2F2F] bg-[#262626]">
        <Calendar
          mode="range"
              selected={dateRange}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(selectedRange) => {
                const phRange = {
                  from: selectedRange?.from ? toPhTime(selectedRange.from) : undefined,
                  to: selectedRange?.to ? toPhTime(selectedRange.to) : undefined,
                }
                setDateRange(phRange)
                if (phRange?.from) {
                  setValue(
                    `${formatDate(phRange.from)}${
                      phRange.to ? ` - ${formatDate(phRange.to)}` : ''
                    }`
                  )
                }
                if (onSelect) {
                  onSelect(phRange)
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="text-muted-foreground px-1 text-sm">
        Your post will be published on{" "}
        <span className="font-medium">{dateRange?.from ? formatDate(dateRange.from) : ''}{dateRange?.to ? ` to ${formatDate(dateRange.to)}` : ''}</span>.
      </div>
    </div>
  )
}
