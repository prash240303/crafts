import { SquircleWithOverflow } from "./SquircleWithOverflow";

function FMCard() {
    return (
        <div className="drop-shadow-[0_1.5rem_3rem_rgba(0,0,0,0.28)]">
            <SquircleWithOverflow
                radius={42}
                overflow="hidden"
                style={{
                    width: "22rem",
                    height: "22rem",
                }}
            >
                <div className="w-full h-full bg-zinc-900 flex flex-col p-3">
                    {/* Screen */}
                    <SquircleWithOverflow
                        radius={34}
                        overflow="hidden"
                        style={{
                            width: "100%",
                            height: "56%",
                        }}
                        border={{ width: 2, color: '#ffffff' }}
                    >
                        <div className="relative w-full h-full overflow-hidden bg-teal-300 px-6 pt-5">
                            {/* lcd grid */}
                            <div
                                className="
            absolute inset-0 opacity-[0.18]
            bg-[linear-gradient(rgba(0,0,0,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.12)_1px,transparent_1px)]
            bg-[size:0.35rem_0.35rem]
        "
                            />

                            {/* FM badge */}
                            <div className="relative inline-flex items-center justify-center rounded-md bg-zinc-800 px-3 py-2">
                                <span
                                    className="
                text-teal-300
                text-xl
                leading-none
                uppercase
                tracking-[0.1em]
                font-bold
                font-mono
                [font-smooth:none]
                [-webkit-font-smoothing:none]
                [image-rendering:pixelated]
            "
                                    style={{
                                        fontFamily: '"Press Start 2P", monospace',
                                    }}
                                >
                                    FM
                                </span>
                            </div>

                            {/* frequency */}
                            <div className="relative mt-10 flex items-end gap-4">
                                <span
                                    className="
                text-[3rem]
                leading-[0.9]
                text-zinc-800
                tracking-[-0.2em]
                font-bold
                font-mono
                [font-smooth:none]
                [-webkit-font-smoothing:none]
                [image-rendering:pixelated]
            "
                                    style={{
                                        fontFamily: '"Press Start 2P", monospace',
                                    }}
                                >
                                    101.4
                                </span>

                                <span
                                    className="
                text-xl
                leading-none
                               text-zinc-800

                uppercase
                font-bold
                font-mono
                [font-smooth:none]
                [-webkit-font-smoothing:none]
                [image-rendering:pixelated]
            "
                                    style={{
                                        fontFamily: '"Press Start 2P", monospace',
                                    }}
                                >
                                    KHz
                                </span>
                            </div>
                        </div>
                    </SquircleWithOverflow>

                    {/* Bottom Section */}
                    <div className="relative flex-1 px-4 my-5">
                        {/* center guide */}
                        <div className="absolute left-1/2 top-2 bottom-2 -translate-x-1/2 w-[0.2rem] rounded-full bg-[#232323]" />

                        {/* labels */}
                        <div className="flex items-center justify-between px-6 text-white text-2xl font-medium">
                            <span>101</span>
                            <span>102</span>
                        </div>

                        {/* Slider */}
                        <div className="relative mt-4 flex items-center justify-between">
                            {Array.from({ length: 15 }).map((_, i) => {
                                const major = i === 4 || i === 12;

                                return (
                                    <div
                                        key={i}
                                        className={`
                                            rounded-full
                                            ${major
                                                ? "h-10 w-[0.18rem] bg-white"
                                                : "h-8 w-[0.12rem] bg-[#2a2a2a]"
                                            }
                                        `}
                                    />
                                );
                            })}

                            {/* knob */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="h-28 w-7 rounded-full bg-[#f4f4f4] shadow-[0_0.5rem_1.5rem_rgba(255,255,255,0.15)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </SquircleWithOverflow >
        </div >
    );
}

export default FMCard;
