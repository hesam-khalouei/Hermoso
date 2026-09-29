import { getBlock } from "./registry";
import HeaderRenderer from "./header/renderer";
import HeroRenderer from "./hero/renderer";
import IntroRenderer from "./intro/renderer";
import AboutRenderer from "./about/renderer";
import FeaturesRenderer from "./features/renderer";
import CtaRenderer from "./cta/renderer";
import MerchantsRenderer from "./merchants/renderer";
import FaqRenderer from "./faq/renderer";
import ContactFormRenderer from "./contact-form/renderer";
import FooterRenderer from "./footer/renderer";

interface BlockRendererProps {
  blockType: string;
  variant: string;
  content: Record<string, any>;
  styles?: Record<string, any>;
}

const blockComponents: Record<
  string,
  React.ComponentType<{ variant: string; content: Record<string, any> }>
> = {
  header: HeaderRenderer,
  hero: HeroRenderer,
  intro: IntroRenderer,
  about: AboutRenderer,
  features: FeaturesRenderer,
  cta: CtaRenderer,
  merchants: MerchantsRenderer,
  faq: FaqRenderer,
  contact_form: ContactFormRenderer,
  footer: FooterRenderer,
};

export function BlockRenderer({
  blockType,
  variant,
  content,
  styles,
}: BlockRendererProps) {
  const definition = getBlock(blockType);
  if (!definition) {
    return (
      <div className="p-8 bg-destructive/10 text-destructive text-center text-sm rounded-lg">
        بلاک «{blockType}» پیدا نشد
      </div>
    );
  }

  const Component = blockComponents[blockType];

  if (Component) {
    return <Component variant={variant} content={content} />;
  }

  return (
    <div className="py-12 px-6 bg-secondary/50 text-center border-2 border-dashed rounded-xl">
      <div className="text-sm font-medium mb-2">بلاک: {definition.label}</div>
      <div className="text-xs text-muted-foreground mb-4">
        واریانت: {variant} — (به‌زودی ساخته می‌شود)
      </div>
    </div>
  );
}