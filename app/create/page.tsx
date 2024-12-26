import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LinkGenerator } from '@/components/create/link-generator';

export default function CreatePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create Your Space</CardTitle>
          <CardDescription>
            Choose a username to generate your unique messaging link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LinkGenerator />
        </CardContent>
      </Card>
    </div>
  );
}