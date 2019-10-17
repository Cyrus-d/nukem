function remove(selector, method) {
    console.log('selector:' + selector);
    appendStyle(selector + '{display:none !important;}');
    if (method === "Hide") {
        $(selector).remove();
    }
    else {
        $(selector).css("visibility", "hidden");
    }
    chrome.extension.sendRequest({
        method: "elementNuked",
    });
}

var url = document.location.href;

chrome.extension.sendRequest({
    method: "getElements",
    url: url
},
    function (response) {
        response.elements.map(function (element) {
            setTimeout(function () {
                remove(element.selector, element.method);
            }, parseInt(element.delay));
        });
    }
);


function appendStyle(content) {
    style = document.createElement('STYLE');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(content));
    document.head.appendChild(style);

}