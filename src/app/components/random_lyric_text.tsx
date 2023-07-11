"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import getRandomLyric, { RandomLyric } from "samplify_random_lyric";
import { Inter } from "@next/font/google";
import BouncingEllipsis from "./bouncing_ellipsis/bouncing_ellipsis";

const inter = Inter({ subsets: ["latin"] });

export default function RandomLyricText() {
    const [randomLyric, setRandomLyric] = useState<RandomLyric>(null as any);

    useEffect(() => {
        setRandomLyric(getRandomLyric());
    }, []);

    if (!randomLyric) {
        return <p className={inter.className}>
            <BouncingEllipsis />
        </p>
    }

    return (
        <Link href={`/samples/${randomLyric.id}`}>
            <p className={inter.className}>
                "{randomLyric.lyric}"
            </p>
        </Link>
    )
}