import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    // fetch all survey results
    const { data, error } = await supabase
      .from('survey_results')
      .select('*');

    if (error) throw error;

    // calculate statistics
    const totalResponses = data.length;
    const averageScore = data.reduce((acc, curr) => acc + curr.score, 0) / totalResponses;
    
    // count responses by school
    const schoolCounts = data.reduce((acc, curr) => {
      acc[curr.school] = (acc[curr.school] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // count responses by evaluation
    const evaluationCounts = data.reduce((acc, curr) => {
      acc[curr.evaluation] = (acc[curr.evaluation] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // calculate average scores by question
    const questionAverages = {
      q1: data.reduce((acc, curr) => acc + Number(curr.q1), 0) / totalResponses,
      q2: data.reduce((acc, curr) => acc + Number(curr.q2), 0) / totalResponses,
      q3: data.reduce((acc, curr) => acc + Number(curr.q3), 0) / totalResponses,
      q4: data.reduce((acc, curr) => acc + Number(curr.q4), 0) / totalResponses,
      q5: data.reduce((acc, curr) => acc + Number(curr.q5), 0) / totalResponses,
      q6: data.reduce((acc, curr) => acc + Number(curr.q6), 0) / totalResponses,
      q7: data.reduce((acc, curr) => acc + Number(curr.q7), 0) / totalResponses,
      q8: data.reduce((acc, curr) => acc + Number(curr.q8), 0) / totalResponses,
    };

    return NextResponse.json({
      totalResponses,
      averageScore,
      schoolCounts,
      evaluationCounts,
      questionAverages,
      rawData: data
    });
  } catch (error) {
    return NextResponse.error();
  }
} 