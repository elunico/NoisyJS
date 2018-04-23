
let slider;
let clear;
let canvas;
let sliderVal;
let multiplier;
let ss, ms;

function updateValueDiv()
{
    sliderVal.html("Total frames per redraw: " + (slider.value() * multiplier.value()));
    ss.html("Frames per redraw (" + slider.value() + "):");
    ms.html("Redraw frames multiplier (" + multiplier.value() + "):");
}

function setup()
{
    pixelDensity(1);
    canvas = createCanvas(640, 480);
    createDiv("");
    ss = createDiv("Frames per redraw: ");
    slider = createSlider(1, 60, 53, 1);
    slider.style('width', '320px');
    createDiv("");
    ms = createDiv("Multiplier value:");
    multiplier = createSlider(1, 60, 24, 1);
    multiplier.style("width", "320px");
    sliderVal = createDiv("Total frames per redraw: " + (slider.value() * multiplier.value()));

    stop = createButton("Stop");
    resume = createButton("Resume");

    stop.mousePressed(noLoop);
    resume.mousePressed(loop);

    clear = createButton("Clear");
    clear.mousePressed(clearCanvas);
}

function clearCanvas()
{
    canvas.clear();
}

let framesPerUpdate = 4;
const indicesPerPixel = 4;

function initValue()
{
    return (indicesPerPixel) * (frameCount % framesPerUpdate);
}

function stopValue()
{
    return (indicesPerPixel * width * height) - initValue();
}

function stepValue()
{
    return (indicesPerPixel) * framesPerUpdate;
}

function draw()
{
    framesPerUpdate = slider.value() * multiplier.value();
    updateValueDiv();

    loadPixels();
    for (let i = initValue(); i < stopValue(); i += stepValue()) {

        pixels[i + 0] = random(255) % mouseX;
        pixels[i + 1] = random(255) % mouseY;
        pixels[i + 2] = random(255) % abs(mouseX - mouseY);
        pixels[i + 3] = random(255);
    }
    updatePixels();
}

let stopped = false;

function keyPressed()
{
    if (key === ' ') {
        if (stopped) {
            loop();
        } else {
            noLoop();
        }
        stopped = !stopped;
    }
}
