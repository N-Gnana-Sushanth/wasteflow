import { AIWasteAnalysisResult, WasteCategory, SmartBin } from '../types';

export interface PresetSample {
  id: string;
  name: string;
  category: WasteCategory;
  imageUrl: string;
  description: string;
}

export const PRESET_WASTE_SAMPLES: PresetSample[] = [
  {
    id: 'sample-ewaste',
    name: 'Obsolete Laptop & Charger Core',
    category: 'E-Waste',
    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=80',
    description: 'Lithium battery pack, printed circuit board (PCB) with gold/copper traces, aluminum heat sinks.'
  },
  {
    id: 'sample-plastic',
    name: 'PET Water & Beverage Bottles',
    category: 'Plastic',
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=80',
    description: 'Thermoplastic Polyethylene Terephthalate (#1 PETE) with PP caps.'
  },
  {
    id: 'sample-organic',
    name: 'Kitchen Vegetable & Fruit Scraps',
    category: 'Wet',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=80',
    description: 'High-moisture organic biodegradable nitrogen-rich biomass.'
  },
  {
    id: 'sample-paper',
    name: 'Corrugated Cardboard Packaging Box',
    category: 'Paper',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500&auto=format&fit=crop&q=80',
    description: 'Unbleached kraft cellulose fibers, clean and moisture-free.'
  },
  {
    id: 'sample-glass',
    name: 'Clear Glass Jars & Condiment Bottles',
    category: 'Glass',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80',
    description: '100% infinitely recyclable silica soda-lime glass container.'
  },
  {
    id: 'sample-metal',
    name: 'Aluminum Beverage Cans & Aerosol Tin',
    category: 'Metal',
    imageUrl: 'https://images.unsplash.com/photo-1582408921715-18e7806365c1?w=500&auto=format&fit=crop&q=80',
    description: 'High-purity non-ferrous aluminum alloy, low melting point.'
  },
  {
    id: 'sample-hazardous',
    name: 'Industrial Solvent & Paint Residual Can',
    category: 'Hazardous',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    description: 'Volatile organic compounds (VOCs), flammable heavy chemical residues.'
  }
];

export async function analyzeWasteImage(
  imageSource: string,
  optionalLabel?: string
): Promise<AIWasteAnalysisResult> {
  // Simulate neural processing latency (450ms - 900ms)
  await new Promise(resolve => setTimeout(resolve, 650));

  const lowerLabel = (optionalLabel || '').toLowerCase();
  
  if (lowerLabel.includes('laptop') || lowerLabel.includes('phone') || lowerLabel.includes('battery') || lowerLabel.includes('cable') || lowerLabel.includes('ewaste') || lowerLabel.includes('electronic') || imageSource.includes('1550009158')) {
    return {
      detectedCategory: 'E-Waste',
      confidence: 97.4,
      itemName: 'Complex Electronic Hardware & Lithium Battery Unit',
      binColor: 'Neon Violet / E-Waste Dedicated Bin',
      binHex: '#8b5cf6',
      recommendation: 'Do not mix with municipal trash. Book an authorized doorstep E-Waste pickup or drop at CircuitCycle Refinery.',
      whyCategory: [
        'Multi-layer printed circuit board (PCB) contains recoverable gold, copper, and palladium.',
        'Lithium-ion cells present severe thermal runaway and fire hazard if compressed in normal compactor trucks.',
        'Lead solder and flame-retardant brominated plastics require certified hydrometallurgical extraction.'
      ],
      recyclabilityRate: 92.5,
      hazardLevel: 'HIGH',
      estimatedCo2AvoidancePerKg: 3.8,
      specialInstructions: 'Insulate exposed battery terminals with tape before handover. Keep in dry enclosure.',
      isSimulated: true
    };
  }

  if (lowerLabel.includes('bottle') || lowerLabel.includes('plastic') || lowerLabel.includes('polythene') || imageSource.includes('1563245372')) {
    return {
      detectedCategory: 'Plastic',
      confidence: 96.1,
      itemName: 'Polyethylene Terephthalate (PETE #1) Beverage Bottle',
      binColor: 'Blue Bin (Dry Recyclables - Plastics)',
      binHex: '#3b82f6',
      recommendation: 'Empty liquid contents, rinse lightly, crush flat to conserve bin volume, and place in Blue Bin.',
      whyCategory: [
        'Resin Identification Code #1 (PET) verified through optical clarity and seam profile.',
        'High tensile strength polymer suitable for closed-loop bottle-to-bottle pelletization.',
        'Non-hazardous when unheated, but takes 450+ years to decompose in open landfills.'
      ],
      recyclabilityRate: 98.0,
      hazardLevel: 'NONE',
      estimatedCo2AvoidancePerKg: 1.6,
      specialInstructions: 'Keep plastic caps screwed on or separate according to local MRF optical sorter rules.',
      isSimulated: true
    };
  }

  if (lowerLabel.includes('food') || lowerLabel.includes('fruit') || lowerLabel.includes('peel') || lowerLabel.includes('organic') || lowerLabel.includes('wet') || imageSource.includes('1542601906990')) {
    return {
      detectedCategory: 'Wet',
      confidence: 98.2,
      itemName: 'Kitchen Biodegradable Biomass & Vegetable Scraps',
      binColor: 'Green Bin (Wet / Organic Waste)',
      binHex: '#22c55e',
      recommendation: 'Dispose in Green Bin within 24 hours for anaerobic bio-methanation and vermicomposting.',
      whyCategory: [
        'High organic carbon and nitrogen ratio ideal for bacterial digestion and biogas capture.',
        'High moisture content (>72%) makes it unsuitable for RDF thermal incineration.',
        'Releases harmful methane (CH4) if trapped anaerobically in landfills without gas collection.'
      ],
      recyclabilityRate: 100.0,
      hazardLevel: 'LOW',
      estimatedCo2AvoidancePerKg: 0.9,
      specialInstructions: 'Do not wrap in plastic polythene carry bags. Use newspaper or compostable starch liner.',
      isSimulated: true
    };
  }

  if (lowerLabel.includes('box') || lowerLabel.includes('paper') || lowerLabel.includes('cardboard') || imageSource.includes('1530587191')) {
    return {
      detectedCategory: 'Paper',
      confidence: 95.7,
      itemName: 'Clean Corrugated Cardboard Packaging (OCC)',
      binColor: 'Blue Bin (Paper & Cardboard Section)',
      binHex: '#60a5fa',
      recommendation: 'Flatten boxes completely and ensure no oil or food contamination before placing in Dry Bin.',
      whyCategory: [
        'Long cellulose fibers can be re-pulped and recycled up to 6-7 times into fresh shipping cartons.',
        'Free from wax coating or grease stains that would degrade hydrapulper slurry quality.',
        'Saves 17 trees and 4,000 kW of energy per ton recycled.'
      ],
      recyclabilityRate: 94.0,
      hazardLevel: 'NONE',
      estimatedCo2AvoidancePerKg: 1.4,
      specialInstructions: 'Remove synthetic packaging tape and plastic shipping pouches before binning.',
      isSimulated: true
    };
  }

  if (lowerLabel.includes('chemical') || lowerLabel.includes('paint') || lowerLabel.includes('hazard') || lowerLabel.includes('solvent') || imageSource.includes('1584308666')) {
    return {
      detectedCategory: 'Hazardous',
      confidence: 99.1,
      itemName: 'Volatile Solvent Residue & Chemical Container',
      binColor: 'Red Bin (Hazardous / Bio-Chemical Containment)',
      binHex: '#ef4444',
      recommendation: 'Strictly isolate. Schedule special hazardous doorstep pickup. Never pour into domestic sewer.',
      whyCategory: [
        'High concentration of toxic aromatic hydrocarbons and heavy metal pigments.',
        'Flammable flashpoint (<60°C) poses explosion risk inside compactor vehicle blades.',
        'Leachate can contaminate groundwater aquifers for decades if landfilled.'
      ],
      recyclabilityRate: 45.0,
      hazardLevel: 'HIGH',
      estimatedCo2AvoidancePerKg: 4.5,
      specialInstructions: 'Keep lid tightly closed. Store away from heat and open flames until collection.',
      isSimulated: true
    };
  }

  if (lowerLabel.includes('glass') || lowerLabel.includes('jar') || imageSource.includes('1513519245')) {
    return {
      detectedCategory: 'Glass',
      confidence: 96.9,
      itemName: 'Silica Soda-Lime Glass Container',
      binColor: 'Teal Bin (Glass & Ceramics Collection)',
      binHex: '#0d9488',
      recommendation: 'Rinse cleanly and place in designated Glass receptacle or drop at local MRF center.',
      whyCategory: [
        '100% infinitely recyclable without any loss in chemical purity or structural integrity.',
        'Melts at lower kiln temperatures than raw silica sand, reducing furnace energy by 30%.',
        'Physical puncture hazard for sanitation workers if shattered in soft bags.'
      ],
      recyclabilityRate: 99.0,
      hazardLevel: 'MEDIUM',
      estimatedCo2AvoidancePerKg: 1.1,
      specialInstructions: 'Do not mix with heat-resistant borosilicate Pyrex or broken mirror glass.',
      isSimulated: true
    };
  }

  // Default Dry / Mixed
  return {
    detectedCategory: 'Dry',
    confidence: 92.3,
    itemName: 'Commercial Dry Recyclable Mixed Consumable',
    binColor: 'Blue Bin (Dry Recyclables)',
    binHex: '#3b82f6',
    recommendation: 'Ensure clean and dry condition before putting into the municipal blue recyclable bin.',
    whyCategory: [
      'Composite materials with recyclable outer layer.',
      'Low moisture content allows mechanical sorting at Material Recovery Facility (MRF).',
      'Eligible for refuse-derived fuel (RDF) or secondary material reprocessing.'
    ],
    recyclabilityRate: 85.0,
    hazardLevel: 'NONE',
    estimatedCo2AvoidancePerKg: 1.2,
    specialInstructions: 'Separate distinct components if separable by hand.',
    isSimulated: true
  };
}

export function generateAssistantAnswer(question: string): {
  answer: string;
  category?: WasteCategory;
  suggestedActions?: { label: string; action: string }[];
} {
  const q = question.toLowerCase();

  if (q.includes('where') || q.includes('dispose') || q.includes('throw') || q.includes('drop')) {
    if (q.includes('battery') || q.includes('laptop') || q.includes('phone') || q.includes('e-waste') || q.includes('electronic')) {
      return {
        answer: 'E-Waste (batteries, laptops, broken appliances) contains precious metals and hazardous heavy elements. Please do not dispose in regular bins! You can either schedule a free doorstep E-Waste pickup on WasteFlow or drop them off at the CircuitCycle Refinery in Kukatpally (Zone 6).',
        category: 'E-Waste',
        suggestedActions: [
          { label: 'Schedule E-Waste Pickup', action: 'OPEN_PICKUP_FORM' },
          { label: 'Find Nearby Centers', action: 'OPEN_CENTERS' }
        ]
      };
    }
    if (q.includes('medicine') || q.includes('paint') || q.includes('chemical') || q.includes('bulb')) {
      return {
        answer: 'Expired medicines, paints, and fluorescent bulbs fall under Hazardous Waste. They must be placed in the Red Hazard Container or handed over to our specialized Hazardous Transport fleet (Vehicle T-04).',
        category: 'Hazardous',
        suggestedActions: [
          { label: 'Book Hazardous Collection', action: 'OPEN_PICKUP_FORM' }
        ]
      };
    }
    return {
      answer: 'General Rule: Green Bins are strictly for Wet/Organic food scraps; Blue Bins are for clean Dry recyclables (paper, plastic, cans); Teal Bins for Glass; and Red/Special dispatch for Hazardous & E-Waste. You can also use our AI Waste Scanner to instantly verify any item!',
      suggestedActions: [
        { label: 'Launch AI Scanner', action: 'OPEN_SCANNER' }
      ]
    };
  }

  if (q.includes('next pickup') || q.includes('when') || q.includes('schedule') || q.includes('time')) {
    return {
      answer: 'Your next scheduled doorstep pickup is tomorrow, 10:00 AM - 12:00 PM for E-Waste (Request REQ-2026-8801). Driver Ramesh Kumar is assigned with EcoCompactor Alpha (T-01). You can track live GPS location in real-time!',
      suggestedActions: [
        { label: 'Track Live Truck', action: 'OPEN_TRACKING' },
        { label: 'View Request Details', action: 'OPEN_PICKUPS' }
      ]
    };
  }

  if (q.includes('delay') || q.includes('late') || q.includes('why')) {
    return {
      answer: 'Collection delays typically occur due to peak traffic congestion, urgent critical overflow re-routing, or road work. In your zone (Zone 1), fleet movements are currently running on a 94.8% on-time SLA. If your pickup is delayed beyond 30 minutes, an automatic 50 bonus eco-points credit is applied.',
      suggestedActions: [
        { label: 'View Live Route Status', action: 'OPEN_TRACKING' }
      ]
    };
  }

  if (q.includes('reward') || q.includes('point') || q.includes('earn') || q.includes('badge')) {
    return {
      answer: 'You currently have 1,240 Eco-Points and Level 4 "Eco Champion" rank! You earn points by: 1) Verified segregated pickups (+80-150 pts), 2) Reporting illegal dumping with photos (+100 pts), and 3) Perfect monthly segregation streaks (+250 pts). Points can be redeemed for Metro passes, tree planting, or property tax rebates.',
      suggestedActions: [
        { label: 'Explore Rewards Catalog', action: 'OPEN_REWARDS' }
      ]
    };
  }

  if (q.includes('dump') || q.includes('illegal') || q.includes('report') || q.includes('garbage on road')) {
    return {
      answer: 'Spot illegal dumping or road garbage? Snap a quick photo with your camera and submit an Illegal Dumping Report. Our AI automatically verifies the volume and dispatches a Rapid Clean Squad within 45 minutes.',
      suggestedActions: [
        { label: 'Report Illegal Dump Now', action: 'OPEN_DUMPING_FORM' }
      ]
    };
  }

  return {
    answer: 'I am your WasteFlow AI Smart Assistant. I can help you identify disposal categories, track municipal vehicles, explain collection schedules, report dumping, and redeem citizen eco-rewards. How can I assist you today?',
    suggestedActions: [
      { label: 'Scan Waste Item', action: 'OPEN_SCANNER' },
      { label: 'Schedule Pickup', action: 'OPEN_PICKUP_FORM' },
      { label: 'Live Vehicle Map', action: 'OPEN_MAP' }
    ]
  };
}
