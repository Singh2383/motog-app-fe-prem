"use client";

import Image from "next/image";

const About = () => {
    return (
        <section className="relative isolate min-h-5/6 w-full overflow-hidden mt-28">
            {/* ────────────────────────────────────  BG IMAGE  */}
            <Image
                src="/images/about-us-hero.png" // place the provided hero image in /public
                alt="Row of sleek black cars in a showroom"
                fill
                priority
                className="absolute inset-0 object-cover -z-20 select-none"
            />

            {/* ────────────────────────────────────  DARK OVERLAY  */}
            <span className="absolute inset-0 bg-black/70 -z-10" />

            {/* ────────────────────────────────────  CONTENT WRAPPER  */}
            <div className="container mx-auto w-5/6 lg:px-8 py-24 flex flex-col justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-15 items-start">
                    {/* ───────── LEFT COLUMN  */}
                    <div className="flex flex-col gap-8">
                        <h1 className="font-extrabold text-white leading-none tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                            WHO WE {" "}
                            <br className="hidden sm:block" />
                            <span className="text-red-600">ARE?</span>
                        </h1>

                        <p className="max-w-xs text-white font-medium text-sm sm:text-base leading-relaxed uppercase tracking-wide">
                            Creating India’s Most Trusted <br /> Pre‑Owned Auto Network
                        </p>
                    </div>

                    {/* ───────── RIGHT COLUMN  */}
                    <div className="text-white text-base sm:text-lg leading-relaxed space-y-4">
                        <p>
                            At <span className="font-semibold text-red-600">MotoG</span>, we’re redefining how
                            India buys and sells pre‑owned cars.
                        </p>
                        <p>
                            Founded with a mission to simplify the used‑car journey for everyday
                            Indians, MotoG connects buyers and sellers through a trusted,
                            transparent, and easy‑to‑use digital platform.
                        </p>
                        <p>
                            Whether you’re a dealer, an individual seller, or a buyer looking
                            for your next vehicle, MotoG brings you closer to a smarter,
                            faster, and more reliable car transaction.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
