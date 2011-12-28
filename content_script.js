var fill_forms = function (pwd) {
    if (pwd) {
        $("input[type=password]").val(pwd);
    } else {
        chrome.extension.sendRequest({reason: "ask_salted_password", domain: location.host}, function(response) {
            $("input[type=password]").val(response.pwd);
        });
    }
};

var listener = function(request, sender, sendResponse) {
    switch (request.reason) {
        case "ask_domain":
            sendResponse({domain: location.host});
            break;
        case "please_fill_forms":
            fill_forms(request.pwd);
            sendResponse({});
            break;
        default:
            sendResponse({});
    }
};

$(document).ready(function()  {
    chrome.extension.sendRequest({reason:"ask_shortcut"}, function(response) {
        $(document).bind("keydown", response.shortcut, function(e) {fill_forms()});
    });
    chrome.extension.onRequest.addListener(listener);
})
