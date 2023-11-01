import Motion from "@/components/motion";
import Image from "next/image";
import Link from "next/link";

const SingUp = () => {
  return (
    <Motion>
      <div className="mt-28">
        <div
          style={{
            background: `rgba(78, 78, 97, 0.20)`,
          }}
          className="mx-auto max-w-[674px] auth-border-image-source rounded-3xl px-[8rem] pt-[3.5rem] pb-[3rem] backdrop-blur-[5px]"
        >
          <div className="flex flex-col items-stretch h-full justify-between gap-[10rem] text-center">
            {/* input */}
            <div className="flex items-stretch justify-between flex-col gap-12">
              <div className="text-[14px] text-white leading-4">
                Insert your number for loging in.
              </div>
              <div
                className="h-[48px] rounded-lg border border-[#353542] flex gap-4 px-4 py-[0.6rem] text-white"
                style={{
                  background: `rgba(14, 14, 18, 0.50)`,
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="relative w-[1.4rem] h-[1rem]">
                    <Image src={"/images/france-flag.png"} alt="flage" fill />
                  </div>
                  <span className="">+33</span>
                </div>
                <div className="h-full w-[1px] bg-white"></div>
                <input
                  className="bg-transparent grow placeholder:text-[#353542] outline-none"
                  placeholder="your number..."
                  type="text"
                />
              </div>
            </div>
            {/* buttons */}
            <div className="flex flex-col items-stretch justify-between grow gap-16">
              <div className="flex flex-col items-stretch gap-[2rem]">
                {/* send button */}
                <button className="bg-[#4E4E61] bg-opacity-50 rounded-full h-[40px] text-[14px] leading-4 text-white font-semibold">
                  Send Code
                </button>
                {/* navigate link */}
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-[12px] text-[#83839C]">
                      Have an account?
                    </span>
                    <Link
                      href={`/login`}
                      className="text-[#597AFF] font-semibold text-[14px]"
                    >
                      Log in
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Motion>
  );
};

export default SingUp;
