"use client";

import { getComments } from "@/services/contactService";
import Image from "next/image";
import { useEffect, useState } from "react";

const SingleAssetComments = ({
  assetID,
  userImage,
  username,
  commentsData,
  token,
}: {
  userImage: string | null | undefined;
  assetID: number;
  commentsData: any;
  username: string | null | undefined;
  token: string;
}) => {
  const [comments, setComment] = useState<any[]>();
  const [commentsNumber, setCommentsNumber] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [modalStatus, setModalStatus] = useState({
    isOpen: false,
  });
  useEffect(() => {
    if (token) {
      const getCommentsData = async () => {
        try {
          const req = await getComments({ id: `${assetID}`, token });
          if (req.ok) {
            const res = await req.json();
            setComment(res.data);
            setCommentsNumber(res.data.length);
            return res;
          } else {
            if (req.status === 404) {
              return "not-found";
            }
          }
        } catch (error) {
          console.error(error);
        }
      };
      getCommentsData();
    }
  }, []);
  useEffect(() => {
    if (modalStatus.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalStatus.isOpen]);
  return (
    <>
      <div
        onClick={() => {
          if (token) {
            setModalStatus({
              ...modalStatus,
              isOpen: true,
            });
          }
        }}
        className="p-8 rounded-2xl bg-[rgba(78,78,97,0.30)] backdrop-blur-sm flex flex-col items-stretch justify-between leading-none gap-6 select-none cursor-pointer"
      >
        <div className="flex items-center">
          <div className="mr-auto text-[14px] text-white font-semibold">
            Comments
          </div>
          <div className="text-[14px] text-[#666680]">{commentsNumber}</div>
        </div>
        {token ? (
          <div className="flex items-center gap-4">
            <div className="relative w-[40px] h-[40px] aspect-square overflow-hidden rounded-full">
              {userImage ? (
                <Image src={`${userImage}`} alt={`${username}`} fill />
              ) : (
                <div className="w-full h-full bg-white"></div>
              )}
            </div>
            <div className="rounded-lg bg-[rgba(28,28,35,0.75)] text-[#666680] text-[14px] px-4 py-3 grow">
              Add a comment...
            </div>
          </div>
        ) : (
          <div className="w-full text-center">Please Login To See Comments</div>
        )}
      </div>
      {/* modal */}
      <div
        className={`${
          modalStatus.isOpen ? "flex" : "hidden"
        } fixed top-[50%] left-[60%] z-[9999] w-[790px] max-h-[520px] p-8 -translate-x-1/2 -translate-y-1/2 bg-[rgba(78,78,97,0.75)] backdrop-blur-md rounded-2xl flex-col items-stretch gap-8 overflow-y-auto`}
      >
        <div className="flex items-center">
          <div className="mr-auto text-[#D9D9FF]">Comments</div>
          <div
            className="text-[14px] text-[#83839C] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setModalStatus({
                ...modalStatus,
                isOpen: false,
              });
            }}
          >
            Cancel
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-[40px] h-[40px] aspect-square overflow-hidden rounded-full">
            {userImage ? (
              <Image src={`${userImage}`} alt={`${username}`} fill />
            ) : (
              <div className="w-full h-full bg-white"></div>
            )}
          </div>
          <input
            className="rounded-lg bg-[rgba(28,28,35,0.75)] placeholder:text-[##666680] text-white text-[14px] px-4 py-3 grow outline-none"
            placeholder="Add a comment..."
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-[rgba(78,78,97,0.50)] backdrop-blur-md border border-[#CFCFFC] rounded-2xl p-6 flex flex-col items-stretch gap-5">
            <div className="flex items-center">
              <div className="flex items-center gap-2 mr-auto">
                <div className="relative w-[18px] h-[18px] aspect-square overflow-hidden rounded-full">
                  {"author.image" ? (
                    <Image src={`${"/images/car.png"}`} alt={``} fill />
                  ) : (
                    <div className="w-full h-full bg-white"></div>
                  )}
                </div>
                <div className="text-[#A2A2B5] text-[12px] leading-3">
                  KhaPa-hi7ji
                </div>
              </div>
              <div className="text-[12px] leading-3 text-[#666680]">
                1 day ago
              </div>
            </div>
            <p className="text-white">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do am
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do am
            </p>
          </div>
          <div className="bg-[rgba(78,78,97,0.50)] backdrop-blur-md border border-[#CFCFFC] rounded-2xl p-6 flex flex-col items-stretch gap-5">
            <div className="flex items-center">
              <div className="flex items-center gap-2 mr-auto">
                <div className="relative w-[18px] h-[18px] aspect-square overflow-hidden rounded-full">
                  {"author.image" ? (
                    <Image src={`${"/images/car.png"}`} alt={``} fill />
                  ) : (
                    <div className="w-full h-full bg-white"></div>
                  )}
                </div>
                <div className="text-[#A2A2B5] text-[12px] leading-3">
                  KhaPa-hi7ji
                </div>
              </div>
              <div className="text-[12px] leading-3 text-[#666680]">
                1 day ago
              </div>
            </div>
            <p className="text-white">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do am
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do am
            </p>
          </div>
          <div className="bg-[rgba(78,78,97,0.50)] backdrop-blur-md border border-[#CFCFFC] rounded-2xl p-6 flex flex-col items-stretch gap-5">
            <div className="flex items-center">
              <div className="flex items-center gap-2 mr-auto">
                <div className="relative w-[18px] h-[18px] aspect-square overflow-hidden rounded-full">
                  {"author.image" ? (
                    <Image src={`${"/images/car.png"}`} alt={``} fill />
                  ) : (
                    <div className="w-full h-full bg-white"></div>
                  )}
                </div>
                <div className="text-[#A2A2B5] text-[12px] leading-3">
                  KhaPa-hi7ji
                </div>
              </div>
              <div className="text-[12px] leading-3 text-[#666680]">
                1 day ago
              </div>
            </div>
            <p className="text-white">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do am
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do am
            </p>
          </div>
          <div className="bg-[rgba(78,78,97,0.50)] backdrop-blur-md border border-[#CFCFFC] rounded-2xl p-6 flex flex-col items-stretch gap-5">
            <div className="flex items-center">
              <div className="flex items-center gap-2 mr-auto">
                <div className="relative w-[18px] h-[18px] aspect-square overflow-hidden rounded-full">
                  {"author.image" ? (
                    <Image src={`${"/images/car.png"}`} alt={``} fill />
                  ) : (
                    <div className="w-full h-full bg-white"></div>
                  )}
                </div>
                <div className="text-[#A2A2B5] text-[12px] leading-3">
                  KhaPa-hi7ji
                </div>
              </div>
              <div className="text-[12px] leading-3 text-[#666680]">
                1 day ago
              </div>
            </div>
            <p className="text-white">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do am
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do am
            </p>
          </div>
          <div className="bg-[rgba(78,78,97,0.50)] backdrop-blur-md border border-[#CFCFFC] rounded-2xl p-6 flex flex-col items-stretch gap-5">
            <div className="flex items-center">
              <div className="flex items-center gap-2 mr-auto">
                <div className="relative w-[18px] h-[18px] aspect-square overflow-hidden rounded-full">
                  {"author.image" ? (
                    <Image src={`${"/images/car.png"}`} alt={``} fill />
                  ) : (
                    <div className="w-full h-full bg-white"></div>
                  )}
                </div>
                <div className="text-[#A2A2B5] text-[12px] leading-3">
                  KhaPa-hi7ji
                </div>
              </div>
              <div className="text-[12px] leading-3 text-[#666680]">
                1 day ago
              </div>
            </div>
            <p className="text-white">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do am
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do am
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleAssetComments;
