'use client';

import Image from 'next/image';
import { useCallback, useId, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';
import type { GalleryItem } from '@/types';
import { cn } from '@/lib/cn';

interface BeforeAfterComparisonProps {
  readonly item: GalleryItem;
  /** Priority-load the first pair on the page. */
  readonly priority?: boolean;
  readonly className?: string;
}

const STEP = 2;
const LARGE_STEP = 10;

function clamp(value: number): number {
  return Math.min(100, Math.max(0, value));
}

/**
 * Before/after wipe comparison.
 *
 * Accessibility: the handle is a real ARIA slider driven by arrow keys,
 * Home/End and Page Up/Down. Pointer events cover mouse, touch and pen with
 * one code path. The transition is CSS-only and is disabled globally by the
 * `prefers-reduced-motion` rule in globals.css.
 */
export function BeforeAfterComparison({
  item,
  priority = false,
  className,
}: BeforeAfterComparisonProps) {
  const [position, setPosition] = useState<number>(50);
  const [dragging, setDragging] = useState<boolean>(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  const setFromClientX = useCallback((clientX: number): void => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    if (rect.width === 0) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>): void => {
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
      setFromClientX(event.clientX);
    },
    [setFromClientX],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>): void => {
      if (!dragging) return;
      // Stop the browser from scrolling the page while dragging on touch.
      event.preventDefault();
      setFromClientX(event.clientX);
    },
    [dragging, setFromClientX],
  );

  const endDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>): void => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  }, []);

  const onKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>): void => {
    const moves: Record<string, number> = {
      ArrowLeft: -STEP,
      ArrowRight: STEP,
      ArrowDown: -STEP,
      ArrowUp: STEP,
      PageDown: -LARGE_STEP,
      PageUp: LARGE_STEP,
    };

    if (event.key === 'Home') {
      event.preventDefault();
      setPosition(0);
      return;
    }
    if (event.key === 'End') {
      event.preventDefault();
      setPosition(100);
      return;
    }

    const delta = moves[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    setPosition((current) => clamp(current + delta));
  }, []);

  return (
    <figure className={cn('group', className)}>
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-lg border border-wv-border bg-wv-surface-2"
      >
        {/* After image sits underneath and is fully visible at position 100. */}
        <Image
          src={item.afterSrc}
          alt={item.afterAlt}
          width={item.width}
          height={item.height}
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        {/* Before image is clipped from the left edge to the handle. */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={item.beforeSrc}
            alt={item.beforeAlt}
            width={item.width}
            height={item.height}
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded bg-wv-black/75 px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-wv-text">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded bg-wv-black/75 px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-wv-text">
          After
        </span>

        <div
          role="slider"
          tabIndex={0}
          aria-label={`Reveal before and after for ${item.title}`}
          aria-labelledby={labelId}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% before, ${100 - Math.round(position)}% after`}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          style={{ left: `${position}%` }}
          className={cn(
            'absolute inset-y-0 -ml-5 flex w-10 cursor-ew-resize items-center justify-center',
            !dragging && 'transition-[left] duration-75',
          )}
        >
          <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-wv-text/85" />
          <span
            aria-hidden="true"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-wv-border-strong bg-wv-black/90 text-wv-text shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 6-5 6 5 6" />
              <path d="m15 6 5 6-5 6" />
            </svg>
          </span>
        </div>
      </div>

      <figcaption id={labelId} className="mt-3">
        <span className="block text-sm font-semibold tracking-tight text-wv-text">
          {item.title}
        </span>
        {item.note ? (
          <span className="mt-1 block text-sm leading-relaxed text-wv-muted">{item.note}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}
