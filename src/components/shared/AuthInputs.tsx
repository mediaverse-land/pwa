import { HTMLInputTypeAttribute } from "react";

const InputWithPlaceHolder = ({
  lable,
  placeholder,
  type = "text",
}: {
  lable: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
}) => {
  return (
    <div
      className="h-[48px] rounded-lg border border-[#353542] flex gap-2 px-4 py-[0.6rem] text-white"
      style={{
        background: `rgba(14, 14, 18, 0.50)`,
      }}
    >
      <div className="flex items-center justify-between gap-2 text-[14px] text-[#666680]">
        {lable}
      </div>
      <div className="h-full w-[1px] bg-white mx-1"></div>
      <input
        className="bg-transparent grow placeholder:text-[#353542] outline-none"
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export { InputWithPlaceHolder };
