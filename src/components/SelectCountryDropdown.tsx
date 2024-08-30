"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCountries } from "@/services/contactService";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

type Country = {
  iso: string;
  name: string;
  title: string;
  calling_code: string;
};

interface Props {
  setValue: (value: string) => void;
  defaultValue?: {
    iso: string;
    name: string;
  };
}

const getCountriesData = async () => {
  try {
    const req = await getCountries();
    if (req.ok) {
      const res = await req.json();
      console.log(res.data);
      return res.data as Country[];
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

const SelectCountryDropdown = ({ setValue, defaultValue }: Props) => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const request = async () => {
      const data = await getCountriesData();
      setCountries(data);
    };
    request();
    setLoading(false);
  }, []);
  return (
    <Select
      defaultValue={defaultValue?.iso || ""}
      onValueChange={(value) => {
        setValue(value);
      }}
    >
      <SelectTrigger className="w-full h-full bg-transparent outline-none border-none">
        <SelectValue
          placeholder="Select Your Country"
          className="text-[#353542] placeholder:text-[#353542] outline-none border-none"
        />
      </SelectTrigger>
      <SelectContent className="border-none outline-none">
        {loading ? (
          <Loader2Icon />
        ) : (
          countries.map((country) => {
            return (
              <SelectItem value={country.iso} className="">
                {country.title}
              </SelectItem>
            );
          })
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectCountryDropdown;
