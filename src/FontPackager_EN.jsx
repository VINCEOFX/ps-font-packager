// 获取当前文档对象
var doc = app.activeDocument;

// 获取文档中使用的所有字体
var fonts = null;
if (doc.artLayers.length > 0) {
  var textLayer = doc.artLayers.getByName("文本");
  if (textLayer.kind == LayerKind.TEXT) {
    fonts = textLayer.textItem.fonts;
  }
}

// 如果无法获取字体信息，提示用户
if (fonts == null || fonts.length == 0) {
  alert("无法获取文档中使用的字体信息！");
} else {
  // 创建一个文件夹，并将所有字体文件复制到该文件夹中
  var folder = new Folder("~/Desktop/字体"); // 将字体文件夹放到桌面上
  folder.create();
  for (var i = 0; i < fonts.length; i++) {
    var fontFile = new File(fonts[i].postScriptName);
    fontFile.copy(folder);
  }

  // 创建一个压缩文件，并将字体文件夹添加到压缩文件中
  var zipFile = new File("~/Desktop/字体.zip"); // 将压缩文件放到桌面上
  zipFile.encoding = "BINARY";
  zipFile.open("w");
  zipFile.write(folder.getFiles());
  zipFile.close();

  // 提示用户打包完成
  alert("字体打包完成，文件保存在：" + zipFile.fsName);
}