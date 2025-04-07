// app/api/submit/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { getEvaluation, lookupProductEntry, lookupProductImage, evaluations } from '@/lib/evaluations';

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
    const body: SurveyData = await request.json();

    // Parse scores as numbers
    const scoreValues = [
      Number(body.q1),
      Number(body.q2),
      Number(body.q4),
      Number(body.q5),
      Number(body.q6),
      Number(body.q7)
      // q8 is text input, doesn't contribute to score
    ];
    const totalScore = scoreValues.reduce((a, b) => a + b, 0);
    const evaluation = getEvaluation(totalScore);
    
    const productEntry = lookupProductEntry(evaluation.product);
    const displayProduct = productEntry 
      ? `${productEntry["Product Name"]} ${productEntry.Size} ${productEntry.Packaging}` 
      : evaluation.product;
    const image_filename = lookupProductImage(evaluation.product);

    // Save the survey response in Supabase (table "survey_results")
    const { error } = await supabase.from('survey_results').insert([
      {
        name: body.name,
        graduation_year: body.graduation_year,
        school: body.school,
        q1: Number(body.q1),
        q2: Number(body.q2),
        q4: Number(body.q4),
        q5: Number(body.q5),
        q6: Number(body.q6),
        q7: Number(body.q7),
        q8: body.q8,
        score: totalScore,
        evaluation: evaluation.title,
        product: displayProduct
      }
    ]);
    if (error) throw error;

    return NextResponse.json({
      evaluation,
      displayProduct,
      image_filename
    });
  } catch (error: any) {
    return NextResponse.error();
  }
}
