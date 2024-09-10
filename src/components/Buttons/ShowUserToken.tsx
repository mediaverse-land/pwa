"use client";

import { useToast } from "../ui/use-toast";

const ShowUserTokenButton = ({ token }: { token: string }) => {
  const { toast } = useToast();
  return (
    <button
      onClick={async () => {
        try {
          // copy token in user system
          await navigator.clipboard.writeText(token);
          toast({
            title: "Token copied",
            description: "Token copied to clipboard",
          });
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {token}
    </button>
  );
};

export default ShowUserTokenButton;
