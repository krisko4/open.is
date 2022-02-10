import React, { FC, useRef, useState } from "react";

interface Props {
    img: string | File | ArrayBuffer | null,
    setImageFile?: any,
    name: string,
    setImg: React.Dispatch<React.SetStateAction<string | File | ArrayBuffer | null>>
}

export const ImageUpload: FC<Props> = ({ img, name, children, setImg, setImageFile }) => {

    const uploadRef = useRef<HTMLInputElement>(null)
    const [inputKey, setInputKey] = useState<any>()

    const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0]
            if (setImageFile) {
                setImageFile(image)
            }
            const fileReader = new FileReader()
            fileReader.readAsDataURL(image)
            fileReader.onload = e => {
                if (e.target) {
                    setImg(e.target.result)
                }
            }

        }

    }


    return <>
        <label htmlFor={name}>
            <input
                type="file"
                id={name}
                accept="image/*"
                ref={uploadRef}
                style={{ display: 'none' }}
                onChange={e => uploadImage(e)}
                key={inputKey}
            />
            {children}
        </label>
    </>;
}