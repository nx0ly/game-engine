import { AssetManager } from "./assets/manageAssets";
import type { Circle } from "./objects/circle";
import type { Line } from "./objects/line";
import { RenderContext } from "./render/dom";
import { ColorUtils } from "./utils/colors";
import { MathUtils } from "./utils/math";

const MathUTILS = new MathUtils(3);
const ColorUTILS = new ColorUtils();

class MainFrame {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    public entities: any[];
    public lines: Line[];
    public circles: Circle[];
    public assetManager: AssetManager;

    public renderer: RenderContext;

    constructor() {
        this.entities = [];
        this.lines = [];
        this.circles = [];

        this.assetManager = new AssetManager();
        this.renderer = new RenderContext("2d");

        this.initialize();
    }

    initialize() {
        this.renderer.setRectangularBoundary(800, 600);
        document.body.appendChild(this.renderer.canvas);
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    addEntity(entity: any) {
        this.entities.push(entity);
    }

    addLine(line: Line) {
        this.lines.push(line);
    }

    addCircle(circle: Circle) {
        this.circles.push(circle);
    }

    addAsset(src: string, name: string) {
        return this.assetManager.addAsset(src, name);
    }

    renderScene() {
        const context = this.renderer.context;
        this.renderer.clear();

        for (const line of this.lines) {
            line.render(context, { x: 0, y: 0 });
        }

        for (const circle of this.circles) {
            circle.render(context, { x: 0, y: 0 });
        }
    }

    renderAssets(): void {
        this.assetManager.renderAssets(this.renderer.context);
    }

    start(): void {
        const loop = () => {
            this.renderScene();
            this.renderAssets();
            requestAnimationFrame(loop);
        };

        loop();
    }
}

export {
    MathUTILS,
    ColorUTILS,
    MainFrame
}

// this is to test code
/*
const mainframe = new MainFrame();
mainframe.render.setRectangularBoundary(500, 600);
mainframe.render.canvas.style.backgroundColor = "black";

const circle = new Circle({ x: 250, y: 300 }, 50, 2, "blue", "brown");

mainframe.addCircle(circle);

mainframe.renderScene();
*/

const mainframe = new MainFrame();
const asset = mainframe.addAsset("https://yepcode.io/docs/img/languages/javascript.svg", "jslogo");
mainframe.renderer.setRectangularBoundary(500, 600);
mainframe.renderer.canvas.style.backgroundColor = "black";
mainframe.start();