'use client'

import Result from '@/app/models/result';
import React, { useRef, useState, useEffect } from 'react';
import SampledByResult from './sampled_by_result';

export default function SampledByScrollingList(props: any) {

  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryItemSize, setGalleryItemSize] = useState<number>(0);
  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timer>();

  const scrollToNextPage = () => {
    if (galleryRef.current) {
      const gallery = galleryRef.current;
      const scrollLeft = gallery.scrollLeft;
      const scrollWidth = gallery.scrollWidth;
      const clientWidth = gallery.clientWidth;
      const maxScrollLeft = scrollWidth - clientWidth;
      if (scrollLeft < maxScrollLeft) {
        const nextPageLeft = Math.min(scrollLeft + galleryItemSize, maxScrollLeft);
        gallery.scrollTo({
          left: nextPageLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollToPrevPage = () => {
    if (galleryRef.current) {
      const gallery = galleryRef.current;
      const scrollLeft = gallery.scrollLeft;
      if (scrollLeft > 0) {
        const prevPageLeft = Math.max(scrollLeft - galleryItemSize, 0);
        gallery.scrollTo({
          left: prevPageLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const handlePrevMouseDown = () => {
    setScrollInterval(setInterval(scrollToPrevPage, 250));
  };

  const handleNextMouseDown = () => {
    setScrollInterval(setInterval(scrollToNextPage, 250));
  };

  const handleMouseUp = () => {
    if (scrollInterval !== null) {
      clearInterval(scrollInterval);
    }
  };

  useEffect(() => {
    const gallery = galleryRef.current;

    const handleResize = () => {
      setGalleryItemSize(gallery?.querySelector('.item:first-child')?.getBoundingClientRect().width || 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="gallery"
      style={{ marginTop: "2rem", marginBottom: "4rem" }}
    >
      <div ref={galleryRef} className="gallery_scroller">
        {props.sampledByResults?.map((song: { [x: string]: any; id: any }) => {
          return (
            <div className="item hovered" key={song.id}>
              <SampledByResult
                type="samples"
                result={
                  new Result(
                    song.id,
                    song["title"],
                    song["artist_names"],
                    song["release_date_components"]
                      ? song["release_date_components"]["year"]
                      : "-",
                    song["song_art_image_thumbnail_url"]
                  )
                }
              />
            </div>
          );
        })}
      </div>
      <span className="btn prev" onClick={scrollToPrevPage} onMouseDown={handlePrevMouseDown} onMouseUp={handleMouseUp} onMouseOut={handleMouseUp}></span>
      <span className="btn next" onClick={scrollToNextPage} onMouseDown={handleNextMouseDown} onMouseUp={handleMouseUp} onMouseOut={handleMouseUp}></span>
    </div>
  );
}
