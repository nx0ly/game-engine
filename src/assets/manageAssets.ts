import type { AssetStruct } from "./assets";

class Asset implements AssetStruct {
    public src: string;
    public name: string;
    public id: string;
    public img: HTMLImageElement;
    public hasLoaded = false;

    public width: number;
    public height: number;

    constructor(src: string, id: string, name: string) {
        this.src = src;
        this.id = id;
        this.name = name;

        this.img = new Image();
        this.img.src = this.src;
        this.img.onload = () => {
            this.hasLoaded = true;
            this.width = this.img.width;
            this.height = this.img.height;
        };
    }

    get AssetID(): string {
        return this.id;
    }

    render(context: CanvasRenderingContext2D, x: number, y: number): void {
        if (this.hasLoaded) {
            context.drawImage(this.img, x, y);
        }
    }
}

class AssetManager {
    public assets: Asset[];

    constructor() {
        this.assets = [];
    }

    addAsset(src: string, name: string): Asset {
        const newAsset = new Asset(src, btoa(name), name);
        this.assets.push(newAsset);
        return newAsset;
    }

    deleteAssetByID(id: string): void {
        this.assets = this.assets.filter((asset) => asset.id !== id);
    }

    deleteAssetByName(name: string): void {
        this.assets = this.assets.filter((asset) => asset.name !== name);
    }

    get AssetIDS(): string {
        return this.assets.map((asset) => asset.AssetID).join(", ");
    }

    renderAssets(context: CanvasRenderingContext2D): void {
        for (const asset of this.assets) {
            asset.render(context, 0, 0);
        }
    }
}

export { Asset, AssetManager };