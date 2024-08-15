import { getRegions } from "../api/regions";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";

interface RegionListProps {
  region: string;
  setRegion: (region: string) => void;
}

export function RegionList({ region, setRegion }: RegionListProps) {
  const { data } = useQuery({ queryKey: ["regions"], queryFn: getRegions });

  const handleClick = (region: string) => {
    setRegion(region);
  };

  return (
    <div className="bg-background md:h-full w-full md:w-[300px]">
      {data ? (
        <ul className="flex flex-row gap-4 p-4 overflow-x-auto divide-y md:h-full md:flex-col divide-border">
          {data.map((r) => (
            <Button
              className={r === region ? "bg-secondary" : "bg-primary"}
              onClick={() => handleClick(r)}
              key={r}
            >
              {r}
            </Button>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
