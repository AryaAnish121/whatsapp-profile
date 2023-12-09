const { createCanvas, registerFont } = require("canvas");
const path = require("path");

// register font
registerFont(path.join(__dirname, "fonts/Ahsing.otf"), {
    family: "Ahsing",
});
registerFont(path.join(__dirname, "fonts/DMSerifText-Regular.ttf"), {
    family: "DM Serif Text",
});

module.exports = () => {
    const date = new Date();

    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext("2d");

    const offset = -30;

    // calculate font size
    const calcFontSize = (c, font, t, customOffset) => {
        var i = 1;
        ctx.font = `${i}px '${font}'`;
        var curr = ctx.measureText(c);

        while (curr.width - t.width < 0) {
            if (i > 75) break;
            i++;
            ctx.font = `${i}px '${font}'`;
            curr = ctx.measureText(c);
        }

        ctx.font = `${i + (customOffset || 0)}px '${font}'`;
    };

    // set background color
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // write time
    const time =
        date
            .toLocaleTimeString("en-GB", {
                timeZone: "Asia/Kolkata",
            })
            .split(":")[0] + ":00";
    ctx.font = "95px Ahsing";
    ctx.fillStyle = "#FFFFFF";
    const metricsT = ctx.measureText(time);
    const actualHeightT =
        metricsT.actualBoundingBoxAscent + metricsT.actualBoundingBoxDescent;
    ctx.fillText(
        time,
        250 - metricsT.width / 2,
        250 + offset + actualHeightT / 2
    );

    // write g'day
    const text = "g'day; it's some time after";
    ctx.font = "21px Ahsing";
    calcFontSize(text, "Ahsing", metricsT);
    ctx.fillStyle = "#32302E";
    const metricsG = ctx.measureText(text);
    const actualHeightG =
        metricsG.actualBoundingBoxAscent + metricsG.actualBoundingBoxDescent;
    ctx.fillText(
        text,
        250 - metricsG.width / 2,
        250 + offset - actualHeightG - actualHeightT / 2 - 5
    );

    // write day
    const day = date
        .toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            weekday: "long",
        })
        .toLowerCase();
    ctx.fillStyle = "#FF9045";
    calcFontSize(day, "DM Serif Text", metricsT, -3);
    const metricsD = ctx.measureText(day);
    const actualHeightD =
        metricsD.actualBoundingBoxAscent + metricsD.actualBoundingBoxDescent;
    ctx.fillText(
        day,
        250 - metricsD.width / 2,
        250 + offset + actualHeightD + actualHeightT / 2 + 0.5
    );

    console.log("generated image");

    return canvas.toDataURL().replace(/^data:image\/png;base64,/, "");
};
