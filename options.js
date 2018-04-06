function save_options() {
    const backgroundColourInputBox = document.getElementById("background-colour");
    const backgroundColour = backgroundColourInputBox.value;
    backgroundColourInputBox.style.backgroundColor = backgroundColour;
    backgroundColourInputBox.value = '';

    const pipelinesFilter = document.getElementById('pipelines-filter').value;
    
    const pipelinesFilterArray = pipelinesFilter.split(";");
        
    var config = {
        options: {
            backgroundColour: backgroundColour,
            pipelinesFilter: pipelinesFilterArray
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
            pipelinesFilter: ""
        }
    }, function(settings) {
        
        const backgroundColourInputBox = document.getElementById("background-colour");
        backgroundColourInputBox.value = settings.options.backgroundColour;
        backgroundColourInputBox.style.backgroundColor = settings.options.backgroundColour;
        
        document.getElementById("pipelines-filter").value = settings.options.pipelinesFilter;
    });

    document.getElementById('save').addEventListener('click', save_options);
}
document.addEventListener('DOMContentLoaded', restore_options);
