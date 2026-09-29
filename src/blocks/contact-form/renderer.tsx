import ContactFormV1 from "./variants/ContactFormV1";
import ContactFormV2 from "./variants/ContactFormV2";

interface ContactFormRendererProps {
  variant: string;
  content: Record<string, any>;
}

const variants: Record<string, React.ComponentType<any>> = {
  v1: ContactFormV1,
  v2: ContactFormV2,
};

export default function ContactFormRenderer({
  variant,
  content,
}: ContactFormRendererProps) {
  const Component = variants[variant] || ContactFormV1;
  return <Component content={content} />;
}