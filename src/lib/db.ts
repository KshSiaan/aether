import { createClient } from '@supabase/supabase-js'
import { dbConfig } from './config'

export const supabase = createClient(dbConfig.url, dbConfig.anon_key)