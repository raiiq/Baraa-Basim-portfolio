
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kkoliboxrlakczkrhtax.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtrb2xpYm94cmxha2N6a3JodGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyODc1MzEsImV4cCI6MjA4Mzg2MzUzMX0.0RUns0D1OuBHAbE-8rFLGexxQS5fr0r79Czy7sdNdB8';

export const supabase = createClient(supabaseUrl, supabaseKey);
