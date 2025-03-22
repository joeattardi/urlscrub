import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PiLink } from 'react-icons/pi';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

export default function URLBuilder() {
    const [url, setUrl] = useState('');
    const [urlData, setUrlData] = useState({
        protocol: 'https:',
        hostname: '',
        pathname: '',
        hash: '',
        port: ''
    });

    function updateUrl(newData) {
        try {
            const newUrl = new URL(`${newData.protocol}//${newData.hostname}`);
            newUrl.pathname = newData.pathname;

            setUrl(newUrl.href);
        } catch {
            setUrl('');
        }
    }

    function onProtocolChange(protocol: string) {
        setUrlData((urlData) => ({
            ...urlData,
            protocol
        }));
    }

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newData = {
            ...urlData,
            [event.target.name]: event.target.value
        };

        setUrlData(newData);
        updateUrl(newData);
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
                            URL
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
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="protocol">Protocol</Label>
                            <Select value={urlData.protocol} onValueChange={onProtocolChange}>
                                <SelectTrigger id="protocol" className="w-[180px]">
                                    <SelectValue placeholder="Protocol" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="http:">http</SelectItem>
                                    <SelectItem value="https:">https</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
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
