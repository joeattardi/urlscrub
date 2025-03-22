import URLBuilder from './url-builder/URLBuilder';

export default function App() {
    return (
        <div>
            <header className="p-4">
                <h1 className="text-2xl font-bold">URL Scrub</h1>
            </header>
            <main className="p-4 max-w-4xl w-full mx-auto">
                <URLBuilder />
            </main>
        </div>
    );
}
