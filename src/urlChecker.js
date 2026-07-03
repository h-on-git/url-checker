// checks if the input URL is valid
export function checkValidUrl(userUrl){
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
export const mockServerData = {
    "https://example.com/file.txt":{
        type: "file"
    },
    "https://example.com/docs/":{
        type: "folder"
    }
};

//asynchronous server call
export function mockServerCheck(userUrl){
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