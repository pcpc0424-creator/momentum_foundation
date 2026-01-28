interface PageBannerProps {
  title: string;
  backgroundImage: string;
}

const PageBanner = ({ title, backgroundImage }: PageBannerProps) => {
  return (
    <div
      className="relative w-full h-[200px] md:h-[280px] lg:h-[320px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 타이틀 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PageBanner;
