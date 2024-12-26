'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/toast';
import { Copy, Link as LinkIcon } from 'lucide-react';

export function LinkGenerator() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const mockLink = `${window.location.origin}/m/${username}-${Math.random().toString(36).slice(2, 8)}`;
    setGeneratedLink(mockLink);
    setIsLoading(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast({
      title: 'Link copied!',
      description: 'Share it with your friends to start receiving messages.',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder="Enter a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      {!generatedLink ? (
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Link'}
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
            <code className="text-sm flex-1 break-all">{generatedLink}</code>
            <Button size="sm" variant="ghost" onClick={copyLink}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              setGeneratedLink('');
              setUsername('');
            }}
          >
            Generate New Link
          </Button>
        </div>
      )}
    </form>
  );
}