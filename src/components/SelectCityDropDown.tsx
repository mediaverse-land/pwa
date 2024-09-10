"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCities, getCountries } from "@/services/contactService";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

type City = {
  id: number;
  name: string;
};

interface Props {
  setValue: (value: number) => void;
  defaultValue?: {
    id: number;
    name: string;
  };
  disabled?: boolean;
  countryISO: string;
}

const getCitiesData = async ({ countryISO }: { countryISO: string }) => {
  try {
    const req = await getCities({ countryISO });
    if (req.ok) {
      const res = await req.json();
      console.log(res.data);
      return res.data as City[];
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

const SelectCityDropDown = ({
  setValue,
  defaultValue,
  countryISO,
  disabled,
}: Props) => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<City[]>([]);

  useEffect(() => {
    const request = async () => {
      const data = await getCitiesData({ countryISO });
      setCountries(data);
    };
    request();
    setLoading(false);
  }, []);
  return (
    <Select
      defaultValue={`${defaultValue?.id}`}
      onValueChange={(value) => {
        setValue(+value);
      }}
      disabled={disabled}
    >
      <SelectTrigger className="w-full h-full bg-transparent outline-none border-none">
        <SelectValue
          placeholder="Select Your City"
          className="text-[#353542] placeholder:text-[#353542] outline-none border-none"
        />
      </SelectTrigger>
      <SelectContent className="border-none outline-none">
        {loading ? (
          <Loader2Icon />
        ) : (
          countries.map((city) => {
            return (
              <SelectItem value={`${city.id}`} className="">
                {city.name}
              </SelectItem>
            );
          })
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectCityDropDown;
