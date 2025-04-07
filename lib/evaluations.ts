import productsData from '../products.json';

export interface Evaluation {
  range: number[];
  title: string;
  description: string;
  product: string;
}

export const evaluations: Evaluation[] = [
  {
    range: [0, 1, 2, 3],
    title: "Minimal Impact",
    description: "Your routine is hardly disrupted.",
    product: "Biotique Bio Neem Purifying Shampoo"
  },
  {
    range: [4, 5, 6],
    title: "Slightly Affected",
    description: "The issue barely causes inconvenience.",
    product: "Biotique Anti Hair Fall Shampoo"
  },
  {
    range: [7, 8, 9],
    title: "Mildly Affected",
    description: "You experience minor daily clutter.",
    product: "Mamaearth Onion Shampoo for Hair Fall"
  },
  {
    range: [10, 11, 12],
    title: "Noticeably Affected",
    description: "The storage issue slightly disrupts your routine.",
    product: "Himalaya Anti-Dandruff Shampoo"
  },
  {
    range: [13, 14, 15],
    title: "Moderately Affected",
    description: "There's clear inconvenience; a better solution is needed.",
    product: "Dove Daily Shine Conditioner"
  },
  {
    range: [16, 17, 18],
    title: "Somewhat Disrupted",
    description: "The storage problem affects you enough to seek change.",
    product: "Clinic Plus Anti Hair Fall Shampoo"
  },
  {
    range: [19, 20, 21],
    title: "Affected",
    description: "You face notable disruptions in your routine.",
    product: "Sunsilk Smooth & Manageable Shampoo"
  },
  {
    range: [22, 23, 24],
    title: "Heavily Affected",
    description: "Daily clutter is a real headache.",
    product: "Dove Hair Fall Rescue Shampoo"
  },
  {
    range: [25, 26, 27, 28],
    title: "Severely Affected",
    description: "The problem has a significant negative impact.",
    product: "Pantene Pro-V Total Damage Shampoo"
  },
  {
    range: [29, 30, 31, 32],
    title: "In Crisis",
    description: "Your bathroom is in chaos – an immediate solution is needed!",
    product: "Tresemme Keratin Smooth Conditioner"
  }
];

// A simple function to get an evaluation by total score.
export function getEvaluation(totalScore: number): Evaluation {
  for (const evalItem of evaluations) {
    if (evalItem.range.includes(totalScore)) {
      return evalItem;
    }
  }
  return evaluations[evaluations.length - 1];
}

// A lookup function to select the product entry with the largest numeric size.
export interface Product {
  "Product Name": string;
  Brand: string;
  Category: string;
  Size: string;
  Packaging: string;
}

export function lookupProductEntry(productQuery: string): Product | null {
  const filtered = productsData.filter((p: Product) =>
    p["Product Name"].toLowerCase().includes(productQuery.toLowerCase())
  );
  if (filtered.length === 0) return null;
  // Sort by numeric size (extracted from Size string, e.g., "750ml" → 750)
  filtered.sort((a: Product, b: Product) => {
    const numA = parseInt(a.Size.match(/\d+/)?.[0] || "0");
    const numB = parseInt(b.Size.match(/\d+/)?.[0] || "0");
    return numB - numA;
  });
  return filtered[0];
}

export function lookupProductImage(productQuery: string): string {
  const entry = lookupProductEntry(productQuery);
  if (entry) {
    // format filename to match the pattern in public/images
    const fileName = `${entry["Product Name"]}_${entry.Size}`
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .replace(/\s+/g, "_")
      .replace(/&/g, "___")
      .replace(/\//g, "_")
      .replace(/__+/g, "_") + ".jpg";
    return fileName;
  }
  // if no match found, return the first available image
  return "Nivea_Fresh_Active_Body_Wash_400ml.jpg";
}
