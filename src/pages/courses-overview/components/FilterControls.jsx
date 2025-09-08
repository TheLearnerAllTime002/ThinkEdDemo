import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterControls = ({ 
  selectedCategory, 
  sortBy, 
  filterBy, 
  searchQuery,
  onCategoryChange,
  onSortChange,
  onFilterChange,
  onSearchChange,
  onClearFilters
}) => {
  const { isDarkMode } = useTheme();
  
  const sortOptions = [
    { value: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'difficulty', label: 'By Difficulty', icon: 'BarChart3' },
    { value: 'progress', label: 'By Progress', icon: 'Target' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Courses', icon: 'Grid3X3' },
    { value: 'not-started', label: 'Not Started', icon: 'BookOpen' },
    { value: 'in-progress', label: 'In Progress', icon: 'Play' },
    { value: 'completed', label: 'Completed', icon: 'CheckCircle' }
  ];

  const difficultyLevels = [
    { value: 'all', label: 'All Levels', color: 'var(--color-muted-foreground)' },
    { value: 'beginner', label: 'Beginner', color: 'var(--color-success)' },
    { value: 'intermediate', label: 'Intermediate', color: 'var(--color-warning)' },
    { value: 'advanced', label: 'Advanced', color: 'var(--color-error)' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-xl p-6 mb-6"
    >
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            color="var(--color-muted-foreground)" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
          />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-600/50' 
                : 'bg-white/5 border-white/10'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </div>
      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Sort By</label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e?.target?.value)}
              className={`w-full appearance-none border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-600/50' 
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {sortOptions?.map((option) => (
                <option key={option?.value} value={option?.value} className="bg-background text-foreground">
                  {option?.label}
                </option>
              ))}
            </select>
            <Icon 
              name="ChevronDown" 
              size={16} 
              color="var(--color-muted-foreground)"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>

        {/* Filter By Status */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Status</label>
          <div className="relative">
            <select
              value={filterBy}
              onChange={(e) => onFilterChange(e?.target?.value)}
              className={`w-full appearance-none border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-600/50' 
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {filterOptions?.map((option) => (
                <option key={option?.value} value={option?.value} className="bg-background text-foreground">
                  {option?.label}
                </option>
              ))}
            </select>
            <Icon 
              name="ChevronDown" 
              size={16} 
              color="var(--color-muted-foreground)"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>

        {/* Difficulty Level */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Difficulty</label>
          <div className="relative">
            <select
              value={filterBy?.difficulty || 'all'}
              onChange={(e) => onFilterChange({ ...filterBy, difficulty: e?.target?.value })}
              className={`w-full appearance-none border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-600/50' 
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {difficultyLevels?.map((level) => (
                <option key={level?.value} value={level?.value} className="bg-background text-foreground">
                  {level?.label}
                </option>
              ))}
            </select>
            <Icon 
              name="ChevronDown" 
              size={16} 
              color="var(--color-muted-foreground)"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {(searchQuery || sortBy !== 'popular' || filterBy !== 'all') && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`flex flex-wrap items-center gap-2 pt-4 border-t ${
            isDarkMode ? 'border-slate-600/50' : 'border-white/10'
          }`}
        >
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {searchQuery && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-primary/20 rounded-full">
              <Icon name="Search" size={12} color="var(--color-primary)" />
              <span className="text-xs text-primary">"{searchQuery}"</span>
              <button
                onClick={() => onSearchChange('')}
                className="text-primary hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}

          {sortBy !== 'popular' && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-accent/20 rounded-full">
              <Icon name="ArrowUpDown" size={12} color="var(--color-accent)" />
              <span className="text-xs text-accent">
                {sortOptions?.find(opt => opt?.value === sortBy)?.label}
              </span>
            </div>
          )}

          {filterBy !== 'all' && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-secondary/20 rounded-full">
              <Icon name="Filter" size={12} color="var(--color-secondary)" />
              <span className="text-xs text-secondary">
                {filterOptions?.find(opt => opt?.value === filterBy)?.label}
              </span>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FilterControls;