import CtaV1 from "./variants/CtaV1";
import CtaV2 from "./variants/CtaV2";

interface CtaRendererProps {
  variant: string;
  content: Record<string, any>;
}

const variants: Record<string, React.ComponentType<any>> = {
  v1: CtaV1,
  v2: CtaV2,
};

export default function CtaRenderer({ variant, content }: CtaRendererProps) {
  const Component = variants[variant] || CtaV1;
  return <Component content={content} />;
}