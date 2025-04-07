// app/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface FormData {
  name: string;
  graduation_year: string;
  school: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
}

export default function SurveyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    graduation_year: "",
    school: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Post data to our API route
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      const data = await res.json();
      router.push(`/result?data=${encodeURIComponent(JSON.stringify(data))}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">SNU Hostel Bathroom Storage Survey</CardTitle>
          <CardDescription>
            Help us understand the issue of insufficient bathroom storage at SNU Hostel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Complete this survey to discover which bathing product best matches your personality! Find out if you&apos;re more of a luxurious bath bomb or a practical shower gel.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="graduation_year">Year of Graduation</Label>
                <Select name="graduation_year" required onValueChange={(value: string) => setFormData({...formData, graduation_year: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>                   
                    <SelectItem value="2028">2028</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="school">School of Study</Label>
                <Select name="school" required onValueChange={(value: string) => setFormData({...formData, school: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select school" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Natural Science">Natural Science</SelectItem>
                    <SelectItem value="Management and Entrepreneurship">Management and Entrepreneurship</SelectItem>
                    <SelectItem value="Humanities and Social Sciences">Humanities and Social Sciences</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Survey Questions */}
            <div className="space-y-6">
              {[
                {
                  id: "q1",
                  question: "1. How affected are you by the bathroom storage issue?",
                  options: [
                    { text: "Not at all", value: "0" },
                    { text: "Slightly", value: "1" },
                    { text: "Moderately", value: "2" },
                    { text: "Severely", value: "3" },
                    { text: "Extremely", value: "4" }
                  ]
                },
                {
                  id: "q2",
                  question: "2. How important is a dedicated storage solution to you?",
                  options: [
                    { text: "Not important", value: "0" },
                    { text: "Somewhat important", value: "1" },
                    { text: "Important", value: "2" },
                    { text: "Very important", value: "3" },
                    { text: "Critical", value: "4" }
                  ]
                },
                {
                  id: "q4",
                  question: "3. What is the biggest item you carry to the washroom?",
                  options: [
                    { text: "100ml - 500ml (small bottles)", value: "0" },
                    { text: "500ml - 1L (medium bottles)", value: "1" },
                    { text: "1L - 1.5L (large bottles)", value: "2" },
                    { text: "1.5L - 2L (very large bottles)", value: "3" },
                    { text: "2L+ (extremely large bottles)", value: "4" }
                  ]
                },
                {
                  id: "q5",
                  question: "4. What is the maximum number of items you carry to the shower?",
                  options: [
                    { text: "1-2 items", value: "0" },
                    { text: "3-4 items", value: "1" },
                    { text: "5-6 items", value: "2" },
                    { text: "7-8 items", value: "3" },
                    { text: "9+ items", value: "4" }
                  ]
                },
                {
                  id: "q6",
                  question: "5. Would you like an extra compartment to carry menstrual products?",
                  options: [
                    { text: "I don't menstruate", value: "0" },
                    { text: "Yes", value: "4" },
                    { text: "No", value: "0" }
                  ]
                },
                {
                  id: "q7",
                  question: "6. Have you already tried organizing your toiletries in your bathroom?",
                  options: [
                    { text: "Yes, successfully", value: "4" },
                    { text: "Yes, but only partially effective", value: "3" },
                    { text: "Tried a little", value: "2" },
                    { text: "Not really", value: "1" },
                    { text: "Never", value: "0" }
                  ]
                },
                {
                  id: "q8",
                  question: "7. Describe your current improvisational system and its shortcomings:",
                  type: "textarea"
                }
              ].map((question) => (
                <div key={question.id} className="space-y-3">
                  <Label className="text-base font-medium">{question.question}</Label>
                  {question.type === "textarea" ? (
                    <textarea
                      name={question.id}
                      required
                      onChange={handleChange}
                      className="w-full min-h-[100px] p-2 border rounded-md"
                      placeholder="Describe your system and what doesn't work well about it..."
                    />
                  ) : (
                    <RadioGroup
                      name={question.id}
                      required
                      onValueChange={(value: string) => setFormData({...formData, [question.id]: value})}
                      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                    >
                      {question.options!.map((opt) => (
                        <div key={opt.value} className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent">
                          <RadioGroupItem value={opt.value} id={`${question.id}-${opt.value}`} />
                          <Label htmlFor={`${question.id}-${opt.value}`} className="text-sm cursor-pointer">{opt.text}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                </div>
              ))}

              <Button type="submit" className="w-full">Submit Survey</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
