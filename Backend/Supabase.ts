import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://xauiufvtmfyoqnnbvavc.supabase.co";
const supabaseKey = "sb_publishable_NtYvSNHCM6Q-GRcJJCa4EA_jAEfCI90";

export const supabase = createClient(supabaseUrl, supabaseKey);