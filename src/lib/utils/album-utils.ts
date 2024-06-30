import { GET as albumAppearancesAPIGet } from "@/app/api/album/route";
import Result from "@/types/result";

export async function getAlbumData(id: string): Promise<Result | null> {
    try {
        let headers = new Headers();
        headers.append(
            "X-RapidAPI-Key",
            process.env.NEXT_PUBLIC_RAPID_API_KEY as string
        );
        headers.append("X-RapidAPI-Host", "genius-song-lyrics1.p.rapidapi.com");

        const options: RequestInit = {
            method: "GET",
            headers: headers,
            cache: "no-store",
        };

        const result = await fetch(
            "https://genius-song-lyrics1.p.rapidapi.com/album/details/?id=" + id,
            options
        )
            .then((response) => response.json())
            .then((data) => data["album"])
            .catch((err) => console.error(err));

        return {
            id,
            title: result['name'],
            artist: result['artist']['name'],
            imgUrl: result['cover_art_url'],
            year: result['release_date_components']['year'],
        }
    }
    catch (error) {
        return null;
    }
}

export async function getAlbumAppearances(id: String) {
    const request = new Request(`${process.env.URL}/api/album?id=${id}`);

    return (await albumAppearancesAPIGet(request)).json();
}