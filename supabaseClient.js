const { createClient } = window.supabase;

// Voeg hier je Supabase URL en key in
const supabaseUrl = 'https://gqreflutsbfynifqxlzx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxcmVmbHV0c2JmeW5pZnF4bHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MjgxMDUsImV4cCI6MjA5NTEwNDEwNX0.DXVwtAZhSN96Vf4T8ey0XcUENkXcs9gjFl-Exb9t-mQ';

const supabase = createClient(supabaseUrl, supabaseKey);

// Maak het globaal beschikbaar
window.supabaseClient = supabase;

console.log("Supabase client initialized:", supabase);
