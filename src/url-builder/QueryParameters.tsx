import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import { PiPlus, PiWarningDuotone, PiXCircle } from 'react-icons/pi';
import { trackingParameters } from '../tracking-params';
import { QueryParameter } from './types';

type QueryParametersProps = {
    parameters: QueryParameter[];
    onDelete: (id: string) => void;
    onAdd: () => void;
    onUpdate: (parameter: QueryParameter) => void;
};

export default function QueryParameters({
    parameters,
    onDelete,
    onAdd,
    onUpdate
}: QueryParametersProps) {
    function onChange(event: React.ChangeEvent<HTMLInputElement>, id: string) {
        const parameter = parameters.find((p) => p.id === id);
        if (parameter) {
            onUpdate({
                ...parameter,
                [event.target.name]: event.target.value
            });
        }
    }

    return (
        <section>
            <div className="flex flex-col gap-4 md:flex-row items-center">
                <div className="flex-grow">
                    <h3 className="text-sm font-bold">Query Parameters</h3>
                    <div className="text-xs text-slate-600">
                        Add key-value pairs that will appear after the ? in your URL
                    </div>
                </div>
                <div>
                    <Button className="cursor-pointer" onClick={onAdd}>
                        <PiPlus />
                        Add Query Parameter
                    </Button>
                </div>
            </div>
            {parameters.length === 0 && (
                <Alert className="mt-4 bg-zinc-50">
                    <AlertDescription className="justify-items-center p-2">
                        No query parameters added yet.
                    </AlertDescription>
                </Alert>
            )}
            <div className="flex flex-col gap-4 mt-4">
                {parameters.map((parameter) => (
                    <div
                        key={parameter.id}
                        className={clsx(
                            'grid md:grid-cols-[24px_1fr_1fr_auto] gap-4 items-center bg-slate-50 border border-slate-200 rounded p-4',
                            {
                                'bg-yellow-50 border-yellow-200': trackingParameters.includes(
                                    parameter.name
                                )
                            }
                        )}
                    >
                        {trackingParameters.includes(parameter.name) ? (
                            <HoverCard>
                                <HoverCardTrigger>
                                    <div className="flex items-center gap-2">
                                        <PiWarningDuotone className="text-yellow-500 text-2xl" />
                                        <div className="font-bold md:hidden">Tracking Parameter</div>
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h4 className="font-bold">Privacy Warning</h4>
                                    <div className="text-sm">
                                        <strong>{parameter.name}</strong> is a parameter used for
                                        analytics and user tracking.
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        ) : (
                            <div />
                        )}
                        <Input
                            className="bg-white"
                            placeholder="Name"
                            name="name"
                            value={parameter.name}
                            onChange={(event) => onChange(event, parameter.id)}
                        />
                        <Input
                            className="bg-white"
                            placeholder="Value"
                            value={parameter.value}
                            name="value"
                            onChange={(event) => onChange(event, parameter.id)}
                        />
                        <Button
                            variant="ghost"
                            className="cursor-pointer"
                            onClick={() => onDelete(parameter.id)}
                        >
                            <PiXCircle />
                            <div className="md:hidden">Delete Parameter</div>
                        </Button>
                    </div>
                ))}
            </div>
        </section>
    );
}
