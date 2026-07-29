import {sampleBooks, voiceOptions, DEFAULT_VOICE} from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, Mic, MicOff} from "lucide-react";

const Page = async ({params}: { params: Promise<{ name: string }> }) => {

    const { name } = await params;

    const book = sampleBooks.find((book) => book.slug === name);

    if (!book) {
        return (
            <div className="book-page-container flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Book not found</h1>
                <Link href="/" className="mt-4 text-blue-500 flex items-center gap-2">
                    <ArrowLeft size={20} /> Back to Library
                </Link>
            </div>
        );
    }

    const voice = voiceOptions[DEFAULT_VOICE as keyof typeof voiceOptions];

    return (
        <div className="book-page-container">
            <Link href="/" className="back-btn-floating">
                <ArrowLeft size={24} className="text-[#212a3b]" />
            </Link>

            <div className="max-w-4xl mx-auto flex flex-col gap-6">
                {/* Header Card */}
                <div className="vapi-header-card">
                    <div className="vapi-cover-wrapper">
                        <Image
                            src={book.coverURL}
                            alt={book.title}
                            width={130}
                            height={195}
                            className="vapi-cover-image"
                        />
                        <div className="vapi-mic-wrapper">
                            <button className="vapi-mic-btn shadow-lg">
                                <MicOff size={28} className="text-[#212a3b]" />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#212a3b]">
                                {book.title}
                            </h1>
                            <p className="text-[#3d485e] font-medium mt-1">
                                by {book.author}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-1">
                            <div className="vapi-status-indicator">
                                <span className="vapi-status-dot vapi-status-dot-ready" />
                                <span className="vapi-status-text">Ready</span>
                            </div>
                            <div className="vapi-status-indicator">
                                <span className="vapi-status-text">Voice: {voice.name}</span>
                            </div>
                            <div className="vapi-status-indicator">
                                <span className="vapi-status-text">0:00/15:00</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transcript Area */}
                <div className="transcript-container shadow-sm min-h-[400px]">
                    <div className="transcript-empty">
                        <div className="bg-gray-50 p-4 rounded-full mb-4">
                            <Mic size={48} className="text-[#8B7355]" />
                        </div>
                        <h2 className="transcript-empty-text">No conversation yet</h2>
                        <p className="transcript-empty-hint">
                            Click the mic button above to start talking
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;