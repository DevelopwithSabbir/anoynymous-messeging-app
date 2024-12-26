/*
  # Initial Schema Setup for Anonymous Messaging Platform

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - matches auth.users id
      - `username` (text, unique) - public username for the messaging space
      - `created_at` (timestamp)
      - `blocked_sessions` (text[]) - array of blocked session IDs
    
    - `messages`
      - `id` (uuid, primary key)
      - `profile_id` (uuid) - recipient's profile ID
      - `session_id` (text) - anonymous sender's session ID
      - `content` (text) - message content
      - `created_at` (timestamp)
      - `is_read` (boolean)
      - `is_blocked` (boolean)
      - `reported_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  blocked_sessions text[] DEFAULT '{}'::text[]
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) NOT NULL,
  session_id text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  is_read boolean DEFAULT false,
  is_blocked boolean DEFAULT false,
  reported_at timestamptz,
  CONSTRAINT valid_content CHECK (length(trim(content)) > 0)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Messages policies
CREATE POLICY "Users can read messages sent to them"
  ON messages FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Anyone can create messages"
  ON messages FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can update messages sent to them"
  ON messages FOR UPDATE
  TO authenticated
  USING (profile_id = auth.uid());