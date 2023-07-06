import { getSongData } from "@/app/samples/[id]/utils";
import { cache } from "react";

export const getSongs = cache(async (id: string, sampleId: string) => {
    const songData: any = await getSongData(id);
    const sampleData: any = await getSongData(sampleId);

    return [songData, sampleData];
});