import Result from "./result";

export interface MultiSearchResult {
    songs: Array<Result>;
    albums: Array<Result>;
}