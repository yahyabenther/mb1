import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { iconMap } from "../../lib/iconMap";
import type { IconKey } from "../../types/firestore";

const options: { key: IconKey; label: string }[] = [
  { key: "car", label: "Car" },
  { key: "shopping-bag", label: "Shopping Bag" },
  { key: "bar-chart", label: "Bar Chart" },
  { key: "briefcase", label: "Portfolio" },
  { key: "layout-grid", label: "Design / Layout" },
  { key: "smartphone", label: "Mobile App" },
];

function IconPicker({
  value,
  onChange,
}: {
  value: IconKey;
  onChange: (key: IconKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = options.find((o) => o.key === value) ?? options[0];
  const CurrentIcon = iconMap[current.key];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="input flex items-center justify-between text-left"
      >
        <span className="flex items-center gap-2">
          <CurrentIcon size={16} className="text-[#35D6B0]" />
          {current.label}
        </span>
        <ChevronDown
          size={16}
          className={`text-white/40 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#10173f] shadow-xl">
          {options.map((option) => {
            const OptionIcon = iconMap[option.key];
            const active = option.key === value;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => {
                  onChange(option.key);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition ${
                  active ? "bg-[#35D6B0]/10 text-[#35D6B0]" : "text-white/80 hover:bg-white/5"
                }`}
              >
                <OptionIcon size={16} />
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default IconPicker;