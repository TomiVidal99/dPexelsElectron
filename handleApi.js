//Require Wrapper Library
const os = require('os');
const storage = require('electron-json-storage');
storage.setDataPath(os.tmpdir());

const PexelsAPI = require('pexels-api-wrapper');

const default_storage_path = storage.getDefaultDataPath();
let photos_urls;

function retrieve_images(key, keyword) {
    //Create Client instance by passing in API key
    var pexelsClient = new PexelsAPI(key);

    //Search API
    pexelsClient.search(keyword, 10, 1)
        .then(function(result){
            console.log(result)
            photo_url = result.photos[0].url
        }).
        catch(function(e){
            console.err(e);
            if (e && app.Notification.isSupported()) {
                new app.Notification([{"title": "Error!"}, {"body": e}])
            }
    });    
}




