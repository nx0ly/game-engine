import { AssetManager } from "./assets/manageAssets";
import { Circle } from "./models/2d/circle";
import { Line } from "./models/2d/line";
import { RenderContext } from "./render/dom";
import { ColorUtils } from "./utils/colors";
import { MathUtils, Vector2 } from "./utils/math";

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

    addCircle(origin: [number, number], radius: number, lineWidth: number, fillColor: string, outlineColor: string) {
        this.circles.push(new Circle(origin, radius, lineWidth, fillColor, outlineColor));
    }

    addAsset(src: string, name: string) {
        return this.assetManager.addAsset(src, name);
    }

    renderScene(): void {
        const context = this.renderer.context;
        this.renderer.clear();

        for (const line of this.lines) {
            line.render(context);
        }

        for (const circle of this.circles) {
            circle.render(context);
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
        }

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
mainframe.addAsset("https://yepcode.io/docs/img/languages/javascript.svg", "jslogo");
mainframe.renderer.setRectangularBoundary(500, 600);
mainframe.renderer.canvas.style.backgroundColor = "black";
mainframe.addLine(new Line(new Vector2([0, 0]), new Vector2([320, 600]), 4, "#fff", "round"));
mainframe.renderScene();
mainframe.start();
mainframe.addLine(new Line(new Vector2([500, 600]), new Vector2([200, 300]), 4, "#fff", "round"));
mainframe.addCircle([500, 100], 50, 5.5, "red", "yellow");