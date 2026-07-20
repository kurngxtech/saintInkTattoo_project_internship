/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
   throw new Error(
      '[Supabase] Variabel lingkungan VITE_SUPABASE_URL dan VITE_SUPABASE_PUBLISHABLE_KEY harus diisi di file .env.local'
   );
}

// Client bertipe Database — semua query .from() menjadi type-safe otomatis.
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);