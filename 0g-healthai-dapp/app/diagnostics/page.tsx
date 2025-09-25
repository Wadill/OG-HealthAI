import DiagnosticForm from "@/components/DiagnosticForm";

export default function Diagnostics() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Diagnostics</h1>
      <DiagnosticForm />
    </div>
  );
}