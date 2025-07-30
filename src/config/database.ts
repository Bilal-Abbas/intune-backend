import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Only throw error if we're in production and missing required config
if (process.env.NODE_ENV === 'production') {
  if (!supabaseUrl || !supabaseServiceKey || !supabaseAnonKey) {
    throw new Error('Missing Supabase configuration for production');
  }
}

// For development, use anon key for both if service key is not provided
const devSupabaseUrl = supabaseUrl || 'https://placeholder.supabase.co';
const devSupabaseServiceKey = supabaseServiceKey || supabaseAnonKey || 'placeholder-service-key';
const devSupabaseAnonKey = supabaseAnonKey || 'placeholder-anon-key';

export const supabase = createClient(devSupabaseUrl, devSupabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export const supabaseAuth = createClient(devSupabaseUrl, devSupabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
}); 