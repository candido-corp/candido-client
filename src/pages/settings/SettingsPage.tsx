import PageContent from '@/components/Common/PageContent';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getCurrentPlugin, getCurrentPluginId } from '@/config/navigation';
import { ChevronRight } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useMatches } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const matches = useMatches();

  // Get current plugin configuration
  const currentPluginId = getCurrentPluginId(matches);
  const currentPlugin = currentPluginId
    ? getCurrentPlugin(currentPluginId)
    : undefined;

  // Filter out the current route from the sidebar options
  const settingsOptions = useMemo(() => {
    if (!currentPlugin?.sidebar) return [];

    return currentPlugin.sidebar.filter((item) => {
      // Remove the item that matches the current path
      return item.url !== location.pathname;
    });
  }, [currentPlugin?.sidebar, location.pathname]);

  return (
    <PageContent title="Settings">
      <div className="mb-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {settingsOptions.map((option) => (
            <Link to={option.url} key={option.id} className="h-full">
              <Card
                key={option.id}
                className="group flex h-full cursor-pointer flex-col transition-shadow duration-200 hover:shadow-md"
              >
                <CardHeader className="flex-shrink-0 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        {option.icon && (
                          <option.icon className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{option.title}</CardTitle>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 items-start">
                  <CardDescription>
                    {t(`settings.${option.id}.description`)}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageContent>
  );
};

export default SettingsPage;
