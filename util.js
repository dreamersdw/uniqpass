function top_level_domain(full_domain) {
    var parts = full_domain.split(".");
    var len = parts.length;
    return parts.splice(len-2, len).join('.');
}

function select_domain(full_domain) {
    var domain = full_domain;
    if (localStorage["salt_source"] == "1") 
        domain = top_level_domain(full_domain);
    return domain;
}
