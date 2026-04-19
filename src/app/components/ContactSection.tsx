type ContactItem = {
  id: string;
  role: string;
  name: string;
  phone: string;
};

type ContactSectionProps = {
  items: ContactItem[];
};

export default function ContactSection({ items }: ContactSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <h3 className="text-[1.15rem] sm:text-[1.25rem] font-[650] text-[#C9979C] tracking-[-0.01em] text-center">
        연락하기
      </h3>
      <div className="mt-4 rounded-2xl border border-[#E5E7EB] bg-white">
        {items.map((item, index) => {
          const normalizedPhone = item.phone.replaceAll("-", "");

          return (
            <div
              key={item.id}
              className={`flex items-center justify-between gap-3 px-4 py-4 sm:px-5 ${
                index === 0 ? "" : "border-t border-[#ECEDEF]"
              }`}
            >
              <div className="min-w-0 flex-1">
                <p className="text-[0.97rem] sm:text-[1.03rem] text-[#333333] font-[550] tracking-[-0.01em]">
                  <span className="mr-2 text-[#C9979C]">{item.role}</span>
                  <span>{item.name}</span>
                </p>
                <p className="mt-1 text-[0.84rem] sm:text-[0.9rem] text-[#6B7280] font-medium tracking-[-0.01em]">
                  {item.phone}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <details className="relative group">
                  <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full bg-[#D6DFF1] text-[1.1rem] text-white shadow-sm transition hover:brightness-95 [&::-webkit-details-marker]:hidden">
                    📞
                  </summary>
                  <div className="absolute right-0 top-[calc(100%+8px)] z-10">
                    <a
                      href={`tel:${normalizedPhone}`}
                      className="block whitespace-nowrap rounded-full bg-[#111827] px-4 py-2 text-sm font-semibold text-white shadow-lg"
                    >
                      전화하기
                    </a>
                  </div>
                </details>
                <a
                  href={`sms:${normalizedPhone}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3CBD1] text-[1.05rem] text-white shadow-sm transition hover:brightness-95"
                  aria-label={`${item.role} ${item.name} 문자하기`}
                >
                  💬
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
