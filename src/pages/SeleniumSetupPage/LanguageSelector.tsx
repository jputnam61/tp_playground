import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LanguageSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function LanguageSelector({ value, onValueChange }: LanguageSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger 
        id="select-language" 
        className="w-[180px] bg-muted text-foreground border-border/30 hover:bg-muted/80 focus:ring-primary/30"
      >
        <SelectValue placeholder="Select language" className="text-foreground" />
      </SelectTrigger>
      <SelectContent className="bg-card border-border/30">
        <SelectItem value="java" id="language-java" className="text-foreground hover:bg-muted focus:bg-muted">Java</SelectItem>
        <SelectItem value="python" id="language-python" className="text-foreground hover:bg-muted focus:bg-muted">Python</SelectItem>
        <SelectItem value="csharp" id="language-csharp" className="text-foreground hover:bg-muted focus:bg-muted">C#</SelectItem>
        <SelectItem value="javascript" id="language-javascript" className="text-foreground hover:bg-muted focus:bg-muted">JavaScript</SelectItem>
        <SelectItem value="ruby" id="language-ruby" className="text-foreground hover:bg-muted focus:bg-muted">Ruby</SelectItem>
      </SelectContent>
    </Select>
  );
}