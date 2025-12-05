-- Enable realtime for profiles table
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;

-- Enable realtime for trips table
ALTER PUBLICATION supabase_realtime ADD TABLE public.trips;

-- Set REPLICA IDENTITY FULL for complete row data during updates
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.trips REPLICA IDENTITY FULL;