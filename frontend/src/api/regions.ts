const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

export async function getRegions(): Promise<string[] | null> {
  try {
    const res = await fetch(`http://${SERVER_HOST}/regions`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching regions: ", error);
    return null;
  }
}
