type TitleSize = 'sm' | 'md' | 'lg' | 'xl';

type SectionTitleProps = {
  /** variant 1 */
  primary?: string;
  secondary?: string;

  /** variant 2 */
  title?: string;
  splitIndex?: number; // индекс, где делить строку

  primaryColor?: string;
  secondaryColor?: string;

  size?: TitleSize;
  align?: 'left' | 'center';
  stacked?: boolean;
};

/* ===== SIZE MAP ===== */
const SIZE_MAP: Record<TitleSize, string> = {
  sm: 'text-lg sm:text-xl',
  md: 'text-xl sm:text-2xl',
  lg: 'text-2xl sm:text-3xl',
  xl: 'text-2xl sm:text-3xl lg:text-[40px]',
};

export function SectionTitle({
  /* variant 1 */
  primary,
  secondary,

  /* variant 2 */
  title,
  splitIndex,

  primaryColor = 'text-primary',
  secondaryColor = 'text-primary-light',

  size = 'xl',
  align = 'left',
  stacked = false,
}: SectionTitleProps) {
  const renderContent = () => {
    // ===== VARIANT: title + split =====
    if (title) {
      const splitAt =
        splitIndex ??
        title.indexOf(' ') !== -1
          ? title.indexOf(' ')
          : title.length;

      const first = title.slice(0, splitAt);
      const second = title.slice(splitAt);

      return (
        <>
          <span className={primaryColor}>{first}</span>
          {stacked ? <br /> : ' '}
          <span className={secondaryColor}>{second}</span>
        </>
      );
    }

    // ===== VARIANT: primary + secondary =====
    return (
      <>
        <span className={primaryColor}>{primary}</span>
        {stacked ? <br /> : ' '}
        <span className={secondaryColor}>{secondary}</span>
      </>
    );
  };

  return (
    <h2
      className={`
        font-heading font-bold
        leading-[120%]
        ${SIZE_MAP[size]}
        ${align === 'center' ? 'text-center' : 'text-left'}
      `}
    >
      {renderContent()}
    </h2>
  );
}
