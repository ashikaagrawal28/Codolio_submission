import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Difficulty } from '@/types/sheet';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  difficultyFilter: Difficulty | 'all';
  onDifficultyChange: (d: Difficulty | 'all') => void;
  statusFilter: 'all' | 'completed' | 'pending';
  onStatusChange: (s: 'all' | 'completed' | 'pending') => void;
}

export function SearchFilterBar({
  searchQuery, onSearchChange,
  difficultyFilter, onDifficultyChange,
  statusFilter, onStatusChange,
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search questions..."
          className="pl-9 bg-card border-border"
        />
      </div>
      <Select value={difficultyFilter} onValueChange={(v) => onDifficultyChange(v as Difficulty | 'all')}>
        <SelectTrigger className="w-[140px] bg-card">
          <Filter className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={(v) => onStatusChange(v as 'all' | 'completed' | 'pending')}>
        <SelectTrigger className="w-[140px] bg-card">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
