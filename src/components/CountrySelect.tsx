import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Country, countries } from '@/data/countries';

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
}

export const CountrySelect = ({ value, onChange, className = '', required = false }: CountrySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedCountry = countries.find(country => country.name === value);
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          {selectedCountry ? (
            <>
              <span className="text-xl">{selectedCountry.flag}</span>
              <span>{selectedCountry.name}</span>
            </>
          ) : (
            <span className="text-[#7A7D81]">Select a country</span>
          )}
        </div>
        <ChevronDown 
          size={20} 
          className={`text-[#4D4F52] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-[#E4E8EA] rounded-xl shadow-lg max-h-60 overflow-auto">
          <input
            type="text"
            className="w-full px-4 py-2 border-b border-[#E4E8EA] focus:outline-none"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          {filteredCountries.map((country) => (
            <div
              key={country.code}
              className="flex items-center gap-2 px-4 py-2 hover:bg-[#F5F8F9] cursor-pointer"
              onClick={() => {
                onChange(country.name);
                setIsOpen(false);
                setSearchTerm('');
              }}
            >
              <span className="text-xl">{country.flag}</span>
              <span>{country.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 