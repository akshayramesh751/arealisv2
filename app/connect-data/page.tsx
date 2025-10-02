'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AnimatedBackground } from '@/components/animated-background';
import { Network, Upload, FileText, CircleAlert as AlertCircle, CircleCheck as CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Image from 'next/image';

export default function ConnectDataPage() {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState({
    sales: null as File | null,
    inventory: null as File | null,
    financial: null as File | null,
    merged: null as File | null,
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState('');

  const handleFileUpload = (type: keyof typeof uploadedFiles, file: File | null) => {
    setUploadedFiles(prev => ({ ...prev, [type]: file }));
  };

  const handleDrop = (e: React.DragEvent, type: keyof typeof uploadedFiles) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(type, file);
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1;

        if (next <= 30) {
          setProgressStatus(`Connecting to Data Source: ${next}% Complete`);
        } else if (next <= 75) {
          setProgressStatus('Analyzing Data Schema and Generating Initial Insights...');
        } else if (next <= 99) {
          setProgressStatus('Finalizing Strategic Models: Insights Ready to Reveal...');
        } else if (next === 100) {
          setProgressStatus('Insights Generated. Strategic Dashboard Ready.');
          clearInterval(interval);
        }

        return next > 100 ? 100 : next;
      });
    }, 100);
  };

  const canAnalyze =
    (uploadedFiles.sales && uploadedFiles.inventory && uploadedFiles.financial) ||
    uploadedFiles.merged;

  const UploadZone = ({
    type,
    title,
    icon: Icon,
  }: {
    type: keyof typeof uploadedFiles;
    title: string;
    icon: React.ElementType;
  }) => (
    <div
      onDrop={(e) => handleDrop(e, type)}
      onDragOver={(e) => e.preventDefault()}
      className={`frosted-glass rounded-2xl p-6 border-2 border-dashed transition-all ${
        uploadedFiles[type]
          ? 'border-primary bg-primary/10'
          : 'border-white/30 hover:border-primary/50 hover:bg-white/5'
      }`}
    >
      <label htmlFor={`file-${type}`} className="cursor-pointer flex flex-col items-center space-y-4">
        {uploadedFiles[type] ? (
          <>
            <CheckCircle2 className="w-12 h-12 text-primary" />
            <div className="text-center">
              <p className="text-white font-semibold">{uploadedFiles[type]?.name}</p>
              <p className="text-white/60 text-sm mt-1">File uploaded successfully</p>
            </div>
          </>
        ) : (
          <>
            <Icon className="w-12 h-12 text-white/50" />
            <div className="text-center">
              <p className="text-white font-semibold">{title}</p>
              <p className="text-white/60 text-sm mt-1">Drag & drop or click to upload</p>
            </div>
          </>
        )}
        <input
          id={`file-${type}`}
          type="file"
          className="hidden"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => handleFileUpload(type, e.target.files?.[0] || null)}
        />
      </label>
    </div>
  );

  return (
    <div className="dark-theme min-h-screen relative">
      <AnimatedBackground />

      <header className="relative z-10 flex justify-between items-center px-8 py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
            <Image 
              src="/logos/foresight flow logo.jpeg" 
              alt="ForesightFlow Logo" 
              width={32} 
              height={32} 
              className="rounded"
            />
          </div>
          <span className="text-2xl font-bold text-white">ForesightFlow</span>
        </Link>
      </header>

      <main className="relative z-10 px-4 py-8 max-w-7xl mx-auto">
        <div className="mb-12 text-center animate-slide-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Connect Your Business Data
          </h1>
          <p className="text-xl text-white/70">
            Upload your reports to unlock strategic insights powered by AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Upload Individual Reports</h2>
            <div className="space-y-4">
              <UploadZone type="sales" title="Sales Report" icon={FileText} />
              <UploadZone type="inventory" title="Inventory Report" icon={FileText} />
              <UploadZone type="financial" title="Financial Report" icon={FileText} />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Upload Merged Report</h2>
            <Alert className="bg-white/10 border-primary/30">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-white/80">
                Your merged report must contain all required data columns: sales metrics, inventory
                levels, and financial records in a single file.
              </AlertDescription>
            </Alert>
            <UploadZone type="merged" title="Merged Business Report" icon={Upload} />
          </div>
        </div>

        {!isAnalyzing ? (
          <div className="text-center">
            <Button
              onClick={handleStartAnalysis}
              disabled={!canAnalyze}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-12 py-6 h-auto rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Analysis
            </Button>
          </div>
        ) : (
          <div className="frosted-glass rounded-3xl p-8 space-y-6 animate-slide-in-up">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold text-lg">{progressStatus}</span>
                <span className="text-primary font-bold text-2xl">{progress}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    progress === 100 ? 'bg-primary' : 'bg-primary/80'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {progress === 100 && (
              <Button
                onClick={() => router.push('/dashboard')}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-lg py-6 h-auto rounded-xl"
              >
                Go to Strategic Dashboard
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
