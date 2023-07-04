## Samplify_x

This is a web app for finding samples used in songs and albums. It also serves a "wrapper" API which simplifies the sample finding process.
The app itself consumes an API for Genius Songs Lyrics & More; found here: https://rapidapi.com/Glavier/api/genius-song-lyrics1. 

View the live demo here: https://samplify.vercel.app/.

## Usage

- Search for songs and albums using the searchbar in the navigation bar.

- Compare songs to samples via Youtube videos (if the urls exist). 

- "Star" your favourite samples to save them locally for easier access.

- Sample pages also include songs which sample the given song.

- Discover more music but clicking through each sample until you reach a dead end.

- Feel free to share your favourite songs/album samples by copy-pasting their links.

- The theme (light/dark) is based on <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme" target="_blank">prefers-color-scheme</a>.

## Endpoints

<b>Searching for songs </b>  
- Endpoint: /api/search?q={q}&num={num} where q is the search query and num is the number of results.  
- Reponse: an array of "Result" objects which contain id and other basic info about the song (e.g. title, imgUrl).

<b>Search for both songs & albums </b>  
- Endpoint: /api/search/multi?q={q}&num={num} where q is the search query and num is the number of results each.  
- Response: 2 arrays of "Result" objects labelled songs and albums which contain id and other basic info about each song/album. 

<b>Finding all songs used in an album</b>  
- Endpoint: /api/album?id={id} where id is the id of the album.  
- Response: an array of "Result" objects.

<b>Finding all samples used in a song </b>  
- Endpoint: /api/samples?id={id} where id is the id of the song.
- Response: an array of "Result" objects.

##

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Running locally

First, install the necessary packages:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

You will need the following environment variables: 

- NEXT_PUBLIC_RAPID_API_KEY

- URL

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy a Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
