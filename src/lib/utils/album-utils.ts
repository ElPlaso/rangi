import { GET as albumAppearancesAPIGet } from "@/app/api/album/route";

export async function getAlbumData(id: String) {
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

    return fetch(
        "https://genius-song-lyrics1.p.rapidapi.com/album/details/?id=" + id,
        options
    )
        .then((response) => response.json())
        .then((data) => data["album"])
        .catch((err) => console.error(err));
}

export async function getAlbumAppearances(id: String) {
    const request = new Request(`${process.env.URL}/api/album?id=${id}`);

    return (await albumAppearancesAPIGet(request)).json();
}