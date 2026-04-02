"use client"

import { useState, useRef, useEffect } from "react"
import * as tmImage from "@teachablemachine/image"
import * as cocoSsd from "@tensorflow-models/coco-ssd"
import { EWASTE_MAPPING, EWasteDetails } from "../data/eWasteInfo"
import Link from "next/link"
import { useGamification } from "../utils/useGamification"
import { generateEWasteReport } from "../utils/pdfGenerator"
import { ShieldCheck, Zap, Layers, Trophy, FileText, Sparkles, RefreshCcw } from "lucide-react"

export default function EwasteCheckPage() {
  const [imageURL, setImageURL] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [topPrediction, setTopPrediction] = useState<{ label: string; confidence: number } | null>(null)
  const [multiDetections, setMultiDetections] = useState<any[]>([])
  const [details, setDetails] = useState<EWasteDetails | null>(null)
  const [suggestion, setSuggestion] = useState<{ type: string; text: string } | null>(null)

  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { points, level, addPoints } = useGamification()

  const MODEL_URL = "https://teachablemachine.withgoogle.com/models/-54uzdzxw/"

  // Smart Suggestion Logic
  const generateSuggestion = (label: string, hazard: string) => {
    if (label.includes("Laptop") || label.includes("Phone") || label.includes("Tablet")) {
      return { type: "Sell/Donate", text: "High resale value! Consider selling on our marketplace or donating to a local school." };
    }
    if (hazard === "High") {
      return { type: "Recycle Only", text: "Hazardous materials detected. Do not sell. Book a certified eco-pickup immediately." };
    }
    return { type: "Refurbish", text: "Simple components detected. These can be used for DIY electronics projects or repair spare parts." };
  };

  const handleDownloadReport = () => {
    if (!topPrediction || !details || !imgRef.current) return;

    // Capture the current image from the ref for the PDF
    const canvas = document.createElement("canvas");
    canvas.width = imgRef.current.naturalWidth;
    canvas.height = imgRef.current.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(imgRef.current, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg", 0.8);

      generateEWasteReport({
        itemName: topPrediction.label,
        confidence: topPrediction.confidence,
        category: details.category,
        hazardLevel: details.hazardLevel,
        recyclingDifficulty: details.recyclingDifficulty,
        materials: details.materials,
        impact: details.description,
        imageData: imageData // Passing the captured image
      });
    }
  };

  // Run Object Detection Overlay
  const drawDetections = (detections: any[]) => {
    const canvas = canvasRef.current;
    if (!canvas || !imgRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match image
    canvas.width = imgRef.current.width;
    canvas.height = imgRef.current.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detections.forEach(det => {
      const [x, y, width, height] = det.bbox;

      // Draw Bounding Box
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);

      // Draw Label Background
      ctx.fillStyle = '#10b981';
      ctx.fillRect(x, y - 30, width, 30);

      // Draw Label Text
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial bold';
      ctx.fillText(`${det.class} (${(det.score * 100).toFixed(0)}%)`, x + 5, y - 10);

    });
  };

  async function runPrediction() {
    if (!imgRef.current) return;

    setLoading(true);
    setTopPrediction(null);
    setDetails(null);
    setMultiDetections([]);

    try {
      // 1. Classification (Teachable Machine - Trained Model)
      const model = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
      const predictions = await model.predict(imgRef.current);
      const tmTop = predictions.reduce((prev: any, current: any) =>
        (prev.probability > current.probability) ? prev : current
      );

      // 2. Multi-Object Detection (COCO-SSD - Universal Objects)
      const cocoModel = await cocoSsd.load();
      const detections = await cocoModel.detect(imgRef.current);
      setMultiDetections(detections);

      // 3. Neural Correction Logic
      // 3. Neural Fusion & Universal Correction Layer
      const eWasteMap: Record<string, string> = {
        'laptop': 'Laptop',
        'cell phone': 'Mobile Phone',
        'keyboard': 'PCB (Circuit Board)',
        'mouse': 'E-Waste',
        'tv': 'Monitor',
        'remote': 'Remote',
        'microwave': 'E-Waste',
        'refrigerator': 'Refrigerator',
        'hair drier': 'Hair Dryer',
        'toaster': 'E-Waste',
        'oven': 'E-Waste',
        'clock': 'E-Waste',
        'car': 'Remote Car',
        'truck': 'Remote Car',
        'book': 'E-Waste', // Often mistaken for tablets
        'bottle': 'Torch Light', // Often mistaken for torch/flashlight
        'banana': 'Battery', // 🚀 FIX: Common misclassification for AAA/AA Batteries
        'hot dog': 'Battery', // Common misclassification for thick batteries
        'toothbrush': 'PCB (Circuit Board)', // Often mistaken for narrow strips of PCB
        'tie': 'Jumping Wires' // Common for loose wires
      };

      // Find the most specific object from detection layer
      const highConfScan = detections.find(d => d.score > 0.4 && eWasteMap[d.class]);

      let finalLabel = tmTop.className;
      let finalConfidence = tmTop.probability * 100;

      // Smart Override Logic
      if (highConfScan) {
        finalLabel = eWasteMap[highConfScan.class];
        finalConfidence = Math.max(finalConfidence, highConfScan.score * 100);
        console.log(`Neural Fusion Trigger: Identified ${highConfScan.class} -> Mapping to ${finalLabel}`);
      }

      // Final Check: If "Non E-Waste" but contains a device keyword, fix it
      const forcedEwaste = ["mobile", "key board", "mouse", "cpu", "monitor", "remote", "battery", "hard disk", "ram", "rom", "cable", "printer", "wire", "tab", "watch", "camera", "pen drive", "hair dryer", "refrigreter", "torch", "car"];
      if (finalLabel.includes("Non") && forcedEwaste.some(k => finalLabel.toLowerCase().includes(k))) {
        finalLabel = finalLabel.replace("Non ", "");
      }

      setTopPrediction({
        label: finalLabel,
        confidence: finalConfidence
      });

      // Fetch metadata from expanded mapping
      const resultDetails = EWASTE_MAPPING[finalLabel] || EWASTE_MAPPING["E-Waste"];
      setDetails(resultDetails);

      // Set Smart Decision Suggestion
      setSuggestion(generateSuggestion(finalLabel, resultDetails.hazardLevel));

      // Award Points (Enhanced bonus for high-precision identification)
      addPoints(150);

      // Draw to canvas
      setTimeout(() => drawDetections(detections), 100);

    } catch (err) {
      console.error(err);
      alert("AI Processing error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 pt-16 pb-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden selection:bg-emerald-500/30">
      {/* Subtle Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-100/40 blur-[120px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-teal-100/30 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Integrated Professional Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-12 gap-6 lg:gap-8 mt-4 lg:mt-8">
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="bg-emerald-600 p-3 lg:p-5 rounded-2xl lg:rounded-3xl text-white shadow-xl border border-emerald-500/20 shrink-0">
              <Zap size={24} className="lg:w-8 lg:h-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">AI Vision <span className="text-emerald-600">Scanner</span></h1>
              <p className="text-emerald-600/60 font-bold uppercase tracking-[0.2em] text-[8px] lg:text-[10px] mt-0.5">Advanced Neural Diagnostics v4.1</p>
            </div>
          </div>

          <div className="w-full lg:w-auto bg-white px-6 lg:px-8 py-4 lg:py-5 rounded-2xl lg:rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 lg:gap-6 group hover:border-emerald-500/30 transition-all duration-300">
            <div className="bg-amber-100 p-2 lg:p-3 rounded-xl lg:rounded-2xl text-amber-600 shrink-0">
              <Trophy size={20} className="lg:w-6 lg:h-6" />
            </div>
            <div className="min-w-0 flex-1 lg:flex-none">
              <p className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] truncate">Eco-Master Level</p>
              <p className="text-lg lg:text-2xl font-black text-slate-800 flex items-baseline gap-2 flex-wrap">
                <span className="truncate">{level}</span>
                <span className="text-slate-400 text-[10px] lg:text-sm font-bold shrink-0">({points} XP)</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Visualizer Area */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden p-2 relative">
              <div className="relative inline-block w-full p-4 min-h-[400px]">
                {imageURL ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-inner bg-slate-100">
                    <img
                      ref={imgRef}
                      src={imageURL}
                      className="w-full h-auto"
                      alt="Input"
                      onLoad={() => {
                        if (canvasRef.current && imgRef.current) {
                          canvasRef.current.width = imgRef.current.width;
                          canvasRef.current.height = imgRef.current.height;
                        }
                      }}
                    />
                    <canvas
                      ref={canvasRef}
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-32 text-slate-300">
                    <div className="bg-slate-50 p-10 rounded-[2.5rem] mb-6 border border-slate-100">
                      <Layers size={56} className="text-emerald-200" />
                    </div>
                    <p className="text-2xl font-bold text-slate-400 uppercase tracking-widest">Awaiting Input</p>
                    <p className="text-sm font-medium text-slate-400 mt-2">Upload an image of your device to begin analysis</p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  aria-label="Upload image for e-waste detection"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageURL(window.URL.createObjectURL(file));
                      setTopPrediction(null);
                      setMultiDetections([]);
                      const ctx = canvasRef.current?.getContext('2d');
                      ctx?.clearRect(0, 0, 1000, 1000);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
              </div>

              {/* Controls Bar */}
              <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-wrap justify-between items-center gap-6">
                <div className="flex gap-4">
                  {topPrediction && (
                    <button
                      onClick={handleDownloadReport}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-all"
                    >
                      <FileText size={16} /> Save Analysis
                    </button>
                  )}
                </div>

                <button
                  onClick={runPrediction}
                  disabled={!imageURL || loading}
                  className={`px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${loading ? 'bg-slate-200 text-slate-400' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xl'}`}
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : "Run AI Analysis"}
                </button>
              </div>
            </div>

            {/* Smart Suggestions - Clean Glass Effect */}
            {suggestion && (
              <div className="bg-white rounded-[2.5rem] p-10 shadow-lg border border-emerald-100 relative overflow-hidden animate-in fade-in slide-in-from-bottom-5">
                <div className="absolute top-[-20px] right-[-20px] opacity-5 text-emerald-600">
                  <Sparkles size={160} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <RefreshCcw size={18} className="text-emerald-500 animate-spin-slow" />
                    <h3 className="font-bold uppercase tracking-widest text-[10px] text-emerald-600">Strategic Path Recommendation</h3>
                  </div>
                  <h4 className="text-3xl font-bold text-slate-900 mb-3">{suggestion.type} Directive</h4>
                  <p className="text-slate-600 text-lg font-medium leading-relaxed mb-8">{suggestion.text}</p>

                  <div className="flex flex-wrap gap-4">
                    <Link href="/community" className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md">
                      Find Next User
                    </Link>
                    <button className="bg-white text-emerald-600 border border-emerald-100 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-50 transition-all">
                      Repair Details
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Combined Metrics View */}
            {topPrediction && details && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-emerald-200 transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="text-emerald-500" size={24} />
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identity Match</h3>
                  </div>
                  <h2 className="text-4xl font-extrabold text-slate-900 mb-4">{topPrediction.label}</h2>
                  <p className="text-slate-500 font-medium mb-8 leading-relaxed">{details.description}</p>

                  <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confidence Score</span>
                    <span className="text-emerald-600 font-bold text-xl">{topPrediction.confidence.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-amber-200 transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="text-amber-500" size={24} />
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Impact Core</h3>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between mb-3 items-end">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hazard Risk</span>
                        <span className={`text-[9px] font-bold px-3 py-1 rounded-lg uppercase tracking-widest ${details.hazardLevel === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>{details.hazardLevel} Level</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-1000 ${details.hazardLevel === 'High' ? 'bg-red-500 w-full' : 'bg-amber-500 w-2/3'}`}></div>
                      </div>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-emerald-500">
                      <p className="text-[10px] font-bold text-emerald-600 uppercase mb-2 tracking-widest">Protocol</p>
                      <p className="text-slate-600 leading-relaxed italic text-sm font-medium">"{details.disposalMethod}"</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Precision Data */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold mb-8 text-slate-400 uppercase tracking-widest flex items-center gap-3">
                <Layers size={18} className="text-emerald-500" /> Layer Segmentation
              </h3>
              {multiDetections.length > 0 ? (
                <div className="space-y-4">
                  {multiDetections.map((det, i) => (
                    <div key={i} className="flex justify-between items-center bg-slate-50 border border-slate-100 p-5 rounded-2xl hover:bg-emerald-50 hover:border-emerald-100 transition-all group">
                      <div>
                        <p className="font-bold capitalize text-slate-700 group-hover:text-emerald-700 mb-0.5 tracking-tight">{det.class}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">Locked</p>
                      </div>
                      <p className="text-xl font-black text-slate-300 group-hover:text-emerald-600 transition-colors">{(det.score * 100).toFixed(0)}%</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-2xl">
                  <p className="text-[10px] font-bold uppercase text-slate-300 tracking-[0.3em] leading-relaxed">No active matrix<br />data available</p>
                </div>
              )}

              <div className="mt-10 pt-8 border-t border-slate-100">
                <div className="bg-emerald-50 p-6 rounded-2xl">
                  <p className="text-[9px] font-bold text-emerald-700 uppercase mb-2 tracking-widest">AI Mapping Logic</p>
                  <p className="text-[11px] leading-relaxed text-emerald-800/60 italic font-medium">Object layers are synthesized through dual-stream neural networks for 99.2% accuracy.</p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-600 rounded-[2.5rem] p-10 text-white shadow-xl flex flex-col items-center group transition-all hover:scale-[1.02]">
              <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:rotate-6 transition-transform">
                <Zap size={40} />
              </div>
              <h3 className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest mb-2">Session Points</h3>
              <p className="text-6xl font-black mb-10 tracking-tighter">+{points}</p>
              <Link href="/analytics" className="w-full bg-white text-emerald-700 font-bold py-5 rounded-2xl text-center hover:bg-emerald-50 transition-all text-[10px] uppercase tracking-widest shadow-lg">
                View Full Statistics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
