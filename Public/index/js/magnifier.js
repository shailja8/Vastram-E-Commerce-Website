var MAGNIFIER = function (alertOnErrors) {

    var defaultClipRect = "rect(0px 150px 150px 0px)";
    var defaultClipWidth = 150;
    var defaultClipHeight = 150;
     
    var imagePairData = [];
    
    var currentImagePair;
    
    function addLoadEvent(fn) {
      var oldfn = window.onload;
      window.onload = (typeof oldfn != 'function') ? fn : function() { oldfn(); fn(); };
    }
    
    function centerLens(data, x, y) {
      var lens = data.lens.node;
      lens.style.left = (x - (data.lens.width / 2)) + "px";
      lens.style.top = (y - (data.lens.height / 2)) + "px";
    }
    
    function centerRect(rect, x, y) {
      var dx = Math.round(rect.width / 2);
      var dy = Math.round(rect.height / 2);
        
      return "rect(" + (y - dy) + "px " + (x + dx) + "px " + (y + dy) + "px " + (x - dx) + "px)";
    }
    
    
    function findImagePairData(x, y) {
      for (var i = 0; i < imagePairData.length; ++i) {
        if (imagePairData[i].contains(x, y)) {
          return imagePairData[i];
        }
      }
      return null;
    }
    
    function getClipRect(node) {
      var rect = node.style.clip || defaultClipRect;
      var matches = /([\-.0-9]+)[^\-.0-9]+([\-.0-9]+)[^\-.0-9]+([\-.0-9]+)[^\-.0-9]+([\-.0-9]+)/.exec(rect);
      var top = + matches[1];
      var right = + matches[2];
      var bottom = + matches[3];
      var left = + matches[4];
      var width = !(left || right) ? defaultClipWidth : right - left;
      var height = !(top || bottom) ? defaultClipHeight : bottom - top;
      return { width: width, height: height };
    }
    
    function getCurrentStyle(elt, property) {
      var dv = document.defaultView && document.defaultView.getComputedStyle &&
                document.defaultView.getComputedStyle(elt, null)[property];
      var cs = elt.currentStyle && elt.currentStyle[property] && elt.currentStyle[property];
      var rs = elt.runtimeStyle && elt.runtimeStyle[property] && elt.runtimeStyle[property];
      var es = elt.style && elt.style[property] && elt.style[property];
      return dv || cs || rs || es;
    }
    
    function getComputedValue(elt, property) {
      return parseFloat(getCurrentStyle(elt, property));
    }
    
    function getImagePairData(x, y) {
      if (currentImagePair) {
        if (currentImagePair.contains(x, y)) {
          return currentImagePair;
        }
        else if (imagePairData.length < 2) {
          return null;
        }
      }
      else {
        return findImagePairData(x, y);
      }
    }
    
    function getInlineValue(elt, property) {
      return parseFloat(elt.style[property] || elt[property]);
    }
    
    function getLabel(node) {
      return node.id || node.name || node.src || node;
    }
    
    function getLargeImages() {
      var largeImages = [];
      for (var i = 0; i < document.images.length; ++i) {
        if (isLargeImage(document.images[i])) {
          largeImages[largeImages.length] = document.images[i];
        }
      }
      return largeImages;
    }
    
    function getLens(image) {
      if (image && isLens(image.parentNode)) {
        var node = image.parentNode;
        return {
          node: node,
          width: getComputedValue(node, "width"),
          height: getComputedValue(node, "height")
        };
      }
      else {
        return null;
      }
    }
    
    function getMagnifierParent(node) {
      var parent = node.parentNode;
      if (isLens(parent)) {
        parent = parent.parentNode;
      }
      return parent;
    }
    
    function getOffset(obj, field) {
      var sum = 0;
      do { sum += obj[field];  }
      while ((obj = obj.offsetParent));
      return sum;
    }
    
    function getSmallImage(largeImage) {
      var parent = getMagnifierParent(largeImage);
      var images = parent.getElementsByTagName("IMG");
      for (var i = 0; i < images.length; ++i) {
        if (isSmallImage(images[i])) {
          return images[i];
        }
      }
      return null;
    }
    
    function hideMagnifiedImage(image) {
      image.style.display = "none";
    }
    
    function isLargeImage(image) {
      return image.className == "maglarge" || nameStartsWith(image, "large");
    }
    
    function isLens(node) {
      return node && (node.className == "maglens" || nameStartsWith(node, "lens"));
    }
    
    function isSmallImage(image) {
      return image.className == "magsmall" || nameStartsWith(image, "small");
    }
    
    function magAlert(msg) {
      if (alertOnErrors) {
        alert("Magnifier error: " + msg);
      }
    }
    
    
    function makeImagePairData(i, largeImage) {
      if (!largeImage) {
        magAlert("No large image for magnifier " + (i + 1));
        return null;
      }
      
      var imageLabel = "image: " + getLabel(largeImage);
    
      var lens = getLens(largeImage);
      if (lens && (!lens.width || !lens.height || isNaN(lens.width) || isNaN(lens.height))) {
        magAlert("Can't get lens dimensions for " + imageLabel);
        return null;
      }
      
      var rect = lens ? null : getClipRect(largeImage);
      if (rect && (!rect.width || !rect.height || isNaN(rect.width) || isNaN(rect.height))) {
        magAlert("Can't get clip dimensions for " + imageLabel);
        return null;
      }
      
      var parent = getMagnifierParent(largeImage);
      if (!parent) {
        magAlert("No parent DIV found for " + imageLabel);
        return null;
      }
    
      var smallImage = getSmallImage(largeImage) ||
                       makeSmallImage(largeImage, parent, lens ? lens.node : largeImage);
      if (!smallImage) {
        magAlert("No small image for " + imageLabel);
        return null;
      }
      
      var sx = getOffset(smallImage, "offsetLeft");
      var sy = getOffset(smallImage, "offsetTop");
      
      var sw = getInlineValue(parent, "width");
      var sh = getInlineValue(parent, "height");
      if (isNaN(sw) || isNaN(sh)) {
        magAlert("Can't get small image dimensions for " + imageLabel);
        return null;
      }
      else {
        smallImage.width = sw;
        smallImage.height = sh;
      }
      
      var lw = getInlineValue(largeImage, "width");
      var lh = getInlineValue(largeImage, "height");
      if (!lw || !lh) {
        magAlert("Can't get large image dimensions for " + imageLabel);
        return null;
      }
      
      return {
        small: { image: smallImage, x: sx, y: sy, width: sw, height: sh },
        large: { image: largeImage, width: lw, height: lh },
        mag: { x: lw / sw, y: lh / sh },
        lens: lens,
        rect: rect,
        contains: function(x, y) {
                    return (sx <= x && x <= sx + sw && sy <= y && y <= sy + sh);
                  }
      };
    }
    
    // Passed the largeImage to copy, and where to insert it.
    function makeSmallImage(largeImage, parent, refChild) {
      if (refChild.parentNode != parent) {
        magAlert("Problem getting parent DIV for " + getLabel(largeImage));
        return null;
      }
      
      var smallImage = new Image();
      smallImage.className = "magsmall";
      smallImage.style.position = "absolute";
      smallImage.style.top = "0px";
      smallImage.style.left = "0px";
      smallImage.style.width = parent.style.width;
      smallImage.style.height = parent.style.height;
      smallImage.style.borderStyle = "none";
      // IE flashes the large image on insertion unless hidden
      smallImage.style.display = "none";
      smallImage.src = largeImage.src;
      parent.insertBefore(smallImage, refChild);
      smallImage.style.display = "block";
      return smallImage;
    }
    
    function mouseTrack(evt) {
      var x, y;
      if (evt && !(evt.pageX === undefined)) {
         x = evt.pageX;
         y = evt.pageY;
         evt.stopPropagation();
      }
      else { // Internet Explorer
         x = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft) - document.body.clientLeft;
         y = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop) - document.body.clientTop;
         event.cancelBubble = true;
      }
      
      var data = getImagePairData(x, y);
      
      if (data) {
        updateMagnifiedImage(x, y, data);
      }
      else if (currentImagePair) {
        hideMagnifiedImage(currentImagePair.large.image);
        currentImagePair = null;
      }
    }
    
    function nameStartsWith(node, name) {
      return startsWith(node.name, name) || startsWith(node.id, name);
    }
    
    function startsWith(str1, str2) {
      return str1 && str2 !== undefined && str2 !== null && str1.indexOf(str2) === 0;
    }
    
    function updateMagnifiedImage(x, y, data) {
      // upper left of small image
      var sx = data.small.x;
      var sy = data.small.y;
      // mouse x,y relative to small image
      var rx = x - sx;
      var ry = y - sy;
      // mouse x, y relative to large image
      var Rx = Math.floor(rx * data.mag.x);
      var Ry = Math.floor(ry * data.mag.y);
      var Sx, Sy;
      var largeStyle = data.large.image.style;    
      
      if (data.lens) {
        centerLens(data, rx, ry);
        Sx = x - Rx - getOffset(data.lens.node, "offsetLeft");
        Sy = y - Ry - getOffset(data.lens.node, "offsetTop");
      }
      else { 
        largeStyle.clip = centerRect(data.rect, Rx, Ry);
        Sx = x - Rx - sx;
        Sy = y - Ry - sy;
      }
      
      largeStyle.left = Sx + "px";
      largeStyle.top = Sy + "px";
      
      largeStyle.display = "block";
      currentImagePair = data;
    }
    
    function initListeners() {
      if (document.addEventListener) {
        document.addEventListener('mousemove', mouseTrack, true);
      }
      else if (document.attachEvent) {
        document.attachEvent('onmousemove', mouseTrack);
      }
      else {
        if (!document.all) {
          document.captureEvents(Event.MOUSEMOVE);
        }
        document.onmousemove = mouseTrack;
      }
    }
    
    function registerImagePairs() {
      var largeImages = getLargeImages();
      imagePairData = [];
      
      for (var i = 0; i < largeImages.length; ++i) {
        var data = makeImagePairData(i, largeImages[i]);
        if (data) {
          imagePairData[imagePairData.length] = data;
          hideMagnifiedImage(largeImages[i]);
        }
      }
    }
    
    function makeStatusString() {
      var missing = [];
      var i = 0;
      var testImage = function(i) {
        if (i < imagePairData.length) {
          img.src = imagePairData[i].large.image.src;
        }
        else {
          showImageSummary(missing);
        }
      }
      var img = new Image();
      img.onerror = function (evt) {
        missing[missing.length] = this.src;
        testImage(++i);
      }
      img.onload = function (evt) {
        testImage(++i);
      }
      testImage(i);
      return "Number of magnified images: " + imagePairData.length + "\n";
    }
    
    function showImageSummary(missing) {
      var text = "";
      for (var i = 0; i <  missing.length; ++i) {
        text += "\n  " + makeRelativePath(missing[i]) + " not found";
      }
      alert(text);
    }
    
    
    function makeRelativePath(url) {
      var locParts = window.location.href.split("/");
      var urlParts = url.split("/");
      var i = 0;
      while (i < locParts.length && locParts[i] == urlParts[i]) {
        ++i;
      }
      if (i == 0) {
        return url;
      }
      else {
        var relUrl = urlParts.slice(i).join("/");
        while (++i < locParts.length) {
          relUrl = "../" + relUrl;
        }
        return relUrl;
      }
    }
    
    addLoadEvent(function () {
      registerImagePairs();
      initListeners();
    });
    
    return {
      data: function () { return imagePairData; },
      reset: function() { registerImagePairs(); },
      status: function() { alert(makeStatusString()); }
    };
    
    }(true);