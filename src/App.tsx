import { PiLinkSimple } from 'react-icons/pi';
import URLBuilder from './url-builder/URLBuilder';

export default function App() {
    return (
        <div>
            <header className="p-4 bg-linear-to-t from-slate-300 to-slate-200 border-b border-b-slate-400">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <PiLinkSimple className="text-3xl" />
                    URL Scrub
                </h1>
            </header>
            <main className="p-4 max-w-4xl w-full mx-auto">
                <URLBuilder />
            </main>
        </div>
    );
}
