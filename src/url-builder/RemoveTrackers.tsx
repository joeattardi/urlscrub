import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PiEquals, PiFunnelX } from 'react-icons/pi';
import { QueryParameter } from './types';

type RemoveTrackersProps = {
    trackingParameters: QueryParameter[];
    onRemove: () => void;
};

export default function RemoveTrackers({ trackingParameters, onRemove }: RemoveTrackersProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    disabled={!trackingParameters.length}
                    variant="outline"
                    className="cursor-pointer"
                >
                    <PiFunnelX />
                    Remove trackers
                    {trackingParameters.length > 0 && (
                        <Badge variant="secondary">{trackingParameters.length}</Badge>
                    )}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Remove Tracking Parameters</AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <div>
                            This will remove the following tracking parameters:
                            <ul className="mt-4 flex flex-col gap-2 px-8">
                                {trackingParameters.map((parameter: QueryParameter) => (
                                    <li key={parameter.id} className="flex items-center gap-2">
                                        <Badge
                                            className="bg-yellow-50 border-yellow-200"
                                            variant="outline"
                                        >
                                            {parameter.name}
                                        </Badge>
                                        <PiEquals />
                                        {parameter.value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="cursor-pointer" onClick={onRemove}>
                        <PiFunnelX /> Remove
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
