// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mjixlxfzrcayevfulzmn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qaXhseGZ6cmNheWV2ZnVsem1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NTMxNDcsImV4cCI6MjA1MzIyOTE0N30.ssjL8m5S9AtjkICXVTF2zFGrm8N1yjHBesMV-A8n1qM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);