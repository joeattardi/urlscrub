import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { PiLink } from 'react-icons/pi';
import CopyToClipboardButton from './CopyToClipboardButton';
import ProtocolSelect from './ProtocolSelect';

export default function URLBuilder() {
    const [url, setUrl] = useState('');
    const [urlData, setUrlData] = useState({
        protocol: 'https:',
        hostname: '',
        pathname: '',
        hash: '',
        port: ''
    });

    useEffect(() => {
        try {
            const newUrl = new URL(`${urlData.protocol}//${urlData.hostname}`);
            newUrl.pathname = urlData.pathname;

            setUrl(newUrl.href);
        } catch {
            setUrl('');
        }
    }, [urlData]);

    function onProtocolChange(protocol: string) {
        setUrlData((urlData) => ({
            ...urlData,
            protocol
        }));
    }

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUrlData(urlData => ({
            ...urlData,
            [event.target.name]: event.target.value
        }));
    }

    function onUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUrl(event.target.value);

        try {
            const parsedUrl = new URL(event.target.value);

            setUrlData({
                protocol: parsedUrl.protocol,
                hostname: parsedUrl.hostname,
                pathname: parsedUrl.pathname,
                hash: parsedUrl.hash,
                port: parsedUrl.port
            });
        } catch {
            // If the current value isn't a valid URL, fall back to the default unfilled state
            setUrlData({
                protocol: 'https:',
                hostname: '',
                pathname: '',
                hash: '',
                port: ''
            });
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex items-center gap-1">
                            <PiLink />
                            <div className="flex-grow">URL</div>
                            <CopyToClipboardButton url={url} />
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        placeholder="Enter or paste a URL..."
                        value={url}
                        onChange={onUrlChange}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">URL Components</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <ProtocolSelect value={urlData.protocol} onValueChange={onProtocolChange} />
                        <div className="flex flex-col gap-2 flex-grow">
                            <Label htmlFor="hostname">Hostname</Label>
                            <Input
                                type="text"
                                id="hostname"
                                name="hostname"
                                placeholder="example.com"
                                value={urlData.hostname}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="pathname">Path</Label>
                        <Input
                            type="text"
                            id="pathname"
                            name="pathname"
                            placeholder="/api/users"
                            value={urlData.pathname}
                            onChange={onInputChange}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
