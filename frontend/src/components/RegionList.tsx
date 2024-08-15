import { getRegions } from "../api/regions";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";

export function RegionList() {
  const { data } = useQuery({ queryKey: ["regions"], queryFn: getRegions });

  const handleNavigate = (region: string) => {
    const path = window.location.pathname;
    const q = new URLSearchParams({ region });
    const url = `${path}?${q}`;
    window.history.pushState("home", "", url);
  };

  return (
    <div className="bg-background h-full w-[300px]">
      {data ? (
        <ul className="h-full flex flex-col divide-y divide-border gap-4 p-4">
          {data.map((region) => (
            <Button onClick={() => handleNavigate(region)} key={region}>
              {region}
            </Button>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
