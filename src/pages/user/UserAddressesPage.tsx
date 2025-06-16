import NetworkClient from '@/api/v1/NetworkClient';
import PageContent from '@/components/Common/PageContent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import UserAddressForm from '@/components/user/Address/UserAddressForm';
import { Address, UserAddressType } from '@/models/interfaces/User';
import { Edit, Home, MapPin, Plus, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import UserDeleteAddressForm from './UserDeleteAddressForm';

export interface TerritoryOption {
  territory_id: number;
  territory_name: string;
}
interface LoaderData {
  addresses: Address[];
  addressTypes: UserAddressType[];
}

const UserAddressesPage: React.FC = () => {
  const { addresses, addressTypes } = useLoaderData() as LoaderData;

  // Dialog state management
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isNewAddress, setIsNewAddress] = useState(false);

  // Countries data and loading state
  const [countries, setCountries] = useState<TerritoryOption[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);

  // Memoize countries to avoid unnecessary reloads
  const memoizedCountries = useMemo(() => countries, [countries]);

  // Load countries when dialog opens
  useEffect(() => {
    if (dialogOpen && countries.length === 0) {
      loadCountries();
    }
  }, [dialogOpen]);

  /**
   * Loads countries from the API
   */
  const loadCountries = async () => {
    setIsLoadingCountries(true);
    try {
      const response = await NetworkClient.getCountries();
      const countriesData: TerritoryOption[] = response.data.map(
        (country: any) => ({
          territory_id: country.territory_id,
          territory_name: country.territory_name,
        })
      );
      setCountries(countriesData);
    } catch (error) {
      console.error('Error loading countries:', error);
    } finally {
      setIsLoadingCountries(false);
    }
  };

  // Handle showing the dialog for editing an address
  const handleEditAddress = (address: Address) => {
    setSelectedAddress(address);
    setIsNewAddress(false);
    setDialogOpen(true);
  };

  // Handle showing the dialog for adding a new address
  const handleAddAddress = () => {
    setSelectedAddress(null);
    setIsNewAddress(true);
    setDialogOpen(true);
  };

  return (
    <PageContent>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Your Addresses</h1>
          {addresses.length > 0 && (
            <Button
              onClick={handleAddAddress}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Address
            </Button>
          )}
        </div>

        {!addresses.length ? (
          // No address state - show add button
          <Card className="overflow-hidden border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MapPin className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No address added</h3>
              <p className="mb-6 text-center text-sm text-muted-foreground">
                Add your address to get started.
              </p>
              <Button
                onClick={handleAddAddress}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Address
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Addresses exist - show address cards in a grid layout
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {addresses
              .sort((a, b) => {
                // Primary address first, then all others
                if (a.is_primary && !b.is_primary) return -1;
                if (!a.is_primary && b.is_primary) return 1;
                return 0;
              })
              .map((address) => (
                <Card key={address.address_id} className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Home className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {address.street}
                        </CardTitle>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant="default">{address.type}</Badge>
                          {address.is_primary && (
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800 hover:bg-green-200"
                            >
                              Primary
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      {address.territories
                        .map((t) => t.territory_name)
                        .join(', ')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.street}, {address.house_number}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.zip}
                    </p>

                    <div className="mt-4 flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditAddress(address)}
                        className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="mr-1 h-3.5 w-3.5" />
                        Edit
                      </Button>
                      <UserDeleteAddressForm
                        addressId={address.address_id}
                        buttonTrigger={{
                          variant: 'ghost',
                          size: 'sm',
                          className:
                            'flex items-center text-sm text-muted-foreground hover:text-destructive',
                          children: (
                            <>
                              <Trash2 className="mr-1 h-3.5 w-3.5" />
                              Delete
                            </>
                          ),
                        }}
                        is_primary={address.is_primary}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>

      {/* Dialog for editing or adding an address */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>
              {isNewAddress ? 'Add New Address' : 'Edit Address'}
            </DialogTitle>
            <DialogDescription>
              Set up your address details below. You can add or edit your
              address information.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            {(isNewAddress || selectedAddress) && (
              <UserAddressForm
                address={selectedAddress}
                setShowAddressForm={() => setDialogOpen(false)}
                countries={memoizedCountries}
                isLoadingCountries={isLoadingCountries}
                addressTypes={addressTypes}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </PageContent>
  );
};

export default UserAddressesPage;
