/** Pairs a photo with its pre-generated 800px-wide `-sm` sibling for responsive loading. */
export function srcSet(src: string) {
  return `${src.replace(/\.jpg$/, '-sm.jpg')} 800w, ${src} 1600w`
}
