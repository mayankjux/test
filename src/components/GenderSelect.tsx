import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Male, Female, Users as OtherGender } from 'lucide-react';

interface GenderSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
}

const genderOptions = [
  { value: 'Male', label: 'Male', icon: Male },
  { value: 'Female', label: 'Female', icon: Female },
  { value: 'Other', label: 'Other', icon: OtherGender },
];

export const GenderSelect = ({ value, onChange, className = '', required = false }: GenderSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedGender = genderOptions.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className={`${className} flex items-center cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1 flex items-center gap-2">
          {selectedGender ? (
            <>
              {React.createElement(selectedGender.icon, { size: 20, className: 'text-[#4D4F52]' })}
              <span>{selectedGender.label}</span>
            </>
          ) : (
            <span className="text-[#7A7D81]">Select gender</span>
          )}
        </div>
        <ChevronDown 
          size={20} 
          className={`text-[#4D4F52] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-[#E4E8EA] rounded-xl shadow-lg">
          {genderOptions.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-2 px-4 py-3 hover:bg-[#F5F8F9] cursor-pointer"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {React.createElement(option.icon, { size: 20, className: 'text-[#4D4F52]' })}
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 