import { Circle } from "./objects/circle";
import { Line } from "./objects/line";
import { ColorUtils } from "./utils/colors";
import { MathUtils } from "./utils/math";

const MathUTILS = new MathUtils(3);
const ColorUTILS = new ColorUtils();

class MainFrame {
    // biome-ignore lint/suspicious/noExplicitAny: Temporarily allow any type until entities are established
    public entities: any[];
    public lines: Line[];
    public circles: Circle[];

    constructor() {
        this.initialize();

        this.entities = [];
        this.lines = [];
        this.circles = [];
    }

    initialize() {
        console.log("Initializing LTGE...");
    }

    // biome-ignore lint/suspicious/noExplicitAny: Temporarily allow any type until entities are established
    addEntity(entity: any) {
        this.entities.push(entity);
    }

    addLine(line: Line) {
        this.lines.push(line);
    }

    addCircle(circle: Circle) {
        this.circles.push(circle);
    }

    update() {
        console.log("Updating LTGE...");
    }
}

export {
    MathUTILS,
    ColorUTILS
}