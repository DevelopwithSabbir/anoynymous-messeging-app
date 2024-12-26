export interface Message {
  id: string;
  profile_id: string;
  session_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
  is_blocked: boolean;
  reported_at: string | null;
}

export interface Profile {
  id: string;
  username: string;
  created_at: string;
  blocked_sessions: string[];
}