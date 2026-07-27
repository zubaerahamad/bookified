'use client';

import Image from 'next/image';
import Link from 'next/link';
import {Plus} from 'lucide-react';
import {Button} from '@/components/ui/button';

const HeroSection = () => {
    return (
        <section className="pt-24 mb-10 md:mb-16">
            <div className="hero-container">
                {/* Part 1: Heading, description, button */}
                <div className="hero-content">
                    <h1 className="hero-title">
                        Your Library
                    </h1>
                    <p className="hero-description">
                        Convert your books into interactive AI conversations. Listen, learn, and discuss your favorite
                        reads.
                    </p>
                    <div className="flex justify-center lg:justify-start">
                        <Button className="hero-button"
                        >
                            <Link href="/books/new" className="flex items-center gap-2">
                                <Plus className="w-6 h-6 shrink-0"/>
                                <span>Add new book</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Part 2: Illustration */}
                <div className="hero-illustration-wrapper">
                    <div className="relative w-full aspect-square max-w-[240px] sm:max-w-[320px] lg:max-w-[400px]">
                        <Image
                            src="/assets/hero-illustration.png"
                            alt="Library Illustration"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Part 3: Steps */}
                <div className="hero-steps-card">
                    <div className="hero-step-item">
                        <div className="hero-step-number">1</div>
                        <div>
                            <h3 className="hero-step-title">Upload PDF</h3>
                            <p className="hero-step-desc">Add your book file</p>
                        </div>
                    </div>

                    <div className="hero-step-item">
                        <div className="hero-step-number">2</div>
                        <div>
                            <h3 className="hero-step-title">AI Processing</h3>
                            <p className="hero-step-desc">We analyze the content</p>
                        </div>
                    </div>

                    <div className="hero-step-item">
                        <div className="hero-step-number">3</div>
                        <div>
                            <h3 className="hero-step-title">Voice Chat</h3>
                            <p className="hero-step-desc">Discuss with AI</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
