import { useRecoilValue, useSetRecoilState } from "recoil";
import { rhythmLengthState, tempoState, tracksState } from "../recoil/rhythm-state";
import { getStepDelay } from "../utils/rhythm-utils";

export function useStepDelay(): number {
    const tempo = useRecoilValue(tempoState);
    return getStepDelay(tempo);
}

export function useUpdateRhythmLength() {
    const tracks = useRecoilValue(tracksState);
    const setRhythmLength = useSetRecoilState(rhythmLengthState);

    return function () {
        const length = Object.values(tracks).reduce((value, track) => (track.steps ? value * track.steps : value), 1);

        setRhythmLength(length);
    };
}
