function getMessage(a, b) {    
    if (typeof a == "boolean") {
        if (a == true) {
            return 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров';     
        }
        else {
            return 'Переданное GIF-изображение не анимировано';    
        }
    }
    
    if (typeof a == "number") {
        return 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + b*4 + ' аттрибутов';       
    }
    
    if ( Array.isArray(a) ) {  
        var arraySum = 0;
        
        for (var i = 0; i < a.length; i++) {
            arraySum += a[i];    
        }
        
        return 'Количество красных точек во всех строчках изображения: ' + arraySum;
    }
    
    if ( Array.isArray(a) && Array.isArray(b) ) {
        var arraySquare = 0;        
        
        for (var i = 0; i < a.length; i++) {
            var multipliedArgs = a[i] * b[i];
            arraySquare += multipliedArgs; 
        }
        
        return 'Общая площадь артефактов сжатия: ' + arraySquare + ' пикселей'; 
    }    
}
