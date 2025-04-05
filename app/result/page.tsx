// app/result/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const dataStr = searchParams.get('data');
  const data = dataStr ? JSON.parse(dataStr) : null;

  if (!data) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>No result data found</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Survey
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">You Are {data.displayProduct}!</CardTitle>
          <CardDescription className="text-center">
            Thank you for filling out our survey!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <img 
              src={`/images/${data.image_filename}`} 
              alt="Incentive Product" 
              className="max-w-xs w-full h-auto rounded-lg shadow-md" 
            />
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              We appreciate your time in helping us understand the issue of insufficient bathroom storage at SNU Hostel.
            </p>
            
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Survey
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
