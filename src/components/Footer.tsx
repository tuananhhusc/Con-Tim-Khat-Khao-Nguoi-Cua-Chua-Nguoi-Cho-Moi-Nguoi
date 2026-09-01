export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t-2 border-burgundy/15 dark:border-gold/20 bg-parchment/60 dark:bg-dark-surface/40">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        {/* Cross ornament */}
        <div className="text-burgundy dark:text-gold text-2xl mb-3 font-serif">
          ✝
        </div>

        {/* AMDG motto */}
        <p className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-[0.3em] uppercase text-burgundy dark:text-gold mb-2">
          Ad Majorem Dei Gloriam
        </p>

        {/* Latin subtitle */}
        <p className="font-[family-name:var(--font-body)] text-sm italic text-charcoal dark:text-[#E2D9CC] mb-4">
          Societas Iesu — Tỉnh Dòng Tên Việt Nam
        </p>

        {/* Divider */}
        <div className="w-20 h-[1px] mx-auto bg-burgundy/30 dark:bg-gold/30 mb-5" />

        {/* Attribution */}
        <p className="text-xs text-charcoal-light dark:text-[#C5BCAF] font-[family-name:var(--font-sans)]">
          © {year} Nhà Ứng Sinh Dòng Tên Việt Nam. Báo cáo Nghiên cứu Thần học và Mục vụ.
        </p>
      </div>
    </footer>
  );
}
