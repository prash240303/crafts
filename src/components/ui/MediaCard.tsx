import { SquircleWithOverflow } from './SquircleWithOverflow';
import Image from 'next/image';

function MediaCard() {
    return (
        <div style={{ filter: 'drop-shadow(0 12px 40px rgba(0,0,0,0.23))' }}>
            <SquircleWithOverflow
                radius={34}
                style={{ width: '340px', height: '340px' }}
                overflow="hidden"
            >
                <div className="bg-white p-1">

                    <SquircleWithOverflow
                        radius={30}
                        style={{ width: '332px', height: '332px' }}
                        overflow="hidden"
                    >
                        <div className="w-full h-full bg-linear-to-b from-neutral-200 to-neutral-100 rounded-xl flex flex-col">
                            {/* image — inset equally on all 4 sides */}
                            <SquircleWithOverflow
                                radius={24}
                                style={{ width: '100%', height: '206px', flexShrink: 0 }}
                                overflow="hidden"
                            >
                                <Image
                                    src="/whiteferrari.jpeg"
                                    alt="White Ferrari"
                                    fill
                                    className="object-cover"
                                />
                            </SquircleWithOverflow>

                            {/* text content */}
                            <div className="flex flex-col gap-2 px-5 pt-5">
                                <h2 className="text-lg text-neutral-400">
                                    Card 1
                                </h2>
                                <p className="text-neutral-400 text-base leading-snug">
                                    Set up your{' '}
                                    <span className="font-medium text-neutral-800">event in minutes</span>
                                    {': '}name it, date it,{' '}
                                    <span className="font-medium text-neutral-800">done.</span>
                                </p>
                            </div>

                        </div>
                    </SquircleWithOverflow>
                </div>

            </SquircleWithOverflow>
        </div >
    );
}

export default MediaCard;
