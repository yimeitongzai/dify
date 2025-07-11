'use client'

import type { ChangeEvent, FC } from 'react'
import { createRef, useEffect, useState } from 'react'
import Cropper, { type Area, type CropperProps } from 'react-easy-crop'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { ImagePlus } from '../icons/src/vender/line/images'
import { useDraggableUploader } from './hooks'
import { checkIsAnimatedImage } from './utils'
import { ALLOW_FILE_EXTENSIONS } from '@/types/app'

export type OnImageInput = {
  (isCropped: true, tempUrl: string, croppedAreaPixels: Area, fileName: string): void
  (isCropped: false, file: File): void
}

type UploaderProps = {
  className?: string
  cropShape?: CropperProps['cropShape']
  onImageInput?: OnImageInput
}

const ImageInput: FC<UploaderProps> = ({
  className,
  cropShape,
  onImageInput,
}) => {
  const { t } = useTranslation()
  const [inputImage, setInputImage] = useState<{ file: File; url: string }>()
  const [isAnimatedImage, setIsAnimatedImage] = useState<boolean>(false)
  useEffect(() => {
    return () => {
      if (inputImage)
        URL.revokeObjectURL(inputImage.url)
    }
  }, [inputImage])

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = async (_: Area, croppedAreaPixels: Area) => {
    if (!inputImage)
      return
    onImageInput?.(true, inputImage.url, croppedAreaPixels, inputImage.file.name)
  }

  const handleLocalFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setInputImage({ file, url: URL.createObjectURL(file) })
      checkIsAnimatedImage(file).then((isAnimatedImage) => {
        setIsAnimatedImage(!!isAnimatedImage)
        if (isAnimatedImage)
          onImageInput?.(false, file)
      })
    }
  }

  const {
    isDragActive,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useDraggableUploader((file: File) => setInputImage({ file, url: URL.createObjectURL(file) }))

  const inputRef = createRef<HTMLInputElement>()

  const handleShowImage = () => {
    if (isAnimatedImage) {
      return (
        <img src={inputImage?.url} alt='' />
      )
    }

    return (
      <Cropper
        image={inputImage?.url}
        crop={crop}
        zoom={zoom}
        aspect={1}
        cropShape={cropShape}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    )
  }

  return (
    <div className={classNames(className, 'w-full px-3 py-1.5')}>
      <div
        className={classNames(
          isDragActive && 'border-primary-600',
          'relative flex aspect-square flex-col items-center justify-center rounded-lg border-[1.5px] border-dashed text-gray-500')}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {
          !inputImage
            ? <>
              <ImagePlus className="pointer-events-none mb-3 h-[30px] w-[30px]" />
              <div className="mb-[2px] text-sm font-medium">
                <span className="pointer-events-none">{t('common.imageInput.dropImageHere')}&nbsp;</span>
                <button className="text-components-button-primary-bg" onClick={() => inputRef.current?.click()}>{t('common.imageInput.browse')}</button>
                <input
                  ref={inputRef} type="file" className="hidden"
                  onClick={e => ((e.target as HTMLInputElement).value = '')}
                  accept={ALLOW_FILE_EXTENSIONS.map(ext => `.${ext}`).join(',')}
                  onChange={handleLocalFileInput}
                />
              </div>
              <div className="pointer-events-none">{t('common.imageInput.supportedFormats')}</div>
            </>
            : handleShowImage()
        }
      </div>
    </div>
  )
}

export default ImageInput
