'use strict'

const fs = require('fs')  
const request = require('request')
const Path = require('path')  

function downloadImage(urls, currentImage, folder_name, counter, PATH) {
  const totalImages = urls.length;
  let callback;
  console.log("d ", allow_download);
  if (allow_download == undefined) {
    allow_download = true;
  }
  if (currentImage < totalImages && allow_download == true) {
    callback = () => {
      counter++;
      button_start_stop.innerHTML = "CANCEL DOWNLOAD";
      downloadImage(urls, currentImage + 1, folder_name, counter)
      updateProgressBar(totalImages, currentImage);
      if (counter == images_amount.value) {
        images_amount_result.innerHTML = "Finished!!"
      } else {
        images_amount_result.innerHTML = counter.toString() + " downloaded of " + images_amount.value.toString();
      }
      
    }
  } else {
    callback = () => {
      console.log("finished!")
      updateProgressBar(100, 100);
    }
  }
  if (allow_download == false) {
    images_amount_result.innerHTML = "Download canceled!"  
    button_start_stop.innerHTML = "START DOWNLOADING";
  }
  let url;
  if (images_resolution) {
    url = urls[currentImage].src[images_resolution];  
  } else {
    url = urls[currentImage].src.landscape;  
  }
  const file_name = url.split("?")[0].split("/")[5]
  //console.log(file_name)
  let path_;
  if (PATH) {
    //console.log(PATH)
    path_ = PATH + "/";
  } else {
    path_ = "./downloads/";
      
  }
  const filename = Path.resolve(path_, folder_name, file_name)
  fs.mkdirSync(path_ + user_keyword.value, { recursive: true })
  request.head(url, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

