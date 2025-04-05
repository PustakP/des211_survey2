import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST() {
  try {
    // create table with all columns
    const { error } = await supabase
      .from('survey_results')
      .insert([
        {
          name: 'test',
          roll_number: 'test',
          email: 'test@test.com',
          graduation_year: '2024',
          school: 'Engineering',
          q1: 0,
          q2: 0,
          q3: 0,
          q4: 0,
          q5: 0,
          q6: 0,
          q7: 0,
          q8: 0,
          score: 0,
          evaluation: 'test',
          product: 'test'
        }
      ])
      .select();

    if (error) {
      // if table doesn't exist, create it
      const { error: createError } = await supabase.rpc('create_survey_table');
      if (createError) throw createError;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 