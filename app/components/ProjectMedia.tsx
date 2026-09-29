import Image from "next/image";
import type { ProjectMedia as Media } from "../lib/data";
import LazyVideo from "./LazyVideo";
import styles from "./ProjectMedia.module.css";

/** Image, GIF, or muted looping video in a card frame, with optional caption. */
export default function ProjectMedia({ media }: { media: Media }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        {media.type === "video" ? (
          <LazyVideo
            className={styles.media}
            src={media.src}
            poster={media.poster}
            label={media.alt}
            width={media.width}
            height={media.height}
          />
        ) : (
          <Image
            className={styles.media}
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes="(max-width: 960px) 100vw, 45vw"
            // Next's optimizer drops GIF animation frames.
            unoptimized={media.type === "gif"}
          />
        )}
      </div>
      {media.caption && (
        <figcaption className={styles.caption}>{media.caption}</figcaption>
      )}
    </figure>
  );
}
