import Result from "./result";

export interface Song extends Result {
    fullTitle?: string;
    samples?: Array<Result>;
    sampledBy?: Array<Result>;
    youtubeUrl?: string;
}