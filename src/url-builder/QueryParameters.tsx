import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PiPlus, PiXCircle } from 'react-icons/pi';
import { QueryParameter } from './types';

type QueryParametersProps = {
    parameters: QueryParameter[];
    onDelete: (id: string) => void;
    onAdd: () => void;
    onUpdate: (parameter: QueryParameter) => void;
}

export default function QueryParameters({ parameters, onDelete, onAdd, onUpdate }: QueryParametersProps) {
    function onChange(event: React.ChangeEvent<HTMLInputElement>, id: string) {
        const parameter = parameters.find(p => p.id === id);
        if (parameter) {
            onUpdate({
                ...parameter,
                [event.target.name]: event.target.value
            });
        }
    }

    return (
        <section>
            <div className="flex items-center">
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
            <div className="flex flex-col gap-4 mt-4">
                {parameters.map((parameter) => (
                    <div key={parameter.id} className="grid grid-cols-[1fr_1fr_auto] gap-4">
                        <Input
                            autoFocus
                            placeholder="Name"
                            name="name"
                            value={parameter.name}
                            onChange={event => onChange(event, parameter.id)}
                        />
                        <Input
                            placeholder="Value"
                            value={parameter.value}
                            name="value"
                            onChange={event => onChange(event, parameter.id)}
                        />
                        <Button
                            variant="ghost"
                            className="cursor-pointer"
                            onClick={() => onDelete(parameter.id)}
                        >
                            <PiXCircle />
                        </Button>
                    </div>
                ))}
            </div>
        </section>
    );
}
