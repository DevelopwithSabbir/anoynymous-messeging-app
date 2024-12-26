'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Message } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';
import { Flag, Ban } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface MessageCardProps {
  message: Message;
}

export function MessageCard({ message }: MessageCardProps) {
  const [isBlocked, setIsBlocked] = useState(message.is_blocked);
  const { toast } = useToast();
  const supabase = createClient();

  const handleBlock = async () => {
    const { error } = await supabase
      .from('messages')
      .update({ is_blocked: true })
      .eq('id', message.id);

    if (!error) {
      setIsBlocked(true);
      toast({
        title: 'Message blocked',
        description: 'This sender can no longer message you.',
      });
    }
  };

  const handleReport = async () => {
    const { error } = await supabase
      .from('messages')
      .update({ reported_at: new Date().toISOString() })
      .eq('id', message.id);

    if (!error) {
      toast({
        title: 'Message reported',
        description: 'Thank you for helping keep our platform safe.',
      });
    }
  };

  if (isBlocked) {
    return null;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">
          From: Anonymous • {new Date(message.created_at).toLocaleDateString()}
        </p>
        <p className="mt-2">{message.content}</p>
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReport}
        >
          <Flag className="h-4 w-4 mr-2" />
          Report
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBlock}
        >
          <Ban className="h-4 w-4 mr-2" />
          Block
        </Button>
      </CardFooter>
    </Card>
  );
}