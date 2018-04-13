function save_options() {
    const backgroundColourInputBox = document.getElementById("background-colour");
    const backgroundColour = backgroundColourInputBox.value;
    backgroundColourInputBox.style.backgroundColor = backgroundColour;

    const pipelinesFilter = document.getElementById('pipelines-filter').value;
    const filterPage = document.getElementById('filter-page').checked;
    
    var config = {
        options: {
            backgroundColour: backgroundColour,
            pipelinesFilter: pipelinesFilter,
            filterPage: filterPage
        }
    };
    
    chrome.storage.sync.set(config, function() {
        var status = document.getElementById('status');
        status.style.display = 'block';

        setTimeout(function() {
            status.style.display = 'none';
        }, 1000);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        options: {
            backgroundColour: "white",
            pipelinesFilter: "",
            filterPage: false
        }
    }, function(settings) {
        const backgroundColourInputBox = document.getElementById("background-colour");
        backgroundColourInputBox.value = settings.options.backgroundColour;
        backgroundColourInputBox.style.backgroundColor = settings.options.backgroundColour;
        
        document.getElementById("pipelines-filter").value = settings.options.pipelinesFilter;

        if (settings.options.filterPage === true)
            document.getElementById("filter-page").checked = true;
    });

    document.getElementById('save').addEventListener('click', save_options);
}

document.addEventListener('DOMContentLoaded', restore_options);