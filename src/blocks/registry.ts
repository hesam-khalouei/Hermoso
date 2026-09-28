export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "image"
  | "color"
  | "url"
  | "number"
  | "icon"
  | "select"
  | "toggle"
  | "repeater"
  | "group";

export interface BlockField {
  key: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  fields?: BlockField[]; // برای group و repeater
}

export interface BlockVariant {
  code: string;
  label: string;
  description?: string;
}

export interface BlockDefinition {
  code: string;
  label: string;
  icon: string;
  category: "layout" | "content" | "media" | "form";
  description: string;
  variants: BlockVariant[];
  defaultVariant: string;
  fields: BlockField[];
  defaultContent: Record<string, any>;
}

// ═══════════════════════════════════════
// رجیستری همه بلاک‌ها
// ═══════════════════════════════════════
export const BLOCKS: Record<string, BlockDefinition> = {
  // ──────── Header ────────
    header: {
    code: "header",
    label: "هدر",
    icon: "layout-top",
    category: "layout",
    description: "نوار بالای سایت با لوگو و منو",
    variants: [
      { code: "v1", label: "ساده با منوی وسط" },
      { code: "v2", label: "با دکمه CTA" },
    ],
    defaultVariant: "v1",
    fields: [
      { key: "logo", type: "image", label: "لوگو" },
      {
        key: "menu_items",
        type: "repeater",
        label: "آیتم‌های منو",
        min: 0,
        max: 10,
        fields: [
          { key: "title", type: "text", label: "عنوان" },
          { key: "link", type: "url", label: "لینک" },
          { key: "is_active", type: "toggle", label: "فعال" },
        ],
      },
      {
        key: "cta_text",
        type: "text",
        label: "متن دکمه CTA (فقط در طرح ۲)",
      },
      {
        key: "cta_link",
        type: "url",
        label: "لینک دکمه CTA",
      },
    ],
    defaultContent: {
      logo: "",
      menu_items: [
        { title: "معرفی", link: "#", is_active: true },
        { title: "راهنما استفاده", link: "#", is_active: false },
        { title: "قوانین اعتبار", link: "#", is_active: false },
        { title: "همکاران ما", link: "#", is_active: false },
        { title: "سوالات متداول", link: "#", is_active: false },
      ],
      cta_text: "شروع کنید",
      cta_link: "#",
    },
  },

  // ──────── Hero ────────
    hero: {
    code: "hero",
    label: "هیرو اصلی",
    icon: "sparkles",
    category: "layout",
    description: "بخش اول سایت با تیتر و دکمه‌ها",
    variants: [
      { code: "v1", label: "تیره + تصویر چپ", description: "مناسب تم تیره" },
      { code: "v2", label: "روشن + تصویر پایین", description: "مناسب تم روشن" },
      { code: "v3", label: "عکس تمام‌صفحه", description: "با تصویر بزرگ پس‌زمینه" },
    ],
    defaultVariant: "v1",
    fields: [
      {
        key: "title",
        type: "text",
        label: "عنوان",
        required: true,
        placeholder: "آغاز طرح اعتبار پوشاک",
      },
      {
        key: "title_highlight",
        type: "text",
        label: "کلمه رنگی در عنوان",
        placeholder: "اعتبار",
      },
      {
        key: "subtitle",
        type: "textarea",
        label: "زیرعنوان",
        placeholder: "توضیح کوتاه درباره طرح...",
      },
      {
        key: "image",
        type: "image",
        label: "تصویر",
      },
      {
        key: "background_color",
        type: "color",
        label: "رنگ پس‌زمینه (فقط در طرح ۱ و ۲)",
      },
      {
        key: "buttons",
        type: "repeater",
        label: "دکمه‌ها",
        min: 0,
        max: 3,
        fields: [
          { key: "text", type: "text", label: "متن" },
          { key: "link", type: "url", label: "لینک" },
          {
            key: "style",
            type: "select",
            label: "استایل",
            options: [
              { label: "اصلی (پر)", value: "primary" },
              { label: "ثانویه (خالی)", value: "secondary" },
            ],
          },
          { key: "icon", type: "icon", label: "آیکن (اختیاری)" },
        ],
      },
    ],
    defaultContent: {
      title: "آغاز طرح اعتبار پوشاک",
      title_highlight: "اعتبار",
      subtitle:
        "توضیح کوتاه درباره طرح شما که بازدیدکننده را ترغیب به ادامه می‌کند",
      image: "",
      background_color: "#030712",
      buttons: [
        {
          text: "نسخه اندروید",
          link: "#",
          style: "secondary",
          icon: "",
        },
        {
          text: "نسخه وب اپلیکیشن",
          link: "#",
          style: "primary",
          icon: "",
        },
      ],
    },
  },

  // ──────── Intro (چیست) ────────
  intro: {
    code: "intro",
    label: "معرفی / چیست",
    icon: "info",
    category: "content",
    description: "معرفی محصول یا خدمت با تصویر",
    variants: [
      { code: "v1", label: "دو ستونه ساده" },
      { code: "v2", label: "با کارت سفید" },
    ],
    defaultVariant: "v1",
    fields: [
      { key: "badge", type: "text", label: "برچسب بالا" },
      { key: "title", type: "text", label: "عنوان" },
      { key: "title_highlight", type: "text", label: "کلمه رنگی" },
      { key: "description", type: "richtext", label: "توضیحات" },
      { key: "image", type: "image", label: "تصویر" },
      {
        key: "button",
        type: "group",
        label: "دکمه",
        fields: [
          { key: "text", type: "text", label: "متن" },
          { key: "link", type: "url", label: "لینک" },
        ],
      },
    ],
    defaultContent: {
      badge: "",
      title: "استفاده از اعتبار پوشاک",
      title_highlight: "اعتبار",
      description:
        "از این پس کارکنان شرکت می‌توانند بدون نیاز به ضامن یا وثیقه خرید کنند...",
      image: "",
      button: { text: "نسخه وب اپلیکیشن", link: "#" },
    },
  },

  // ──────── Timeline ⭐ ────────
  timeline: {
    code: "timeline",
    label: "تایم‌لاین / راهنما",
    icon: "clock",
    category: "content",
    description: "مراحل خرید یا فرآیند به‌صورت گام‌به‌گام",
    variants: [
      { code: "v1", label: "کارت‌های عمودی + موبایل" },
      { code: "v2", label: "زیگزاگ عمودی" },
      { code: "v3", label: "تب‌بندی مراحل" },
    ],
    defaultVariant: "v1",
    fields: [
      { key: "title", type: "text", label: "عنوان" },
      { key: "title_highlight", type: "text", label: "کلمه رنگی" },
      { key: "description", type: "textarea", label: "توضیحات" },
      { key: "image", type: "image", label: "تصویر موبایل" },
      {
        key: "steps",
        type: "repeater",
        label: "مراحل",
        min: 2,
        max: 10,
        fields: [
          { key: "number", type: "number", label: "شماره" },
          { key: "title", type: "text", label: "عنوان" },
          { key: "description", type: "textarea", label: "توضیحات" },
          { key: "image", type: "image", label: "تصویر (اختیاری)" },
        ],
      },
    ],
    defaultContent: {
      title: "راهنمای خرید آنلاین",
      title_highlight: "راهنمای",
      description: "از این پس کارکنان می‌توانند بدون نیاز به ضامن خرید کنند...",
      image: "",
      steps: [
        { number: 1, title: "ثبت‌نام در اوانو", description: "توضیحات مرحله اول" },
        { number: 2, title: "خرید حضوری", description: "توضیحات مرحله دوم" },
        { number: 3, title: "اسکن QR و پرداخت", description: "توضیحات مرحله سوم" },
      ],
    },
  },

  // ──────── About / Rules ────────
  about: {
    code: "about",
    label: "درباره / قوانین",
    icon: "file-text",
    category: "content",
    description: "توضیحات، قوانین یا اطلاعات اضافی",
    variants: [
      { code: "v1", label: "دو کارت کنار هم" },
      { code: "v2", label: "تک ستونه با تصویر" },
    ],
    defaultVariant: "v1",
    fields: [
      { key: "title", type: "text", label: "عنوان" },
      { key: "title_highlight", type: "text", label: "کلمه رنگی" },
      { key: "description", type: "textarea", label: "توضیحات" },
      {
        key: "cards",
        type: "repeater",
        label: "کارت‌ها",
        min: 1,
        max: 4,
        fields: [
          { key: "icon", type: "icon", label: "آیکن" },
          { key: "title", type: "text", label: "عنوان" },
          { key: "description", type: "textarea", label: "توضیحات" },
          { key: "link_text", type: "text", label: "متن لینک" },
          { key: "link", type: "url", label: "لینک" },
        ],
      },
      { key: "image", type: "image", label: "تصویر" },
    ],
    defaultContent: {
      title: "قوانین کلی اعتبار",
      title_highlight: "اعتبار",
      description: "از این پس کارکنان شرکت گسترش انرژی پاسارگاد...",
      cards: [
        {
          icon: "wallet",
          title: "تفاوت صورتحساب و قسط",
          description: "توضیحات...",
          link_text: "مشاهده بیشتر",
          link: "#",
        },
        {
          icon: "receipt",
          title: "تفاوت صورتحساب و قسط",
          description: "توضیحات...",
          link_text: "مشاهده بیشتر",
          link: "#",
        },
      ],
      image: "",
    },
  },

  // ──────── Features ────────
  features: {
    code: "features",
    label: "ویژگی‌ها",
    icon: "grid",
    category: "content",
    description: "لیست ویژگی‌ها یا مزایا با آیکن",
    variants: [
      { code: "v1", label: "کارت‌های گرید" },
      { code: "v2", label: "لیست عمودی" },
    ],
    defaultVariant: "v1",
    fields: [
      { key: "title", type: "text", label: "عنوان" },
      { key: "description", type: "textarea", label: "توضیحات" },
      {
        key: "items",
        type: "repeater",
        label: "ویژگی‌ها",
        min: 2,
        max: 12,
        fields: [
          { key: "icon", type: "icon", label: "آیکن" },
          { key: "title", type: "text", label: "عنوان" },
          { key: "description", type: "textarea", label: "توضیحات" },
        ],
      },
    ],
    defaultContent: {
      title: "ویژگی‌های ما",
      description: "",
      items: [
        { icon: "star", title: "ویژگی اول", description: "توضیحات..." },
        { icon: "shield", title: "ویژگی دوم", description: "توضیحات..." },
        { icon: "zap", title: "ویژگی سوم", description: "توضیحات..." },
      ],
    },
  },

  // ──────── Merchants ────────
  merchants: {
    code: "merchants",
    label: "فروشگاه‌ها / مشتریان",
    icon: "store",
    category: "content",
    description: "لوگوی فروشگاه‌ها یا مشتریان",
    variants: [
      { code: "v1", label: "نوار افقی" },
      { code: "v2", label: "گرید با فیلتر" },
    ],
    defaultVariant: "v1",
    fields: [
      { key: "title", type: "text", label: "عنوان" },
      { key: "title_highlight", type: "text", label: "کلمه رنگی" },
      { key: "description", type: "textarea", label: "توضیحات" },
      {
        key: "categories",
        type: "repeater",
        label: "دسته‌بندی‌ها (اختیاری)",
        min: 0,
        max: 10,
        fields: [{ key: "title", type: "text", label: "عنوان" }],
      },
      {
        key: "logos",
        type: "repeater",
        label: "لوگوها",
        min: 1,
        max: 30,
        fields: [
          { key: "image", type: "image", label: "لوگو" },
          { key: "name", type: "text", label: "نام" },
          { key: "link", type: "url", label: "لینک (اختیاری)" },
          { key: "category", type: "text", label: "دسته (اختیاری)" },
        ],
      },
    ],
    defaultContent: {
      title: "فروشگاه‌های طرف قرارداد",
      title_highlight: "فروشگاه‌های",
      description: "با اعتبار اوانو از معتبرترین فروشگاه‌ها خرید کنید!",
      categories: [],
      logos: [
        { image: "", name: "رفاه", link: "", category: "" },
        { image: "", name: "افق کوروش", link: "", category: "" },
        { image: "", name: "هفت", link: "", category: "" },
      ],
    },
  },

  // ──────── FAQ ────────
  faq: {
    code: "faq",
    label: "سوالات متداول",
    icon: "help-circle",
    category: "content",
    description: "آکاردئون سوالات متداول",
    variants: [
      { code: "v1", label: "کارت رنگی (اولی باز)" },
      { code: "v2", label: "آکاردئون خط‌دار" },
    ],
    defaultVariant: "v2",
    fields: [
      { key: "title", type: "text", label: "عنوان" },
      { key: "title_highlight", type: "text", label: "کلمه رنگی" },
      { key: "description", type: "textarea", label: "توضیحات" },
      {
        key: "items",
        type: "repeater",
        label: "سوالات",
        min: 1,
        max: 20,
        fields: [
          { key: "question", type: "text", label: "سوال" },
          { key: "answer", type: "textarea", label: "پاسخ" },
        ],
      },
    ],
    defaultContent: {
      title: "سوالات متداول",
      title_highlight: "سوالات",
      description: "",
      items: [
        { question: "سوال نمونه اول؟", answer: "پاسخ نمونه..." },
        { question: "سوال نمونه دوم؟", answer: "پاسخ نمونه..." },
      ],
    },
  },

  // ──────── CTA ────────
  cta: {
    code: "cta",
    label: "دعوت به اقدام",
    icon: "megaphone",
    category: "content",
    description: "بخش فراخوان با دکمه",
    variants: [
      { code: "v1", label: "کارت با رنگ اصلی" },
      { code: "v2", label: "با تصویر" },
    ],
    defaultVariant: "v1",
    fields: [
      { key: "title", type: "text", label: "عنوان" },
      { key: "description", type: "textarea", label: "توضیحات" },
      { key: "button_text", type: "text", label: "متن دکمه" },
      { key: "button_link", type: "url", label: "لینک دکمه" },
      { key: "image", type: "image", label: "تصویر" },
    ],
    defaultContent: {
      title: "همین حالا شروع کن!",
      description: "توضیحات کوتاه برای فراخوان",
      button_text: "شروع کنید",
      button_link: "#",
      image: "",
    },
  },

  // ──────── Contact Form ────────
  contact_form: {
    code: "contact_form",
    label: "فرم تماس",
    icon: "mail",
    category: "form",
    description: "فرم دریافت اطلاعات از بازدیدکننده",
    variants: [
      { code: "v1", label: "دو ستونه" },
      { code: "v2", label: "تک ستونه" },
    ],
    defaultVariant: "v1",
    fields: [
      { key: "title", type: "text", label: "عنوان" },
      { key: "description", type: "textarea", label: "توضیحات" },
      { key: "success_message", type: "text", label: "پیام موفقیت" },
      {
        key: "fields",
        type: "repeater",
        label: "فیلدهای فرم",
        min: 1,
        max: 10,
        fields: [
          { key: "name", type: "text", label: "نام فیلد (انگلیسی)" },
          { key: "label", type: "text", label: "برچسب" },
          {
            key: "type",
            type: "select",
            label: "نوع",
            options: [
              { label: "متن", value: "text" },
              { label: "ایمیل", value: "email" },
              { label: "تلفن", value: "tel" },
              { label: "متن بلند", value: "textarea" },
            ],
          },
          { key: "required", type: "toggle", label: "اجباری" },
        ],
      },
    ],
    defaultContent: {
      title: "تماس با ما",
      description: "سوالی داری؟ برامون بنویس",
      success_message: "پیام شما با موفقیت ارسال شد",
      fields: [
        { name: "name", label: "نام", type: "text", required: true },
        { name: "phone", label: "شماره تماس", type: "tel", required: true },
        { name: "message", label: "پیام", type: "textarea", required: false },
      ],
    },
  },

  // ──────── Footer ────────
    footer: {
    code: "footer",
    label: "فوتر",
    icon: "layout-bottom",
    category: "layout",
    description: "پایین صفحه با اطلاعات تماس و شبکه‌های اجتماعی",
    variants: [
      { code: "v1", label: "کامل ۳ ستونه", description: "با همه اطلاعات" },
      { code: "v2", label: "مینیمال", description: "سبک و ساده" },
    ],
    defaultVariant: "v1",
    fields: [
      { key: "logo", type: "image", label: "لوگو" },
      {
        key: "about_text",
        type: "textarea",
        label: "متن درباره ما",
        placeholder: "توضیح کوتاه درباره سایت...",
      },
      {
        key: "copyright",
        type: "text",
        label: "متن کپی‌رایت",
        placeholder: "تمامی حقوق محفوظ است.",
      },
      {
        key: "socials",
        type: "repeater",
        label: "شبکه‌های اجتماعی",
        min: 0,
        max: 8,
        fields: [
          { key: "icon", type: "icon", label: "آیکن" },
          { key: "link", type: "url", label: "لینک" },
        ],
      },
      {
        key: "contacts",
        type: "repeater",
        label: "راه‌های ارتباطی",
        min: 0,
        max: 5,
        fields: [
          { key: "icon", type: "icon", label: "آیکن" },
          { key: "label", type: "text", label: "برچسب (مثلاً: موبایل)" },
          { key: "value", type: "text", label: "مقدار (مثلاً: ۰۹۱۲...)" },
        ],
      },
    ],
    defaultContent: {
      logo: "",
      about_text:
        "اپلیکیشن جامع «اوانو» انواع خدمات مالی، اپراتوری، سفر و گردشگری، خرید بیمه و امور خیریه را به کاربران ارائه می‌دهد.",
      copyright: "تمامی حقوق برای اپلیکیشن اوانو محفوظ است.",
      socials: [
        { icon: "Instagram", link: "https://instagram.com/" },
        { icon: "Twitter", link: "https://twitter.com/" },
        { icon: "Youtube", link: "https://youtube.com/" },
      ],
      contacts: [
        { icon: "Phone", label: "شماره موبایل", value: "091299976" },
        { icon: "Mail", label: "ایمیل", value: "support@ewano.app" },
      ],
    },
  },
};

export const BLOCK_LIST = Object.values(BLOCKS);

export function getBlock(code: string): BlockDefinition | null {
  return BLOCKS[code] || null;
}