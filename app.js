const userInput = document.getElementById("urlInput");
const statusText = document.getElementById("status");
//console.log(userInput);
let lastCheckTime = 0;
let debounceTime;
const DEBOUNCE_DELAY = 500;
let throttleTime;
const THROTTLE_DELAY = 1000;

// checks if the input URL is valid
function checkValidUrl(userUrl){
        try{
            const url = new URL(userUrl);
            const checkHttpOrHttps = url.protocol === "http:" || url.protocol === "https:";
            return checkHttpOrHttps;
        }
        catch {
            return false;
        }
}

//mocks server containing URL data
const mockServerData = {
    "https://example.com/file.txt":{
        type: "file"
    },
    "https://example.com/docs/":{
        type: "folder"
    }
};

//asynchronous server call
function mockServerCheck(userUrl){
    return new Promise((resolve) => {
        setTimeout(()=>{
            const result = mockServerData[userUrl];

            if(result){
                resolve({
                    exists: true,
                    type: result.type
                });
            }

            else{
                resolve({
                    exists: false,
                    type: null
                });
            }
        }, 1000);
    });
}

//throttle to avoid multiple server calls
function throttleCheck(userUrl){
    const now = Date.now();
    const sinceLastCheckTime = now - lastCheckTime;

    clearTimeout(throttleTime);
    if(sinceLastCheckTime>=THROTTLE_DELAY){
        runExistenceCheck(userUrl);
    }
    else{
        const timeLeft = THROTTLE_DELAY - sinceLastCheckTime;
        throttleTime = setTimeout(()=>{
            const latestUrl = userInput.value.trim();

            if(checkValidUrl(latestUrl)){
                runExistenceCheck(latestUrl);
            }
        }, timeLeft);
    }
}

async function runExistenceCheck(userUrl) {
    
    statusText.textContent = "Checking URL...";
    lastCheckTime = Date.now();
    const result = await mockServerCheck(userUrl);
    if(userInput.value.trim() !== userUrl){
        return;
    }
    if (result.exists){
        statusText.textContent = `URL exists \nType: ${result.type}`;
    }
    else{
        statusText.textContent="URL does not exist";
    }
}

const handleInput = ()=> {
    
                            const userUrl = userInput.value.trim();
                            clearTimeout(debounceTime);

                            if(userUrl === ""){
                                clearTimeout(throttleTime);
                                lastCheckTime=0;
                                statusText.textContent = "";
                                return;
                            }
                            if(!checkValidUrl(userUrl)){
                                clearTimeout(throttleTime);
                                statusText.textContent = "Invalid URL";
                                return;
                            }
                            else{
                                statusText.textContent = "Checking URL...";

                                debounceTime = setTimeout(()=>{
                                    throttleCheck(userUrl);
                                }, DEBOUNCE_DELAY);
                                
                            }


                        };

// Handles input typing
userInput.addEventListener("input",handleInput)

