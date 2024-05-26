export interface MythfallStatus {
  NumPlayers: number;
  Spheres: Sphere[];
}

export interface Sphere {
  NumPlayers: number;
  Stability: number;
}

export const useMythfallStatus = () => {
  const getStatus = async () => {
    const url =
      "https://api.allorigins.win/get?url=https%3A%2F%2Falpha.mythfall.com%3A7779%2Fapi%2Fstatus";
    const response = await fetch(url);
    const cors = (await response.json()) as { contents: string };
    const data = JSON.parse(cors.contents) as MythfallStatus;
    return data;
  };

  return { getStatus };
};
