import { dimsFor } from '../lib/srcset'

type Props = {
  src: string
  alt: string
  sizes: string
  width: number
  height: number
  loading?: 'lazy' | 'eager'
  className?: string
  fetchPriority?: 'high' | 'low' | 'auto'
}

export default function Picture({
  src,
  alt,
  sizes,
  width,
  height,
  loading = 'lazy',
  className,
  fetchPriority,
}: Props) {
  const { fullW, smW, hasSm } = dimsFor(src)
  const fullAvif = src.replace(/\.jpg$/, '.avif')
  const smAvif = fullAvif.replace(/\.avif$/, '-sm.avif')
  const smJpg = src.replace(/\.jpg$/, '-sm.jpg')

  const avifSrcSet = hasSm ? `${smAvif} ${smW}w, ${fullAvif} ${fullW}w` : `${fullAvif} ${fullW}w`
  const imgSrcSet = hasSm ? `${smJpg} ${smW}w, ${src} ${fullW}w` : `${src} ${fullW}w`

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <img
        src={src}
        srcSet={imgSrcSet}
        sizes={sizes}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        alt={alt}
        className={className}
        fetchPriority={fetchPriority}
      />
    </picture>
  )
}
