interface AssetStruct {
	src: string;
	name: string;
	id: string;
    img: HTMLImageElement;
    hasLoaded: boolean;

    width: number;
    height: number;
    aspectRatio?: number;
}

export type { AssetStruct };
