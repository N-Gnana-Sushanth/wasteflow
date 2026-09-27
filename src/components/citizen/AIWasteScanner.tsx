import React, { useState } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  Leaf,
  ArrowRight,
  RefreshCw,
  Info
} from 'lucide-react';
import { PRESET_WASTE_SAMPLES, analyzeWasteImage, PresetSample } from '../../services/aiService';
import { aiApi } from '../../services/api';
import { AIWasteAnalysisResult, WasteCategory } from '../../types';

interface AIWasteScannerProps {
  onSchedulePickupWithCategory?: (category: WasteCategory, itemName: string) => void;
  onLocateBinForCategory?: (category: WasteCategory) => void;
}

export const AIWasteScanner: React.FC<AIWasteScannerProps> = ({
  onSchedulePickupWithCategory,
  onLocateBinForCategory
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(PRESET_WASTE_SAMPLES[0].imageUrl);
  const [selectedLabel, setSelectedLabel] = useState<string>(PRESET_WASTE_SAMPLES[0].name);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AIWasteAnalysisResult | null>(null);
  const [customInputText, setCustomInputText] = useState<string>('');

  const handleScan = async (imgUrl: string, label: string) => {
    setIsScanning(true);
    setAnalysisResult(null);
    setSelectedImage(imgUrl);
    setSelectedLabel(label);

    try {
      // Call backend REST API endpoint
      const result = await aiApi.classifyWaste(imgUrl, label);
      setAnalysisResult(result);
    } catch (err) {
      console.warn('[AI Scan] API fallback to local classifier:', err);
      const fallback = await analyzeWasteImage(imgUrl, label);
      setAnalysisResult(fallback);
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          handleScan(reader.result, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomTextScan = () => {
    if (!customInputText.trim()) return;
    handleScan('https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500', customInputText);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">
                <Sparkles className="h-4 w-4" />
              </span>
              <h2 className="text-lg font-bold text-white">AI Waste Vision Classifier</h2>
              <span className="rounded bg-slate-800 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 text-[10px] font-mono">
                AI DEMO
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Upload or photograph any waste item. Deterministic vision classification maps items to proper bins and municipal disposal workflows.
            </p>
          </div>

          <label className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2 text-xs cursor-pointer transition-colors shadow-sm shrink-0">
            <Camera className="h-4 w-4" />
            <span>Upload / Snap Photo</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      </div>

      {/* Preset Item Selector Chips */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Select Test Item Sample:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {PRESET_WASTE_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleScan(sample.imageUrl, sample.name)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedLabel === sample.name
                  ? 'border-emerald-500 bg-slate-850 shadow-sm'
                  : 'border-slate-800 bg-slate-900 hover:border-slate-700'
              }`}
            >
              <span className="block text-[10px] font-mono text-emerald-400 uppercase font-semibold">
                {sample.category}
              </span>
              <p className="text-xs font-medium text-slate-200 truncate mt-0.5">
                {sample.name}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Manual Search Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={customInputText}
          onChange={(e) => setCustomInputText(e.target.value)}
          placeholder="Or type an item name (e.g. laptop battery, soda can, banana peel, paint can)..."
          className="flex-1 rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          onKeyDown={(e) => e.key === 'Enter' && handleCustomTextScan()}
        />
        <button
          onClick={handleCustomTextScan}
          className="rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 px-4 py-2 text-xs font-medium"
        >
          Classify
        </button>
      </div>

      {/* Scanning Status */}
      {isScanning && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center space-y-3 animate-fade-in">
          <RefreshCw className="h-8 w-8 text-emerald-400 animate-spin mx-auto" />
          <h3 className="text-sm font-semibold text-white">Analyzing Item Composition...</h3>
          <p className="text-xs text-slate-400 font-mono">Simulated Neural Inference (Backend REST API)</p>
        </div>
      )}

      {/* Analysis Result Card */}
      {analysisResult && !isScanning && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-md space-y-5 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                  {analysisResult.detectedCategory} Category
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {analysisResult.confidence}% Confidence
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  AI DEMO
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1.5">{analysisResult.itemName}</h3>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Recommended Bin</span>
              <p className="text-xs font-bold text-emerald-400 mt-0.5">{analysisResult.binColor}</p>
            </div>
          </div>

          {/* Action Recommendation */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed">
            <span className="text-[11px] font-semibold text-slate-400 uppercase font-mono block mb-1">Disposal Protocol:</span>
            {analysisResult.recommendation}
          </div>

          {/* Why this Category */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Classification Rationale:</h4>
            <div className="space-y-1.5">
              {analysisResult.whyCategory.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono uppercase">Recyclability</span>
              <p className="font-bold text-white mt-0.5">{analysisResult.recyclabilityRate}%</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono uppercase">Hazard Level</span>
              <p className={`font-bold mt-0.5 ${analysisResult.hazardLevel === 'HIGH' ? 'text-red-400' : 'text-emerald-400'}`}>
                {analysisResult.hazardLevel}
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono uppercase">CO2 Avoided/kg</span>
              <p className="font-bold text-emerald-400 mt-0.5">~{analysisResult.estimatedCo2AvoidancePerKg} kg</p>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            {onSchedulePickupWithCategory && (
              <button
                onClick={() => onSchedulePickupWithCategory(analysisResult.detectedCategory, analysisResult.itemName)}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 text-xs shadow-sm transition-colors"
              >
                <span>Schedule Doorstep Pickup for {analysisResult.detectedCategory}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
            {onLocateBinForCategory && (
              <button
                onClick={() => onLocateBinForCategory(analysisResult.detectedCategory)}
                className="rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200 px-4 py-2.5 text-xs font-medium"
              >
                Locate Nearest Bin
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
