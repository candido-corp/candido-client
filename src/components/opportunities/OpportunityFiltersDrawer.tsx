import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import { Filter, X } from 'lucide-react';
import React from 'react';

type OpportunityFiltersDrawerProps = Pick<BaseFC, 'className'> & {
  // Filter values - single selections for radio buttons
  locationTypeFilter: string;
  opportunityLevelFilter: string;
  opportunityTypeFilter: string;
  currencyCodeFilter: string;

  // Filter handlers
  onLocationTypeChange: (value: string) => void;
  onOpportunityLevelChange: (value: string) => void;
  onOpportunityTypeChange: (value: string) => void;
  onCurrencyCodeChange: (value: string) => void;

  // Clear filters handler
  onClearFilters?: () => void;
};

// Filter options configuration - adding "all" option back for radio buttons
const locationTypeOptions = [
  { value: 'all', label: 'All Location Types' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'On-site' },
];

const opportunityLevelOptions = [
  { value: 'all', label: 'All Experience Levels' },
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' },
  { value: 'executive', label: 'Executive' },
];

const opportunityTypeOptions = [
  { value: 'all', label: 'All Opportunity Types' },
  { value: 'job', label: 'Full-time Job' },
  { value: 'internship', label: 'Internship' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'challenge', label: 'Challenge' },
  { value: 'bootcamp', label: 'Bootcamp' },
  { value: 'thesis', label: 'Thesis' },
  { value: 'mentorship', label: 'Mentorship' },
  { value: 'research', label: 'Research' },
  { value: 'volunteering', label: 'Volunteering' },
];

const currencyCodeOptions = [
  { value: 'all', label: 'All Currencies' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
];

/**
 * Drawer component for opportunity filters
 */
const OpportunityFiltersDrawer: React.FC<OpportunityFiltersDrawerProps> = ({
  locationTypeFilter,
  opportunityLevelFilter,
  opportunityTypeFilter,
  currencyCodeFilter,
  onLocationTypeChange,
  onOpportunityLevelChange,
  onOpportunityTypeChange,
  onCurrencyCodeChange,
  onClearFilters,
  className,
}) => {
  // Count active filters
  const activeFiltersCount = [
    locationTypeFilter !== 'all' ? 1 : 0,
    opportunityLevelFilter !== 'all' ? 1 : 0,
    opportunityTypeFilter !== 'all' ? 1 : 0,
    currencyCodeFilter !== 'all' ? 1 : 0,
  ].reduce((sum, current) => sum + current, 0);

  const handleClearFilters = () => {
    onLocationTypeChange('all');
    onOpportunityLevelChange('all');
    onOpportunityTypeChange('all');
    onCurrencyCodeChange('all');
    if (onClearFilters) {
      onClearFilters();
    }
  };

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline" className={className}>
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerPortal>
        <DrawerOverlay className="bg-black/40" />
        <DrawerContent
          className={cn(
            'fixed inset-y-0 left-0 z-50 mt-0 flex h-full w-[85vw] flex-col rounded-r-[10px] border bg-background md:w-[500px]',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left'
          )}
        >
          {/* Header Section */}
          <DrawerHeader className="flex-shrink-0">
            <DrawerTitle>Filter Opportunities</DrawerTitle>
            <DrawerDescription>
              Refine your search to find the perfect opportunities.
            </DrawerDescription>
          </DrawerHeader>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-4 pb-0">
            <Accordion
              type="multiple"
              defaultValue={['location', 'level', 'type', 'currency']}
              className="space-y-2"
            >
              {/* Location Type Filter */}
              <AccordionItem
                value="location"
                className="rounded-lg border px-4"
              >
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  Location Type
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <RadioGroup
                    value={locationTypeFilter}
                    onValueChange={onLocationTypeChange}
                    className="space-y-3"
                  >
                    {locationTypeOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-3"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`location-${option.value}`}
                          className="border-2"
                        />
                        <Label
                          htmlFor={`location-${option.value}`}
                          className="cursor-pointer text-sm font-medium leading-none"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>

              {/* Experience Level Filter */}
              <AccordionItem value="level" className="rounded-lg border px-4">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  Experience Level
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <RadioGroup
                    value={opportunityLevelFilter}
                    onValueChange={onOpportunityLevelChange}
                    className="space-y-3"
                  >
                    {opportunityLevelOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-3"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`level-${option.value}`}
                          className="border-2"
                        />
                        <Label
                          htmlFor={`level-${option.value}`}
                          className="cursor-pointer text-sm font-medium leading-none"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>

              {/* Opportunity Type Filter */}
              <AccordionItem value="type" className="rounded-lg border px-4">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  Opportunity Type
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <RadioGroup
                    value={opportunityTypeFilter}
                    onValueChange={onOpportunityTypeChange}
                    className="space-y-3"
                  >
                    {opportunityTypeOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-3"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`type-${option.value}`}
                          className="border-2"
                        />
                        <Label
                          htmlFor={`type-${option.value}`}
                          className="cursor-pointer text-sm font-medium leading-none"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>

              {/* Currency Filter */}
              <AccordionItem
                value="currency"
                className="rounded-lg border px-4"
              >
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  Currency
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <RadioGroup
                    value={currencyCodeFilter}
                    onValueChange={onCurrencyCodeChange}
                    className="space-y-3"
                  >
                    {currencyCodeOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-3"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`currency-${option.value}`}
                          className="border-2"
                        />
                        <Label
                          htmlFor={`currency-${option.value}`}
                          className="cursor-pointer text-sm font-medium leading-none"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Fixed Footer */}
          <DrawerFooter className="flex-shrink-0 border-t bg-background">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="flex-1"
                disabled={activeFiltersCount === 0}
              >
                <X className="mr-2 h-4 w-4" />
                Clear All
              </Button>
              <DrawerClose asChild>
                <Button className="flex-1">Apply Filters</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default OpportunityFiltersDrawer;
