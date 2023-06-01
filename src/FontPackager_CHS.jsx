var p = new ActionReference();

function arrayUnique(a){
    var t = []
        i = a.length;

    while(i--) {
        var f = false,
        n = t.length;

        while (n--) {
            if(a[i] === t[n]) {
                f = true;
            }
        }

        if(!f) {
            t.push(a[i]);
        }
    }
    return t;
}

function findFonts() {
    p.putEnumerated( charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );

    var c = executeActionGet(p).getInteger(charIDToTypeID('NmbL'))+1,
        fonts = [];

    while(c--) {
        var r = new ActionReference(),
            descLayer,
            layerStyles,
            countStyles;

        r.putIndex( charIDToTypeID( 'Lyr ' ), c );

        try {
            descLayer = executeActionGet(r);
        } catch (e) {
            continue;
        }

        if(!descLayer.hasKey(stringIDToTypeID( 'textKey' ))) continue;

        layerStyles = descLayer.getObjectValue(stringIDToTypeID('textKey')).getList(stringIDToTypeID('textStyleRange'));
        countStyles = layerStyles.count;

        while(countStyles--) {
            var n = layerStyles.getObjectValue(countStyles).getObjectValue(stringIDToTypeID('textStyle')).getString(stringIDToTypeID('fontPostScriptName'));
            fonts.push(n);
        }
    }

    return arrayUnique(fonts).sort();
}

if (documents.length) {
    var d = findFonts();
    alert(d.length +' 个字体已被找到！！！\n'+d.join('\n'));
} else {
    alert('当前档案中并未找到任何字体！.',);
}