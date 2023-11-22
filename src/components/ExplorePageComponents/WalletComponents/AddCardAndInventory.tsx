"use client";
import { INACTIVE_PLUS } from "@/components/SVG/svgs";
import { useState } from "react";
import { AddCardForm, AddInventoryForm } from "./Forms";
export type DrawerStatus = {
  isOpen: boolean;
  type: "Inventory" | "Wallet";
};

const AddCardAndInventory = () => {
  const [drawerStatus, setDrawerStatus] = useState<DrawerStatus>({
    isOpen: false,
    type: "Inventory",
  });
  return (
    <>
      <div className="grow flex flex-col items-stretch justify-between">
        <div
          onClick={() => setDrawerStatus({ isOpen: true, type: "Wallet" })}
          className="rounded-2xl border border-dashed border-[#666680] text-[14px] cursor-pointer leading-5 capitalize text-center text-[#A2A2B5] flex items-center justify-center gap-2 py-5"
        >
          <span>Add Card</span>
          <span>
            <INACTIVE_PLUS fill="#A2A2B5" />
          </span>
        </div>
        <div
          onClick={() => setDrawerStatus({ isOpen: true, type: "Inventory" })}
          className="rounded-2xl border border-dashed border-[#666680] text-[14px] cursor-pointer leading-5 capitalize text-center text-[#A2A2B5] flex items-center justify-center gap-2 py-5"
        >
          <span>Add Inventory</span>
          <span>
            <INACTIVE_PLUS fill="#A2A2B5" />
          </span>
        </div>
      </div>
      {/* Drawer */}
      <div
        className={`absolute bottom-0 left-0 w-full z-50 rounded-t-2xl bg-[rgba(78,78,97,0.75)] backdrop-blur-md overflow-hidden duration-500 transition-[max-height] ${
          drawerStatus.isOpen ? "max-h-[400px]" : "max-h-[0px]"
        }`}
      >
        {drawerStatus.type === "Inventory" ? (
          <AddInventoryForm
            key={drawerStatus.type}
            setDrawerStatus={setDrawerStatus}
          />
        ) : (
          <AddCardForm
            key={drawerStatus.type}
            setDrawerStatus={setDrawerStatus}
          />
        )}
      </div>
    </>
  );
};

export default AddCardAndInventory;
