// 保存当前的设置
var originalRulerUnits = app.preferences.rulerUnits;

// 设置单位为像素
app.preferences.rulerUnits = Units.PIXELS;

// 获取当前打开的文档
var doc = app.activeDocument;

// 获取桌面路径
var desktopPath = Folder.desktop.fsName;

// 获取字体列表
var fontList = getFonts(doc);

// 导出字体到桌面
for (var i = 0; i < fontList.length; i++) {
    var font = fontList[i];
    var sourceFontFile = new File(font.path);
    var targetFontFile = new File(desktopPath + "/" + font.postScriptName + sourceFontFile.name.match(/\..+$/));

    if (!targetFontFile.exists) {
        sourceFontFile.copy(targetFontFile);
    }
}

// 恢复原始设置
app.preferences.rulerUnits = originalRulerUnits;

// 显示结果
alert("字体已导出到桌面。");

// 获取使用的字体
function getFonts(doc) {
    var fonts = [];

    for (var i = 0; i < doc.layers.length; i++) {
        var layer = doc.layers[i];

        if (layer.typename === "ArtLayer" && layer.kind === LayerKind.TEXT) {
            var textItemFont = layer.textItem.font;
            var font = app.fonts.getByName(textItemFont);

            if (fonts.indexOf(font) === -1) {
                fonts.push(font);
            }
        } else if (layer.typename === "LayerSet") {
            fonts = fonts.concat(getFonts(layer));
        }
    }

    return fonts;
}