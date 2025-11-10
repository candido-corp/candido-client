import BackButton from '@/components/Common/BackButton';
import PageContent from '@/components/Common/PageContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserChangeDetailsForm from '@/components/user/ChangeDetails/UserChangeDetailsForm';
import { User } from '@/models/interfaces/User';
import { LOADER_USER_ID } from '@/router/loaders/loaderUser';
import { Calendar, Edit, Mail, Phone, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';

const UserDetailsPage = () => {
  const userData = useRouteLoaderData(LOADER_USER_ID) as User;
  const [isEditing, setIsEditing] = useState(false);
  const created_at = new Date(userData.created_at).toISOString().split('T')[0];

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <PageContent className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-2xl font-bold tracking-tight">
            User Information
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleEditClick}
              className="flex items-center gap-1"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      </div>
      <Card
        className="animate-fade-up"
        style={{ '--index': '1' } as React.CSSProperties}
      >
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserIcon className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-xl">{`${userData.first_name} ${userData.last_name}`}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          {isEditing ? (
            <UserChangeDetailsForm
              userData={userData}
              handleIsEditing={setIsEditing}
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {userData.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {userData.mobile_number}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Join Date</p>
                  <p className="text-sm text-muted-foreground">{created_at}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Birth Date</p>
                  <p className="text-sm text-muted-foreground">
                    {userData.birthdate}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </PageContent>
  );
};

export default UserDetailsPage;
