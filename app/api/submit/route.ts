// app/api/submit/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getEvaluation, lookupProductEntry, lookupProductImage } from '@/lib/evaluations';

// validate env vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// init supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

interface SurveyData {
  name: string;
  graduation_year: string;
  school: string;
  q1: string;
  q2: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
}

export async function POST(request: Request) {
  try {
    const data: SurveyData = await request.json();

    // calculate total score
    const totalScore = 
      parseInt(data.q1 || '0') + 
      parseInt(data.q2 || '0') + 
      parseInt(data.q4 || '0') + 
      parseInt(data.q5 || '0') + 
      parseInt(data.q6 || '0') + 
      parseInt(data.q7 || '0');

    // get evaluation
    const evaluation = getEvaluation(totalScore);

    // insert into supabase
    const { error } = await supabase
      .from('survey_results')
      .insert({
        name: data.name,
        graduation_year: data.graduation_year,
        school: data.school,
        q1: parseInt(data.q1 || '0'),
        q2: parseInt(data.q2 || '0'),
        q4: parseInt(data.q4 || '0'),
        q5: parseInt(data.q5 || '0'),
        q6: parseInt(data.q6 || '0'),
        q7: parseInt(data.q7 || '0'),
        q8: data.q8,
        score: totalScore,
        evaluation: evaluation.title,
        product: evaluation.product
      });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    const productEntry = lookupProductEntry(evaluation.product);
    const displayProduct = productEntry 
      ? `${productEntry["Product Name"]} ${productEntry.Size} ${productEntry.Packaging}` 
      : evaluation.product;
    const image_filename = lookupProductImage(evaluation.product);

    return NextResponse.json({
      totalScore,
      evaluation: {
        title: evaluation.title,
        description: evaluation.description,
        product: evaluation.product
      },
      displayProduct,
      image_filename
    });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
