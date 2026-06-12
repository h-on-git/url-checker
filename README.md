#URL Checker

##Features
    -Checks whether the user entered URL is valid or not.
    -Uses a mocked sever to contain URL data.
    -Debounces and throttles to avoid too many requests.
    -Returns the type (File or Folder) if the URL is valid and -exists.

##Mocked URLs
    -The mocked server contains URLs:
    -https://example.com/file.txt
    -https://example.com/docs/

##Expected results:

    -https://example.com/file.txt -> exists, file
    -https://example.com/docs/ -> exists, folder

    -Any other valid URL returns as not existing.

##How to Run
    -Open index.html in the browser.    

