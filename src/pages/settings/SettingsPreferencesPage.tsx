import BackButton from '@/components/Common/BackButton';
import { LanguageSelectorServer } from '@/components/Common/LanguageSelectorServer';
import { ModeToggleGroupServer } from '@/components/Common/ModeToggleGroupServer';
import PageContent from '@/components/Common/PageContent';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { Globe, Palette } from 'lucide-react';
import React from 'react';

const SettingsPreferencesPage: React.FC = () => {
  return (
    <PageContent className="space-y-6">
      <div className="flex items-center gap-2">
        <BackButton to={EnumRoutes.SETTINGS} />
        <h1 className="text-2xl font-bold tracking-tight">Preferences</h1>
      </div>
      <div className="grid gap-6">
        {/* Language Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle>Language Settings</CardTitle>
            </div>
            <CardDescription>
              Choose your preferred language for the interface
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <LanguageSelectorServer />
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Palette className="h-5 w-5 text-primary" />
              <CardTitle>Theme Settings</CardTitle>
            </div>
            <CardDescription>
              Customize the appearance of your interface
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Theme Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark modes
                </p>
              </div>
              <ModeToggleGroupServer />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContent>
  );
};

export default SettingsPreferencesPage;
