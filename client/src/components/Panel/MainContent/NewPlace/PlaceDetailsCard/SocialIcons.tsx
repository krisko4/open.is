import { IconButton } from "@mui/material"
import React from "react"
import { FC } from "react"
import { SocialIcon } from "react-social-icons"
interface Props {
    facebook: string,
    instagram: string
}

interface SocialProps{
    url: string
}

const SocialIconButton : FC<SocialProps> = ({ url }) => {
    return (
        <IconButton size="large">
            <SocialIcon
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: 35, height: 35, display: 'table-cell' }}
                url={url} />
        </IconButton>

    )
}

export const SocialIcons: FC<Props> = ({ facebook, instagram }) => {
    const fb = facebook.startsWith('https://facebook.com') ? facebook : `https://facebook.com/${facebook}`
    const ig = instagram.startsWith('https://instagram.com') ? instagram : `https://instagram.com/${instagram}`
    return (
        <div>
            <SocialIconButton url={fb} />
            <SocialIconButton url={ig} />
        </div>
    )
}

export const MemoizedSocialIcons = React.memo(SocialIcons)