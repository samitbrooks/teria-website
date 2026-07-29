// src/app/admin/settings/paystack/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, ShieldCheck, Database, Server } from 'lucide-react';
import { getEnvKeys } from './actions';
import PaystackKeysForm from './_components/paystack-keys-form';

export default async function PaystackSettingsPage() {
  const { publicKey, maskedSecretKey } = await getEnvKeys();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Paystack Settings</CardTitle>
          <CardDescription>
            Manage your Paystack API keys. Choose to use keys from your server environment or securely store them in the database.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            <CardTitle className="text-xl">Method 1: Environment Variables (Recommended)</CardTitle>
          </div>
          <CardDescription>
            These keys are loaded from your `.env` file. This is the most secure method. To change them, you must edit the file and restart your server.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium text-sm">Public Key</p>
            <p className="text-muted-foreground font-mono text-sm bg-gray-100 p-2 rounded-md">{publicKey || 'Not set'}</p>
          </div>
          <div>
            <p className="font-medium text-sm">Secret Key (Masked)</p>
            <p className="text-muted-foreground font-mono text-sm bg-gray-100 p-2 rounded-md">{maskedSecretKey || 'Not set'}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
         <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            <CardTitle className="text-xl">Method 2: Database Storage (Convenient)</CardTitle>
          </div>
          <CardDescription>
            Update your keys here to store them in the database. The secret key is encrypted for security. Keys stored here will override the environment variables. Leave fields blank to remove them from the database and fall back to using environment variables.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Alert variant="default" className="mb-6 bg-blue-50 border-blue-200">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">How Encryption Works</AlertTitle>
                <AlertDescription className="text-blue-700">
                Your Paystack Secret Key is encrypted using a unique, server-side `ENCRYPTION_KEY` before being saved. Even if your database is compromised, the key remains unreadable without this separate, private key.
                </AlertDescription>
            </Alert>
            <PaystackKeysForm />
        </CardContent>
      </Card>
    </div>
  );
}
