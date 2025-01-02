import React from 'react';

interface FilterOption {
  type: 'text' | 'select' | 'number'|'date'; // Supported types
  label: string;
  name: string;
  options?: { value: string; label: string }[]; // For select type
  placeholder?: string;
}

interface CustomFilterProps {
  filters: FilterOption[]; // Array of filter configurations
  values: Record<string, string | number|any>; // Current filter values
  onChange: (name: string, value: string | number| undefined) => void;// Change handler
}

const CustomFilter: React.FC<CustomFilterProps> = ({ filters, values, onChange }) => {
  return (
    <div className="flex-wrap   gap-2  w-full">
      {filters.map((filter) => (
        <div key={filter.name} className="flex flex-col w-64">
          <label htmlFor={filter.name} className="font-semibold mb-1 text-sm text-start">
            {filter.label}
          </label>
          {filter.type === 'text' && (
            <input
              type="text"
              id={filter.name}
              name={filter.name}
              placeholder={filter.placeholder || ''}
              value={values[filter.name] || ''}
              onChange={(e) => onChange(filter.name, e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          )}
          {filter.type === 'number' && (
            <input
              type="number"
              id={filter.name}
              min={1}
              name={filter.name}
              placeholder={filter.placeholder || ''}
              value={values[filter.name] || undefined}
              onChange={(e) => onChange(filter.name, Number(e.target.value)||undefined)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          )}
          {filter.type === 'select' && (
            <select
              id={filter.name}
              name={filter.name}
              value={values[filter.name] || ''}
              onChange={(e) => onChange(filter.name, e.target.value||undefined)}
              className="p-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">All</option>
              {filter.options?.map((option) => (
                <option className='' key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          {filter.type === 'date' && (
            <input
            type="date"
            id={filter.name}
            name={filter.name}
            value={
                typeof values[filter.name] === 'string' 
                  ? values[filter.name].split('T')[0] // Safely split if it's a string
                  : '' // Default empty value for invalid or undefined values
              } // Format to "YYYY-MM-DD" for display
              onChange={(e) => {
                const selectedDate = e.target.value ? new Date(e.target.value).toISOString() : undefined;
                onChange(filter.name, selectedDate);
              }}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomFilter;
