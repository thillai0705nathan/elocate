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
    <div className="min-h-screen bg-[#07130e] text-slate-200 py-16 px-6 lg:px-12 relative overflow-hidden selection:bg-emerald-500/30">
      {/* Animated Atmosphere Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-600/10 blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/10 blur-[150px] animate-pulse delay-1000"></div>
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-emerald-500/5 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Advanced Futuristic Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
          <div className="flex items-center gap-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-700 p-5 rounded-[2.5rem] text-white shadow-[0_0_50px_rgba(16,185,129,0.3)] border border-emerald-400/20 transform hover:scale-110 transition-all duration-700">
              <Zap size={40} />
            </div>
            <div>
              <h1 className="text-6xl font-black text-white tracking-tighter">AI Vision <span className="bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-400 bg-clip-text text-transparent animate-gradient">Pro</span></h1>
              <p className="text-emerald-500/60 font-black uppercase tracking-[0.4em] text-[10px] mt-2">Neural Analysis Core v4.1.0</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-3xl px-10 py-6 rounded-[3rem] border border-white/10 flex items-center gap-6 group hover:border-emerald-500/30 transition-all duration-500">
            <div className="bg-amber-400/20 p-4 rounded-2xl text-amber-400 group-hover:rotate-12 transition-transform">
              <Trophy size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-500/50 uppercase tracking-[0.3em]">Eco-Master Rating</p>
              <p className="text-3xl font-black text-white">{level} <span className="text-slate-500 text-sm ml-2">({points} XP)</span></p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Visualizer Area */}
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-white/[0.03] backdrop-blur-2xl rounded-[4rem] border border-white/10 shadow-2xl overflow-hidden p-2 group hover:border-emerald-500/20 transition-all duration-700 relative text-center">
              <div className="relative inline-block mx-auto min-h-[400px] w-full p-4">
                {imageURL ? (
                  <>
                    <img
                      ref={imgRef}
                      src={imageURL}
                      className="w-full h-auto rounded-[3rem] shadow-2xl border border-white/5"
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
                      className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-[3rem]"
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-40 text-emerald-500/20">
                    <div className="bg-emerald-500/5 p-12 rounded-[3.5rem] mb-8 border border-emerald-500/10 shadow-inner">
                      <Layers size={64} className="animate-pulse" />
                    </div>
                    <p className="text-3xl font-black uppercase tracking-[0.4em]">Neural Uplink</p>
                    <p className="text-xs font-bold text-slate-600 mt-2 tracking-widest uppercase">System Awaiting Device Matrix</p>
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
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              {/* Advanced AI Controls - Premium Dark Bar */}
              <div className="p-10 bg-black/40 border-t border-white/5 flex flex-wrap justify-between items-center gap-6">
                <div className="flex gap-4">
                  {topPrediction && (
                    <button
                      onClick={handleDownloadReport}
                      className="flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-emerald-600 border border-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:bg-emerald-500 transition-all duration-500"
                    >
                      <FileText size={18} /> Download Intel
                    </button>
                  )}
                </div>

                <button
                  onClick={runPrediction}
                  disabled={!imageURL || loading}
                  className={`px-14 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all transform active:scale-95 ${loading ? 'bg-white/5 text-slate-600 border border-white/5' : 'bg-white text-black hover:bg-emerald-400 hover:shadow-[0_0_50px_rgba(52,211,153,0.5)] shadow-2xl hover:-translate-y-1'}`}
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing Device Matrix...</span>
                    </div>
                  ) : "Initiate Global Scan"}
                </button>
              </div>
            </div>

            {/* Smart Suggestions System - Luxury Glass */}
            {suggestion && (
              <div className="bg-gradient-to-br from-emerald-600/90 to-teal-900/90 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden border border-white/20 animate-in fade-in zoom-in-95 duration-1000 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 scale-125">
                  <Sparkles size={180} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8 bg-black/20 w-fit px-6 py-2 rounded-full backdrop-blur-3xl border border-white/10">
                    <RefreshCcw size={18} className="animate-spin-slow text-emerald-300" />
                    <h3 className="font-black uppercase tracking-[0.3em] text-[10px] text-emerald-200">Neural Intelligence IQ</h3>
                  </div>
                  <h4 className="text-4xl font-black mb-4 tracking-tighter italic">{suggestion.type} Pathway Engaged</h4>
                  <p className="text-emerald-50/70 text-xl font-medium max-w-2xl leading-relaxed mb-10">{suggestion.text}</p>

                  <div className="flex flex-wrap gap-6">
                    <Link href="/community" className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-50 hover:scale-105 transition-all shadow-2xl">
                      Circular Commons
                    </Link>
                    <button className="bg-emerald-500/10 text-white border border-emerald-400/30 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500/30 transition-all backdrop-blur-3xl">
                      Repair Analysis
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Results Grid - High Contrast Glass */}
            {topPrediction && details && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 animate-in slide-in-from-bottom-10 duration-700">
                <div className="bg-white/[0.04] backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/10 shadow-3xl flex flex-col justify-between hover:border-emerald-500/30 transition-all">
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <div className="bg-emerald-500/20 p-3 rounded-2xl text-emerald-400">
                        <ShieldCheck size={28} />
                      </div>
                      <h3 className="text-[10px] font-black text-emerald-500/50 uppercase tracking-[0.3em]">Classification Link</h3>
                    </div>
                    <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">{topPrediction.label}</h2>
                    <p className="text-slate-400 leading-relaxed font-medium text-lg mb-12">{details.description}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white/5 px-8 py-6 rounded-[2rem] border border-white/5">
                      <span className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em]">Confidence Index</span>
                      <span className="text-emerald-400 font-black text-2xl">{topPrediction.confidence.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.04] backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/10 shadow-3xl hover:border-amber-500/30 transition-all">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="bg-amber-400/20 p-3 rounded-2xl text-amber-500">
                      <Zap size={28} />
                    </div>
                    <h3 className="text-[10px] font-black text-amber-500/50 uppercase tracking-[0.3em]">Neural Impact Score</h3>
                  </div>
                  <div className="space-y-10">
                    <div>
                      <div className="flex justify-between mb-4 items-end">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Bio-Hazard Level</span>
                        <span className={`text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest ${details.hazardLevel === 'High' ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'}`}>{details.hazardLevel} Status</span>
                      </div>
                      <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden p-1 border border-white/5">
                        <div className={`h-full rounded-full transition-all duration-1000 ${details.hazardLevel === 'High' ? 'bg-gradient-to-r from-red-500 to-orange-500 w-full shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-gradient-to-r from-amber-400 to-amber-600 w-2/3 shadow-[0_0_15px_rgba(245,158,11,0.5)]'}`}></div>
                      </div>
                    </div>
                    <div className="p-8 bg-black/40 rounded-[2.5rem] border-l-4 border-emerald-500 backdrop-blur-3xl">
                      <p className="text-[10px] font-black text-emerald-400 uppercase mb-4 tracking-[0.3em]">AI Recovery Directive</p>
                      <p className="text-slate-300 leading-relaxed italic font-medium text-sm">"{details.disposalMethod}"</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Precision Core */}
          <div className="lg:col-span-4 space-y-10">
            <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[3.5rem] p-10 text-white shadow-3xl relative overflow-hidden border border-white/10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-600/10 blur-[80px]"></div>
              <h3 className="text-sm font-black mb-10 text-emerald-500/50 uppercase tracking-[0.3em] flex items-center gap-3">
                <Layers size={20} className="text-emerald-500" /> Integrated Segments
              </h3>
              {multiDetections.length > 0 ? (
                <div className="space-y-5">
                  {multiDetections.map((det, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/5 border border-white/5 p-6 rounded-[2rem] hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all cursor-pointer group">
                      <div>
                        <p className="font-black capitalize text-lg group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{det.class}</p>
                        <p className="text-[10px] text-emerald-500/40 font-black uppercase mt-1">Neural Lock Verified</p>
                      </div>
                      <p className="text-2xl font-black text-white/20 group-hover:text-white transition-colors">{(det.score * 100).toFixed(0)}%</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center text-white/10 border-2 border-dashed border-white/5 rounded-[3.5rem]">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] leading-loose">Feed Scanner<br />to Capture Data</p>
                </div>
              )}

              <div className="mt-14 pt-10 border-t border-white/5 text-center">
                <div className="bg-emerald-500/5 p-6 rounded-[2rem] border border-emerald-500/10">
                  <p className="text-[10px] font-black text-emerald-500 uppercase mb-4 tracking-widest">Object Detection Overlay</p>
                  <p className="text-[11px] leading-relaxed text-slate-500 italic font-medium">Detected objects are highlighted with confidence scores for easier e-waste identification.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-600/10 to-teal-800/10 backdrop-blur-3xl rounded-[3.5rem] p-12 shadow-3xl border border-emerald-500/20 flex flex-col items-center group transition-all hover:scale-[1.02]">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-[2.5rem] flex items-center justify-center text-emerald-400 mb-8 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform duration-700">
                <Zap size={48} />
              </div>
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] mb-4">Neural XP</h3>
              <p className="text-7xl font-black text-white mb-12 tracking-tighter animate-pulse shadow-emerald-500/20">+{points}</p>
              <Link href="/analytics" className="w-full bg-white text-slate-900 font-black py-6 rounded-3xl text-center hover:bg-emerald-400 transition-all text-[10px] uppercase tracking-[0.3em] shadow-2xl">
                Neural Analytics Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
