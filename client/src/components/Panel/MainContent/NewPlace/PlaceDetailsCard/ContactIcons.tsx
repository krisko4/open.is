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

export const ContactIcons: FC<Props> = ({ facebook, instagram }) => {
    return (
        <div>
            <SocialIconButton url={facebook || `https://facebook.com`} />
            <SocialIconButton url={instagram || `https://instagram.com`} />
        </div>
    )
}

export const MemoizedContactIcons = React.memo(ContactIcons)