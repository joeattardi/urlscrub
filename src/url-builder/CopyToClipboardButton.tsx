import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';
import { PiCopy } from 'react-icons/pi';

type CopyToClipboardButtonProps = {
    url: string;
};

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
        <Tooltip open={showCopied}>
            <TooltipTrigger asChild>
                <Button
                    variant="outline"
                    className="cursor-pointer"
                    disabled={!url}
                    onClick={onClick}
                >
                    <PiCopy />
                    Copy
                </Button>
            </TooltipTrigger>
            <TooltipContent>Copied!</TooltipContent>
        </Tooltip>
    );
}
