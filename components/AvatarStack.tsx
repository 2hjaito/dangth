'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const avatars = [
  { id: 1, src: '/images/profile/1.JPG' },
  { id: 2, src: '/images/profile/2.JPG' },
  { id: 3, src: '/images/profile/3.JPG' },
  { id: 4, src: '/images/profile/4.JPG' },
  { id: 5, src: '/images/profile/5.JPG' },
  { id: 6, src: '/images/profile/6.JPG' },
  { id: 7, src: '/images/profile/7.JPG' },
];

export default function AvatarStack() {
  const [images, setImages] = useState(avatars);

  const handleDragEnd = () => {
    const updated = [...images.slice(1), images[0]];
    setImages(updated);
  };

  return (
    <div className="relative w-[120px] h-[120px]">
      {images.map((img, idx) => {
        const zIndex = images.length - idx;


        const offsetX = idx * 8;
        const offsetY = idx * 4;
        const rotate = idx * 3;
        const scale = 0.95;

        return idx === 0 ? (
          <DraggableImage
            key={img.id}
            img={img}
            onDragEnd={handleDragEnd}
            zIndex={zIndex}
          />
        ) : (
          <motion.div
            key={img.id}
            animate={{
              x: offsetX,
              y: offsetY,
              rotate,
              scale,
            }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none shadow-md overflow-hidden"
            style={{ zIndex }}
          >
            <Image
              src={img.src}
              alt={`Profile avatar ${img.id}`}
              fill
              sizes="120px"
              quality={60}
              className="object-cover"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

function DraggableImage({
  img,
  onDragEnd,
  zIndex,
}: {
  img: { id: number; src: string };
  onDragEnd: () => void;
  zIndex: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <motion.div
      drag
      dragElastic={0.5}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 30 || Math.abs(info.offset.y) > 30) {
          onDragEnd();
        }
      }}
      className="absolute top-0 left-0 w-full h-full rounded-lg cursor-grab shadow-lg overflow-hidden"
      style={{
        x,
        y,
        rotateX,
        rotateY,
        zIndex,
        transformPerspective: 1500,
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
    >
      <Image
        src={img.src}
        alt={`Profile avatar ${img.id}`}
        fill
        sizes="120px"
        quality={60}
        priority
        className="object-cover"
      />
    </motion.div>
  );
}
