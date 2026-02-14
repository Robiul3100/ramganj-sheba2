import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: typeof Search;
}

const SearchBar = ({ placeholder, value, onChange, icon: Icon = Search }: SearchBarProps) => {
  return (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-card rounded-lg pl-12 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground service-card-shadow outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
};

export default SearchBar;
