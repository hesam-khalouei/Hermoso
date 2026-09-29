import FaqV1 from "./variants/FaqV1";
import FaqV2 from "./variants/FaqV2";

interface FaqRendererProps {
  variant: string;
  content: Record<string, any>;
}

const variants: Record<string, React.ComponentType<any>> = {
  v1: FaqV1,
  v2: FaqV2,
};

export default function FaqRenderer({ variant, content }: FaqRendererProps) {
  const Component = variants[variant] || FaqV2;
  return <Component content={content} />;
}