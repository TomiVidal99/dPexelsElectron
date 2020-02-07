const https = require('https');

//Require Wrapper Library
const os = require('os');
const storage = require('electron-json-storage');
storage.setDataPath(os.tmpdir());

const PexelsAPI = require('pexels-api-wrapper');

const default_storage_path = storage.getDefaultDataPath();
let photos_urls = [];
let pages;

function retrieve_images(key, keyword) {
    photos_urls = [];
    pages = 0;
    images_amount.disabled = true;

    //Create Client instance by passing in API key
    var pexelsClient = new PexelsAPI(key);

    function get_page(current_page) {
        //Search API
        pexelsClient.search(keyword, 80, current_page)
            .then(function(result){
                console.log(result)
                let result_photos = result.photos;
                result_photos.forEach((obj) => {
                    photos_urls.push(obj);
                });
                pages = Math.ceil(result.total_results / 80);
                updateProgressBar(pages, current_page);
                if (pages > 1 && result.page != pages) {
                    console.log("current: ", result.page, "of: ", pages)
                    get_page(current_page + 1);
                }
                if (current_page == pages) {
                    images_amount.disabled = false;
                    images_amount.max = photos_urls.length;
                    images_amount_result.innerHTML = "0 photos selected of " + photos_urls.length;
                }
            }).
            catch(function(e){
                console.log(e);
                if (e && app.Notification.isSupported()) {
                    new app.Notification([{"title": "Error!"}, {"body": e}])
                }
        });    
    }

    get_page(1);

}




