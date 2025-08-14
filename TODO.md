# REWORK ASSETS
# REWORK RENDER SYSTEM TO INCORPORATE PLUGIN SYSTEM

- Think of a better way to apply transformations (especially in batches when this will support WebGL).
- Add a way to link stuff together.
    - For example, you spawn a circle, you need to have a way to control it.
    - Either I could provide methods for you to control it (restricted but safe)
      Or allow you to edit it at free will (unsafe).

- Urgent TODO list:
    - Implement base models (super duper basic).
    - Implement a physics core (literally base gravity stuff for now).
    - Maybe but not sure: implement a custom vertices mesh.
    - Add a better test method than just using `index.ts`.

Final Objective: create a basic package that can functionally render sprites and pre-defined objects with a reasonable and expandable physics core. Should be practical for some real life situations.