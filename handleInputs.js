// initial values for inputs
let allow_download;
let path = null;
let images_resolution;

//get user key
storage.get('key', function(error, data) {
    if (error){
        throw error;
    } else if (data.key != undefined) {
        let key = data.key;
        user_key.value = key;
        console.log(key);
    }
});
//get user keyword
storage.get('keyword', function(error, data) {
    if (error){
        throw error;
    } else if (data.keyword != undefined) {
        let keyword = data.keyword;
        user_keyword.value = keyword;
        console.log(keyword);
    }
});

// function for handleing inputs

function handleUserKeyBlur(e) {
	//console.log(e)
	if (e.target.value.length != 56) {
		user_key.style.backgroundColor = "red";
		key_warning(true);
	} else {
		storage.set('key', { key: e.target.value }, function(error) {
		  if (error) throw error;
		});		
	}
}

function handleUserKeyClick(e) {
	user_key.style.backgroundColor = "white";
}

function handleUserKeywordBlur(e) {
	//console.log(e)
	if (e.target.value.length < 1) {
		user_keyword.style.backgroundColor = "red";
	} else {
		storage.set('keyword', { keyword: e.target.value }, function(error) {
		  if (error) throw error;
		});		
	}
}

function handleUserKeywordClick(e) {
	user_keyword.style.backgroundColor = "white";
}

function handleUserDownloadingPathClick(e) {
	const ipcRenderer = require('electron').ipcRenderer;
	ipcRenderer.send('selectDirectory');
	ipcRenderer.on('path-selected', (event, path_) => {
		path = path_[0];
		if (path != undefined) {
			const path_sections = path.split("/");
			if (path.length > 35) {
				user_downloading_path.innerHTML = path_sections[1] + "/ ... /" + path_sections[path_sections.length-1];	
			} else {
				user_downloading_path.innerHTML = path;
			}
			
		}
	})

}


function handleImagesAmountInput(e) {
	current_images_selected = e.target.value;
	console.log(current_images_selected)
	images_amount_result.innerHTML = current_images_selected + " photos selected of " + e.target.max;
}

function handleImagesAmountBlur(e) {
	console.log(e)
}

function handleButtonSetClick(e) {
	//console.log(e)
	if (user_key.value.length != 56) {
		key_warning(true);
	}
	if (user_keyword.value.length < 1) {
		user_keyword.style.backgroundColor = "red";
	}
	if (user_key.value.length == 56 && user_keyword.value.length > 1) {
		retrieve_images(user_key.value, user_keyword.value);
	}
	button_start_stop.removeAttribute("disabled");

}

function handleButtonStartStopClick(e) {
	//console.log(e)
	if (button_set.hasAttribute("disabled")) {
		button_set.removeAttribute("disabled");
	} else {
		button_set.setAttribute("disabled", "true");	
	}
	allow_download = !allow_download;
	console.log(allow_download);
	if (progress_bar.style.display == "block") {
		// if this happends its cause the user click set
		if (parseInt(images_amount.value) > 0) {
			downloadImage(photos_urls, (photos_urls.length - parseInt(images_amount.value)), user_keyword.value, 0, path)
			if (images_amount.hasAttribute("disabled") == false) {
				images_amount.setAttribute("disabled", true);
			} else {
				images_amount.removeAttribute("disabled");
			}
		} else {
			images_amount_result.innerHTML = "Select how many you want!!!"
		}
	}
	
}

function updateProgressBar(max, current) {

	if (progress_bar.style.display == "none") {
		progress_bar.style.display = "block";
	}

	const percentage = (current*100)/max;
	progress_bar.style.width = percentage + "%";
	if (percentage < 25 ) {
		progress_bar.style.backgroundColor = "#e84e43";
	} else if (percentage > 40 && percentage < 80) {
		progress_bar.style.backgroundColor = "#e8e843";
	} else if (percentage > 80) {
		progress_bar.style.backgroundColor = "#4CAF50";
	}
}

function keyWarningButtonClick(e) {
	key_warning(false);
}

function userKeyLinkClick(e) {
	const { shell } = require("electron");
	shell.openExternal("https://www.pexels.com/api/new/");
}


function resolutionSelectionChange(e) {
	images_resolution = e.target.value;
}


// functio to activate or deactivate the warning div

function key_warning(bool) {
	if (bool) {
		user_key.style.backgroundColor = "red";
		user_key_warning.style.display = "grid";
		user_key_warning.style.opacity = "1";
		user_key_warning.style.zIndex = "99";
	} else {
		user_key_warning.style.zIndex = "-99";
		user_key_warning.style.display = "none";
	}
}