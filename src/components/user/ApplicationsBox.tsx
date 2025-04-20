import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ApplicationCard } from './ApplicationCard';

export function ApplicationsBox() {
  const applications = [
    {
      id: 1,
      title: 'Website Redesign',
      client: 'Acme Corp',
      value: '$12,500',
      dueDate: 'Mar 28',
      status: 'in-progress' as const,
    },
    {
      id: 2,
      title: 'Marketing Campaign',
      client: 'Globex Inc',
      value: '$8,750',
      dueDate: 'Apr 15',
      status: 'new' as const,
    },
    {
      id: 3,
      title: 'Mobile App Development',
      client: 'TechStart',
      value: '$35,000',
      dueDate: 'Jun 10',
      status: 'on-hold' as const,
    },
    {
      id: 4,
      title: 'Brand Strategy',
      client: 'Smith & Partners',
      value: '$5,200',
      dueDate: 'Mar 12',
      status: 'completed' as const,
    },
    {
      id: 5,
      title: 'SEO Optimization',
      client: 'Northwest Traders',
      value: '$4,800',
      dueDate: 'Apr 30',
      status: 'new' as const,
    },
    {
      id: 6,
      title: 'UI/UX Consultation',
      client: 'MediaFusion',
      value: '$9,600',
      dueDate: 'May 18',
      status: 'in-progress' as const,
    },
  ];

  // Take only the first 2 applications to display
  const displayedApplications = applications.slice(0, 2);

  return (
    <div
      className="glass-card animate-fade-up rounded-xl p-6"
      style={{ '--index': '2' } as React.CSSProperties}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Applications</h2>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {applications.length}
          </span>{' '}
          Total
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {displayedApplications.map((application) => (
          <ApplicationCard
            key={application.id}
            title={application.title}
            client={application.client}
            value={application.value}
            dueDate={application.dueDate}
            status={application.status}
          />
        ))}

        {/* View All Card */}
        <Link
          to="/applications"
          className="glass-card group flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-primary/10 p-5 transition-all duration-200 hover:translate-y-[-2px] hover:border-primary/30 hover:shadow-md"
        >
          <div className="flex h-full flex-col items-center justify-center p-4 text-center">
            <h3 className="mb-2 text-base font-medium transition-colors group-hover:text-primary">
              View All Applications
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              See all {applications.length} applications
            </p>
            <div className="mt-auto rounded-full bg-primary/10 p-2 transition-colors group-hover:bg-primary/20">
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
