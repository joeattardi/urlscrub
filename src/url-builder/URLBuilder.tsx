import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { trackingParameters as trackingParameterList } from '@/tracking-params';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { PiCaretRight, PiLinkSimple } from 'react-icons/pi';
import CopyToClipboardButton from './CopyToClipboardButton';
import ProtocolSelect from './ProtocolSelect';
import QueryParameters from './QueryParameters';
import RemoveTrackers from './RemoveTrackers';
import { QueryParameter } from './types';

export default function URLBuilder() {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [shouldUpdateUrl, setShouldUpdateUrl] = useState(true);
    const [url, setUrl] = useState('');
    const [queryParameters, setQueryParameters] = useState<QueryParameter[]>([]);
    const [urlData, setUrlData] = useState({
        protocol: 'https:',
        hostname: '',
        pathname: '',
        hash: '',
        port: ''
    });

    function removeTrackingParameters() {
        setShouldUpdateUrl(true);
        setQueryParameters((queryParameters) =>
            queryParameters.filter((parameter) => !trackingParameterList.includes(parameter.name))
        );
    }

    function deleteParameter(id: string) {
        setShouldUpdateUrl(true);
        setQueryParameters((queryParameters) =>
            queryParameters.filter((parameter) => parameter.id !== id)
        );
    }

    function addParameter() {
        setQueryParameters((queryParameters) => [
            ...queryParameters,
            {
                id: crypto.randomUUID(),
                name: '',
                value: ''
            }
        ]);
    }

    function updateParameter(parameter: QueryParameter) {
        setShouldUpdateUrl(true);
        setQueryParameters((queryParameters) =>
            queryParameters.map((originalParameter) => {
                if (originalParameter.id === parameter.id) {
                    return parameter;
                }

                return originalParameter;
            })
        );
    }

    useEffect(() => {
        try {
            if (shouldUpdateUrl) {
                const newUrl = new URL(`${urlData.protocol}//${urlData.hostname}`);
                newUrl.pathname = urlData.pathname;
                newUrl.hash = urlData.hash;
                newUrl.port = urlData.port;

                queryParameters.forEach((parameter) => {
                    if (parameter.name) {
                        newUrl.searchParams.append(parameter.name, parameter.value);
                    }
                });

                setUrl(newUrl.href);
            }
        } catch {
            setUrl('');
        }
    }, [urlData, queryParameters, shouldUpdateUrl]);

    function onProtocolChange(protocol: string) {
        setShouldUpdateUrl(true);
        setUrlData((urlData) => ({
            ...urlData,
            protocol
        }));
    }

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setShouldUpdateUrl(true);
        setUrlData((urlData) => ({
            ...urlData,
            [event.target.name]: event.target.value
        }));
    }

    function onUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
        setShouldUpdateUrl(false);
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

            const newQueryParameters: QueryParameter[] = [];
            parsedUrl.searchParams.forEach((value, name) => {
                newQueryParameters.push({
                    id: crypto.randomUUID(),
                    name,
                    value
                });
            });
            setQueryParameters(newQueryParameters);
        } catch {
            // If the current value isn't a valid URL, fall back to the default unfilled state
            setUrlData({
                protocol: 'https:',
                hostname: '',
                pathname: '',
                hash: '',
                port: ''
            });
            setQueryParameters([]);
        }
    }

    const trackingParameters = queryParameters.filter((parameter) =>
        trackingParameterList.includes(parameter.name)
    );

    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex items-center gap-1">
                            <PiLinkSimple />
                            <div className="flex-grow">URL</div>
                            <CopyToClipboardButton url={url} />
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Input
                        placeholder="Enter or paste a URL..."
                        value={url}
                        onChange={onUrlChange}
                    />
                    <div className="flex items-center gap-4">
                        <RemoveTrackers
                            trackingParameters={trackingParameters}
                            onRemove={removeTrackingParameters}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">URL Components</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
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
                    <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                        <div className="flex items-center gap-1">
                            <CollapsibleTrigger asChild>
                                <button className="cursor-pointer">
                                    <PiCaretRight
                                        className={clsx('cursor-pointer transition-transform', {
                                            'rotate-90': showAdvanced
                                        })}
                                    />
                                </button>
                            </CollapsibleTrigger>
                            <div className="text-sm font-bold">Advanced Options</div>
                            <Badge variant="outline">Optional</Badge>
                        </div>
                        <CollapsibleContent className="p-4 flex flex-col md:flex-row gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="port">Port</Label>
                                <Input
                                    className="w-[180px]"
                                    id="port"
                                    name="port"
                                    type="number"
                                    min="1"
                                    max="65535"
                                    value={urlData.port}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="flex flex-col gap-2 flex-grow">
                                <Label htmlFor="hash">Hash</Label>
                                <Input
                                    id="hash"
                                    name="hash"
                                    value={urlData.hash}
                                    onChange={onInputChange}
                                />
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                    <Separator />
                    <QueryParameters
                        parameters={queryParameters}
                        onDelete={deleteParameter}
                        onAdd={addParameter}
                        onUpdate={updateParameter}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
