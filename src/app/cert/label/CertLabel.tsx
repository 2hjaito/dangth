// components/CertLabel.tsx

interface CertLabelProps {
  level: string; // Không ép buộc, chỉ cần là string
}

const labelStyles: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-800 border border-green-300',
  Intermediate: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  Advanced: 'bg-red-100 text-red-800 border border-red-300',
  Certification: 'bg-blue-100 text-blue-800 border border-blue-300',
};

// Fallback cho các giá trị không xác định
const defaultStyle = 'bg-gray-100 text-gray-700 border border-gray-300';

export default function CertLabel({ level }: CertLabelProps) {
  const style = labelStyles[level] || defaultStyle;

  return (
    <span
      className={`ml-2 inline-block rounded-full px-2 py-[2px] text-xs font-medium ${style}`}
    >
      {level}
    </span>
  );
}
