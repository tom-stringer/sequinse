import { Howl } from "howler";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { v4 } from "uuid";
import { createTrack } from "../factories/track-factory";
import { tracksState } from "../recoil/rhythm-state";
import { Instrument } from "../types/rhythm-types";
import { instruments } from "../utils/instruments";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";
import PlayIcon from "./icons/PlayIcon";
import PlusIcon from "./icons/PlusIcon";

const AddTrackPage: FC = () => {
    const navigate = useNavigate();
    const setTracks = useSetRecoilState(tracksState);

    function playInstrument(instrument: Instrument) {
        const howl = new Howl({ src: instrument.src });
        howl.play();
    }

    function addTrack(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, instrument: Instrument) {
        event.stopPropagation();

        const id = v4();
        setTracks((value) => ({
            ...value,
            [id]: createTrack(id, instrument.key, 8, 4),
        }));

        navigate("/");
    }

    return (
        <div className="flex flex-col gap-y-4">
            <header className="flex items-center">
                <button className="group w-10 h-10 p-2" onClick={() => navigate("/")}>
                    <ArrowLeftIcon className="w-full h-full stroke-muted-light group-hover:stroke-white" />
                </button>

                <h1 className="text-2xl ml-2">Add Track</h1>
            </header>

            {Object.values(instruments).map((instrument) => (
                <button
                    className="flex justify-between items-center rounded-lg bg-surface-1 hover:bg-surface-2 p-4"
                    onClick={() => playInstrument(instrument)}
                    key={instrument.key}>
                    <div className="flex items-center">
                        <PlayIcon className="w-5 h-5 fill-muted-light" />
                        <h1 className="text-lg ml-4">{instrument.name}</h1>
                    </div>

                    <button
                        className="group rounded-lg bg-surface-3 hover:bg-surface-4 w-10 h-10 p-1"
                        onClick={(event) => addTrack(event, instrument)}>
                        <PlusIcon className="w-full h-full stroke-muted-light group-hover:stroke-white" />
                    </button>
                </button>
            ))}
        </div>
    );
};

export default AddTrackPage;
