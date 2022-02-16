import { FC, useRef } from "react";
import { useRecoilState } from "recoil";
import { trackState } from "../recoil/rhythm-state";
import Step from "./Step";

interface TrackCircleProps {
    id: string;
    index: number;
}

const TrackCircle: FC<TrackCircleProps> = ({ id, index }) => {
    const [track, setTrack] = useRecoilState(trackState(id));
    const circle = useRef<HTMLDivElement>(null);
    const radius = (circle.current?.offsetWidth || 0) / 2;

    const circleStyle = {
        width: `${90 - index * 15}%`,
        height: `${90 - index * 15}%`,
        margin: -radius,
    };

    const circleClass =
        radius !== 0 ? "rounded-full bg-transparent absolute border-2 border-orange-dark top-1/2 left-1/2" : "";

    return (
        <div className={circleClass} style={circleStyle} ref={circle}>
            {radius !== 0 && track.necklace.map((_, i) => <Step track={track} radius={radius} index={i} />)}
        </div>
    );
};

export default TrackCircle;