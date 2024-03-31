"use client";

import { signOut, useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { ButtonHTMLAttributes, useState } from "react";
import { URL } from "@/services/contactService";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const DeleteAccountButton = ({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const { toast } = useToast();
  const params = useParams();
  return (
    <button
      onClick={async () => {
        setIsLoading(true);
        try {
          const req = await fetch(`${URL}/account`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${session.data?.user.token}`,
            },
          });
          if (req.ok) {
            toast({
              description: "Your Account Deleted Successfully",
            });
            setTimeout(() => {
              signOut({
                callbackUrl: `/${params.lang}/app/explore`,
              });
            }, 3000);
          } else {
            throw new Error();
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Somthing went wrong",
            variant: "destructive",
          });
        }
        setIsLoading(false);
      }}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin duration-100 mx-auto" />
      ) : (
        "Delete Account"
      )}
    </button>
  );
};

export default DeleteAccountButton;
