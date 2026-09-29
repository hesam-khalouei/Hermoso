import MerchantsV1 from "./variants/MerchantsV1";
import MerchantsV2 from "./variants/MerchantsV2";

interface MerchantsRendererProps {
  variant: string;
  content: Record<string, any>;
}

const variants: Record<string, React.ComponentType<any>> = {
  v1: MerchantsV1,
  v2: MerchantsV2,
};

export default function MerchantsRenderer({
  variant,
  content,
}: MerchantsRendererProps) {
  const Component = variants[variant] || MerchantsV1;
  return <Component content={content} />;
}