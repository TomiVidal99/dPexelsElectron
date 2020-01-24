
// initial values for inputs

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
		user_key_comment.innerHTML = "You can get your key from https://www.pexels.com/api/new/"
	} else {
		if (user_key_comment.innerHTML.length > 0) {
			user_key_comment.innerHTML = "";
		}
		storage.set('key', { key: e.target.value }, function(error) {
		  if (error) throw error;
		});		
	}
}

function handleUserKeyClick(e) {
	//console.log(e)

	if (user_key_comment.innerHTML.length > 0) {
		user_key_comment.innerHTML = "";
	}
}

function handleUserKeywordBlur(e) {
	//console.log(e)
	if (e.target.value.length < 1) {
		user_keyword_comment.innerHTML = "You must insert a valid keyword!"
	} else {
		if (user_keyword_comment.innerHTML.length > 0) {
			user_keyword_comment.innerHTML = "";
		}
		storage.set('keyword', { keyword: e.target.value }, function(error) {
		  if (error) throw error;
		});		
	}
}

function handleUserKeywordClick(e) {
	//console.log(e)

	if (user_keyword_comment.innerHTML.length > 0) {
		user_keyword_comment.innerHTML = "";
	}
}

function handleImagesAmountInput(e) {
	current_images_selected = e.target.value;
	console.log(current_images_selected)
	images_amount_result.innerHTML = current_images_selected + " photos selected"
}

function handleImagesAmountBlur(e) {
	storage.set("images_amount", {"images_amount": e.target.value}, () => {console.log(e)})
	console.log(storage.has("images_amount"))
	console.log(storage.get("images_amount"))
	console.log(e)
}

function handleButtonSetClick(e) {
	//console.log(e)
	if (user_key.value.length != 56) {
		user_key_comment.innerHTML = "You can get your key from https://www.pexels.com/api/new/";		
		//console.log("No user key has been inserted")
	}
	if (user_keyword.value.length < 1) {
		user_keyword_comment.innerHTML = "You must insert a valid keyword!";
		//console.log("No searching keyword has been inserted")	
	}
	if (user_key.value.length == 56 && user_keyword.value.length > 1) {
		retrieve_images(user_key.value, user_keyword.value);
	}
}

function handleButtonStartStopClick(e) {
	console.log(e)
}