import { AIWasteAnalysisResult, WasteCategory } from '../types';
import { wasteScanRepository } from '../repositories/wasteScanRepository';

export class AiService {
  public classifyWaste(imageSource: string, optionalLabel?: string, userId?: string): AIWasteAnalysisResult {
    const lower = (optionalLabel || '').toLowerCase();

    let result: AIWasteAnalysisResult;

    if (lower.includes('laptop') || lower.includes('phone') || lower.includes('battery') || lower.includes('cable') || lower.includes('ewaste') || lower.includes('electronic') || imageSource.includes('1550009158')) {
      result = {
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
    } else if (lower.includes('bottle') || lower.includes('plastic') || lower.includes('polythene') || imageSource.includes('1563245372')) {
      result = {
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
    } else if (lower.includes('food') || lower.includes('fruit') || lower.includes('peel') || lower.includes('organic') || lower.includes('wet') || imageSource.includes('1542601906990')) {
      result = {
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
    } else if (lower.includes('box') || lower.includes('paper') || lower.includes('cardboard') || imageSource.includes('1530587191')) {
      result = {
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
    } else if (lower.includes('chemical') || lower.includes('paint') || lower.includes('hazard') || lower.includes('solvent') || imageSource.includes('1584308666')) {
      result = {
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
    } else if (lower.includes('glass') || lower.includes('jar') || imageSource.includes('1513519245')) {
      result = {
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
    } else {
      result = {
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

    if (userId) {
      wasteScanRepository.create({
        id: `scan-${Date.now()}`,
        userId,
        timestamp: new Date().toISOString(),
        category: result.detectedCategory,
        confidence: result.confidence,
        itemName: result.itemName,
        imageUrl: imageSource.startsWith('data:') ? undefined : imageSource
      });
    }

    return result;
  }
}

export const aiService = new AiService();
