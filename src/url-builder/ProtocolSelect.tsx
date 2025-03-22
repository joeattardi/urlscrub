import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type ProtocolSelectProps = {
    value: string;
    onValueChange: (value: string) => void;
}

export default function ProtocolSelect({ value, onValueChange }: ProtocolSelectProps) {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="protocol">Protocol</Label>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger id="protocol" className="w-[180px]">
                    <SelectValue placeholder="Protocol" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="http:">http</SelectItem>
                    <SelectItem value="https:">https</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
