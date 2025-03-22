import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PiCheck, PiCopy } from 'react-icons/pi';

type CopyToClipboardButtonProps = {
    url: string;
}

export default function CopyToClipboardButton({ url }: CopyToClipboardButtonProps) {
    const [showCopied, setShowCopied] = useState(false);
    function onClick() {
        navigator.clipboard.writeText(url);
        setShowCopied(true);
        setTimeout(() => {
            setShowCopied(false);
        }, 3000);
    }

    return (
        <Button
            variant="outline"
            className="cursor-pointer"
            disabled={!url}
            onClick={onClick}
        >
            {showCopied ? <PiCheck /> : <PiCopy />}
            {showCopied ? 'Copied!' : 'Copy'}
        </Button>
    )
}
