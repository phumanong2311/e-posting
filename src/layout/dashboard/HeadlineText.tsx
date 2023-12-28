export const HeadlineText = ({ text = "" }) => {
  return (
    <div className="w-full h-7 bg-[#dae1f4]">
      <p className="font-bold text-md text-center w-full">{text}</p>
    </div>
  );
};
