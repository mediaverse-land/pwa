"use client";

import { imagePlaceHolders } from "@/configs/base";
import { convertISOToRelative } from "@/lib/convertISOToRelative";
import { getComments, postComment } from "@/services/contactService";
import { PostCommentData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  body: z.string().min(1, {
    message: "*Please Enter Your Comment",
  }),
});

const postCommentData = async ({
  body,
  token,
}: {
  body: PostCommentData;
  token: string;
}) => {
  try {
    const req = await postComment({ body, token });
    return {
      data: await req.json(),
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};

const SingleAssetComments = ({
  assetID,
  userImage,
  username,
  // commentsData,
  token,
}: {
  userImage: string | null | undefined;
  assetID: number;
  // commentsData: any;
  username: string | null | undefined;
  token: string;
}) => {
  const [comments, setComments] = useState<any[]>([]);
  const [commentsNumber, setCommentsNumber] = useState(0);
  const [message, setMessage] = useState("");
  const [refetchComments, setRefetchComment] = useState(false);
  const [modalStatus, setModalStatus] = useState({
    isOpen: false,
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isLoading, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    if (token) {
      const getCommentsData = async () => {
        try {
          const req = await getComments({ id: `${assetID}`, token });
          if (req.ok) {
            const res = await req.json();
            setComments(res.data);
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
  }, [refetchComments]);
  useEffect(() => {
    if (modalStatus.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalStatus.isOpen]);
  const handleAddComment = handleSubmit(async (data) => {
    const res = await postCommentData({
      body: {
        asset_id: assetID,
        body: data.body,
        parent_id: null,
      },
      token,
    });
    if (res?.status === 200 && res.data.status === 1) {
      setRefetchComment((prev) => {
        return !prev;
      });
      setMessage("Your comment will be displayed after approval");
    } else if (res?.status === 200 && res.data.status === 2) {
      setRefetchComment((prev) => {
        return !prev;
      });
    } else if (res?.status === 200 && res.data.status === 3) {
      setMessage("Your comment rejected");
    }
    reset();
  });
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
        className="p-6 lg:p-8 rounded-2xl bg-[rgba(78,78,97,0.30)] backdrop-blur-sm flex flex-col items-stretch justify-between leading-none gap-6 select-none cursor-pointer"
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
              <Image
                src={`${userImage || imagePlaceHolders.account}`}
                alt={`${username}`}
                fill
              />
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
        } fixed top-[20%] lg:top-[150px] left-1/2 lg:left-[60%] z-[9999] lg:w-[790px] max-h-[400px] lg:max-h-[520px] p-6 lg:p-8 -translate-x-1/2 bg-[rgba(78,78,97,0.75)] backdrop-blur-md rounded-2xl flex-col items-stretch gap-4 lg:gap-8 overflow-y-auto`}
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
              reset();
              setMessage("");
            }}
          >
            Cancel
          </div>
        </div>
        <form
          onSubmit={handleAddComment}
          className="flex flex-col items-stretch gap-2"
        >
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="relative w-[40px] h-[40px] aspect-square overflow-hidden rounded-full">
              {userImage ? (
                <Image src={`${userImage || "/"}`} alt={`${username}`} fill />
              ) : (
                <div className="w-full h-full bg-white"></div>
              )}
            </div>
            <input
              disabled={isLoading || isSubmitting}
              className="rounded-lg bg-[rgba(28,28,35,0.75)] placeholder:text-[##666680] text-white text-[14px] px-4 py-3 grow outline-none"
              placeholder="Add a comment..."
              {...register("body")}
            />
          </div>
          <div className="text-white text-[14px] leading-[16px]">{message}</div>
        </form>
        <div className="flex flex-col gap-2">
          {comments?.map((item) => (
            <div
              key={item.id}
              className="bg-[rgba(78,78,97,0.50)] backdrop-blur-md border border-[#CFCFFC] rounded-2xl p-6 flex flex-col items-stretch gap-5"
            >
              <div className="flex items-center">
                <div className="flex items-center gap-2 mr-auto">
                  <div className="relative w-[18px] h-[18px] aspect-square overflow-hidden rounded-full">
                    {item.user ? (
                      <Image
                        src={`${
                          item?.user?.image_url || imagePlaceHolders.account
                        }`}
                        alt={``}
                        fill
                      />
                    ) : (
                      <div className="w-full h-full relative">
                        <Image
                          src={`${imagePlaceHolders.account}`}
                          alt={``}
                          fill
                        />
                      </div>
                    )}
                  </div>
                  <div className="text-[#A2A2B5] text-[12px] leading-3">
                    {item?.user?.username || ""}
                  </div>
                </div>
                <div className="text-[12px] leading-3 text-[#666680]">
                  {convertISOToRelative(item.created_at)}
                </div>
              </div>
              <p className="text-white">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleAssetComments;
