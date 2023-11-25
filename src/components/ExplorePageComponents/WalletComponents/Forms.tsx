"use client";
import { Dispatch, SetStateAction } from "react";
import { DrawerStatus } from "../../shared/AddCardAndInventory";

export const AddInventoryForm = ({
  setDrawerStatus,
}: {
  setDrawerStatus: Dispatch<SetStateAction<DrawerStatus>>;
}) => {
  return (
    <div key={"AddInventory"} className={`p-8`}>
      <div className="flex flex-col items-stretch gap-14 h-full justify-between">
        {/* title */}
        <div className="flex items-center justify-between">
          <div className="text-[#D9D9FF]">Add Inventory</div>
          <div
            onClick={() =>
              setDrawerStatus({ isOpen: false, type: "Inventory" })
            }
            className="text-[14px] text-[#83839C] cursor-pointer"
          >
            Cancel
          </div>
        </div>
        {/* content  */}
        <div className="flex flex-col items-stretch gap-8">
          <div
            className="h-[48px] rounded-lg border border-[#353542] flex gap-2 px-4 py-[0.6rem] text-white"
            style={{
              background: `rgba(14, 14, 18, 0.50)`,
            }}
          >
            <div className="flex items-center justify-between gap-2 text-[14px] text-[#666680]">
              Amount
            </div>
            <div className="h-full w-[1px] bg-white mx-1"></div>
            <input
              className="bg-transparent grow placeholder:text-[#353542] outline-none"
              placeholder="Insert amount"
            />
          </div>
          <div className="bg-[rgba(78,78,97,0.50)] rounded-full capitalize border border-white text-center py-4 leading-none">
            pay
          </div>
        </div>
      </div>
    </div>
  );
};
export const AddCardForm = ({
  setDrawerStatus,
}: {
  setDrawerStatus: Dispatch<SetStateAction<DrawerStatus>>;
}) => {
  return (
    <div key={"AddCard"} className={`p-8`}>
      <div className="flex flex-col items-stretch gap-14 h-full justify-between">
        {/* title */}
        <div className="flex items-center justify-between">
          <div className="text-[#D9D9FF]">Add Card</div>
          <div
            onClick={() => setDrawerStatus({ isOpen: false, type: "Wallet" })}
            className="text-[14px] text-[#83839C] cursor-pointer"
          >
            Cancel
          </div>
        </div>
        {/* content  */}
        <div className="flex flex-col items-stretch gap-8">
          <div className="flex flex-col items-stretch gap-4">
            <div className="text-[14px] text-[#A2A2B5] border border-[#A2A2B5] rounded-lg flex items-center justify-center py-4 leading-none">
              Strip
            </div>
            <div
              className="h-[48px] rounded-lg border border-[#353542] flex gap-2 px-4 py-[0.6rem] text-white"
              style={{
                background: `rgba(14, 14, 18, 0.50)`,
              }}
            >
              <div className="flex items-center justify-between gap-2 text-[14px] text-[#666680]">
                Wallet
              </div>
              <div className="h-full w-[1px] bg-white mx-1"></div>
              <input
                className="bg-transparent grow placeholder:text-[#353542] outline-none"
                placeholder="Insert amount"
              />
            </div>
          </div>
          <div className="bg-[rgba(78,78,97,0.50)] rounded-full capitalize border border-white text-center py-4 leading-none">
            Add
          </div>
        </div>
      </div>
    </div>
  );
};
