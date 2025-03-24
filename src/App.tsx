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
                <div className="text-sm">Clean links. No junk.</div>
            </header>
            <main className="p-4 max-w-4xl w-full mx-auto">
                <URLBuilder />
                <div className="text-center text-sm m-4">Made with <span className="text-lg">☕️</span> by <a className="text-blue-700" href="https://joeattardi.com">Joe Attardi</a>.</div>
            </main>
        </div>
    );
}
