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
  roll_number: string;
  email: string;
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
    roll_number: "",
    email: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                <Label htmlFor="roll_number">Roll Number</Label>
                <Input id="roll_number" name="roll_number" required onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="graduation_year">Year of Graduation</Label>
                <Select name="graduation_year" required onValueChange={(value: string) => setFormData({...formData, graduation_year: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
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
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Humanities">Humanities</SelectItem>
                    <SelectItem value="Sciences">Sciences</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
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
                  id: "q3",
                  question: "3. Have you tried to improvise your storage space?",
                  options: [
                    { text: "No, I haven't", value: "0" },
                    { text: "Yes, but it barely works", value: "1" },
                    { text: "Yes, it somewhat helps", value: "2" },
                    { text: "Yes, and it works well", value: "3" },
                    { text: "Yes, it's a perfect fix", value: "4" }
                  ]
                },
                {
                  id: "q4",
                  question: "4. How satisfied are you with the current solutions (if any)?",
                  options: [
                    { text: "Very satisfied", value: "0" },
                    { text: "Somewhat satisfied", value: "1" },
                    { text: "Neutral", value: "2" },
                    { text: "Dissatisfied", value: "3" },
                    { text: "Very dissatisfied", value: "4" }
                  ]
                },
                {
                  id: "q5",
                  question: "5. How much does the storage issue affect your daily routine?",
                  options: [
                    { text: "Not at all", value: "0" },
                    { text: "A little", value: "1" },
                    { text: "Moderately", value: "2" },
                    { text: "Significantly", value: "3" },
                    { text: "It's a major inconvenience", value: "4" }
                  ]
                },
                {
                  id: "q6",
                  question: "6. Would you prefer a reusable solution (e.g., solid shampoo bars) rather than plastic bottles?",
                  options: [
                    { text: "Definitely reusable", value: "4" },
                    { text: "Prefer reusable", value: "3" },
                    { text: "Neutral", value: "2" },
                    { text: "Prefer disposable", value: "1" },
                    { text: "No preference", value: "0" }
                  ]
                },
                {
                  id: "q7",
                  question: "7. Should the storage solution be provided free to students or be a paid option?",
                  options: [
                    { text: "Should be free", value: "4" },
                    { text: "Mostly free with minimal cost", value: "3" },
                    { text: "Neutral", value: "2" },
                    { text: "Paid but affordable", value: "1" },
                    { text: "No opinion", value: "0" }
                  ]
                },
                {
                  id: "q8",
                  question: "8. Have you already tried organizing your toiletries in your bathroom?",
                  options: [
                    { text: "Yes, successfully", value: "4" },
                    { text: "Yes, but only partially effective", value: "3" },
                    { text: "Tried a little", value: "2" },
                    { text: "Not really", value: "1" },
                    { text: "Never", value: "0" }
                  ]
                }
              ].map((question) => (
                <div key={question.id} className="space-y-3">
                  <Label className="text-base font-medium">{question.question}</Label>
                  <RadioGroup
                    name={question.id}
                    required
                    onValueChange={(value: string) => setFormData({...formData, [question.id]: value})}
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                  >
                    {question.options.map((opt) => (
                      <div key={opt.value} className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent">
                        <RadioGroupItem value={opt.value} id={`${question.id}-${opt.value}`} />
                        <Label htmlFor={`${question.id}-${opt.value}`} className="text-sm cursor-pointer">{opt.text}</Label>
                      </div>
                    ))}
                  </RadioGroup>
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
